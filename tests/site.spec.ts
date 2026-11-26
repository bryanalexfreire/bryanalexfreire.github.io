import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

async function seriousViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  return results.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).slice(0, 5).join(' | ')}`);
}

test.describe('Portfolio', () => {
  test('loads without JavaScript errors', async ({ page, baseURL }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      // Only our own files count; third-party fonts can fail on a restricted network.
      if (msg.type() === 'error' && msg.location().url.startsWith(baseURL!)) errors.push(msg.text());
    });
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('QA Automation Engineer');
    expect(errors).toEqual([]);
  });

  test('every in-page link points to an existing section', async ({ page }) => {
    await page.goto('/');
    const targets = await page.$$eval('a[href^="#"]', (links) =>
      links.map((a) => a.getAttribute('href')!.slice(1)).filter(Boolean),
    );
    expect(targets.length).toBeGreaterThan(5);
    const missing = await page.evaluate((ids) => ids.filter((id) => !document.getElementById(id)), targets);
    expect(missing, `anchors without a target: ${missing.join(', ')}`).toEqual([]);
  });

  test('every local file the page links to exists', async ({ page, request }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'same files on every device');
    await page.goto('/');
    const urls = await page.evaluate(() => {
      const attrs = [
        ...Array.from(document.querySelectorAll('a[href]'), (el) => el.getAttribute('href')!),
        ...Array.from(document.querySelectorAll('link[href]'), (el) => el.getAttribute('href')!),
        ...Array.from(document.querySelectorAll('script[src], img[src]'), (el) => el.getAttribute('src')!),
      ];
      return [...new Set(attrs.filter((u) => !/^(https?:|mailto:|tel:|#|\/\/)/.test(u)))];
    });
    expect(urls.length).toBeGreaterThan(30);
    const broken: string[] = [];
    for (const url of urls) {
      const res = await request.get(encodeURI(url));
      if (res.status() !== 200) broken.push(`${res.status()} ${url}`);
    }
    expect(broken, broken.join('\n')).toEqual([]);
  });

  test('Spanish and English copy are complete', async ({ page }) => {
    await page.goto('/');
    const missing = await page.evaluate(() => {
      const dict = (window as unknown as { I18N: Record<string, Record<string, unknown>> }).I18N;
      const keys = [...new Set(Array.from(document.querySelectorAll('[data-i18n]'), (el) => el.getAttribute('data-i18n')!))];
      return keys.flatMap((k) => ['es', 'en'].filter((lang) => dict[lang][k] === undefined).map((lang) => `${lang}.${k}`));
    });
    expect(missing).toEqual([]);

    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await page.locator('#lang-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('.hero .eyebrow')).toHaveText("Hi, I'm Bryan Freire");
    await expect(page.locator('#cv-main')).toHaveAttribute('href', 'cv/CV Bryan Freire EN.pdf');
    await expect(page.locator('#cv-alt')).toHaveAttribute('href', 'cv/CV Bryan Freire.pdf');

    await page.locator('#lang-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('.hero .eyebrow')).toHaveText('Hola, soy Bryan Freire');
  });

  test('?lang=en opens the English version', async ({ page }) => {
    await page.goto('/?lang=en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('#cases .section-title')).toHaveText('Case studies');
  });

  test('no phone number is published', async ({ page }) => {
    await page.goto('/');
    const html = await page.content();
    expect(html).not.toMatch(/tel:|\+?593[\s-]?9\d|telephone/i);
  });

  test('external links open in a new tab safely', async ({ page }) => {
    await page.goto('/');
    const unsafe = await page.$$eval('a[target="_blank"]', (links) =>
      links.filter((a) => !(a.getAttribute('rel') ?? '').includes('noopener')).map((a) => a.getAttribute('href')),
    );
    expect(unsafe).toEqual([]);
  });

  test('certificates list expands and collapses', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('#cert-toggle-btn');
    const more = page.locator('#more-certs');
    await expect(more).toBeHidden();
    await toggle.click();
    await expect(more).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await toggle.click();
    await expect(more).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('the page does not scroll sideways', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('no serious accessibility violations in the dark theme', async ({ page }) => {
    await page.goto('/');
    await page.locator('#cert-toggle-btn').click();
    expect(await seriousViolations(page)).toEqual([]);
  });

  test('no serious accessibility violations in the light theme', async ({ page }) => {
    await page.goto('/');
    await page.locator('#theme-toggle').click();
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'light');
    await page.locator('#cert-toggle-btn').click();
    expect(await seriousViolations(page)).toEqual([]);
  });
});
