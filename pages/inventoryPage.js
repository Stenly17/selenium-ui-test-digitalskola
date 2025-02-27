const { By } = require("selenium-webdriver");

class InventoryPage {
    constructor(driver) {
        this.driver = driver;
        this.pageTitle = By.className("title"); // Elemen judul halaman
        this.addToCartButton = By.css(".btn_inventory"); // Tombol tambah barang
        this.cartIcon = By.className("shopping_cart_link"); // Ikon keranjang
        this.cartBadge = By.className("shopping_cart_badge"); // Jumlah item di keranjang
    }

    async getPageTitle() {
        const titleElement = await this.driver.findElement(this.pageTitle);
        return titleElement.getText();
    }

    async addItemToCart() {
        await this.driver.findElement(this.addToCartButton).click();
    }

    async getCartItemCount() {
        try {
            const cartBadge = await this.driver.findElement(this.cartBadge);
            return cartBadge.getText();
        } catch (error) {
            return "0"; // Jika elemen tidak ditemukan, berarti keranjang kosong
        }
    }

    async goToCart() {
        await this.driver.findElement(this.cartIcon).click();
    }
}

module.exports = InventoryPage;
