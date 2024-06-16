// homePage.js
const { expect } = require("@playwright/test");
const { loadConfig } = require("../utils/loadConfig");

exports.HomePage = class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto() {
    const env = process.env.ENVIRONMENT;
    // const locale = process.env.LOCALE;
    const realm = process.env.REALM;
    const config = loadConfig(realm, env);
    const url = config.baseUrl;
    console.log(config);
    await this.page.goto(url);
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("load");
    await this.page.waitForLoadState("networkidle");
  }

  async checkH1HeadingKO() {
    await expect(this.page.locator("#signup-modal-title")).toBeHidden();
  }

  async checkH1HeadingOK() {
    await expect(this.page.locator("#signup-modal-title")).toBeHidden();
  }

  async failedTest() {
    expect(1).toEqual(2);
  }

  async envTest(envVar) {
    expect(envVar).toStrictEqual("Env test");
  }
};
