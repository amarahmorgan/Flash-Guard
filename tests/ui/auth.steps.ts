import { createBdd } from 'playwright-bdd';
import { test } from '../../src/fixtures/pages.fixture.js';

const { Given, When, Then } = createBdd(test);

Given('I am on the landing page', async ({ loginPage }) => {
  await loginPage.gotoLandingPage();
});

When('I click Get Started', async ({ loginPage }) => {
  await loginPage.goToLoginFromGetStarted();
});


Given('I am on the login page', async ({ loginPage }) => {
  await loginPage.gotoLandingPage();
  await loginPage.goToLoginFromGetStarted();
  await loginPage.expectLoginPageVisible();
});

When('I sign in with the default user', async ({ loginPage }) => {
  await loginPage.clickSignIn();
});

Then('I should see the dashboard', async ({ dashboardPage }) => {
  await dashboardPage.expectDashboardVisible();
});

When(
  'I login with email {string} and password {string}',
  async ({ loginPage }, email: string, password: string) => {
    await loginPage.loginUnsuccessfully(email, password);
  }
);

Then('I should remain on the login page', async ({ loginPage }) => {
  await loginPage.expectLoginPageVisible();
});

Given('I am logged in', async ({ loginPage, dashboardPage }) => {
  await loginPage.gotoLandingPage();
  await loginPage.goToLoginFromGetStarted();
  await loginPage.signInWithDefaultUser();
  await dashboardPage.expectDashboardVisible();
});

When('I sign out', async ({ sidebarPage }) => {
  await sidebarPage.signOut();
});

Then('I should see the login page', async ({ loginPage }) => {
  await loginPage.expectLoginPageVisible();
});