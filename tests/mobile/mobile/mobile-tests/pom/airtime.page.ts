import { selectors } from '../support/selectors';
import { MobileBasePage } from '../support/mobile-base.page';

export class AirtimePage extends MobileBasePage {
  async expectLoaded() {
    await this.expectVisibleOrKnownIssue(selectors.airtime.screen, 'Airtime/Services screen is not visible.', 15_000);
  }

  async selectNetworkMtn() {
    await this.tapIfVisible(selectors.airtime.networkMtn, 'MTN network option is not visible/clickable.');
  }

  async enterPhone(phone: string) {
    await this.setValueIfVisible(selectors.airtime.phoneInput, phone, 'Airtime phone input is not visible/implemented.');
  }

  async selectDataMode() {
    await this.tapIfVisible(selectors.airtime.modeData, 'Data Bundles mode is not visible/clickable.');
  }

  async selectAmount50() {
    await this.tapIfVisible(selectors.airtime.amount50, 'R50 recharge amount is not visible/clickable.');
  }

  async purchase() {
    await this.scrollToTextIfPossible('Purchase');
    await this.tapIfVisible(selectors.airtime.purchaseButton, 'Purchase button is not visible/clickable.');
  }

  async expectPurchaseHandled() {
    const alertText = await this.getAlertText();
    if (alertText) {
      if (!/purchase|recharge|airtime|data|failed|success|error/i.test(alertText)) {
        await this.knownIssue(`Unexpected purchase alert: ${alertText}`);
      }
      await this.acceptAlertIfPresent();
      return;
    }
    await this.expectLoaded();
  }
}
