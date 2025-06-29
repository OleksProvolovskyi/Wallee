import { Locator, Page } from "@playwright/test";
import { OrderSummarySection } from "../containers/order.summary.section";

export default class ShippingPage {
    readonly page: Page;
    readonly emailAddress: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly streetAddress: Locator;
    readonly country: Locator;
    readonly stateProvince: Locator;
    readonly city: Locator;
    readonly zipPostalCode: Locator;
    readonly phoneNumber: Locator;
    readonly nextButton: Locator;
    readonly orderSummaryItemInCartTab: Locator;
    readonly orderSummaryViewDetailsTab: Locator;
    readonly shippingMethod: Locator;
    readonly orderSummarySection: OrderSummarySection;
    readonly warningMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailAddress = this.page.getByRole('textbox', { name: 'Email Address*' });
        this.firstName = this.page.getByRole('textbox', { name: 'First Name*' });
        this.lastName = this.page.getByRole('textbox', { name: 'Last Name*' });
        this.streetAddress = this.page.getByRole('textbox', { name: 'Street Address: Line 1' });
        this.country = this.page.locator(`//select[@name='country_id']`);
        this.stateProvince = this.page.locator('select[name="region_id"]');
        this.city = this.page.getByRole('textbox', { name: 'City*' });
        this.zipPostalCode = this.page.getByRole('textbox', { name: 'Zip/Postal Code*' });
        this.phoneNumber = this.page.getByRole('textbox', { name: 'Phone Number*' });
        this.nextButton = this.page.getByRole('button', { name: 'Next' });
        this.orderSummaryItemInCartTab = this.page.getByText('Item in Cart');
        this.orderSummaryViewDetailsTab = this.page.getByText('View Details');
        this.shippingMethod = this.page.locator(`//td[@class='col col-method']//input`);
        this.orderSummarySection = new OrderSummarySection(this.page);
        this.warningMessage = this.page.locator(`//div[@role='alert']`);
    }

    public shippingMethodRadioButton(shippingMethod: string): Locator {
        return this.page.getByRole('radio', { name: shippingMethod });
    }
}