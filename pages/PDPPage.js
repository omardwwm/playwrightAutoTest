// homePage.js
const { expect } = require('@playwright/test');

exports.PDPPage = class PDPPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

    };


    async goSerchProduct() {
        // await expect(this.page.getByRole('button', { name: 'Search' })).toBeVisible({ timeout: 500 });
        // await this.page.getByRole('button', { name: 'Search' }).click();
        // await this.page.getByText('Search').click();
        if(await this.page.locator(".lv-header__utility-label", { hasText: "Search" }).isVisible()) { 
            await this.page.getByRole('button', { name: 'Search' }).click();
         }
        await expect(this.page.getByPlaceholder("Shop Mother's Day Gifts")).toBeVisible({ timeout: 500 });
        // searchHeaderInput
    };

    async fillSkuId() {
        await this.page.locator('#searchHeaderInput').fill('LP0001');
        await expect(this.page.getByRole('heading', { name: 'PRODUCTS' })).toBeVisible({ timeout: 8000 });
    }

    async executeSearchProduct(){
        // await expect(this.page.locator('.lv-predictive-product__data')).toBeVisible({timeout: 10000});
        await this.page.locator('#header > div.lv-header__predictive > div > div:nth-child(2) > div > div > div > a > div.lv-predictive-product__data > div').click()
    };

    async goToProductPage(){
        await expect(this.page.getByRole('heading', {name: 'Apogée'})).toBeVisible();
        // Add assertion to check if added sku id the correct one
        // await this.page.locator('.lv-predictive-product__name list-label-m :Apogée').click()
    }



}