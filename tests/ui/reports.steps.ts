import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../src/fixtures/pages.fixture.js';

const { When, Then } = createBdd(test);

When('I navigate to transaction history', async ({ sidebarPage }) => {
  await sidebarPage.goToTransactionHistory();
});

Then('I should see the reports page', async ({ reportsPage }) => {
  await reportsPage.expectReportsPageVisible();
});

Then('I should be able to export CSV', async ({ reportsPage }) => {
  await reportsPage.expectExportCsvVisible();
});

Then('I should be able to export PDF', async ({ page, reportsPage }) => {
  const popupPromise = page.waitForEvent('popup');

  await reportsPage.exportPdf();

  const popup = await popupPromise;

  await expect(
    popup.getByRole('heading', {
      name: /FlashGuard - Transaction Report/i
    })
  ).toBeVisible();
  
   await popup.close();
});

When('I enter a date range', async ({ reportsPage }) => {
  await reportsPage.enterDateRange('2026-06-01', '2026-06-18');
});

When('I select a transaction status', async ({ reportsPage }) => {
  await reportsPage.selectStatus('Pending');
});

When('I apply the report filters', async ({ reportsPage }) => {
  await reportsPage.applyFilters();
});

Then('I should see the transaction table', async ({ reportsPage }) => {
  await reportsPage.expectTransactionTableVisible();
  await reportsPage.expectTransactionsPresent();
});