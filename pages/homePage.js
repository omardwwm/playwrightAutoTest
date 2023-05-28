// homePage.js
const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.getStartedLink = page.locator('text=CONNECT');
        this.currentEnvLocator = page.locator('#modalContent > div:nth-child(1) > div.lv-dev-tools__title');
        // #modalContent > div:nth-child(1) > div.lv-dev-tools__title
        this.isT1Env = false;
        // this.currentEnv = page.locator('text=CURRENT ENVIRONMENT : T1I-AZURE');

    }

    async goto() {
        await this.page.goto('https://us-i3f.louisvuitton.com/eng-us/homepage');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('networkidle', { timeout: 10000 });
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        // await expect(this.page.getByRole('button', { name: 'Devtool' })).toBeVisible();
        // this.page.waitForSelector(this.page.locator('text=Devtool'));
        // await this.page.getByRole('button', { name: 'Devtool' }).waitFor();
        // await this.page.waitForLoadState('networkidle');
    }

    async getStarted() {
        await expect(this.getStartedLink).toBeVisible();
    }

    async isCurrentEnvT1() {
        await this.page.getByRole('button', { name: 'Devtool' }).click();
        // const ActualENV = expect(await this.page.locator(".lv-dev-tools__title").textContent().toEqual("CURRENT ENVIRONMENT : T1I-AZURE", { timeout: 2000 }));
        const ActualENV = await this.page.locator("#modalContent > div:nth-child(1) > div.lv-dev-tools__title").textContent();
        console.log('ActualENV =====>>> ', ActualENV);
        // lv-dev-tools__title
        // const currentEnvValueText = await this.currentEnvLocator.textContent();
        if (ActualENV === 'CURRENT ENVIRONMENT : T1I-AZURE') {
            return this.isT1Env = true
        } else {
            return this.isT1Env = false
        }
    }

    async switchToT1Env() {
        // await this.page.getByRole('button', { name: 'Switch to T1I' }).click();
        // const modal = this.page.locator('#modalTitle');
        // await this.page.getByRole('button', { name: 'United States' }).click();
        console.log('passed from modal ======>>>>>>> OK!');
        console.log('Is Actual Env is T1F ?? ====>>>>', this.isT1Env);
        if (this.isT1Env != true) {
            await this.page.getByRole('button', { name: 'Switch to T1I' }).click();
            // const modal = this.page.locator('#modalTitle');
            await this.page.getByRole('button', { name: 'United States' }).click();
            // if (await modal.isVisible()) {
            //     await this.page.getByRole('button', { name: 'United States of America' }).click();
            // } else {
            //     return;
            // }

        }
    }

}