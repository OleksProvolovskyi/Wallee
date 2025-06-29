import { Locator, Page } from "@playwright/test";
import { OrderSummarySection } from "../containers/order.summary.section";

export default class PaymentPage {
    readonly page: Page;
    readonly orderSummarySection: OrderSummarySection;
    readonly placeOrderButton: Locator;
    readonly paymentMethodRadioButtons: Locator;

    constructor(page: Page) {
        this.page = page;
        this.placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });
        this.paymentMethodRadioButtons = this.page.locator(`//div[@class='payment-method-title field choice']//span`);
        this.orderSummarySection = new OrderSummarySection(this.page);
    }

    public paymentMethodRadioButtonByName(paymentMethod: string): Locator {
        return this.page.locator(`//span[text()='${paymentMethod}']//ancestor::div[@class='payment-method-title field choice']//input`);
    }
}