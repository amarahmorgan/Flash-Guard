import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/mobile.fixture';

const { When, Then } = createBdd(test);

When('I open the mobile notification area', async ({ notificationsPage }) => {
  await notificationsPage.openNotificationAreaIfPossible();
});

Then('the mobile notification area should be handled', async ({ notificationsPage }) => {
  await notificationsPage.expectNotificationAreaHandled();
});

When('I open a mobile notification deep link if available', async ({ notificationsPage }) => {
  await notificationsPage.openNotificationAreaIfPossible();
  await notificationsPage.tapNotificationDeepLinkIfPossible();
});

Then('the mobile notification destination should be displayed', async ({ navPage, historyPage }) => {
  await navPage.openHistory();
  await historyPage.expectLoaded();
});

When('I handle the mobile notification permission prompt if it appears', async ({ notificationsPage }) => {
  await notificationsPage.handleNotificationPermissionScreen();
});
