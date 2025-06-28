import { Locator, Page } from "@playwright/test";
import { ProductItem } from "../components/product.item";
import { MiniCartPopup } from "../containers/product.item";

export default class LandingPage {
    readonly page: Page;
    readonly productItems: Locator;
    readonly cartIcon: Locator;
    readonly cartNumber: Locator;
    readonly miniCartPopup: MiniCartPopup;

    constructor(page: Page) {
        this.page = page;
        this.productItems = this.page.locator(`//strong[@class='product-item-name']//a`);
        this.cartIcon = this.page.locator(`//div[@data-block='minicart']`);
        this.cartNumber = this.cartIcon.locator(`xpath=.//span[@class='counter-number']`);
        this.miniCartPopup = new MiniCartPopup(page);
    }

    public productItemByTitle(productTitle: string): ProductItem {
        return new ProductItem(this.page, productTitle);
    }
}