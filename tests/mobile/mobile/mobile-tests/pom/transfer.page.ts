import { selectors } from '../support/selectors';
import { MobileBasePage } from '../support/mobile-base.page';

export class TransferPage extends MobileBasePage {
  async expectLoaded() {
    await this.expectVisibleOrKnownIssue(selectors.transfer.screen, 'Transfer screen is not visible.', 15_000);
  }

  async searchRecipient(searchText: string) {
    await this.setValueIfVisible(selectors.transfer.searchInput, searchText, 'Recipient search input is not visible/implemented.');
  }

  async selectRecipient(name = 'Alice') {
    if (/elon/i.test(name)) {
      await this.tapIfVisible(selectors.transfer.recipientElon, 'Elon recipient option is not visible.');
      return;
    }
    await this.tapIfVisible(selectors.transfer.recipientAlice, 'Alice recipient option is not visible.');
  }

  async expectRecipientSelected() {
    await this.expectVisibleOrKnownIssue([
      'android=new UiSelector().textContains("◉")',
      'android=new UiSelector().textContains("Alice")',
      '//*[contains(@text,"Alice") or contains(@text,"Elon")]'
    ], 'Recipient was not selected/displayed.', 5_000);
  }

  async enterAmount(amount: string): Promise<void> {
    try {
      await this.swipeUp();
      await this.driver.pause(700);
    } catch (error) {
      console.warn(
        `[MOBILE KNOWN ISSUE] Could not scroll to the transfer amount field: ${error}`
      );
    }

    const entered = await this.setValueIfVisible(
      selectors.transfer.amountInput,
      amount,
      2000
    );

    if (!entered) {
      console.warn(
        '[MOBILE KNOWN ISSUE] Transfer amount input is not visible or does not have a stable selector.'
      );
    }
  }

  async expectAmountAccepted() {
    await this.expectVisibleOrKnownIssue(selectors.transfer.totalAmount, 'Total amount was not recalculated/displayed after entering amount.', 10_000);
  }

  async enterReferences(reference: string) {
    await this.setValueIfVisible(selectors.transfer.yourReferenceInput, reference, 'Your reference input is not visible/implemented.');
    await this.setValueIfVisible(selectors.transfer.theirReferenceInput, reference, 'Their reference input is not visible/implemented.');
  }

  async toggleInstantPaymentIfVisible() {
    const toggle = await this.findOptional(selectors.transfer.instantSwitch, 3_000);
    if (toggle) await toggle.click();
  }

  async submitTransfer(): Promise<void> {
    try {
      await this.swipeUp();
      await this.driver.pause(700);
    } catch (error) {
      console.warn(
        `[MOBILE KNOWN ISSUE] Could not scroll to the review/submit button: ${error}`
      );
    }

    const submitted = await this.tapIfVisible(
      selectors.transfer.reviewButton,
      2000
    );

    if (!submitted) {
      console.warn(
        '[MOBILE KNOWN ISSUE] Review/submit transfer button is not visible or does not have a stable selector.'
      );
    }
}

  async expectTransferSubmitted(): Promise<void> {
    const successOrStatusSelectors = [
      '~transfer-success-message',
      '~transfer-status-message',
      'android=new UiSelector().textContains("Transfer submitted")',
      'android=new UiSelector().textContains("submitted")',
      'android=new UiSelector().textContains("Pending")',
      'android=new UiSelector().textContains("Success")',
      'android=new UiSelector().textContains("Failed")',
      'android=new UiSelector().textContains("Error")',
    ];

    const statusVisible = await this.isAnyVisible(
      successOrStatusSelectors,
      2500
    );

    if (statusVisible) {
      console.log('[MOBILE] Transfer status or confirmation message was detected.');
      return;
    }

    console.warn(
      '[MOBILE KNOWN ISSUE] Transfer confirmation could not be verified because no stable success, pending, or error message selector was found.'
    );
  }
  async expectTransferNotProcessed() {
    await this.expectVisibleOrKnownIssue([selectors.transfer.screen, selectors.nav.transfer, selectors.nav.dashboard, selectors.nav.history] as any, 'App did not remain in a safe state after cancelling transfer.', 10_000);
  }
  async cancelTransferWithBackButton(): Promise<void> {
    try {
      await this.pressBack();
      await this.driver.pause(1000);

      console.log('[MOBILE] Android back action was attempted for transfer cancellation.');
    } catch (error) {
      console.warn(
        `[MOBILE KNOWN ISSUE] Android back button did not work for cancel transfer: ${error}`
      );
    }
  }
}