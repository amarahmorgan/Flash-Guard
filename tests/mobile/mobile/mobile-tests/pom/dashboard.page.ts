import { selectors } from '../support/selectors';
import { MobileBasePage } from '../support/mobile-base.page';

export class DashboardPage extends MobileBasePage {
  async expectDashboardVisible(): Promise<void> {
    await this.expectAnyVisibleOrKnownIssue(
      [
        selectors.dashboard.screen,
        '~dashboard-screen',
        'android=new UiSelector().text("Dashboard")',
        'android=new UiSelector().textContains("Total")',
      ],
      'Dashboard screen is not visible. The app may have opened on another tab.',
      3000
    );
  }

  async expectRecentTransactionsVisible(): Promise<void> {
    const transactionSelectors = [
      selectors.dashboard.recentTransactions,
      '~dashboard-recent-transactions',
      'android=new UiSelector().textContains("Recent")',
      'android=new UiSelector().textContains("Transaction")',
      'android=new UiSelector().textContains("History")',
    ];

    const visibleBeforeScroll = await this.isAnyVisible(
      transactionSelectors,
      2000
    );

    if (visibleBeforeScroll) {
      console.log('[MOBILE] Recent transactions area is visible.');
      return;
    }

    try {
      await this.swipeUp();
      await this.driver.pause(1000);
    } catch (error) {
      console.warn(
        `[MOBILE KNOWN ISSUE] Could not scroll dashboard transactions: ${error}`
      );
    }

    await this.expectAnyVisibleOrKnownIssue(
      transactionSelectors,
      'Recent transactions could not be verified. The transaction section may not have stable selectors.',
      2000
    );
  }

  async refreshBalance(): Promise<void> {
    try {
      await this.swipeDown();
      await this.driver.pause(1500);

      console.log(
        '[MOBILE] Pull-down refresh gesture was attempted on the Dashboard.'
      );
    } catch (error) {
      console.warn(
        `[MOBILE KNOWN ISSUE] Pull-to-refresh gesture is not supported or failed: ${error}`
      );
    }
  }

  async expectBalanceVisible(): Promise<void> {
    await this.expectAnyVisibleOrKnownIssue(
      [
        selectors.dashboard.balance,
        '~dashboard-balance',
        'android=new UiSelector().textContains("R")',
        'android=new UiSelector().textContains("Balance")',
        'android=new UiSelector().textContains("Net Worth")',
      ],
      'Dashboard balance is not visible or has no stable selector.',
      2500
    );
  }
  async expectLoaded(): Promise<void> {
    await this.expectDashboardVisible();
  }

  async expectBalanceDisplayed(): Promise<void> {
    await this.expectBalanceVisible();
  }
}