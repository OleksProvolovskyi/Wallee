import { expect, Page } from "@playwright/test";
import LandingPage from "../page.objects/pages/landing.page";
import { RandomUtils } from "../utils/random.utils";

export default class OrdersContext {

    private landingPage: LandingPage;

    constructor(page: Page) {
        this.landingPage = new LandingPage(page);
    }

    public async addToCartBySizeAndColor(title: string, size?: string, color?: string) {
        await this.landingPage.productItemByTitle(title).itemElement.hover();

        if (size) {
            await this.landingPage.productItemByTitle(title).attributeIcon(size).click();
            await expect(await this.landingPage.productItemByTitle(title).attributeIcon(size).getAttribute('class') === "swatch-option text selected").toBeTruthy();
        }

        if (color) {
            await this.landingPage.productItemByTitle(title).attributeIcon(color).click();
            await expect(await this.landingPage.productItemByTitle(title).attributeIcon(color).getAttribute('class') === "swatch-option color selected").toBeTruthy();
        }

        await this.landingPage.productItemByTitle(title).addToCartButton.hover();
        await this.landingPage.productItemByTitle(title).addToCartButton.focus();
        await this.landingPage.productItemByTitle(title).addToCartButton.click();
    }

    public async selectRandomProductItemTitle(): Promise<string> {
        await this.landingPage.productItems.first().scrollIntoViewIfNeeded();

        const allTitles = await this.landingPage.productItems.allTextContents();

        return RandomUtils.getRandomElementFromList(allTitles).trim();
    }

    public async selectRandomSizeForProduct(title: string): Promise<string> {
        await this.landingPage.productItemByTitle(title).itemElement.waitFor({state : "visible"});
        await this.landingPage.productItemByTitle(title).itemElement.scrollIntoViewIfNeeded();

        if (title.includes("Backpack") || title.includes("Bag")) {
            return null;
        }

        await this.landingPage.productItemByTitle(title).sizes.first().waitFor({state : "visible"});

        const allSizes = await this.landingPage.productItemByTitle(title).sizes.allTextContents();

        return RandomUtils.getRandomElementFromList(allSizes);
    }

    public async selectRandomColorForProduct(title: string): Promise<string> {
        await expect(await this.landingPage.productItemByTitle(title).itemElement.isVisible()).toBeTruthy();

        await this.landingPage.productItemByTitle(title).itemElement.scrollIntoViewIfNeeded();

        const colorElements = this.landingPage.productItemByTitle(title).colors;
        const colorElementsCount = await colorElements.count();

        if (colorElementsCount === 0) {
            return null;
        }

        await expect(await this.landingPage.productItemByTitle(title).colors.first()).toBeVisible();
        const labels: string[] = [];

        for (let i = 0; i < colorElementsCount; i++) {
            const attr = await colorElements.nth(i).getAttribute('aria-label');
            labels.push(attr);
        }

        return RandomUtils.getRandomElementFromList(labels);
    }

    public async clickOnCartIcon(): Promise<void> {
        await this.landingPage.cartIcon.scrollIntoViewIfNeeded();

        await this.landingPage.cartNumber.waitFor({state : "visible"});

        await this.landingPage.cartIcon.click();
    }

    public async clickOnProceedToCheckoutButton(): Promise<void> {
        await this.landingPage.miniCartPopup.proceedToCheckoutButton.click();
    }
}
