import "dotenv/config";
import { test, expect, type Page, type APIRequestContext } from "@playwright/test";
import { remote, type Browser } from "webdriverio";
import sql from "mssql";

/**
 * Scenario 3: Concurrent Transfers (Web + Mobile + API + SQL Server)
 *
 * Preconditions:
 * - Web UI is running at http://localhost:3000
 * - API is running at http://localhost:4000
 * - Android emulator is open with the FlashGuard Expo app in the foreground
 * - Appium is running at http://127.0.0.1:4723
 * - Alice (id 1) and Bob (id 2) are active database accounts
 *
 * This scenario intentionally uses safe combined amounts, so both transfers
 * are expected to complete after authorization.
 */

type DbTransaction = {
  id: number;
  sender_account_id: number;
  recipient_account_id: number;
  amount: number;
  status: string;
};

type DbAccount = {
  id: number;
  balance: number;
};

const WEB_URL = process.env.WEB_URL || process.env.BASE_URL || "http://localhost:3000";
const API_URL = process.env.API_URL || "http://localhost:4000";

const SENDER_ACCOUNT_ID = 1;     // Alice Ledger
const RECIPIENT_ACCOUNT_ID = 2;  // Bob Wallet
const WEB_AMOUNT = 125.5;
const MOBILE_AMOUNT = 225.75;
const TOTAL_AMOUNT = WEB_AMOUNT + MOBILE_AMOUNT;

const dbConfig: sql.config = {
  user: process.env.DB_USER || "fg",
  password: process.env.DB_PASSWORD || "YourStrong!Passw0rd",
  database: process.env.DB_NAME || "FlashGuard",
  server: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 1433),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool: sql.ConnectionPool;

test.describe.configure({ mode: "serial" });

test.beforeAll(async () => {
  pool = await sql.connect(dbConfig);
});

test.afterAll(async () => {
  await pool?.close();
});

async function isVisible(mobile: Browser, selector: string): Promise<boolean> {
  return mobile.$(selector).then((element) => element.isDisplayed()).catch(() => false);
}

async function dismissNativeAlertIfPresent(mobile: Browser): Promise<void> {
  for (const selector of [
    'android=new UiSelector().text("OK")',
    'android=new UiSelector().text("Close")',
  ]) {
    const button = await mobile.$(selector);
    if (await button.isDisplayed().catch(() => false)) {
      await button.click();
      return;
    }
  }
}

async function connectMobile(): Promise<Browser> {
  return remote({
    hostname: process.env.APPIUM_HOST || "127.0.0.1",
    port: Number(process.env.APPIUM_PORT || "4723"),
    path: "/",
    logLevel: "error",
    connectionRetryCount: 1,
    capabilities: {
      platformName: "Android",
      "appium:automationName": "UiAutomator2",
      "appium:deviceName": process.env.APPIUM_DEVICE_NAME || "emulator-5554",
      "appium:noReset": true,
      "appium:dontStopAppOnReset": true,
      "appium:autoLaunch": false,
      "appium:newCommandTimeout": 180,
    },
  });
}

async function ensureMobileSignedIn(mobile: Browser): Promise<void> {
  if (await isVisible(mobile, "~nav-transfer")) {
    return;
  }

  const email = await mobile.$("~auth-email-input");
  const password = await mobile.$("~auth-password-input");
  const signIn = await mobile.$("~auth-sign-in-button");

  await email.waitForDisplayed({ timeout: 15_000 });
  await email.setValue("alice@flashguard.local");
  await password.setValue("offline-demo");
  await signIn.click();

  await mobile.waitUntil(
    async () => isVisible(mobile, "~nav-transfer"),
    {
      timeout: 20_000,
      timeoutMsg: "Mobile login did not reach the signed-in navigation.",
    },
  );

  await dismissNativeAlertIfPresent(mobile);
}

async function prepareMobileTransfer(mobile: Browser, amount: number): Promise<void> {
  await ensureMobileSignedIn(mobile);

  const transferTab = await mobile.$("~nav-transfer");
  await transferTab.click();

  const beneficiary = await mobile.$(`~beneficiary-${RECIPIENT_ACCOUNT_ID}`);
  await beneficiary.waitForDisplayed({ timeout: 12_000 });
  await beneficiary.click();

  const amountInput = await mobile.$("~transfer-amount-input");
  await amountInput.waitForDisplayed({ timeout: 12_000 });
  await amountInput.click();
  await amountInput.clearValue().catch(() => undefined);
  await amountInput.setValue(amount.toFixed(2));
}

