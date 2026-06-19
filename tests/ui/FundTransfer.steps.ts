import { createBdd } from 'playwright-bdd';
import { test } from '../../src/fixtures/pages.fixture.js';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

// Reusable helper
async function startTransfer({ sidebarPage, transferPage }: any) {
  await sidebarPage.goToTransferFunds();
  await transferPage.expectTransferPageVisible();
}

Given('User is logged in', async ({ loginPage, dashboardPage }) => {
  await loginPage.gotoLandingPage();
  await loginPage.goToLoginFromGetStarted();
  await loginPage.expectLoginPageVisible();
  await loginPage.signInWithDefaultUser();
  await dashboardPage.expectDashboardVisible();
});

Given('I am creating a transfer', async ({ sidebarPage, transferPage }) => {
  await startTransfer({ sidebarPage, transferPage });
});

When('I transfer funds to a valid recipient', async ({ sidebarPage, transferPage }) => {
  await startTransfer({ sidebarPage, transferPage });
  await transferPage.selectBobWallet();
  await transferPage.enterReference('Invoice INV-2024-001');
});

Then('I should see the transfer confirmation screen', async ({ transferPage }) => {
  await transferPage.expectTransferPageVisible();
});

// TC02
When('I enter a valid transfer amount', async ({ page }) => {
  await page.getByPlaceholder(/amount|value|transfer amount/i).fill('150');
});

Then('I should be able to continue', async ({ page }) => {
  await expect(
    page.getByRole('button', { name: /confirm & transfer/i })
  ).not.toBeDisabled();
});

// TC03
When('I enter an amount below the minimum limit', async ({ page }) => {
  await page.getByPlaceholder(/amount|value|transfer amount/i).fill('0.01');
});

Then('I should see an amount validation error', async ({ page }) => {
  await expect(
    page.getByText(/minimum|invalid amount|below limit/i)
  ).toBeVisible();
});

// TC04
When('I enter an amount above the maximum limit', async ({ page }) => {
  await page.getByPlaceholder(/amount|value|transfer amount/i).fill('9999999');
});

Then('I should see an amount validation error', async ({ page }) => {
  await expect(
    page.getByText(/maximum|invalid amount|above limit/i)
  ).toBeVisible();
});

// TC05
When('I select a blocked recipient', async ({ transferPage }) => {
  await transferPage.selectMobileServices();
});

Then('I should see a recipient validation error', async ({ page }) => {
  await expect(
    page.getByText(/blocked|invalid recipient|not allowed/i)
  ).toBeVisible();
});

// TC06
When('I select my own account as the recipient', async ({ transferPage }) => {
  await transferPage.selectAliceLedger();
});

Then('I should see a self-transfer validation error', async ({ page }) => {
  await expect(
    page.getByText(/self-transfer|own account|same account/i)
  ).toBeVisible();
});

// TC07
Given('I am on the transfer confirmation page', async ({ sidebarPage, transferPage, page }) => {
  await startTransfer({ sidebarPage, transferPage });
  await transferPage.selectBobWallet();
  await transferPage.enterReference('Test OTP');
  await page.getByPlaceholder(/amount|value|transfer amount/i).fill('250');
});

When('I enter a valid OTP', async ({ page }) => {
  await page.getByPlaceholder(/otp|verification code|code/i).fill('123456');
  await page.getByRole('button', { name: /confirm & transfer/i }).click();
});

Then('the transfer should be completed successfully', async ({ dashboardPage, page }) => {
  await dashboardPage.expectRecentTransactionsVisible();
  await expect(
    page.getByText(/successful|completed|transfer successful/i)
  ).toBeVisible();
});

// TC08
When('the transfer service times out', async ({ page }) => {
  await page.route('**/transfer**', async (route: any) => {
    await new Promise((resolve) => setTimeout(resolve, 12000));
    await route.abort('timeout');
  });
  await page.getByRole('button', { name: /confirm & transfer/i }).click();
});

Then('I should see a transfer timeout message', async ({ page }) => {
  await expect(
    page.getByText(/timeout|timed out|service unavailable|failed/i)
  ).toBeVisible({ timeout: 20000 });
});