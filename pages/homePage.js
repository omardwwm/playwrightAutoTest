// homePage.js
const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://stackoverflow.com/');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('networkidle');
    };

    async checkH1HeadingKO() {
        await expect(this.page.locator('#signup-modal-title')).toBeHidden();
    };

    async checkH1HeadingOK() {
        await expect(this.page.locator('#signup-modal-title')).toBeVisible();
    }

}