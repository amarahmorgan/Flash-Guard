import { test as base } from 'playwright-bdd';
import { expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { TransferPage } from '../pages/TransferPage.js';
import { SidebarPage } from '../pages/sidebarPage.js';
import { ReportsPage } from '../pages/ReportPage.js';
import { PaymentMethodsPage } from '../pages/PaymentMethodsPage.js';
import { AirtimeDataPage } from '../pages/AirtimeDataPage.js';

type Pages = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  transferPage: TransferPage;
   sidebarPage: SidebarPage;
   reportsPage: ReportsPage;
   paymentMethodsPage: PaymentMethodsPage;
   airtimeDataPage: AirtimeDataPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  transferPage: async ({ page }, use) => {
    await use(new TransferPage(page));
  },

  sidebarPage: async ({ page }, use) => {
  await use(new SidebarPage(page));
},
reportsPage: async ({ page }, use) => {
  await use(new ReportsPage(page));
},
paymentMethodsPage: async ({ page }, use) => {
  await use(new PaymentMethodsPage(page));
},
airtimeDataPage: async ({ page }, use) => {
  await use(new AirtimeDataPage(page));
},
});

export { expect } ;