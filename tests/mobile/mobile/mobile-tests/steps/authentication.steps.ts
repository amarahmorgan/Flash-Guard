import path from 'node:path';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/mobile.fixture';

const data = require(path.resolve(__dirname, '../data/mobileData.json'));
const { When, Then } = createBdd(test);

When('I log into the mobile app with valid credentials', async ({ loginPage }) => {
  await loginPage.login(data.validUser.email, data.validUser.password);
});

Then('the mobile dashboard should be displayed', async ({ dashboardPage }) => {
  await dashboardPage.expectLoaded();
  await dashboardPage.expectBalanceDisplayed();
});

When('I log into the mobile app with invalid credentials', async ({ loginPage }) => {
  await loginPage.loginInvalid(data.invalidUser.email, data.invalidUser.password);
});

Then('a mobile authentication error should be displayed', async ({ loginPage }) => {
  await loginPage.expectAuthenticationError();
});

When('I start the camera face check login', async ({ loginPage }) => {
  await loginPage.startCameraFaceCheck();
});

Then('the face check modal should be displayed', async ({ loginPage }) => {
  await loginPage.expectFaceCheckOpened();
  await loginPage.cancelFaceCheckIfOpen();
});

When('I background and reopen the mobile app', async ({ loginPage }) => {
  await loginPage.backgroundAndReopen();
});

Then('the mobile session should still be usable', async ({ dashboardPage }) => {
  await dashboardPage.expectLoaded();
  await dashboardPage.expectBalanceDisplayed();
});
