const {Builder, By, Key, until,} = require("selenium-webdriver")
const assert = require("assert")

async function userSuccesLogin() {
    let driver = await new Builder().forBrowser("chrome").build()
try{
    
    await driver.manage().window().maximize();

    await driver.get("https://www.saucedemo.com/")
    await driver.findElement(By.id("user-name")).sendKeys("standard_user")
    await driver.findElement(By.id("password")).sendKeys("secret_sauce")
    await driver.findElement(By.id("login-button")).click()
    await driver.wait(until.elementLocated(By.css(".inventory_list")))

    let logoText = await driver.findElement(By.css(".app_logo")).getText()

    assert.strictEqual(logoText, "Swag Labs")

    console.log("Login berhasil! Dashboard muncul.");

} finally {
    await driver.quit()
}
}
userSuccesLogin()