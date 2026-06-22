import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/mobile.fixture';

const { When, Then } = createBdd(test);

let latestHistoryScreenshot = '';

When('I open the mobile history tab', async ({ navPage, historyPage }) => {
  await navPage.openHistory();
  await historyPage.expectLoaded();
});

Then('the mobile balance and spending summary should be displayed', async ({ historyPage }) => {
  await historyPage.expectLoaded();
  await historyPage.expectCurrentBalanceOrTotalDisplayed();
});

When('I scroll through the mobile transaction history', async ({ historyPage }) => {
  await historyPage.scrollHistory();
});

Then('mobile transaction records should be displayed', async ({ historyPage }) => {
  await historyPage.expectTransactionRecordsDisplayed();
});

When('I filter mobile history by pending status', async ({ historyPage }) => {
  await historyPage.filterPending();
});

Then('the pending mobile history filter should be applied', async ({ historyPage }) => {
  await historyPage.expectFilterApplied('Pending');
});

When('I capture the mobile transaction history screenshot',
  async ({ historyPage }) => {
    latestHistoryScreenshot =
      await historyPage.captureHistoryScreenshot();

    console.log(
      `[MOBILE] History screenshot result: ${latestHistoryScreenshot}`
    );
  }
);

Then('the mobile history screenshot should be saved', async () => {
  expect(latestHistoryScreenshot).toContain('transaction-history');
});

Then('mobile transaction records should still be displayed', async ({ historyPage }) => {
  await historyPage.expectTransactionRecordsDisplayed();
});
