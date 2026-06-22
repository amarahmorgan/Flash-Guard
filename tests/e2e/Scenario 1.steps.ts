import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../src/fixtures/pages.fixture.js';

const { Given, When, Then } = createBdd(test);

Given('the user is on the login page', async ({ loginPage }) => {
await loginPage.gotoLandingPage();
await loginPage.goToLoginFromSignIn();
});

When('the user logs in successfully', async ({ loginPage, dashboardPage }) => {
await loginPage.clickSignIn();

// Verify dashboard is displayed
await dashboardPage.expectDashboardVisible();
});

When('the user navigates to the Transfer Funds page', async ({sidebarPage,transferPage}) => {
    await sidebarPage.goToTransferFunds();
    await transferPage.expectTransferPageVisible();
});

When('the user selects {string} as the source account',
async ({ transferPage }, accountName) => {
if (accountName === 'Alice Ledger') 
    {await transferPage.selectAliceLedger();
} else if (accountName === 'Bob Wallet') 
    {await transferPage.selectBobWallet();
}
});

When('the user selects the recipient account', async ({ page }) => {
await page.getByRole('button', { name: 'Select' }).nth(3).click();
});

When('the user enters {string} as the transfer amount',async ({ page }, amount) => {
    await page.getByPlaceholder('0.00').fill(amount);
});

When(
'the user enters {string} as the transfer reference',
async ({ page }, reference) => {
await page.getByRole('textbox', {name: 'e.g. Invoice INV-2024-'}).fill(reference);
});

When('the user confirms the transfer', async ({ page }) => {
await page.getByRole('button', {name: 'lock Confirm & Transfer'}).click();
});

Then('the transfer request should be submitted successfully', async ({
page
}) => {


await expect(page.getByRole('button', {name: 'lock Confirm & Transfer'})).not.toBeVisible();
});
