import { expect, type Page } from '@playwright/test';

export class SidebarPage {
  constructor(private readonly page: Page) {}

 private dashboardLink = () =>
  this.page.getByRole('link', { name: /dashboard dashboard/i });

 private transferFundsLink = () =>
  this.page.getByRole('link', { name: /transfer funds/i });

private paymentMethodsLink = () =>
  this.page.getByRole('link', { name: /payment methods/i });

private transactionHistoryLink = () =>
  this.page.getByRole('link', { name: /transaction history/i });
 private airtimeDataLink = () =>
  this.page.getByRole('link', { name: /wifi_tethering airtime & data/i });

  async goToDashboard(): Promise<void> {
    await this.dashboardLink().click();
  }

  async goToTransferFunds(): Promise<void> {
    await this.transferFundsLink().click();
  }

  async goToPaymentMethods(): Promise<void> {
    await this.paymentMethodsLink().click();
  }

  async goToTransactionHistory(): Promise<void> {
    await this.transactionHistoryLink().click();
  }
  async goToAirtimeData(): Promise<void> {
  await this.airtimeDataLink().click();
}

  async expectSidebarVisible(): Promise<void> {
    await expect(this.dashboardLink()).toBeVisible();
    await expect(this.transferFundsLink()).toBeVisible();
  }
}