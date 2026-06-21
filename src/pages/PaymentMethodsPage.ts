import { expect, type Page } from '@playwright/test';

export class PaymentMethodsPage {
  constructor(private readonly page: Page) {}

  private pageHeading = () =>
    this.page.getByRole('heading', { name: 'Payment Methods' });

  private addPaymentMethodButton = () =>
    this.page.getByRole('button', { name: /add payment method/i });

  private addNewPaymentMethodHeading = () =>
    this.page.getByText('ADD NEW PAYMENT METHOD');

  private cardNumberInput = () =>
    this.page.getByPlaceholder('Card Number (16 digits)');

  private nicknameInput = () =>
    this.page.getByPlaceholder('Nickname (e.g., My Visa)');

  private expiryDateInput = () =>
    this.page.getByPlaceholder('Expiry Date (MM/YY)');

  private cvvInput = () =>
    this.page.getByPlaceholder('CVV');

  private addCardButton = () =>
    this.page.getByRole('button', { name: 'Add Card' });

  private cancelButton = () =>
    this.page.getByRole('button', { name: 'Cancel' });

  private emptyStateMessage = () =>
    this.page.getByText('No payment methods added yet');

   private successToast = () =>
    this.page.getByRole('status');

  async expectPaymentMethodsPageVisible(): Promise<void> {
    await expect(this.pageHeading()).toBeVisible();
    await expect(this.addPaymentMethodButton()).toBeVisible();
    await expect(this.emptyStateMessage()).toBeVisible();
  }

  async openAddPaymentMethodForm(): Promise<void> {
    await this.addPaymentMethodButton().click();
  }

  async expectAddPaymentMethodFormVisible(): Promise<void> {
    await expect(this.addNewPaymentMethodHeading()).toBeVisible();
    await expect(this.cardNumberInput()).toBeVisible();
    await expect(this.nicknameInput()).toBeVisible();
    await expect(this.expiryDateInput()).toBeVisible();
    await expect(this.cvvInput()).toBeVisible();
    await expect(this.addCardButton()).toBeVisible();
  }

  async addPaymentMethod(
    cardNumber: string,
    nickname: string,
    expiryDate: string,
    cvv: string
  ): Promise<void> {
    await this.cardNumberInput().fill(cardNumber);
    await this.nicknameInput().fill(nickname);
    await this.expiryDateInput().fill(expiryDate);
    await this.cvvInput().fill(cvv);
    await this.addCardButton().click();
  }

   async expectPaymentMethodAddedSuccessfully(): Promise<void> {
    await expect(this.successToast()).toContainText(
      'Payment method added successfully'
    );
  }

  async cancelAddPaymentMethod(): Promise<void> {
    await this.cancelButton().click();
  }
}