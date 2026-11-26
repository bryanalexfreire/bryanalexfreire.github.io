#!/usr/bin/env python3
"""Builds the CV pages (ES and EN) as HTML; render.cjs turns them into A4 PDFs.

Usage: npm run cv  (or: python3 scripts/cv/build_cv.py scripts/cv/out)
"""
import html
import sys
from pathlib import Path

OUT = Path(sys.argv[1] if len(sys.argv) > 1 else ".")

CONTACT = {
    "name": "BRYAN ALEXANDER FREIRE CHAMORRO",
    "line1": ["Quito, Ecuador", "+593 984 291 545", "bryanalexfreire@gmail.com"],
    "line2": [
        ("linkedin.com/in/bryanalexanderfreire", "https://www.linkedin.com/in/bryanalexanderfreire"),
        ("github.com/bryanalexfreire", "https://github.com/bryanalexfreire"),
        ("bryanalexfreire.github.io", "https://bryanalexfreire.github.io"),
    ],
}

CV = {
    "es": {
        "file": "CV Bryan Freire",
        "title": "QA Automation Engineer / SDET",
        "tagline": "Playwright + TypeScript · Serenity BDD · Karate · k6 · Azure DevOps · IA aplicada a QA",
        "h_profile": "Perfil profesional",
        "profile": (
            "QA Automation Engineer con más de 4 años en banca y seguros: de pasantías de QA a liderar hoy un equipo "
            "de ~5 QAs en Banco Pichincha. Diseño y mantengo automatización E2E, de API, de contratos y de performance "
            "con Serenity BDD (Screenplay), Karate, Cucumber y k6, integrada en pipelines de Azure DevOps. Llevo la IA "
            "al trabajo diario de QA: un agente con Jira y Xray que reduce el diseño de casos de prueba de medio día a "
            "15 minutos y un servidor MCP para Azure DevOps integrado al IDE. En proyectos propios trabajo con "
            "Playwright + TypeScript, accesibilidad con axe y agentes de prueba con Playwright MCP."
        ),
        "h_skills": "Competencias técnicas",
        "skills": [
            ("Automatización E2E", "Playwright (TypeScript), Serenity BDD (Screenplay), Selenium, Cucumber, Gherkin, POM, Pytest"),
            ("API y contratos", "Karate DSL, Postman, contract testing, pruebas negativas, SQL"),
            ("Performance", "k6, JMeter, Dynatrace"),
            ("Accesibilidad", "axe-core (WCAG 2.1 AA)"),
            ("CI/CD", "Azure DevOps, GitHub Actions, Git, Maven, Gradle, SonarCloud, Docker"),
            ("IA aplicada a QA", "servidores MCP, Playwright MCP, agentes y skills, GitHub Copilot, Claude, ChatGPT"),
            ("Gestión de pruebas", "Jira, Xray, Zephyr, Confluence"),
            ("Lenguajes", "Java, TypeScript, JavaScript, Python, SQL"),
            ("Prácticas", "BDD, ATDD, TDD, testing basado en riesgo, testing exploratorio, Scrum, Kanban"),
        ],
        "h_exp": "Experiencia laboral",
        "stack": "Stack",
        "jobs": [
            {
                "org": "Banco Pichincha",
                "roles": [("Quality Engineer", "Ene. 2026 – Presente")],
                "place": "Quito, Ecuador",
                "bullets": [
                    "Lidero un equipo multifuncional de ~5 QAs en productos core bancarios: Cuentas, Inversiones, Migraciones y Cumplimiento Regulatorio.",
                    "Reduje el tiempo de ejecución de pruebas hasta 75% (E2E 60→20 min, APIs 60→15 min) y aceleré el feedback a desarrollo en 50%.",
                    "Reduje 15% los ciclos de regresión automatizando a nivel de integración y E2E (API y performance).",
                    "Impulsé un agente de IA integrado con Jira y Xray que reduce el diseño de casos de prueba por historia de usuario de medio día a 15 minutos.",
                    "Construí un servidor MCP para Azure DevOps integrado al IDE, que trabaja de forma independiente con skills y sigue las buenas prácticas de Anthropic.",
                    "Implementé contract testing y documentación viva dentro de los pipelines CI/CD, mejorando la trazabilidad de validaciones críticas para negocio y tecnología.",
                    "Alcancé 100% de cobertura automatizada en 13 casos de retención certificados con BDD (Cucumber).",
                    "Mentorizo al equipo en automatización E2E, Karate DSL y performance testing.",
                ],
                "stack": "Java, Serenity BDD, Karate, k6, Cucumber, Azure DevOps, MCP",
            },
            {
                "org": "NTT DATA",
                "roles": [("QA Automation Engineer", "Sep. 2023 – Ene. 2026")],
                "place": "Quito, Ecuador",
                "note": "Consultor QA asignado a Banco Pichincha.",
                "bullets": [
                    "Automaticé la validación de cambios regulatorios en tasas de inversiones: de 3 horas a 30 minutos (83% menos).",
                    "Automaticé los flujos de apertura de cuentas, reduciendo el tiempo de prueba de 30 a 15 minutos.",
                    "Diseñé y automaticé pruebas de aceptación, integración y E2E con Serenity BDD, Cucumber, Selenium y Karate, y las integré en pipelines de Azure DevOps para validar de forma continua en varios navegadores.",
                    "Participé en el refinamiento de requerimientos y en la planificación de pruebas (escenarios, riesgos, estimaciones y dependencias), respaldando las decisiones de paso a producción.",
                    "En el Centro de Excelencia de Calidad capacité a 12 QAs de nuevo ingreso en ISTQB, E2E y Karate (5 pasaron al proyecto del cliente) y lideré el onboarding de ~10 QAs.",
                ],
                "stack": "Java, Serenity BDD, Karate, Postman, JMeter, Azure DevOps",
            },
            {
                "org": "Bayteq",
                "roles": [("Pasante QA", "Mar. 2023 – Jun. 2023")],
                "place": "Quito, Ecuador",
                "bullets": [
                    "Ejecuté pruebas funcionales manuales en web y móvil, y pruebas de API con Postman.",
                    "Apoyé el refinamiento de requerimientos y definí escenarios de aceptación.",
                ],
            },
            {
                "org": "Perseject",
                "roles": [("Analista QA Automation", "Dic. 2022 – Mar. 2023")],
                "place": "Quito, Ecuador",
                "bullets": [
                    "Automaticé pruebas E2E de aplicaciones web con Selenium, Java, Cucumber y Gherkin, y ejecuté pruebas de performance con JMeter.",
                    "Construí flujos de automatización para generar datos de prueba y confirmé que la cobertura respondiera a lo implementado.",
                ],
            },
            {
                "org": "Zurich Seguros Ecuador",
                "roles": [("Pasante QA", "Jul. 2022 – Dic. 2022")],
                "place": "Quito, Ecuador",
                "bullets": [
                    "Participé en la construcción de un arquetipo de automatización con Java, Selenium y Cucumber.",
                    "Validé la consistencia funcional entre navegadores, dispositivos y sistemas operativos.",
                ],
            },
        ],
        "h_projects": "Proyectos públicos (GitHub)",
        "projects": [
            ("qa-playwright-agents-archetype",
             "Framework de Playwright + TypeScript para E2E y API: Page Objects, fixtures, cliente de API tipado con pruebas de contrato y negativas, "
             "accesibilidad con axe (WCAG 2.1 AA), trazabilidad requisito a prueba y quality gates en GitHub Actions en varios navegadores. "
             "Incluye agentes de IA con Playwright MCP y aprobación humana en cada paso; el reporte se publica en GitHub Pages."),
            ("serenity-screenplay-e2e · karate-api-tests · k6-login-load-test",
             "E2E multinavegador con Serenity BDD (Screenplay) y Cucumber, API con Karate (escenarios positivos y negativos) y carga con k6, cada uno con CI."),
        ],
        "h_edu": "Educación",
        "edu": [
            ("Máster en Innovación y Transformación Empresarial con Inteligencia Artificial", "Universidad Internacional de La Rioja (UNIR)", "Oct. 2026 – en curso"),
            ("Diplomado en Project Management", "Pontificia Universidad Católica del Ecuador (PUCE)", "Sep. 2026 – en curso"),
            ("Ingeniería en Sistemas de Información", "Universidad Tecnológica Israel", "2021 – 2024"),
            ("Full Stack Bootcamp", "Kruger Instituto Xponencial", "Jul. – Nov. 2024"),
            ("Inglés", "Open House English", "Sep. 2025 – en curso"),
        ],
        "h_certs": "Certificaciones",
        "certs": [
            ("QA y automatización", [
                "ISTQB® Certified Tester Foundation Level 4.0 (jun. 2024)",
                "ISTQB® Foundation Level Agile Tester (abr. 2025)",
                "ISTQB® Test Automation Engineer, CT-TAE (en curso)",
                "Fundamentos de Ingeniería QA, Banco Pichincha (ene. 2026)",
                "Karate DSL: API Automation and Performance, Udemy (mar. 2025)",
                "QA Automation con Serenity, Udemy (abr. 2025)",
                "K6: pruebas de rendimiento y carga, Udemy (mar. 2025)",
                "Automatización de pruebas REST API (Rest Assured, Postman, Serenity, Karate), JB Enterprise Group (mar. 2024)",
                "Pruebas de usabilidad, UX y accesibilidad, Udemy (oct. 2025)",
                "Testing exploratorio, Udemy (oct. 2025)",
            ]),
            ("CI/CD, DevOps y observabilidad", [
                "DevOps Foundations: CI/CD, Pluralsight (abr. 2025)",
                "DevOps y Cloud con Azure DevOps, Udemy (mar. 2025)",
                "Developing Docker Apps, Pluralsight (abr. 2025)",
                "Git Fundamentals, Pluralsight (abr. 2025)",
                "Dynatrace Fundamentals, Pluralsight (abr. 2025)",
                "SRE: The Big Picture, Pluralsight (mar. 2025)",
            ]),
            ("Agilidad, proyectos e IA", [
                "Certified ScrumMaster® (CSM), Scrum Alliance (nov. 2024)",
                "Fundamentals of Predictive Project Management, PMI (oct. 2026)",
                "Fundamentos de la Dirección de Proyectos Ágiles, PMI (oct. 2026)",
                "Generative AI: Data Governance, Data Fabric y Data Processing, StratioBD (2025)",
                "GitHub Copilot: Fundamentos, Microsoft / Hackathon Banco Pichincha (2025)",
            ]),
        ],
        "h_more": "Idiomas y habilidades",
        "more": [
            ("Idiomas", "Español (nativo) · Inglés (intermedio, B1; en formación)"),
            ("Habilidades", "Orientación a la calidad, pensamiento crítico, trabajo en equipo, comunicación asertiva, toma de decisiones y desarrollo de personas (mentoring)"),
        ],
    },
    "en": {
        "file": "CV Bryan Freire EN",
        "title": "QA Automation Engineer / SDET",
        "tagline": "Playwright + TypeScript · Serenity BDD · Karate · k6 · Azure DevOps · AI in QA",
        "h_profile": "Professional summary",
        "profile": (
            "QA Automation Engineer with 4+ years in banking and insurance: from QA internships to leading a team of "
            "~5 QAs at Banco Pichincha today. I design and maintain E2E, API, contract and performance automation with "
            "Serenity BDD (Screenplay), Karate, Cucumber and k6, integrated into Azure DevOps pipelines. I bring AI into "
            "daily QA work: an agent with Jira and Xray that cuts test case design from half a day to 15 minutes, and an "
            "MCP server for Azure DevOps that works inside the IDE. In my own projects I use Playwright + TypeScript, "
            "accessibility checks with axe and testing agents through Playwright MCP."
        ),
        "h_skills": "Technical skills",
        "skills": [
            ("E2E automation", "Playwright (TypeScript), Serenity BDD (Screenplay), Selenium, Cucumber, Gherkin, POM, Pytest"),
            ("API and contracts", "Karate DSL, Postman, contract testing, negative testing, SQL"),
            ("Performance", "k6, JMeter, Dynatrace"),
            ("Accessibility", "axe-core (WCAG 2.1 AA)"),
            ("CI/CD", "Azure DevOps, GitHub Actions, Git, Maven, Gradle, SonarCloud, Docker"),
            ("AI in QA", "MCP servers, Playwright MCP, agents and skills, GitHub Copilot, Claude, ChatGPT"),
            ("Test management", "Jira, Xray, Zephyr, Confluence"),
            ("Languages", "Java, TypeScript, JavaScript, Python, SQL"),
            ("Practices", "BDD, ATDD, TDD, risk-based testing, exploratory testing, Scrum, Kanban"),
        ],
        "h_exp": "Work experience",
        "stack": "Stack",
        "jobs": [
            {
                "org": "Banco Pichincha",
                "roles": [("Quality Engineer", "Jan 2026 – Present")],
                "place": "Quito, Ecuador",
                "bullets": [
                    "Lead a cross-functional team of ~5 QAs on core banking products: Accounts, Investments, Migrations and Regulatory Compliance.",
                    "Cut test execution time by up to 75% (E2E 60→20 min, APIs 60→15 min) and sped up feedback to development by 50%.",
                    "Reduced regression cycles by 15% by automating at the integration and E2E levels (API and performance).",
                    "Championed an AI agent integrated with Jira and Xray that cuts test case design per user story from half a day to 15 minutes.",
                    "Built an MCP server for Azure DevOps that works inside the IDE, runs independently with skills and follows Anthropic's best practices.",
                    "Implemented contract testing and living documentation inside the CI/CD pipelines, improving traceability of critical validations for business and technology.",
                    "Reached 100% automated coverage on 13 certified retention test cases with BDD (Cucumber).",
                    "Mentor the team on E2E automation, Karate DSL and performance testing.",
                ],
                "stack": "Java, Serenity BDD, Karate, k6, Cucumber, Azure DevOps, MCP",
            },
            {
                "org": "NTT DATA",
                "roles": [("QA Automation Engineer", "Sep 2023 – Jan 2026")],
                "place": "Quito, Ecuador",
                "note": "QA consultant assigned to Banco Pichincha.",
                "bullets": [
                    "Automated the validation of regulatory investment-rate changes: from 3 hours to 30 minutes (83% less).",
                    "Automated the account-opening flows, cutting test time from 30 to 15 minutes.",
                    "Designed and automated acceptance, integration and E2E tests with Serenity BDD, Cucumber, Selenium and Karate, and integrated them into Azure DevOps pipelines for continuous validation across browsers.",
                    "Took part in requirements refinement and test planning (scenarios, risks, estimates and dependencies), supporting go-live decisions.",
                    "In the Quality Center of Excellence, trained 12 new QAs in ISTQB, E2E and Karate (5 moved to the client project) and led the onboarding of ~10 QAs.",
                ],
                "stack": "Java, Serenity BDD, Karate, Postman, JMeter, Azure DevOps",
            },
            {
                "org": "Bayteq",
                "roles": [("QA Intern", "Mar 2023 – Jun 2023")],
                "place": "Quito, Ecuador",
                "bullets": [
                    "Ran manual functional tests on web and mobile, and API tests with Postman.",
                    "Supported requirements refinement and defined acceptance scenarios.",
                ],
            },
            {
                "org": "Perseject",
                "roles": [("QA Automation Analyst", "Dec 2022 – Mar 2023")],
                "place": "Quito, Ecuador",
                "bullets": [
                    "Automated E2E tests for web applications with Selenium, Java, Cucumber and Gherkin, and ran performance tests with JMeter.",
                    "Built automation flows to generate test data and confirmed that coverage matched what was implemented.",
                ],
            },
            {
                "org": "Zurich Insurance (Ecuador)",
                "roles": [("QA Intern", "Jul 2022 – Dec 2022")],
                "place": "Quito, Ecuador",
                "bullets": [
                    "Helped build a test automation archetype with Java, Selenium and Cucumber.",
                    "Checked functional consistency across browsers, devices and operating systems.",
                ],
            },
        ],
        "h_projects": "Public projects (GitHub)",
        "projects": [
            ("qa-playwright-agents-archetype",
             "Playwright + TypeScript framework for E2E and API: page objects, fixtures, a typed API client with contract and negative tests, "
             "accessibility with axe (WCAG 2.1 AA), requirement-to-test traceability and quality gates in GitHub Actions across browsers. "
             "Includes AI testing agents through Playwright MCP with human approval at every step; the report is published on GitHub Pages."),
            ("serenity-screenplay-e2e · karate-api-tests · k6-login-load-test",
             "Multi-browser E2E with Serenity BDD (Screenplay) and Cucumber, API tests with Karate (positive and negative scenarios) and load tests with k6, each with CI."),
        ],
        "h_edu": "Education",
        "edu": [
            ("Master's in Business Innovation and Transformation with AI", "Universidad Internacional de La Rioja (UNIR)", "Oct 2026 – in progress"),
            ("Diploma in Project Management", "Pontificia Universidad Católica del Ecuador (PUCE)", "Sep 2026 – in progress"),
            ("B.S. in Information Systems Engineering", "Universidad Tecnológica Israel", "2021 – 2024"),
            ("Full Stack Bootcamp", "Kruger Instituto Xponencial", "Jul – Nov 2024"),
            ("English", "Open House English", "Sep 2025 – in progress"),
        ],
        "h_certs": "Certifications",
        "certs": [
            ("QA and test automation", [
                "ISTQB® Certified Tester Foundation Level 4.0 (Jun 2024)",
                "ISTQB® Foundation Level Agile Tester (Apr 2025)",
                "ISTQB® Test Automation Engineer, CT-TAE (in progress)",
                "QA Engineering Fundamentals, Banco Pichincha (Jan 2026)",
                "Karate DSL: API Automation and Performance, Udemy (Mar 2025)",
                "QA Automation with Serenity, Udemy (Apr 2025)",
                "K6: Performance and Load Testing, Udemy (Mar 2025)",
                "REST API Test Automation (Rest Assured, Postman, Serenity, Karate), JB Enterprise Group (Mar 2024)",
                "Usability, UX and Accessibility Testing, Udemy (Oct 2025)",
                "Exploratory Testing, Udemy (Oct 2025)",
            ]),
            ("CI/CD, DevOps and observability", [
                "DevOps Foundations: CI/CD, Pluralsight (Apr 2025)",
                "DevOps and Cloud with Azure DevOps, Udemy (Mar 2025)",
                "Developing Docker Apps, Pluralsight (Apr 2025)",
                "Git Fundamentals, Pluralsight (Apr 2025)",
                "Dynatrace Fundamentals, Pluralsight (Apr 2025)",
                "SRE: The Big Picture, Pluralsight (Mar 2025)",
            ]),
            ("Agile, projects and AI", [
                "Certified ScrumMaster® (CSM), Scrum Alliance (Nov 2024)",
                "Fundamentals of Predictive Project Management, PMI (Oct 2026)",
                "Agile Project Management Fundamentals, PMI (Oct 2026)",
                "Generative AI: Data Governance, Data Fabric and Data Processing, StratioBD (2025)",
                "GitHub Copilot Fundamentals, Microsoft / Banco Pichincha Hackathon (2025)",
            ]),
        ],
        "h_more": "Languages and soft skills",
        "more": [
            ("Languages", "Spanish (native) · English (intermediate, B1; currently studying)"),
            ("Soft skills", "Quality mindset, critical thinking, teamwork, assertive communication, decision-making and people development (mentoring)"),
        ],
    },
}

