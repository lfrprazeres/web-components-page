import { test, expect } from '@playwright/test';

test('filter by first date properly', async ({ page }) => {
  await page.goto('https://web-components-page.vercel.app');
  await page.waitForTimeout(5000);
  const select = page.locator('#filterBy').getByTestId('tr-select-element');
  await select.selectOption('Mai 2015');
  await expect(await page.locator('tr-card[show="true"]').count()).toBe(1);
});

test('filter by Juli 2016 properly', async ({ page }) => {
  await page.goto('https://web-components-page.vercel.app');
  await page.waitForTimeout(5000);
  const select = page.locator('#filterBy').getByTestId('tr-select-element');
  await select.selectOption('Juli 2016');
  await expect(await page.locator('tr-card[show="true"]').count()).toBe(2);
});

test('filter by reset properly', async ({ page }) => {
  await page.goto('https://web-components-page.vercel.app');
  await page.waitForTimeout(5000);
  const select = page.locator('#filterBy').getByTestId('tr-select-element');
  await select.selectOption('Mai 2015');
  await expect(await page.locator('tr-card[show="true"]').count()).toBe(1);
  await select.selectOption('');
  await expect(await page.locator('tr-card[show="true"]').count()).toBe(10);
});