async function submitMobileTransfer(mobile: Browser): Promise<void> {
  const submit = await mobile.$("~transfer-submit-button");
  await submit.waitForDisplayed({ timeout: 12_000 });
  await submit.click();
}

async function loginAndPrepareWebTransfer(page: Page, amount: number): Promise<void> {
  await page.goto(`${WEB_URL}/login`);

  await page.locator('input[name="email"]').fill("alice@flashguard.local");
  await page.locator('input[name="password"]').fill("offline-demo");
  await page.getByRole("button", { name: /^sign in$/i }).click();

  await page.waitForURL(/\/dashboard/, { timeout: 15_000 });
  await page.goto(`${WEB_URL}/transfers`);

  await expect(page.getByRole("heading", { name: /transfer funds/i })).toBeVisible();

  await page.getByText("Bob Wallet", { exact: true }).click();
  await page.locator('input[type="number"]').fill(amount.toFixed(2));
}

async function submitWebTransfer(
  page: Page,
): Promise<{ id: number; amount: number; status: string }> {
  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/transactions/transfer") &&
      response.request().method() === "POST",
    { timeout: 15_000 },
  );

  await page.getByRole("button", { name: /confirm.*transfer/i }).click();

  const response = await responsePromise;
  expect(response.status()).toBe(201);

  return response.json();
}

async function findRunTransactions(
  startedAt: Date,
): Promise<DbTransaction[]> {
  const result = await pool
    .request()
    .input("senderId", sql.Int, SENDER_ACCOUNT_ID)
    .input("recipientId", sql.Int, RECIPIENT_ACCOUNT_ID)
    .input("webAmount", sql.Decimal(18, 2), WEB_AMOUNT)
    .input("mobileAmount", sql.Decimal(18, 2), MOBILE_AMOUNT)
    .input("startedAt", sql.DateTime2, startedAt)
    .query<DbTransaction>(`
      SELECT id, sender_account_id, recipient_account_id, amount, status
      FROM dbo.transactions
      WHERE sender_account_id = @senderId
        AND recipient_account_id = @recipientId
        AND created_at >= @startedAt
        AND (amount = @webAmount OR amount = @mobileAmount)
      ORDER BY id ASC;
    `);

  return result.recordset;
}

async function getBalances(): Promise<DbAccount[]> {
  const result = await pool
    .request()
    .input("senderId", sql.Int, SENDER_ACCOUNT_ID)
    .input("recipientId", sql.Int, RECIPIENT_ACCOUNT_ID)
    .query<DbAccount>(`
      SELECT id, balance
      FROM dbo.accounts
      WHERE id IN (@senderId, @recipientId);
    `);

  return result.recordset;
}

