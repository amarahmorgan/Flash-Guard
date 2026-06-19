import { createBdd } from 'playwright-bdd';
import { test } from '../../src/fixtures/pages.fixture.js';

const { Given, When, Then } = createBdd(test);


When('I am navigate to payment method page', async ({ sidebarPage }) => {
  await sidebarPage.goToPaymentMethods();
});

When('I enter my new card details', async ({ paymentMethodsPage }) => {

await paymentMethodsPage.openAddPaymentMethodForm();
await paymentMethodsPage.addPaymentMethod('9987526255325', 'hisCard', '02/27', '3345')

});

Then('my new payment method should be added', async ({ paymentMethodsPage }) => {
  await paymentMethodsPage.expectPaymentMethodAddedSuccessfully();
});