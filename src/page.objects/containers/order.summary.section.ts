import { Locator, Page } from '@playwright/test';

export class OrderSummarySection {
    public readonly proceedToCheckoutButton: Locator;
    public readonly page: Page;
    readonly title: Locator;
    readonly quantity: Locator;
    readonly size: Locator;
    readonly color: Locator;

    constructor(page: Page) {
        this.page = page;
        this.proceedToCheckoutButton = page.locator(`//button[@id='top-cart-btn-checkout']`);
        this.title = this.page.locator(`//strong[@class='product-item-name']`);
        this.quantity = this.page.locator(`//div[@class='details-qty']//span[@class='value']`);
        this.size = this.page.locator(`(//dl[@class='item-options']//following-sibling::dd)[1]`);
        this.color = this.page.locator(`(//dl[@class='item-options']//following-sibling::dd)[2]`);
    }

    public orderSummaryTabByName(name: string): Locator {
        return this.page.getByText(name);
    }
}
