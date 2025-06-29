import { expect, Page } from "@playwright/test";
import ShippingPage from "../page.objects/pages/shipping.page";
import { faker } from "@faker-js/faker";
import { ProductItemData } from "../utils/types";

export default class ShippingContext {

    private shippingPage: ShippingPage;

    constructor(page: Page) {
        this.shippingPage = new ShippingPage(page);
    }

    public async populateShippingData() {
        await this.shippingPage.emailAddress.fill(faker.internet.email());
        await this.shippingPage.firstName.fill(faker.person.firstName());
        await this.shippingPage.lastName.fill(faker.person.lastName());
        await this.shippingPage.streetAddress.fill(faker.location.streetAddress());
        await this.shippingPage.country.selectOption("Ukraine");
        await this.shippingPage.stateProvince.selectOption("Lvivska oblast");
        await this.shippingPage.city.fill(faker.location.city());
        await this.shippingPage.zipPostalCode.fill(faker.location.zipCode('#####'));
        await this.shippingPage.phoneNumber.fill(faker.phone.number());
        await this.shippingPage.shippingMethodRadioButton('Fixed Flat Rate').click();
        await this.clickOnNextButton();
    }

    public async clickOnNextButton() {
        await this.shippingPage.nextButton.scrollIntoViewIfNeeded();
        await this.shippingPage.nextButton.click();
    }

    public async getWarningMessageText() {
        await this.shippingPage.warningMessage.waitFor({state : "visible"});
        return (await this.shippingPage.warningMessage.textContent()).trim();
    }

    public async getProductItemData(): Promise<ProductItemData> {

        await this.shippingPage.orderSummarySection.orderSummaryTabByName('Item in Cart').click();
        await expect(await this.shippingPage.orderSummarySection.title.isVisible()).toBeTruthy();

        if (await this.shippingPage.orderSummarySection.orderSummaryTabByName('View Details').isVisible()) {
            await this.shippingPage.orderSummarySection.orderSummaryTabByName('View Details').click();
            await expect(await this.shippingPage.orderSummarySection.orderSummaryTabByName('View Details').locator(`xpath=.//parent::span[contains(@aria-expanded='true')]`)).toBeTruthy();
        }

        const productItemData: ProductItemData = {
            title: await this.shippingPage.orderSummarySection.title.textContent(),
            quantity: await this.shippingPage.orderSummarySection.quantity.textContent(),
            color: await this.shippingPage.orderSummarySection.color.isVisible() ? await this.shippingPage.orderSummarySection.color.textContent() : null,
            size: await this.shippingPage.orderSummarySection.size.isVisible() ? await this.shippingPage.orderSummarySection.size.textContent() : null
        };

        return productItemData;
    }
}
