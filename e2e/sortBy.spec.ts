import { test, expect } from '@playwright/test';

test('sort by lowest properly', async ({ page }) => {
  await page.goto('https://web-components-page.vercel.app');
  await page.waitForTimeout(5000);
  const select = page.locator('#sortBy').getByTestId('tr-select-element');
  await select.selectOption('lowest');
  await expect(page.getByTestId('card-title').first()).toHaveText('Ultimate Balkan');
});

test('sort by highest properly', async ({ page }) => {
  await page.goto('https://web-components-page.vercel.app');
  await page.waitForTimeout(5000);
  const select = page.locator('#sortBy').getByTestId('tr-select-element');
  await select.selectOption('highest');
  await expect(page.getByTestId('card-title').first()).toHaveText('Grand European');
});

test('sort by longest properly', async ({ page }) => {
  await page.goto('https://web-components-page.vercel.app');
  await page.waitForTimeout(5000);
  const select = page.locator('#sortBy').getByTestId('tr-select-element');
  await select.selectOption('longest');
  await expect(page.getByTestId('card-title').first()).toHaveText('Grand European');
});

test('sort by shortest properly', async ({ page }) => {
  await page.goto('https://web-components-page.vercel.app');
  await page.waitForTimeout(5000);
  const select = page.locator('#sortBy').getByTestId('tr-select-element');
  await select.selectOption('shortest');
  await expect(page.getByTestId('card-title').first()).toHaveText('Greek Island Flexi-Hopper');
});

test('sort by popularity properly', async ({ page }) => {
  await page.goto('https://web-components-page.vercel.app');
  await page.waitForTimeout(5000);
  const select = page.locator('#sortBy').getByTestId('tr-select-element');
  await select.selectOption('');
  await expect(page.getByTestId('card-title').first()).toHaveText('Grand European');
});