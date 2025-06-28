import { test, expect, Page } from '@playwright/test';
import OrdersContext from '../src/context/orders';

test('Make order from Hot Sellers section', async ({ page }) => {
  const ordersContext = new OrdersContext(page);
  
  await Promise.all([
    page.goto('/'),
    page.waitForResponse(response => response.url().endsWith(`/product/view/product-info.js`) && response.status() === 200)
  ])

  const randomProductItemTitle = await ordersContext.selectRandomProductItemTitle();
  const randomProductItemSize = await ordersContext.selectRandomSizeForProduct(randomProductItemTitle);
  const randomProductItemColor = await ordersContext.selectRandomColorForProduct(randomProductItemTitle);

  await ordersContext.addToCartBySizeAndColor(randomProductItemTitle, randomProductItemSize, randomProductItemColor);
  await ordersContext.clickOnCartIcon();
  await ordersContext.clickOnProceedToCheckoutButton();
});
