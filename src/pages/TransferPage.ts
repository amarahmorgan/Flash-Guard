import { expect, type Page } from '@playwright/test';

export class TransferPage {
  constructor(private readonly page: Page) {}

  // Navigation
  private transferFundsNav = () =>
    this.page.getByRole('link', { name: /transfer funds/i });

  // Recipient section
  private bobWalletRecipient = () =>
    this.page.getByText('Bob Wallet').first();

  private aliceLedgerRecipient = () =>
    this.page.getByText('Alice Ledger').first();

  private charlieFrozenRecipient = () =>
  this.page.getByText('Charlie Frozen').first();

  private mobileServicesRecipient = () =>
    this.page.getByText('FlashGuard Mobile Services').first();

  private selectedBadge = () =>
    this.page.getByText('Selected');

  // Transfer details
  private transferDetailsHeading = () =>
    this.page.getByRole('heading', { name: 'Transfer Details' });

  private referenceInput = () =>
    this.page.getByPlaceholder('e.g. Invoice INV-2024-001');

  private todayButton = () =>
    this.page.getByRole('button', { name: /today/i });

  private confirmTransferButton = () =>
    this.page.getByRole('button', { name: /confirm & transfer/i });

  private requiredFieldsMessage = () =>
    this.page.getByText('Please complete all required fields.');

  // Error / toast messages
  private invalidRecipientMessage = () =>
  this.page.getByText('Sender/recipient not valid');

  // Actions
  async goToTransferFunds(): Promise<void> {
    await this.transferFundsNav().click();
  }

  async selectBobWallet(): Promise<void> {
    await this.bobWalletRecipient().click();
  }

  async selectAliceLedger(): Promise<void> {
    await this.aliceLedgerRecipient().click();
  }

  async selectCharlieFrozen(): Promise<void> {
  await this.charlieFrozenRecipient().click();
}

  async selectMobileServices(): Promise<void> {
    await this.mobileServicesRecipient().click();
  }

  async enterReference(reference: string): Promise<void> {
    await this.referenceInput().fill(reference);
  }

  // Assertions
  async expectTransferPageVisible(): Promise<void> {
    await expect(this.transferDetailsHeading()).toBeVisible();
    await expect(this.bobWalletRecipient()).toBeVisible();
    await expect(this.confirmTransferButton()).toBeVisible();
  }

  async expectBobWalletSelected(): Promise<void> {
    await expect(this.bobWalletRecipient()).toBeVisible();
    await expect(this.selectedBadge()).toBeVisible();
  }

  async expectRequiredFieldsMessageVisible(): Promise<void> {
    await expect(this.requiredFieldsMessage()).toBeVisible();
  }

  async expectConfirmTransferDisabled(): Promise<void> {
    await expect(this.confirmTransferButton()).toBeDisabled();
  }

  async expectTodaySelected(): Promise<void> {
    await expect(this.todayButton()).toBeVisible();
  }

  async expectInvalidRecipientMessageVisible(): Promise<void> {
  await expect(this.invalidRecipientMessage()).toBeVisible();
}
}

