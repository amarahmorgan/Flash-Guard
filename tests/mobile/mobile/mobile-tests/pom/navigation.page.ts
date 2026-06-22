import { selectors } from '../support/selectors';
import { MobileBasePage } from '../support/mobile-base.page';

export class NavigationPage extends MobileBasePage {
  async openDashboard() {
    await this.tapFirstVisible([
      '~nav-dashboard',
      '~bottom-tab-dashboard',
      'android=new UiSelector().text("Dashboard")'
    ]);
  }

  async openServices() {
    await this.tapFirstVisible([
      '~nav-services',
      '~bottom-tab-services',
      'android=new UiSelector().text("Services")'
    ]);
  }

  async openTransfer() {
    await this.tapFirstVisible([
      '~nav-transfer',
      '~bottom-tab-transact',
      'android=new UiSelector().text("Transact")',
      'android=new UiSelector().text("Transfer")'
    ]);
  }

  async openHistory() {
    await this.tapFirstVisible([
      '~nav-history',
      '~bottom-tab-history',
      'android=new UiSelector().text("History")'
    ]);
  }

  async openAccount() {
    await this.tapFirstVisible([
      '~nav-account',
      '~bottom-tab-account',
      'android=new UiSelector().text("Account")'
    ]);
  }
}