CSS = """
@page { size: A4; margin: 13mm 15mm 12mm; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: Carlito, Calibri, 'Liberation Sans', Arial, sans-serif; font-size: 9.6pt; line-height: 1.27; color: #1b1f24; background: #fff; }
a { color: inherit; text-decoration: none; }
header { text-align: center; padding-bottom: 7pt; border-bottom: 1.2pt solid #1d6b4a; margin-bottom: 8pt; }
h1 { font-size: 19pt; letter-spacing: .7pt; margin: 0; font-weight: 700; }
.role { font-size: 12pt; font-weight: 600; color: #1d6b4a; margin-top: 1pt; }
.tagline { font-size: 9.6pt; color: #3d4450; margin-top: 2pt; }
.contact { font-size: 9.3pt; color: #3d4450; margin-top: 3pt; }
.contact span + span::before { content: "  ·  "; color: #8a919c; white-space: pre; }
h2 { font-size: 10.2pt; text-transform: uppercase; letter-spacing: .8pt; color: #1d6b4a; margin: 9pt 0 4pt; padding-bottom: 1.5pt; border-bottom: .6pt solid #c9d6cf; break-after: avoid; }
p { margin: 0; text-align: justify; }
.skills { display: grid; grid-template-columns: 34mm 1fr; column-gap: 6pt; row-gap: 1.2pt; }
.skills dt { font-weight: 600; }
.skills dd { margin: 0; }
.job { margin-bottom: 6pt; break-inside: avoid-page; }
.job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8pt; }
.org { font-weight: 700; font-size: 10.6pt; }
.place { color: #59606b; font-size: 9.3pt; }
.rl { display: flex; justify-content: space-between; gap: 8pt; }
.rl .t { font-weight: 600; }
.rl .d { color: #3d4450; white-space: nowrap; }
.note { color: #3d4450; font-style: italic; }
ul { margin: 2pt 0 0; padding-left: 11pt; }
li { margin: 0 0 1.2pt; }
li::marker { color: #1d6b4a; }
.stack { color: #3d4450; margin-top: 1.5pt; }
.stack b { color: #1b1f24; font-weight: 600; }
.proj { margin-bottom: 3pt; }
.proj b { font-weight: 600; }
.edu { display: grid; grid-template-columns: 1fr auto; column-gap: 8pt; row-gap: 1.5pt; }
.edu .d { color: #3d4450; white-space: nowrap; text-align: right; }
.edu .s { color: #3d4450; }
.certs .g { margin-bottom: 2.5pt; }
.certs .g b { font-weight: 600; }
.more { display: grid; grid-template-columns: 34mm 1fr; column-gap: 6pt; row-gap: 1.2pt; }
.more dt { font-weight: 600; }
.more dd { margin: 0; }
"""


