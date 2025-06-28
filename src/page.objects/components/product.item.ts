import { Locator, Page } from '@playwright/test';

export class ProductItem {
    private readonly page: Page;
    public readonly itemElement: Locator;
    public readonly addToCartButton: Locator;
    public readonly sizes: Locator;
    public readonly colors: Locator;

    constructor(page: Page, itemTitle: string) {
        this.page = page;
        this.itemElement = this.page.locator(`//a[@title='${itemTitle}']//ancestor::div[@class='product-item-info']`);
        this.addToCartButton = this.itemElement.locator(`xpath=.//button[@title='Add to Cart']`);
        this.sizes = this.itemElement.locator(`xpath=.//div[@data-attribute-code='size']//div[@class='swatch-option text']`);
        this.colors = this.itemElement.locator(`xpath=.//div[@class='swatch-attribute color']//div[@class='swatch-option color']`);
    }

    public attributeIcon(value: string) : Locator {
       return this.itemElement.locator(`xpath=.//div[@data-option-label='${value}']`);
    }

    public attributeOptions(attributeName: string) : Locator {
       return this.itemElement.locator(`xpath=.//div[@data-attribute-code='${attributeName}']//div[@class='swatch-option text']`);
    }
}
