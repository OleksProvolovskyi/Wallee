import { test, expect, Page } from '@playwright/test';
import OrdersContext from '../src/context/orders';
import ShippingContext from '../src/context/shipping';
import { ProductItemData } from '../src/utils/types';
import PaymentContext from '../src/context/payment';

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Make order from Hot Sellers section @ci', async ({ page }) => {
  const { ordersContext, shippingContext, paymentContext } = createContexts(page);

  // Actions on Landing page
  await page.goto('/');
  await page.waitForLoadState();

  const randomProductItemTitle = await ordersContext.selectRandomProductItemTitle();
  const randomProductItemSize = await ordersContext.selectRandomSizeForProduct(randomProductItemTitle);
  const randomProductItemColor = await ordersContext.selectRandomColorForProduct(randomProductItemTitle);

  const productItemDataFromLandingPage: ProductItemData = {
    title: randomProductItemTitle,
    quantity: "1",
    color: randomProductItemColor,
    size: randomProductItemSize,
  };

  await ordersContext.addToCartBySizeAndColor(randomProductItemTitle, randomProductItemSize, randomProductItemColor);
  await ordersContext.clickOnCartIcon();
  await ordersContext.clickOnProceedToCheckoutButton();

  // Actions on Shipping page
  await page.waitForLoadState();

  const productItemDataFromShippingPage = await shippingContext.getProductItemData();
  await shippingContext.populateShippingData();

  await expect(productItemDataFromLandingPage).toEqual(productItemDataFromShippingPage);

  // Actions on Payment page
  await page.waitForLoadState();

  const randomPaymentTitle = await paymentContext.selectRandomPaymentTitle();
  await paymentContext.selectPaymentMethod(randomPaymentTitle);

  const productItemDataFromPaymentPage = await paymentContext.getProductItemData();
  await paymentContext.clickOnPlaceOrderButton();

  await expect(productItemDataFromLandingPage).toEqual(productItemDataFromPaymentPage);

  //Next step - check if payment is successful via API or DB
});

test('Check if not possible to make order without shipping data @ci', async ({ page }) => {
  const { ordersContext, shippingContext } = createContexts(page);

  await page.goto('/');
  await page.waitForLoadState();

  const randomProductItemTitle = await ordersContext.selectRandomProductItemTitle();
  const randomProductItemSize = await ordersContext.selectRandomSizeForProduct(randomProductItemTitle);
  const randomProductItemColor = await ordersContext.selectRandomColorForProduct(randomProductItemTitle);

  await ordersContext.addToCartBySizeAndColor(randomProductItemTitle, randomProductItemSize, randomProductItemColor);
  await ordersContext.clickOnCartIcon();
  await ordersContext.clickOnProceedToCheckoutButton();

  await page.waitForLoadState();

  await shippingContext.clickOnNextButton();
  const warningMessageText = await shippingContext.getWarningMessageText();

  await expect(warningMessageText).toEqual("The shipping method is missing. Select the shipping method and try again.");
});

// it also can define in fixture file 
function createContexts(page: Page) {
  return {
    ordersContext: new OrdersContext(page),
    shippingContext: new ShippingContext(page),
    paymentContext: new PaymentContext(page),
  };
}
