// homePage.js
const { expect } = require('@playwright/test');

exports.PDPPage = class PDPPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        // const isProductIsAvailable = false;
        this.page.isProductIsAvailable = false;

    };



    async goSerchProduct() {
        // await expect(this.page.getByRole('button', { name: 'Search' })).toBeVisible({ timeout: 500 });
        // await this.page.getByRole('button', { name: 'Search' }).click();
        // await this.page.getByText('Search').click();
        if (await this.page.locator(".lv-header__utility-label", { hasText: "Search" }).isVisible()) {
            await this.page.getByRole('button', { name: 'Search' }).click();
        }
        await expect(this.page.getByPlaceholder("Shop Mother's Day Gifts")).toBeVisible({ timeout: 500 });
        // searchHeaderInput
    };

    async fillSkuId(skuId) {
        await this.page.locator('#searchHeaderInput').fill(skuId);
        await expect(this.page.getByRole('heading', { name: 'PRODUCTS' })).toBeVisible();
    }

    async executeSearchProduct() {
        // await expect(this.page.locator('.lv-predictive-product__data')).toBeVisible({timeout: 10000});
        await this.page.locator('#header > div.lv-header__predictive > div > div:nth-child(2) > div > div > div > a > div.lv-predictive-product__data > div').click()
    };

    async goToProductPage(pdctName) {
        await expect(this.page.getByRole('heading', { name: pdctName })).toBeVisible();
        // Add assertion to check if added sku id the correct one
        // await this.page.locator('.lv-predictive-product__name list-label-m :Apogée').click()
    }

    async checkProductIsAvailability() {
        // if (await expect(this.page.getByRole('button', { name: 'Place in Cart' })).toBeVisible()) {
        //     return this.isProductIsAvailable = true
        // };
        let textBtnPlaceInCart = await this.page.locator('#main > div.lv-product > div:nth-child(1) > section > div.lv-product-page-header__secondary > div > div > div.lv-product-purchase.lv-product__purchase > button > span').textContent();
        let isProductIsAvailableTest =  false;
        console.log('textOfBtnPlaceInCart', textBtnPlaceInCart);
        if (textBtnPlaceInCart === 'Place in Cart') {
            return isProductIsAvailableTest = true
        };
        console.log(`Is that product is available ==>>`, this.page.isProductIsAvailable);
    }

    async placeInCart() {
        // await this.checkProductIsAvailability();
        // console.log(`Is that product is available ==>>`, this.page.isProductIsAvailable);
        // if (this.isProductIsAvailable) {
        //     await this.page.getByRole('button', { name: 'Place in Cart' }).click();
        // }
     
        await this.page.getByRole('button', { name: 'Place in Cart' }).click();
    }

    async verifyIfAddedOK() {
        // await expect(this.page.locator('.lv-modal__container')).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'Added to cart' })).toBeVisible();
        // Add fonction to check if correct item is added, take name of added product in placeToCart function for that and make this functio "verifyIfAddedOK" with variable to can use in each added product)
    }

    async placeOneProductInCart(skuId, pdctName) {
        await this.fillSkuId(skuId);
        await this.executeSearchProduct();
        await this.goToProductPage(pdctName);
        await this.placeInCart();
        await this.verifyIfAddedOK()

    }

    async continueShopping() {
        await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
    }

    async goToMyCart(){
        await this.page.getByRole('link', {name: 'View my Cart'}).click();
    }

    async startCheckOut(){
        await this.page.getByRole('button', {name : 'Proceed to checkout'}).click();
    }

    async checkIfGoneToCheckoutPgae(){
        await expect(this.page.getByRole('heading', {name: 'IDENTIFICATION'})).toBeVisible();
    }

    async attacheEmailToCart(myEamil){
        // await this.page.getByLabel('Email*').fill(myEamil);
        // await expect(this.page.locator('/html/body/div[2]/div/div/main/div[2]/div/div/div[1]/div[1]/ol/li[1]/div/h1/span')).toBeVisible();
        console.log('My Email test Is ==>>', myEamil);
    }

    async continueCheckout(){
        await this.page.getByRole('button', {name: 'Continue'}).click();
    }

}