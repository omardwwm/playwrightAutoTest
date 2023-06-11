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



    async goSerchProduct(goSerchProductTimeOutDuration) {
        // if (await this.page.getByText('Search').toBeVisible()) {
        // }
        // await this.page.getByRole('button', { name: 'Search' }).click();
        // setTimeout(() => {
        //     console.log('ENTER "goSerchProduct" function Ok');
        // }, 500);
        await this.page.evaluate(() => window.scrollTo(0, 0));
        // await this.page.locator('.lv-header__utility-label').click();
        // await expect(this.page.getByText('Search', { exact: true })).toBeVisible();
        setTimeout(async () => {
            await this.page.getByRole('button', { name: /search/i }).click();
        }, goSerchProductTimeOutDuration);
        console.log('BUTTON SEARCH CLICKED !!!');
        // setTimeout(async () => {
        //     await expect(this.page.getByPlaceholder("Shop Mother's Day Gifts")).toBeVisible();
        //     await expect(this.page.locator("#searchHeaderInput")).toBeVisible();
        // }, 1000);
        // searchHeaderInput
    };

    async fillSkuId(skuId) {
        setTimeout(async () => {
            await this.page.locator('#searchHeaderInput').fill(skuId);
        }, 5000);
        setTimeout(async () => {
            await expect(this.page.getByRole('heading', { name: 'PRODUCTS' })).toBeVisible();
        }, 5000);
    }

    async executeSearchProduct(executeSearchProductTimeOutDuration) {
        // await expect(this.page.locator('.lv-predictive-product__data')).toBeVisible({timeout: 10000});
        setTimeout(async () => {
            await this.page.locator('#header > div.lv-header__predictive > div > div:nth-child(2) > div > div > div > a > div.lv-predictive-product__data > div').click();
        }, executeSearchProductTimeOutDuration);
        // await this.page.waitForLoadState('networkidle');
    };

    async goToProductPage(pdctName, goToProductPagetimeOutDuration) {
        // await this.page.waitForLoadState('networkidle');
        setTimeout(async () => {
            await expect(this.page.getByRole('heading', { name: pdctName })).toBeVisible();
        }, goToProductPagetimeOutDuration);
        // Add assertion to check if added sku id the correct one
        // await this.page.locator('.lv-predictive-product__name list-label-m :Apogée').click()
    }

    async checkProductIsAvailability() {
        // if (await expect(this.page.getByRole('button', { name: 'Place in Cart' })).toBeVisible()) {
        //     return this.isProductIsAvailable = true
        // };
        let textBtnPlaceInCart = await this.page.locator('#main > div.lv-product > div:nth-child(1) > section > div.lv-product-page-header__secondary > div > div > div.lv-product-purchase.lv-product__purchase > button > span').textContent();
        let isProductIsAvailableTest = false;
        console.log('textOfBtnPlaceInCart', textBtnPlaceInCart);
        if (textBtnPlaceInCart === 'Place in Cart') {
            return isProductIsAvailableTest = true
        };
        console.log(`Is that product is available ==>>`, this.page.isProductIsAvailable);
    }

    async placeInCart(placeInCartTimeOutDuration) {
        setTimeout(async () => {
            await this.page.getByRole('button', { name: 'Place in Cart' }).click();
        }, placeInCartTimeOutDuration);
    }

    async verifyIfAddedOK(verifyIfAddedOKtimeOutDuration) {
        // await expect(this.page.locator('.lv-modal__container')).toBeVisible();
        setTimeout(async () => {
            await expect(this.page.getByRole('heading', { name: 'Added to cart' })).toBeVisible();
        }, verifyIfAddedOKtimeOutDuration);
        // Add fonction to check if correct item is added, take name of added product in placeToCart function for that and make this functio "verifyIfAddedOK" with variable to can use in each added product)
    }

    async placeOneProductInCart(skuId, pdctName, goToProductPagetimeOutDuration, verifyIfAddedOKtimeOutDuration, placeInCartTimeOutDuration, executeSearchProductTimeOutDuration) {
        await this.fillSkuId(skuId);
        await this.executeSearchProduct(executeSearchProductTimeOutDuration);
        await this.goToProductPage(pdctName, goToProductPagetimeOutDuration);
        await this.placeInCart(placeInCartTimeOutDuration);
        await this.verifyIfAddedOK(verifyIfAddedOKtimeOutDuration)

    }

    async continueShopping(continueShoppingTomeOutDuration) {
        setTimeout(async () => {
            await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
        }, continueShoppingTomeOutDuration);
    }

    async goToMyCart(goToMyCartTimeOutDuration) {
        setTimeout(async () => {
            await this.page.getByRole('link', { name: 'View my Cart' }).click();
        }, goToMyCartTimeOutDuration);
    }

    async startCheckOut() {
        await this.page.getByRole('button', { name: 'Proceed to checkout' }).click();
    }

    async checkIfGoneToCheckoutPgae() {
        await expect(this.page.getByRole('heading', { name: 'IDENTIFICATION' })).toBeVisible();
    }

    async attacheEmailToCart(myEamil) {
        // await this.page.getByLabel('Email*').fill(myEamil);
        // await expect(this.page.locator('/html/body/div[2]/div/div/main/div[2]/div/div/div[1]/div[1]/ol/li[1]/div/h1/span')).toBeVisible();
        console.log('My Email test Is ==>>', myEamil);
    }

    async continueCheckout(continueCheckoutTimeOutDuration) {
        setTimeout(async () => {
            await this.page.getByRole('button', { name: 'Continue' }).click();
        }, continueCheckoutTimeOutDuration);
    }

}