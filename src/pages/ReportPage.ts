import { expect, type Page } from '@playwright/test';

export class ReportsPage {
  constructor(private readonly page: Page) {}

  private pageHeading = () =>
    this.page.getByRole('heading', { name: /ledger & reporting/i });

  private exportCsvButton = () =>
    this.page.getByRole('button', { name: /export csv/i });

  private exportPdfButton = () =>
    this.page.getByRole('button', { name: /export pdf/i });

  private advancedFiltersHeading = () =>
    this.page.getByText('ADVANCED FILTERS');

  private transactionCategoryDropdown = () =>
    this.page.getByLabel('Transaction Category');

private statusDropdown = () =>
  this.page.locator('select').nth(1);

  private minAmountInput = () =>
    this.page.getByPlaceholder('Min');

  private maxAmountInput = () =>
    this.page.getByPlaceholder('Max');

  private transactionTable = () =>
  this.page.locator('table');

private applyFiltersButton = () =>
  this.page.getByRole('button', { name: /apply filters/i });

private clearFiltersButton = () =>
  this.page.getByRole('button', { name: /clear filters/i });

private firstTransactionRow = () =>
  this.page.locator('tbody tr').first();

private nextPageButton = () =>
  this.page.getByRole('button', { name: '>' });

private pageOneButton = () =>
  this.page.getByRole('button', { name: '1' });


  async expectReportsPageVisible(): Promise<void> {
    await expect(this.pageHeading()).toBeVisible();
    await expect(this.advancedFiltersHeading()).toBeVisible();
    await expect(this.exportCsvButton()).toBeVisible();
    await expect(this.exportPdfButton()).toBeVisible();
    
  }


  async expectTransactionTableVisible(): Promise<void> {
  await expect(this.transactionTable()).toBeVisible();
}

async expectTransactionsPresent(): Promise<void> {
  await expect(this.firstTransactionRow()).toBeVisible();
}
async expectExportCsvVisible(): Promise<void> {
  await expect(this.exportCsvButton()).toBeVisible();
}
async expectExportPdfVisible(): Promise<void> {
  await expect(this.exportPdfButton()).toBeVisible();
}

  async exportCsv(): Promise<void> {
    await this.exportCsvButton().click();
  }

  async exportPdf(): Promise<void> {
    await this.exportPdfButton().click();
  }
async enterDateRange(startDate: string, endDate: string): Promise<void> {
  const dateInputs = this.page.locator('input[type="date"]');

  await dateInputs.nth(0).fill(startDate);
  await dateInputs.nth(1).fill(endDate);
}

 async selectStatus(status: string): Promise<void> {
    await this.statusDropdown().selectOption({ label: status });
  }
async applyFilters(): Promise<void> {
  await this.page.getByRole('button', { name: /apply filters/i }).click();
}
  async enterAmountRange(min: string, max: string): Promise<void> {
    await this.minAmountInput().fill(min);
    await this.maxAmountInput().fill(max);
  }

  async selectTransactionCategory(category: string): Promise<void> {
    await this.transactionCategoryDropdown().selectOption({ label: category });
  }


async clearFilters(): Promise<void> {
  await this.clearFiltersButton().click();
}
}