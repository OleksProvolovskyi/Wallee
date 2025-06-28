import { expect, Page } from "@playwright/test";
import LandingPage from "../page.objects/pages/landing.page";
import { RandomUtils } from "../utils/random.utils";

export default class OrdersContext {

    private landingPage: LandingPage;

    constructor(page: Page) {
        this.landingPage = new LandingPage(page);
    }

    public async addToCartBySizeAndColor(title: string, size: string, color: string) {
        await this.landingPage.productItemByTitle(title).attributeIcon(size).click();
        await this.landingPage.productItemByTitle(title).attributeIcon(color).click();
        await this.landingPage.productItemByTitle(title).addToCartButton.click();
    }

    public async selectRandomProductItemTitle(): Promise<string> {
        await this.landingPage.productItems.first().scrollIntoViewIfNeeded();

        const allTitles = await this.landingPage.productItems.allTextContents();

        return RandomUtils.getRandomElementFromList(allTitles).trim();
    }

    public async selectRandomSizeForProduct(title: string): Promise<string> {
        await this.landingPage.productItemByTitle(title).sizes.first().scrollIntoViewIfNeeded();

        const allSizes = await this.landingPage.productItemByTitle(title).sizes.allTextContents();

        return RandomUtils.getRandomElementFromList(allSizes);
    }

    public async selectRandomColorForProduct(title: string): Promise<string> {
        const colorElements = this.landingPage.productItemByTitle(title).colors;
        await colorElements.first().scrollIntoViewIfNeeded();

        const labels: string[] = [];

        for (let i = 0; i < await colorElements.count(); i++) {
            const attr = await colorElements.nth(i).getAttribute('aria-label');
            labels.push(attr);
        }

        return RandomUtils.getRandomElementFromList(labels);
    }

    public async clickOnCartIcon(): Promise<void> {
        await this.landingPage.cartIcon.scrollIntoViewIfNeeded();

        await expect(parseInt(await this.landingPage.cartNumber.textContent())).toBeGreaterThan(0);
        
        await this.landingPage.cartIcon.click();
    }

    public async clickOnProceedToCheckoutButton(): Promise<void> {
        await this.landingPage.miniCartPopup.proceedToCheckoutButton.click();
    }
}
