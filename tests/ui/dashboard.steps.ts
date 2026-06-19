import { createBdd } from 'playwright-bdd';
import { test } from '../../src/fixtures/pages.fixture.js';

const { Then } = createBdd(test);

Then('the dashboard should load successfully', async ({ dashboardPage }) => {
  await dashboardPage.expectDashboardVisible();
});

Then('I should see the financial cards', async ({ dashboardPage }) => {
  await dashboardPage.expectFinancialCardsVisible();
});

Then('I should see recent transactions', async ({ dashboardPage }) => {
  await dashboardPage.expectRecentTransactionsVisible();
});

Then('I should see account information', async ({ dashboardPage }) => {
  await dashboardPage.expectAccountInfoVisible();
});

Then('I should see the recent transactions list', async ({ dashboardPage }) => {
  await dashboardPage.expectRecentTransactionsListVisible();
});

Then('I should see the dashboard balance amounts', async ({ dashboardPage }) => {
  await dashboardPage.expectBalanceAmountsVisible();
});