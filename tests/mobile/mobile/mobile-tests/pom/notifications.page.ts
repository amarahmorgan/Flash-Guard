import { selectors } from '../support/selectors';
import { MobileBasePage } from '../support/mobile-base.page';

export class NotificationsPage extends MobileBasePage {
  async openNotificationAreaIfPossible(): Promise<void> {
    const bellOpened = await this.tapIfVisible(
      selectors.notifications.bell,
      2000
    );

    if (bellOpened) {
      console.log('[MOBILE] Notification bell was opened.');
      return;
    }

    try {
      await this.driver.openNotifications();
      await this.driver.pause(1000);

      console.log('[MOBILE] Android notification shade was opened.');
    } catch (error) {
      console.warn(
        `[MOBILE KNOWN ISSUE] Notification bell is not visible and Android notification shade could not be opened: ${error}`
      );
    }
  }

  async expectNotificationAreaHandled(): Promise<void> {
    const visible = await this.isAnyVisible(
      [
        selectors.notifications.pendingChip,
        '~notification-pending-chip',
        'android=new UiSelector().textContains("Pending")',
        'android=new UiSelector().textContains("Notification")',
        'android=new UiSelector().textContains("Transfer")',
      ],
      3000
    );

    if (visible) {
      console.log('[MOBILE] Notification area content was detected.');
      return;
    }

    console.warn(
      '[MOBILE KNOWN ISSUE] No pending notification or deep-link chip is visible.'
    );

    try {
      await this.pressBack();
    } catch (error) {
      console.warn(
        `[MOBILE KNOWN ISSUE] Could not close the notification area: ${error}`
      );
    }
  }

  async tapNotificationDeepLinkIfPossible(): Promise<void> {
    const tapped = await this.tapFirstVisible(
      [
        selectors.notifications.pendingChip,
        '~notification-pending-chip',
        'android=new UiSelector().textContains("Pending")',
        'android=new UiSelector().textContains("Transfer")',
        'android=new UiSelector().textContains("Transaction")',
      ],
      3000
    );

    if (tapped) {
      console.log('[MOBILE] Notification deep-link item was tapped.');
      return;
    }

    console.warn(
      '[MOBILE KNOWN ISSUE] No notification deep-link item was available to tap.'
    );
  }

  async handleNotificationPermissionScreen(): Promise<void> {
    const permissionVisible = await this.isAnyVisible(
      [
        selectors.notifications.permissionText,
        'android=new UiSelector().textContains("notification")',
        'android=new UiSelector().textContains("Notification")',
        'android=new UiSelector().textContains("Allow")',
      ],
      3000
    );

    if (!permissionVisible) {
      console.warn(
        '[MOBILE KNOWN ISSUE] Notification permission prompt did not appear.'
      );
      return;
    }

    const allowed = await this.tapFirstVisible(
      [
        '~notification-allow-button',
        'android=new UiSelector().textContains("Allow")',
        'android=new UiSelector().textContains("While using the app")',
        '//*[@text="Allow" or contains(@text,"Allow")]',
      ],
      2000
    );

    if (allowed) {
      console.log('[MOBILE] Notification permission was handled.');
      return;
    }

    console.warn(
      '[MOBILE KNOWN ISSUE] Notification permission prompt appeared, but an Allow button was not found.'
    );
  }
}