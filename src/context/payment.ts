import { expect, Page } from "@playwright/test";
import { ProductItemData } from "../utils/types";
import PaymentPage from "../page.objects/pages/payment.page";
import { RandomUtils } from "../utils/random.utils";

export default class PaymentContext {

    private paymentPage: PaymentPage;

    constructor(page: Page) {
        this.paymentPage = new PaymentPage(page);
    }

    public async selectRandomPaymentTitle(): Promise<string> {

        await this.paymentPage.paymentMethodRadioButtons.first().waitFor({state : "visible"});
        const allTitles = await this.paymentPage.paymentMethodRadioButtons.allTextContents();

        return RandomUtils.getRandomElementFromList(allTitles).trim();
    }

    public async selectPaymentMethod(paymentMethod: string) {
        await this.paymentPage.paymentMethodRadioButtonByName(paymentMethod).click();
    }

    public async clickOnPlaceOrderButton() {
        await this.paymentPage.placeOrderButton.click();
    }

    public async getProductItemData(): Promise<ProductItemData> {

        await expect(await this.paymentPage.orderSummarySection.title.isVisible()).toBeTruthy();

        if (await this.paymentPage.orderSummarySection.orderSummaryTabByName('View Details').isVisible()) {
            await this.paymentPage.orderSummarySection.orderSummaryTabByName('View Details').click();
            await expect(await this.paymentPage.orderSummarySection.orderSummaryTabByName('View Details').locator(`xpath=.//parent::span[contains(@aria-expanded='true')]`)).toBeTruthy();
        }

        const productItemData: ProductItemData = {
            title: await this.paymentPage.orderSummarySection.title.textContent(),
            quantity: await this.paymentPage.orderSummarySection.quantity.textContent(),
            color: await this.paymentPage.orderSummarySection.color.isVisible() ? await this.paymentPage.orderSummarySection.color.textContent() : null,
            size: await this.paymentPage.orderSummarySection.size.isVisible() ? await this.paymentPage.orderSummarySection.size.textContent() : null
        };

        return productItemData;
    }
}
