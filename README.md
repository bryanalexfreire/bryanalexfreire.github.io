# Bryan Freire · QA Automation Portfolio

Personal portfolio of Bryan Freire, QA Automation Engineer. Static single-page site (HTML, modular CSS and vanilla JavaScript) with Spanish/English content and a dark/light theme. Published with GitHub Pages at <https://bryanalexfreire.github.io>.

## Contents

- Profile, skills and professional experience.
- Testing approach by type of problem (functional, E2E, API, performance, framework), each linked to a public repository.
- Certifications with downloadable PDFs.
- CV in Spanish and English (`cv/`).

## Structure

```
index.html            single page, content and i18n dictionary
assets/css/           modular design system (variables, base, components, layout, responsive, print)
assets/js/            page behavior
assets/docs/          certificates (PDF)
cv/                   CV in PDF (ES, EN)
generate_cv_pdf_bilingual.py   script that builds the CV PDFs
```

## Run locally

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Related repositories

- [qa-playwright-agents-archetype](https://github.com/bryanalexfreire/qa-playwright-agents-archetype): Playwright + TypeScript framework with UI, API, accessibility and performance tests.
- [PruebaE2E](https://github.com/bryanalexfreire/PruebaE2E): Serenity BDD with Screenplay.
- [PruebaAPI](https://github.com/bryanalexfreire/PruebaAPI): Karate API tests.
- [k6](https://github.com/bryanalexfreire/k6): load test with k6.
