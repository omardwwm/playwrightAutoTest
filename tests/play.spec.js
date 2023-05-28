// example.spec.js
const { test, expect } = require('@playwright/test');
const { PlaywrightDevPage } = require('../pages/playPage');

test('Get Started table of contents', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.getStarted();
  await expect(playwrightDev.tocList).toHaveText([
    'Installation',
    'First test',
    'Writing assertions',
    'Using test fixtures',
    'Using test hooks',
    'Learning the command line',
    'Creating a configuration file',
    'Release notes',
  ]);
});

test('Core Concepts table of contents', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.coreConcepts();
  await expect(playwrightDev.tocList.first()).toHaveText('Browser');
});