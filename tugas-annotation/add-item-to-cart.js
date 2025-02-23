const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge");

const browsers = [
  { name: "chrome", options: new chrome.Options().addArguments("--headless") },
  { name: "firefox", options: new firefox.Options().addArguments("--headless") },
  { name: "MicrosoftEdge", options: new edge.Options().addArguments("--headless") },
];

describe("Saucedemo - Add Item to Cart", function () {
  this.timeout(30000); 

  browsers.forEach(({ name, options }) => {
    describe(`Testing on ${name}`, function () {
      let driver;

      beforeEach(async function () {
        driver = await new Builder()
          .forBrowser(name)
          .setChromeOptions(options)
          .setFirefoxOptions(options)
          .setEdgeOptions(options)
          .build();

        await driver.get("https://www.saucedemo.com/");
      });

      afterEach(async function () {
        await driver.quit();
      });

      it("TC01 - User login dan menambahkan item ke cart", async function () {
        // Login
        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver.findElement(By.id("password")).sendKeys("secret_sauce");
        await driver.findElement(By.id("login-button")).click();

        // Tambah item ke keranjang
        let addToCartButton = await driver.findElement(By.id("add-to-cart-sauce-labs-backpack"));
        await addToCartButton.click();

        let removeButton = await driver.findElement(By.id("remove-sauce-labs-backpack")).isDisplayed();
        assert.strictEqual(removeButton, true, "Item gagal ditambahkan ke keranjang!");

        // Pergi ke halaman cart
        await driver.findElement(By.css(".shopping_cart_link")).click();

        // Validasi item yang masuk ke cart sesuai
        await driver.wait(until.elementLocated(By.css(".cart_list")), 5000);
        let cartItemText = await driver.findElement(By.css(".inventory_item_name")).getText();
        assert.strictEqual(cartItemText, "Sauce Labs Backpack", "Item di keranjang tidak sesuai!");

        console.log(`Sukses: Item berhasil ditambahkan ke cart di ${name}`);
      });
    });
  });
});
