# Bryan Freire · QA Automation Portfolio

[![Site checks](https://github.com/bryanalexfreire/bryanalexfreire.github.io/actions/workflows/site-checks.yml/badge.svg)](https://github.com/bryanalexfreire/bryanalexfreire.github.io/actions/workflows/site-checks.yml)

Personal portfolio of Bryan Freire, QA Automation Engineer (Playwright, API and performance testing). Static single-page site in HTML, modular CSS and vanilla JavaScript, with Spanish/English content and a dark/light theme. Published with GitHub Pages at <https://bryanalexfreire.github.io>.

## Contents

- Hero, results and three case studies (problem, what I built, evidence, result), each linked to a public repository.
- How I can help a team: automation setup, API coverage and load testing.
- Professional experience, stack by layer and certifications with downloadable PDFs.
- CV in Spanish and English (`cv/`).

## The site tests itself

`tests/site.spec.ts` runs with Playwright on desktop and mobile (Pixel 7) on every push and pull request (`.github/workflows/site-checks.yml`):

| Check | What fails the build |
|---|---|
| In-page links | an anchor that points to a section that does not exist |
| Local files | a CSS, script, image, certificate or CV link that does not return 200 |
| Languages | a text key missing in Spanish or English, or the language switch not updating the page and CV links |
| Privacy | a phone number published in the page |
| Layout | horizontal scroll on the page |
| Accessibility | any serious or critical WCAG 2.1 A/AA violation (axe-core), in the dark and the light theme |
| Safety | an external link that opens a new tab without `rel="noopener"` |

Run them locally:

```bash
npm ci
npx playwright install chromium
npm test
```

## Structure

```
index.html            single page (Spanish content by default)
assets/css/           design system (variables, base, components, layout, responsive, print) and sections.css
assets/js/i18n.js     Spanish and English copy, one key per data-i18n element
assets/js/site.js     language, theme, CV links, certificates toggle and scroll ticker
assets/docs/          certificates (PDF)
cv/                   CV in PDF (ES, EN)
tests/                Playwright site checks and a small static server
generate_cv_pdf_bilingual.py   script that builds the CV PDFs
```

## Run locally

```bash
npm run serve   # or: python -m http.server 8000
```

Then open <http://localhost:4173> (or port 8000). Add `?lang=en` for English.

## Related repositories

- [qa-playwright-agents-archetype](https://github.com/bryanalexfreire/qa-playwright-agents-archetype): Playwright + TypeScript framework with UI, API, accessibility and performance tests.
- [serenity-screenplay-e2e](https://github.com/bryanalexfreire/serenity-screenplay-e2e): Serenity BDD with Screenplay, multi-browser, with published reports.
- [karate-api-tests](https://github.com/bryanalexfreire/karate-api-tests): Karate API tests with CI.
- [k6-login-load-test](https://github.com/bryanalexfreire/k6-login-load-test): constant-rate load test with k6 and documented results.
- [selenium-pytest-piano-e2e](https://github.com/bryanalexfreire/selenium-pytest-piano-e2e): Selenium + Pytest with Page Object.
