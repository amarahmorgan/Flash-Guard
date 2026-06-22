import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/mobile.fixture';

const { When, Then } = createBdd(test);

When('I open the mobile dashboard tab', async ({ navPage }) => {
  await navPage.openDashboard();
});

Then('the mobile dashboard balance should be displayed', async ({ dashboardPage }) => {
  await dashboardPage.expectLoaded();
  await dashboardPage.expectBalanceDisplayed();
});

When('I scroll through the dashboard transactions', async ({ dashboardPage }) => {
  await dashboardPage.expectLoaded();
  await dashboardPage.expectRecentTransactionsVisible();
});

Then('recent mobile transactions should be visible', async ({ dashboardPage }) => {
  await dashboardPage.expectRecentTransactionsVisible();
});

When('I refresh the mobile balance', async ({ dashboardPage }) => {
  await dashboardPage.refreshBalance();
});

Then('the mobile dashboard balance should still be displayed', async ({ dashboardPage }) => {
  await dashboardPage.expectBalanceDisplayed();
});
