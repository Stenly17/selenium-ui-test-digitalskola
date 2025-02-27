const { By } = require("selenium-webdriver");

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.firstName = By.id("first-name");
        this.lastName = By.id("last-name");
        this.postalCode = By.id("postal-code");
        this.continueButton = By.id("continue");
        this.finishButton = By.id("finish");
        this.successMessage = By.className("complete-header");
    }

    async fillCheckoutForm(fname, lname, zip) {
        await this.driver.findElement(this.firstName).sendKeys(fname);
        await this.driver.findElement(this.lastName).sendKeys(lname);
        await this.driver.findElement(this.postalCode).sendKeys(zip);
        await this.driver.findElement(this.continueButton).click();
    }

    async finishCheckout() {
        await this.driver.findElement(this.finishButton).click();
    }

    async getSuccessMessage() {
        return await this.driver.findElement(this.successMessage).getText();
    }
}

module.exports = CheckoutPage;
