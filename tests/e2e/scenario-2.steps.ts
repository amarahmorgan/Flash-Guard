import { createBdd } from 'playwright-bdd';
import { test } from '../../src/fixtures/pages.fixture.js';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd(test);

// Reusable helper
async function startTransfer({ sidebarPage, transferPage }: any) {
  await sidebarPage.goToTransferFunds();
  await transferPage.expectTransferPageVisible();
}

Given('I have logged in', async ({ loginPage, dashboardPage }) => {
  await loginPage.gotoLandingPage();
  await loginPage.goToLoginFromGetStarted();
  await loginPage.expectLoginPageVisible();
  await loginPage.signInWithDefaultUser();
  await dashboardPage.expectDashboardVisible();
});

When('I navigate to the transfer money page', async ({ sidebarPage, transferPage }) => {
  await startTransfer({ sidebarPage, transferPage });
});

When('I select sanctioned recipient', async ({ transferPage }) => {
  await transferPage.selectCharlieFrozen();
});

When('I enter a valid transfer amount', async ({ page }) => {
  await page.getByPlaceholder(/amount|value|transfer amount/i).fill('150');
});

Then('the transaction will not be processed with an error message displayed', async ({ transferPage }) => {
  await transferPage.expectInvalidRecipientMessageVisible();
});
