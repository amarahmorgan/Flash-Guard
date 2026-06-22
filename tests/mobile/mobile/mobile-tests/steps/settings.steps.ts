import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/mobile.fixture';

const { When, Then } = createBdd(test);

When('I open the mobile account tab', async ({ navPage, settingsPage }) => {
  await navPage.openAccount();
  await settingsPage.expectLoaded();
});

Then('the mobile profile information should be displayed', async ({ settingsPage }) => {
  await settingsPage.expectProfileDisplayed();
});

Then('the mobile security settings should be displayed', async ({ settingsPage }) => {
  await settingsPage.expectSecuritySettingsDisplayed();
  await settingsPage.expectChangePasswordAreaOrSecurityFallback();
});