def e(text):
    return html.escape(text, quote=False)


def page(lang):
    c = CV[lang]
    out = [f'<!doctype html><html lang="{lang}"><head><meta charset="utf-8">',
           f'<title>Bryan Freire – {e(c["title"])}</title><style>{CSS}</style></head><body>']
    out.append('<header>')
    out.append(f'<h1>{CONTACT["name"]}</h1>')
    out.append(f'<div class="role">{e(c["title"])}</div>')
    out.append(f'<div class="tagline">{e(c["tagline"])}</div>')
    out.append('<div class="contact">' + ''.join(f'<span>{e(x)}</span>' for x in CONTACT["line1"]) + '</div>')
    out.append('<div class="contact">' + ''.join(f'<span><a href="{u}">{e(t)}</a></span>' for t, u in CONTACT["line2"]) + '</div>')
    out.append('</header>')

    out.append(f'<h2>{e(c["h_profile"])}</h2><p>{e(c["profile"])}</p>')

    out.append(f'<h2>{e(c["h_skills"])}</h2><dl class="skills">')
    for k, v in c["skills"]:
        out.append(f'<dt>{e(k)}</dt><dd>{e(v)}</dd>')
    out.append('</dl>')

    out.append(f'<h2>{e(c["h_exp"])}</h2>')
    for job in c["jobs"]:
        out.append('<div class="job">')
        out.append(f'<div class="job-head"><span class="org">{e(job["org"])}</span><span class="place">{e(job["place"])}</span></div>')
        for title, dates in job["roles"]:
            out.append(f'<div class="rl"><span class="t">{e(title)}</span><span class="d">{e(dates)}</span></div>')
        if job.get("note"):
            out.append(f'<div class="note">{e(job["note"])}</div>')
        out.append('<ul>' + ''.join(f'<li>{e(b)}</li>' for b in job["bullets"]) + '</ul>')
        if job.get("stack"):
            out.append(f'<div class="stack"><b>{e(c["stack"])}:</b> {e(job["stack"])}</div>')
        out.append('</div>')

    out.append(f'<h2>{e(c["h_projects"])}</h2>')
    for name, desc in c["projects"]:
        out.append(f'<p class="proj"><b>{e(name)}</b>: {e(desc)}</p>')

    out.append(f'<h2>{e(c["h_edu"])}</h2><div class="edu">')
    for degree, school, dates in c["edu"]:
        out.append(f'<div><b>{e(degree)}</b> <span class="s">· {e(school)}</span></div><div class="d">{e(dates)}</div>')
    out.append('</div>')

    out.append(f'<h2>{e(c["h_certs"])}</h2><div class="certs">')
    for group, items in c["certs"]:
        out.append(f'<p class="g"><b>{e(group)}:</b> ' + ' · '.join(e(i) for i in items) + '</p>')
    out.append('</div>')

    out.append(f'<h2>{e(c["h_more"])}</h2><dl class="more">')
    for k, v in c["more"]:
        out.append(f'<dt>{e(k)}</dt><dd>{e(v)}</dd>')
    out.append('</dl>')

    out.append('</body></html>')
    return '\n'.join(out)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for lang in CV:
        path = OUT / f'{CV[lang]["file"]}.html'
        path.write_text(page(lang), encoding="utf-8")
        print(path)
