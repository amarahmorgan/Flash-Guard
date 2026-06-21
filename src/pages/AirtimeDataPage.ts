import { expect, type Page } from '@playwright/test';

export class AirtimeDataPage {
  constructor(private readonly page: Page) {}

  private pageHeading = () =>
    this.page.getByRole('heading', { name: 'Airtime & Data' });

 private vodacomButton = () =>
  this.page.getByRole('button', { name: /vodacom/i });

private mtnButton = () =>
  this.page.getByRole('button', { name: /mtn/i });

private cellCButton = () =>
  this.page.getByRole('button', { name: /cell c/i });

private telkomButton = () =>
  this.page.getByRole('button', { name: /telkom/i });

  private mobileNumberInput = () =>
    this.page.getByPlaceholder('00 000 0000');

  private airtimeTab = () =>
    this.page.getByText('Airtime');

  private dataBundlesTab = () =>
    this.page.getByText('Data Bundles');

  private smsBundlesTab = () =>
    this.page.getByText('SMS Bundles');

  private availableBalanceCard = () =>
    this.page.getByText('AVAILABLE BALANCE');

  private recentRechargesSection = () =>
    this.page.getByText('Recent Recharges');

  async expectAirtimeDataPageVisible(): Promise<void> {
    await expect(this.pageHeading()).toBeVisible();
    await expect(this.availableBalanceCard()).toBeVisible();
    await expect(this.recentRechargesSection()).toBeVisible();
  }

  async selectNetwork(
  network: 'Vodacom' | 'MTN' | 'Cell C' | 'Telkom'
): Promise<void> {

  switch (network) {
    case 'Vodacom':
      await this.vodacomButton().click();
      break;

    case 'MTN':
      await this.mtnButton().click();
      break;

    case 'Cell C':
      await this.cellCButton().click();
      break;

    case 'Telkom':
      await this.telkomButton().click();
      break;
  }
}
  async enterMobileNumber(number: string): Promise<void> {
    await this.mobileNumberInput().fill(number);
  }

  async selectAirtimeTab(): Promise<void> {
    await this.airtimeTab().click();
  }

  async selectDataBundlesTab(): Promise<void> {
    await this.dataBundlesTab().click();
  }

  async selectSmsBundlesTab(): Promise<void> {
    await this.smsBundlesTab().click();
  }

  async selectRechargeAmount(amount: string): Promise<void> {
    await this.page.getByRole('button', { name: amount }).click();
  }
}