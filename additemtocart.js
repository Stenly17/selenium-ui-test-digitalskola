const {Builder, By, Key, until} = require("selenium-webdriver")
const assert = require ("assert")

async function addItemToCart() {
    
    let driver = await new Builder().forBrowser("chrome").build()
try {

    await driver.manage().window().maximize()

    await driver.get("https://www.saucedemo.com/")
    await driver.findElement(By.id("user-name")).sendKeys("standard_user")
    await driver.findElement(By.id("password")).sendKeys("secret_sauce")
    await driver.findElement(By.id("login-button")).click()

     await driver.wait(until.elementLocated(By.css(".app_logo")), 5000)

    await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click()
    await driver.findElement(By.css(".shopping_cart_link")).click()

    await driver.wait(until.elementLocated(By.css(".cart_list")), 5000)

    let cartItem = await driver.findElement(By.css(".cart_item_label")).isDisplayed()
    assert.ok(cartItem, "Item tidak berhasil ditambahkan ke keranjang!")

    console.log ("Item Berhasil Ditambahkan!")


} finally{
    await driver.sleep(5000)
    await driver.quit()

}
    
}
addItemToCart()