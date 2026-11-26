// Renders each CV HTML page to an A4 PDF with Chromium.
const { chromium } = require('@playwright/test');
const { readdirSync } = require('node:fs');
const { join, resolve } = require('node:path');
const { pathToFileURL } = require('node:url');

(async () => {
  const dir = resolve(process.argv[2] || '.');
  const out = resolve(process.argv[3] || dir);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const name of readdirSync(dir).filter((f) => f.endsWith('.html'))) {
    await page.goto(pathToFileURL(join(dir, name)).href);
    await page.evaluate(() => document.fonts.ready);
    const pdf = join(out, name.replace(/\.html$/, '.pdf'));
    await page.pdf({ path: pdf, format: 'A4', preferCSSPageSize: true, printBackground: true });
    console.log(pdf);
  }
  await browser.close();
})();
