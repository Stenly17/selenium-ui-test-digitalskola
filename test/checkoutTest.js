const { Builder } = require("selenium-webdriver");
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const CartPage = require("../pages/cartPage");
const CheckoutPage = require("../pages/checkoutPage");

// Load test data dari file testData.json
const testDataPath = path.join(__dirname, "../testData.json");
const testData = require(testDataPath);

// Menentukan direktori untuk menyimpan screenshot
const screenshotDir = path.join(__dirname, "../screenshots");

// Pastikan folder screenshot ada
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

// Fungsi untuk mengambil screenshot
async function takeScreenshot(driver, filename) {
  const filepath = path.join(screenshotDir, filename);
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(filepath, screenshot, "base64");
  console.log(`${testData.logs.screenshotSaved}${filepath}`);
}

// Test Suite
async function saucedemoCheckoutTest() {
  describe("Saucedemo Checkout Test", function () {
    let driver;
    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutPage;
    const browserName = "chrome";

    beforeEach(async function () {
      this.timeout(30000);
      driver = await new Builder().forBrowser(browserName).build();
      loginPage = new LoginPage(driver);
      inventoryPage = new InventoryPage(driver);
      cartPage = new CartPage(driver);
      checkoutPage = new CheckoutPage(driver);

      await loginPage.open("https://www.saucedemo.com/");
    });

    it("TC01 - Login Success", async function () {
      await loginPage.login(testData.login.username, testData.login.password);
      const pageTitle = await inventoryPage.getPageTitle();
      assert.strictEqual(pageTitle, "Products", "Login Failed");
      await takeScreenshot(driver, testData.screenshots.loginSuccess);
      console.log(testData.logs.loginSuccess);
    });

    it("TC02 - Add to Cart Success", async function () {
      await loginPage.login(testData.login.username, testData.login.password);
      await inventoryPage.addItemToCart();
      const cartCount = await inventoryPage.getCartItemCount();
      assert.strictEqual(cartCount, "1", "Failed to add item to cart");
      await takeScreenshot(driver, testData.screenshots.addToCartSuccess);
      console.log(testData.logs.addToCartSuccess);
    });

    it("TC03 - Checkout Success", async function () {
      await loginPage.login(testData.login.username, testData.login.password);
      await inventoryPage.addItemToCart();
      await inventoryPage.goToCart();
      await cartPage.proceedToCheckout();
      await checkoutPage.fillCheckoutForm(
        testData.checkout.firstName,
        testData.checkout.lastName,
        testData.checkout.postalCode
      );
      await checkoutPage.finishCheckout();
      const successText = await checkoutPage.getSuccessMessage();
      assert.strictEqual(successText, "Thank you for your order!", "Checkout Failed");
      await takeScreenshot(driver, testData.screenshots.checkoutSuccess);
      console.log(testData.logs.checkoutSuccess);
    });

    afterEach(async function () {
      await driver.quit();
    });
  });
}

saucedemoCheckoutTest();

