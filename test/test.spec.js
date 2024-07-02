// @ts-check
import { test, expect } from '@playwright/test'

test('Create DB', async ({ page }) => {
  await page.goto('/')

  const window = await page.evaluate(() => window)

  const idb = await window.indexedDB.databases()

  await expect(idb.length).toBe(1)
})

/* test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible()
}) */
