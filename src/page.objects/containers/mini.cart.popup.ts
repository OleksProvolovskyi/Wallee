import { Locator, Page } from '@playwright/test';

export class MiniCartPopup {
    public readonly proceedToCheckoutButton: Locator;

    constructor(page: Page) {
        this.proceedToCheckoutButton = page.locator(`//button[@id='top-cart-btn-checkout']`);
    }
}
