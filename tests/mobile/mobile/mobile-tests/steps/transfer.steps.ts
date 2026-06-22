import path from 'node:path';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/mobile.fixture';

const data = require(path.resolve(__dirname, '../data/mobileData.json'));
const { Given, When, Then } = createBdd(test);

When('I open the mobile transfer tab', async ({ navPage, transferPage }) => {
  await navPage.openTransfer();
  await transferPage.expectLoaded();
});

When('I select a mobile transfer recipient', async ({ transferPage }) => {
  await transferPage.searchRecipient(data.transfer.recipientSearch);
  await transferPage.selectRecipient(data.transfer.recipientName);
});

Then('the mobile transfer recipient should be selected', async ({ transferPage }) => {
  await transferPage.expectRecipientSelected();
});

When('I enter a valid mobile transfer amount', async ({ transferPage }) => {
  await transferPage.enterAmount(data.transfer.amount);
});

Then('the mobile transfer amount should be accepted', async ({ transferPage }) => {
  await transferPage.expectAmountAccepted();
});

When('I complete valid mobile transfer details', async ({ transferPage }) => {
  await transferPage.searchRecipient(data.transfer.recipientSearch);
  await transferPage.selectRecipient(data.transfer.recipientName);
  await transferPage.enterAmount(data.transfer.amount);
});

When('I submit the mobile transfer', async ({ transferPage }) => {
  await transferPage.submitTransfer();
});

Then('a mobile transfer success message should be displayed', async ({ transferPage }) => {
  await transferPage.expectTransferSubmitted();
});

Given('I have a pending mobile transfer', async ({ navPage, transferPage, historyPage }) => {
  await navPage.openTransfer();
  await transferPage.searchRecipient(data.transfer.recipientSearch);
  await transferPage.selectRecipient(data.transfer.recipientName);
  await transferPage.enterAmount(data.transfer.amount);
  await transferPage.submitTransfer();
  await transferPage.expectTransferSubmitted();
  await navPage.openHistory();
  await historyPage.filterPending();
});

When('I enter the mobile OTP confirmation code', async ({ historyPage }) => {
  await historyPage.enterOtp(data.transfer.otp);
  await historyPage.approvePendingTransfer();
});

Then('the mobile transfer approval should be handled', async ({ historyPage }) => {
  await historyPage.expectApprovalHandled();
});

When('I cancel the mobile transfer', async ({ transferPage }) => {
  await transferPage.cancelTransferWithBackButton();
});

Then('the mobile transfer should not be processed', async ({ transferPage }) => {
  await transferPage.expectTransferNotProcessed();
});
