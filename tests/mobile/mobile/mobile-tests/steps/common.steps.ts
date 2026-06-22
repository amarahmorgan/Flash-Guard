import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import path from 'node:path';
import { test } from '../fixtures/mobile.fixture';

const { Given, When, Then } = createBdd(test);

const data = require(path.resolve(__dirname, '../data/mobileData.json'));

Given('the FlashGuard mobile app is running', async ({ loginPage }) => {
  await loginPage.waitForLoginScreen();
});

Given('the FlashGuard mobile app is on the login screen', async ({ loginPage }) => {
  await loginPage.waitForLoginScreen();
});

Given('I am logged into the mobile app', async ({ loginPage }) => {
  await loginPage.login(data.validUser.email, data.validUser.password);
});

Then('the mobile app should remain usable', async ({ navPage, dashboardPage }) => {
  await navPage.openDashboard();
  await dashboardPage.expectLoaded();
  await dashboardPage.expectBalanceDisplayed();
  expect(true).toBeTruthy();
});
