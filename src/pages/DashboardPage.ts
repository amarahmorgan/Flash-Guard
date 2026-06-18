import { expect, type Page } from '@playwright/test';

export class DashboardPage {
  constructor(private readonly page: Page) {}

  // Dashboard Header
  private portfolioOverviewHeading = () =>
    this.page.getByRole('heading', { name: 'Portfolio Overview' });

  // Financial Cards
  private totalNetWorthCard = () =>
    this.page.getByText('TOTAL NET WORTH');

  private aliceLedgerCard = () =>
    this.page.getByText('Alice Ledger');

  private bobWalletCard = () =>
    this.page.getByText('Bob Wallet');

  // Dashboard Actions
  private buyAirtimeCard = () =>
    this.page.getByText('Buy Airtime');

  private sendMoneyCard = () =>
    this.page.getByText('Send Money');

  private payBillsCard = () =>
    this.page.getByText('Pay Bills');

  // Transactions
  private recentTransactionsSection = () =>
    this.page.getByRole('heading', {
      name: 'Recent Transactions'
    });

  private viewAllTransactionsLink = () =>
    this.page.getByText('View All');

  // Assertions

  async expectDashboardVisible(): Promise<void> {
    await expect(
      this.portfolioOverviewHeading()
    ).toBeVisible();
  }

  async expectAccountInfoVisible(): Promise<void> {
  await expect(this.aliceLedgerCard()).toBeVisible();
  await expect(this.bobWalletCard()).toBeVisible();
}

  async expectFinancialCardsVisible(): Promise<void> {
    await expect(
      this.totalNetWorthCard()
    ).toBeVisible();

    await expect(
      this.aliceLedgerCard()
    ).toBeVisible();

    await expect(
      this.bobWalletCard()
    ).toBeVisible();
  }

  async expectQuickActionsVisible(): Promise<void> {
    await expect(
      this.buyAirtimeCard()
    ).toBeVisible();

    await expect(
      this.sendMoneyCard()
    ).toBeVisible();

    await expect(
      this.payBillsCard()
    ).toBeVisible();
  }

  async expectRecentTransactionsVisible(): Promise<void> {
    await expect(
      this.recentTransactionsSection()
    ).toBeVisible();
  }
}