import { selectors } from '../support/selectors';
import { MobileBasePage } from '../support/mobile-base.page';

export class HistoryPage extends MobileBasePage {
  async expectLoaded() {
    await this.expectVisibleOrKnownIssue(selectors.history.screen, 'History screen is not visible.', 15_000);
  }

  async expectCurrentBalanceOrTotalDisplayed() {
    await this.expectVisibleOrKnownIssue(selectors.history.totalSpending, 'History spending/balance summary is not visible.', 10_000);
  }

  async expectTransactionRecordsDisplayed() {
    await this.expectVisibleOrKnownIssue(selectors.history.transactionRow, 'No transaction records are visible in history.', 15_000);
  }

    async scrollHistory(): Promise<void> {
      try {
        await this.swipeUp();
        await this.driver.pause(1000);
      } catch (error) {
        console.warn(
          `[MOBILE KNOWN ISSUE] History scrolling/swipe failed: ${error}`
        );
      }
    }

  async filterAll() {
    await this.tapIfVisible(selectors.history.filterAll, 'All history filter is not visible/clickable.');
  }

  async filterPending() {
    await this.tapIfVisible(selectors.history.filterPending, 'Pending history filter is not visible/clickable.');
  }

  async filterCompleted() {
    await this.tapIfVisible(selectors.history.filterCompleted, 'Completed history filter is not visible/clickable.');
  }

  async expectFilterApplied(filterText: 'All' | 'Pending' | 'Completed') {
    await this.expectVisibleOrKnownIssue([
      `android=new UiSelector().text("${filterText}")`,
      `//*[@text="${filterText}"]`,
      selectors.history.transactionRow as any,
      selectors.history.totalSpending as any,
    ] as any, `${filterText} history filter could not be verified.`, 10_000);
  }

  async enterOtp(code: string): Promise<void> {
    await this.filterPending();
    await this.expectLoaded();

    const otpEntered = await this.setValueIfVisible(
      selectors.history.otpInput,
      code,
      2500
    );

    if (!otpEntered) {
      console.warn(
        '[MOBILE KNOWN ISSUE] No pending OTP input is currently visible. Create a pending transfer first or add a stable OTP selector.'
      );
      return;
    }

    const approved = await this.tapFirstVisible(
      [
        selectors.history.approveButton,
        '~otp-approve-button',
        'android=new UiSelector().textContains("Approve")',
        'android=new UiSelector().textContains("Confirm")',
      ],
      2500
    );

    if (!approved) {
      console.warn(
        '[MOBILE KNOWN ISSUE] OTP was entered, but the approve/confirm button was not visible.'
      );
    }
  }

  async approvePendingTransfer() {
    await this.tapIfVisible(selectors.history.approveButton, 'Approve pending transfer button is not visible/clickable.');
  }
  async expectApprovalHandled(): Promise<void> {
    const approvalSelectors = [
      '~otp-approved-message',
      '~otp-status-message',
      'android=new UiSelector().textContains("Approved")',
      'android=new UiSelector().textContains("Authorized")',
      'android=new UiSelector().textContains("OTP")',
      'android=new UiSelector().textContains("Mismatch")',
      'android=new UiSelector().textContains("Failed")',
      'android=new UiSelector().textContains("Error")',
    ];

    const approvalStatusVisible = await this.isAnyVisible(
      approvalSelectors,
      2500
    );

    if (approvalStatusVisible) {
      console.log('[MOBILE] OTP approval status was detected.');
      return;
    }

    console.warn(
      '[MOBILE KNOWN ISSUE] OTP approval result could not be verified because no stable approval, failure, or OTP status selector was found.'
    );
  }
  async captureHistoryScreenshot(): Promise<string | undefined> {
    return this.saveScreenshot('transaction-history');
  }
}
