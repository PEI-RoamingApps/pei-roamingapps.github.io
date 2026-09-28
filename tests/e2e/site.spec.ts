import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const primaryPages = [
  ['/', 'aLinha'],
  ['/project', 'What is aLinha?'],
  ['/minutes', 'Minutes'],
  ['/milestones', 'Milestones'],
  ['/team', 'Team'],
  ['/documentation', 'Documentation'],
] as const;

test.describe('published content', () => {
  for (const [path, heading] of primaryPages) {
    test(`${path} renders meaningful content`, async ({ page }) => {
      const response = await page.goto(path);

      expect(response?.ok()).toBe(true);
      await expect(page.locator('main')).toBeVisible();
      if (path === '/') {
        await expect(page).toHaveTitle('aLinha');
      } else {
        await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`${path}/?$`));
      }
    });
  }

  test('published milestones open their detail page', async ({ page }) => {
    await page.goto('/milestones');
    const phases = page.locator('main a[href^="/milestones/"]');
    await expect(phases).toHaveCount(1);
    await expect(phases.first()).toContainText('01');

    await phases.first().click();
    await expect(page.getByRole('heading', { level: 1, name: 'Requirements & Planning' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Milestone navigation' }).getByRole('link')).toHaveCount(0);
  });

  test('hybrid minutes expose both web content and their published PDF', async ({ page, request }) => {
    await page.goto('/minutes');
    await page.getByRole('link', { name: 'View online' }).first().click();

    await expect(page.locator('article')).toBeVisible();
    const pdfLink = page.getByRole('link', { name: /Open PDF/ });
    await expect(pdfLink).toBeVisible();
    const href = await pdfLink.getAttribute('href');
    expect(href).toBeTruthy();

    const pdfResponse = await request.get(href!);
    expect(pdfResponse.ok()).toBe(true);
    expect(pdfResponse.headers()['content-type']).toContain('application/pdf');
  });

  test('all local resources linked from documentation exist', async ({ page, request }) => {
    await page.goto('/documentation');
    const hrefs = await page.locator('main a[href]').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href')).filter((href): href is string => Boolean(href)),
    );

    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs.filter((href) => href.startsWith('/'))) {
      const response = await request.get(href);
      expect(response.ok(), `${href} should be published`).toBe(true);
    }
  });
});

test.describe('browser behaviour', () => {
  test('theme preference changes accessibly and survives reload', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: /Switch to (dark|light) mode/ }).first();
    const initialTheme = await page.locator('html').getAttribute('data-theme');

    await toggle.click();
    const expectedTheme = initialTheme === 'dark' ? 'light' : 'dark';
    await expect(page.locator('html')).toHaveAttribute('data-theme', expectedTheme);
    await expect(toggle).toHaveAttribute('aria-label', `Switch to ${initialTheme} mode`);

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', expectedTheme);
  });

  test('representative pages have no automatically detectable accessibility violations', async ({ page }) => {
    for (const path of ['/', '/milestones/01-requirements', '/minutes/2026-09-21']) {
      await page.goto(path);
      // The Canva embed is a third-party document whose markup we do not control.
      // Its host iframe has a descriptive title in the milestone component.
      const results = await new AxeBuilder({ page }).exclude('.canva-frame iframe').analyze();
      expect(results.violations, `Accessibility violations on ${path}`).toEqual([]);
    }
  });
});