test(
  "T-E2E-CON-001: Web and mobile transfers complete concurrently with consistent SQL balances",
  async ({ page, request }, testInfo) => {
    test.setTimeout(180_000);

    const balancesBefore = await getBalances();
    const senderBefore = balancesBefore.find((account) => account.id === SENDER_ACCOUNT_ID);
    const recipientBefore = balancesBefore.find((account) => account.id === RECIPIENT_ACCOUNT_ID);

    expect(senderBefore, "Alice account must exist in the database").toBeTruthy();
    expect(recipientBefore, "Bob account must exist in the database").toBeTruthy();
    expect(Number(senderBefore!.balance)).toBeGreaterThanOrEqual(TOTAL_AMOUNT);

    await test.step("Arrange: prepare Web UI and Android client", async () => {
      await loginAndPrepareWebTransfer(page, WEB_AMOUNT);
    });

    const mobile = await connectMobile();

    try {
      await prepareMobileTransfer(mobile, MOBILE_AMOUNT);

      const startedAt = new Date();

      const [webTransaction] = await test.step(
        "Act: submit transfers from Web UI and Android app at the same time",
        async () => {
          return Promise.all([
            submitWebTransfer(page),
            submitMobileTransfer(mobile),
          ]);
        },
      );

      await page.screenshot({
        path: testInfo.outputPath("web-concurrent-transfer.png"),
        fullPage: true,
      });
      await mobile.saveScreenshot(
        testInfo.outputPath("mobile-concurrent-transfer.png"),
      );

      await test.step("Assert: both UI/API transfers are persisted as pending database transactions", async () => {
        expect(Number(webTransaction.amount)).toBe(WEB_AMOUNT);
        expect(webTransaction.status).toBe("pending");

        await expect
          .poll(
            async () => (await findRunTransactions(startedAt)).length,
            { timeout: 20_000, intervals: [500, 1000, 2000] },
          )
          .toBe(2);

        const createdTransactions = await findRunTransactions(startedAt);
        expect(createdTransactions.map((transaction) => Number(transaction.amount)).sort())
          .toEqual([WEB_AMOUNT, MOBILE_AMOUNT].sort());
        expect(createdTransactions.every((transaction) => transaction.status === "pending"))
          .toBeTruthy();
      });

      await test.step("Act: authorize both pending transfers concurrently", async () => {
        const createdTransactions = await findRunTransactions(startedAt);

        const authorizations = await Promise.all(
          createdTransactions.map(async (transaction) => {
            const response = await request.post(
              `${API_URL}/transactions/transfer/${transaction.id}/authorize`,
            );
            expect(response.status()).toBe(200);
            return response.json();
          }),
        );

        expect(authorizations.every((transaction) => transaction.status === "completed"))
          .toBeTruthy();
      });

      await test.step("Assert: account balances, ledger rows and audit trail are consistent", async () => {
        const currentBalances = await getBalances();
        const sender = currentBalances.find((account) => account.id === SENDER_ACCOUNT_ID);
        const recipient = currentBalances.find((account) => account.id === RECIPIENT_ACCOUNT_ID);

        expect(sender).toBeTruthy();
        expect(recipient).toBeTruthy();

        const createdTransactions = await findRunTransactions(startedAt);
        expect(createdTransactions.every((transaction) => transaction.status === "completed"))
          .toBeTruthy();

        const ledgerResult = await pool
          .request()
          .input("id1", sql.Int, createdTransactions[0].id)
          .input("id2", sql.Int, createdTransactions[1].id)
          .query<{
            transaction_id: number;
            account_id: number;
            entry_type: string;
            amount: number;
          }>(`
            SELECT transaction_id, account_id, entry_type, amount
            FROM dbo.ledger_entries
            WHERE transaction_id IN (@id1, @id2);
          `);

        const debitRows = ledgerResult.recordset.filter(
          (entry) => entry.account_id === SENDER_ACCOUNT_ID && entry.entry_type === "debit",
        );
        const creditRows = ledgerResult.recordset.filter(
          (entry) => entry.account_id === RECIPIENT_ACCOUNT_ID && entry.entry_type === "credit",
        );

        expect(debitRows).toHaveLength(2);
        expect(creditRows).toHaveLength(2);
        expect(debitRows.reduce((total, entry) => total + Number(entry.amount), 0))
          .toBeCloseTo(TOTAL_AMOUNT, 2);
        expect(creditRows.reduce((total, entry) => total + Number(entry.amount), 0))
          .toBeCloseTo(TOTAL_AMOUNT, 2);

        const auditResult = await pool
          .request()
          .input("senderId", sql.Int, SENDER_ACCOUNT_ID)
          .input("startedAt", sql.DateTime2, startedAt)
          .query<{ total: number }>(`
            SELECT COUNT(*) AS total
            FROM dbo.audit_log
            WHERE account_id = @senderId
              AND action = 'transfer_authorized'
              AND created_at >= @startedAt;
          `);

        expect(Number(auditResult.recordset[0].total)).toBeGreaterThanOrEqual(2);

        expect(Number(sender!.balance)).toBeCloseTo(
          Number(senderBefore!.balance) - TOTAL_AMOUNT,
          2,
        );
        expect(Number(recipient!.balance)).toBeCloseTo(
          Number(recipientBefore!.balance) + TOTAL_AMOUNT,
          2,
        );
        expect(Number(sender!.balance)).toBeGreaterThanOrEqual(0);
      });
    } finally {
      await mobile.deleteSession().catch(() => undefined);
    }
  },
);
