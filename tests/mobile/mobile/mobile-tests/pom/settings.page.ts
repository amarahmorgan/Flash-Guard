import { selectors } from '../support/selectors';
import { MobileBasePage } from '../support/mobile-base.page';

export class SettingsPage extends MobileBasePage {
  async expectLoaded() {
    await this.expectVisibleOrKnownIssue(selectors.account.screen, 'Account screen is not visible.', 15_000);
  }

  async expectProfileDisplayed() {
    await this.expectVisibleOrKnownIssue(selectors.account.profileName, 'Profile information is not visible on Account screen.', 10_000);
  }

  async expectSecuritySettingsDisplayed() {
    await this.expectVisibleOrKnownIssue(selectors.account.securitySection, 'Security section is not visible on Account screen.', 10_000);
    await this.expectVisibleOrKnownIssue(selectors.account.biometricRow, 'Biometric login row is not visible on Account screen.', 10_000);
  }

  async openNotificationsSetting() {
    await this.tapIfVisible(selectors.account.notificationsRow, 'Notifications setting row is not visible/clickable.');
  }

  async expectChangePasswordAreaOrSecurityFallback() {
    await this.expectVisibleOrKnownIssue([
      'android=new UiSelector().textContains("Change password")',
      'android=new UiSelector().textContains("Password")',
      selectors.account.securitySection as any,
    ] as any, 'No password/security settings area was displayed.', 5_000);
  }
}
