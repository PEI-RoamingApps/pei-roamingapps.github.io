import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('mobile menu opens, is keyboard-dismissible, and remains accessible', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menu' });
  const panel = page.locator('#nav-panel');

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(panel).toBeVisible();
  await expect(panel.getByRole('link', { name: 'Project' })).toBeVisible();

  const results = await new AxeBuilder({ page }).include('#nav-panel').analyze();
  expect(results.violations).toEqual([]);

  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await expect(panel).toBeHidden();
});

test('mobile navigation reaches a section and marks it as current', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.locator('#nav-panel').getByRole('link', { name: 'Milestones' }).click();

  await expect(page).toHaveURL(/\/milestones$/);
  await expect(page.locator('#nav-panel a[href="/milestones"]')).toHaveAttribute('aria-current', 'page');
});
