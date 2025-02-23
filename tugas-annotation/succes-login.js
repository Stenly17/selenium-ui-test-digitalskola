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

describe("Saucedemo - User Login Test", function () {
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
        await driver.sleep(2000);
        await driver.quit();
      });

      // User berhasil login
      it("TC01 - User berhasil login ke dashboard", async function () {
        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver.findElement(By.id("password")).sendKeys("secret_sauce");
        await driver.findElement(By.id("login-button")).click();

        // Tunggu hingga dashboard muncul
        await driver.wait(until.elementLocated(By.css(".inventory_list")), 5000);

        // Validasi logo "Swag Labs" muncul
        let logoText = await driver.findElement(By.css(".app_logo")).getText();
        assert.strictEqual(logoText, "Swag Labs", "❌ Login gagal! Dashboard tidak muncul.");

        console.log(`Login sukses di ${name}`);
      });
    });
  });
});
