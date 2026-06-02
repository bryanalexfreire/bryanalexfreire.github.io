document.addEventListener('DOMContentLoaded', function () {
        const navItems = Array.from(document.querySelectorAll('.navbar-menu li[data-target]'));
        const navbar = document.querySelector('.navbar');
        const navbarToggle = document.querySelector('.navbar-toggle');

        function closeMobileMenu() {
          if (!navbar || !navbarToggle) return;
          navbar.classList.remove('is-open');
          navbarToggle.setAttribute('aria-expanded', 'false');
        }

        function toggleMobileMenu() {
          if (!navbar || !navbarToggle) return;
          const isOpen = navbar.classList.toggle('is-open');
          navbarToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }

        if (navbarToggle) {
          navbarToggle.addEventListener('click', toggleMobileMenu);
        }

        window.addEventListener('resize', function () {
          if (window.innerWidth > 980) closeMobileMenu();
        });

        function clearHashFromUrl() {
          if (window.location.hash) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }

        function scrollToTarget(targetId) {
          const section = targetId ? document.getElementById(targetId) : null;
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            clearHashFromUrl();
          }
        }

        const pendingTarget = sessionStorage.getItem('pending-scroll-target');
        if (pendingTarget) {
          sessionStorage.removeItem('pending-scroll-target');
          window.requestAnimationFrame(() => {
            scrollToTarget(pendingTarget);
            setActiveNav(pendingTarget);
          });
        }

        function setActiveNav(targetId) {
          navItems.forEach((item) => {
            item.classList.toggle('active', item.getAttribute('data-target') === targetId);
          });
        }

        navItems.forEach((item) => {
          item.addEventListener('click', function () {
            const targetId = item.getAttribute('data-target');
            scrollToTarget(targetId);
            if (targetId) setActiveNav(targetId);
            closeMobileMenu();
          });

          item.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            const targetId = item.getAttribute('data-target');
            scrollToTarget(targetId);
            if (targetId) setActiveNav(targetId);
            closeMobileMenu();
          });
        });

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener('click', function (event) {
            const targetId = anchor.getAttribute('href').slice(1);
            const target = targetId ? document.getElementById(targetId) : null;
            if (!target) return;
            event.preventDefault();
            scrollToTarget(targetId);
            setActiveNav(targetId);
            closeMobileMenu();
          });
        });

        const langButtons = Array.from(document.querySelectorAll('.lang-btn[data-lang]'));
        const navLabels = {
          es: ['Inicio', 'Experiencia', 'Arquetipos', 'Habilidades', 'Certificaciones', 'Educación', 'Contacto'],
          en: ['Home', 'Experience', 'Blueprints', 'Skills', 'Certifications', 'Education', 'Contact']
        };

        const fixedTextBySelector = {
          '.navbar-cv': { es: 'Descargar CV ATS', en: 'Download ATS CV' },
          '.hero-links a[href="#arquetipos"]': { es: 'Ver proyectos', en: 'View projects' },
          '.specialties-title': { es: 'Especialidades', en: 'Specialties' },
          '.hero-subtitle': { es: 'QA Automation & API + Performance Engineer', en: 'QA Automation & API + Performance Engineer' },
          '.hero-description': { es: 'Ingeniero de Calidad de Software con 4+ años de experiencia en automatización de pruebas, API Testing y Performance Testing. Especializado en diseñar estrategias de calidad, framework robustos y pipelines de CI/CD que impulsan la calidad y aceleran la entrega de software.', en: 'Software Quality Engineer with 4+ years of experience in test automation, API Testing, and Performance Testing. Specialized in designing quality strategies, robust frameworks, and CI/CD pipelines that improve quality and speed up software delivery.' },
          '.skills-tech-title': { es: 'Habilidades Técnicas', en: 'Technical Skills' },
          '.cert-highlight-title': { es: 'Certificaciones Destacadas', en: 'Featured Certifications' },
          '.cert-highlight-link': { es: 'Ver todas las certificaciones →', en: 'View all certifications →' },
          '.contact-cta-copy h3': { es: '¿Hablamos sobre cómo puedo aportar a tu equipo?', en: 'Shall we talk about how I can add value to your team?' },
          '.contact-cta-copy p': { es: 'Estoy abierto a nuevas oportunidades y proyectos desafiantes.', en: 'I am open to new opportunities and challenging projects.' },
          '.xp-pro-title': { es: 'Experiencia Profesional', en: 'Professional Experience' },
          '.xp-pro-subtitle': { es: 'Trayectoria en calidad, automatización y performance testing', en: 'Track record in quality, automation, and performance testing' },
          '.arquetipos-title': { es: 'Arquetipos de Automatización', en: 'Automation Blueprints' },
          '.arquetipos-subtitle': { es: 'Enfoques y soluciones implementadas en diferentes tipos de pruebas automatizadas.', en: 'Approaches and solutions implemented across different automated testing types.' },
          '.arquetipos-grid .arquetipo-card:nth-child(1) h3': { es: 'E2E Automation', en: 'E2E Automation' },
          '.arquetipos-grid .arquetipo-card:nth-child(2) h3': { es: 'API Automation', en: 'API Automation' },
          '.arquetipos-grid .arquetipo-card:nth-child(3) h3': { es: 'Performance Testing', en: 'Performance Testing' },
          '.arquetipos-grid .arquetipo-card:nth-child(1) .arquetipo-btn': { es: 'Ver arquetipo E2E →', en: 'View E2E blueprint →' },
          '.arquetipos-grid .arquetipo-card:nth-child(2) .arquetipo-btn': { es: 'Ver arquetipo API →', en: 'View API blueprint →' },
          '.arquetipos-grid .arquetipo-card:nth-child(3) .arquetipo-btn': { es: 'Ver arquetipo Performance →', en: 'View Performance blueprint →' },
          '.skills-tech-card:nth-child(1) .skills-tech-card-header': { es: '⚙️ Automatización', en: '⚙️ Automation' },
          '.skills-tech-card:nth-child(2) .skills-tech-card-header': { es: '🔗 APIs & Backend', en: '🔗 APIs & Backend' },
          '.skills-tech-card:nth-child(3) .skills-tech-card-header': { es: '⚡ Performance', en: '⚡ Performance' },
          '.skills-tech-card:nth-child(4) .skills-tech-card-header': { es: '🔧 DevOps & CI/CD', en: '🔧 DevOps & CI/CD' },
          '.skills-tech-card:nth-child(5) .skills-tech-card-header': { es: '💻 Lenguajes', en: '💻 Languages' },
          '.skills-tech-card:nth-child(6) .skills-tech-card-header': { es: '🧪 Gestión & Calidad', en: '🧪 Management & Quality' },
          '.metric-card.green:nth-child(1) .metric-text span': { es: 'Cobertura funcional y de regresión', en: 'Functional and regression coverage' },
          '.metric-card.blue:nth-child(2) .metric-text span': { es: 'Tiempo de feedback técnico', en: 'Technical feedback time' },
          '.metric-card.purple:nth-child(3) .metric-text span': { es: 'Defectos post-release en producción', en: 'Post-release production defects' },
          '.metric-card.green:nth-child(4) .metric-text span': { es: 'Productividad y autonomía del equipo', en: 'Team productivity and autonomy' }
        };

        function autoTranslateToEnglish(text) {
          const pairs = [
            [/\bIngeniero de Calidad de Software\b/gi, 'Software Quality Engineer'],
            [/\bcon 4\+ años de experiencia\b/gi, 'with 4+ years of experience'],
            [/\bautomatización de pruebas\b/gi, 'test automation'],
            [/\bEspecializado en diseñar estrategias de calidad\b/gi, 'Specialized in designing quality strategies'],
            [/\bframework robustos\b/gi, 'robust frameworks'],
            [/\by pipelines de CI\/CD\b/gi, 'and CI/CD pipelines'],
            [/\bque impulsan la calidad y aceleran la entrega de software\b/gi, 'that increase quality and speed up software delivery'],
            [/\bAutomatización de flujos end-to-end\b/gi, 'End-to-end flow automation'],
            [/\bde aplicaciones críticas de negocio\b/gi, 'for critical business applications'],
            [/\bValidación de servicios y contratos API\b/gi, 'Validation of API services and contracts'],
            [/\bde forma robusta y escalable\b/gi, 'in a robust and scalable way'],
            [/\bPruebas de carga, estrés y capacidad\b/gi, 'Load, stress, and capacity testing'],
            [/\bpara garantizar rendimiento y estabilidad\b/gi, 'to ensure performance and stability'],
            [/\bReportes avanzados\b/gi, 'Advanced reporting'],
            [/\bIntegración\b/gi, 'Integration'],
            [/\bPrácticas\b/gi, 'Practices'],
            [/\bcobertura\b/gi, 'coverage'],
            [/\btrazabilidad\b/gi, 'traceability'],
            [/\bregresión\b/gi, 'regression'],
            [/\bManejo de datos y pruebas negativas\b/gi, 'Data handling and negative testing'],
            [/\bReportes automáticos\b/gi, 'Automated reports'],
            [/\bdocumentación viva\b/gi, 'living documentation'],
            [/\bsuites reutilizables\b/gi, 'reusable suites'],
            [/\bEscenarios de carga\b/gi, 'Load scenarios'],
            [/\busuarios concurrentes\b/gi, 'concurrent users'],
            [/\bValidación de SLAs\b/gi, 'SLA validation'],
            [/\bchecks automáticos\b/gi, 'automated checks'],
            [/\bReportes y dashboards visuales\b/gi, 'Reports and visual dashboards'],
            [/\bscripts versionados\b/gi, 'versioned scripts'],
            [/\bautomatización\b/gi, 'automation'],
            [/\breporting visual\b/gi, 'visual reporting'],
            [/\bmantenibles\b/gi, 'maintainable'],
            [/\bAnálisis de Resultados\b/gi, 'Results Analysis'],
            [/\bMonitoreo\b/gi, 'Monitoring'],
            [/\bLenguajes\b/gi, 'Languages'],
            [/\bGestión & Calidad\b/gi, 'Management & Quality'],
            [/\bVer arquetipo\b/gi, 'View blueprint'],
            [/\bEne\.\b/g, 'Jan.'],
            [/\bAbr\.\b/g, 'Apr.'],
            [/\bAgo\.\b/g, 'Aug.'],
            [/\bDic\.\b/g, 'Dec.'],
            [/\bPresente\b/gi, 'Present'],
            [/\bPosición actual\b/gi, 'Current position'],
            [/\bPasante QA\b/gi, 'QA Intern'],
            [/\bResponsable de liderar iniciativas de calidad para productos bancarios digitales mediante automatización de APIs, pruebas de rendimiento y estrategias de validación basadas en riesgo\./gi, 'Responsible for leading quality initiatives for digital banking products through API automation, performance testing, and risk-based validation strategies.'],
            [/\bParticipación activa en iniciativas CI\/CD, optimización de ciclos de regresión y fortalecimiento de capacidades técnicas del equipo QA\./gi, 'Active participation in CI/CD initiatives, regression cycle optimization, and strengthening technical capabilities of the QA team.'],
            [/\bLideré iniciativas de automatización API utilizando Karate y SerenityBDD\./gi, 'Led API automation initiatives using Karate and SerenityBDD.'],
            [/\bDiseñé estrategias de validación basadas en riesgo junto a negocio y riesgos\./gi, 'Designed risk-based validation strategies together with business and risk teams.'],
            [/\bImplementé pruebas de rendimiento en flujos bancarios de alto volumen mediante K6\./gi, 'Implemented performance testing on high-volume banking flows using K6.'],
            [/\bIntegré controles de calidad dentro de pipelines CI\/CD\./gi, 'Integrated quality controls into CI/CD pipelines.'],
            [/\bPriorizé suites de validación API según criticidad funcional\./gi, 'Prioritized API validation suites by functional criticality.'],
            [/\bMentoricé QA en automatización, API testing y BDD\./gi, 'Mentored QA engineers in automation, API testing, and BDD.'],
            [/\bcobertura funcional y regresión\b/gi, 'functional and regression coverage'],
            [/\bdefectos post-release\b/gi, 'post-release defects'],
            [/\btiempo de feedback técnico\b/gi, 'technical feedback time'],
            [/\bdetección temprana de incidencias críticas\b/gi, 'early detection of critical incidents'],
            [/\btiempos de respuesta en pruebas de performance\b/gi, 'response times in performance tests'],
            [/\bautonomía técnica del equipo\b/gi, 'team technical autonomy'],
            [/\bAutomatización de validaciones de APIs bancarias críticas\./gi, 'Automation of critical banking API validations.'],
            [/\bIntegración Azure DevOps\b/gi, 'Azure DevOps integration'],
            [/\bEjecución paralela\b/gi, 'Parallel execution'],
            [/\bPruebas de rendimiento para servicios bancarios de alto volumen\./gi, 'Performance testing for high-volume banking services.'],
            [/\breportes automatizados\b/gi, 'automated reports'],
            [/\bdetección temprana de cuellos de botella\b/gi, 'early bottleneck detection'],
            [/\bFramework de priorización basado en riesgo para ciclos de regresión\./gi, 'Risk-based prioritization framework for regression cycles.'],
            [/\bClasificación por criticidad\b/gi, 'Criticality classification'],
            [/\bPriorización de escenarios\b/gi, 'Scenario prioritization'],
            [/\bMatriz riesgo-impacto\b/gi, 'Risk-impact matrix'],
            [/\bdefectos productivos\b/gi, 'production defects'],
            [/\bResponsable del diseño y ejecución de estrategias de pruebas funcionales, automatizadas y de rendimiento para proyectos financieros y empresariales\./gi, 'Responsible for designing and executing functional, automated, and performance testing strategies for financial and enterprise projects.'],
            [/\bParticipación en iniciativas de automatización E2E, APIs y mejora continua dentro de equipos ágiles\./gi, 'Participated in E2E automation, API initiatives, and continuous improvement within agile teams.'],
            [/\bDiseñé estrategias de pruebas funcionales y automatizadas\./gi, 'Designed functional and automated testing strategies.'],
            [/\bImplementé automatización API y E2E\./gi, 'Implemented API and E2E automation.'],
            [/\bEjecuté pruebas de rendimiento con K6\./gi, 'Executed performance tests with K6.'],
            [/\bGestioné riesgos y planificación en equipos ágiles\./gi, 'Managed risks and planning in agile teams.'],
            [/\bValidé integraciones mediante REST APIs y PostgreSQL\./gi, 'Validated integrations through REST APIs and PostgreSQL.'],
            [/\bcobertura de requerimientos\b/gi, 'requirements coverage'],
            [/\btiempo de regresión por release\b/gi, 'regression time per release'],
            [/\bpredictibilidad de entregas\b/gi, 'delivery predictability'],
            [/\bdefectos detectados en UAT\b/gi, 'defects detected in UAT'],
            [/\bValidación de APIs para recarga de Tarjeta Ciudad\./gi, 'API validation for Tarjeta Ciudad top-up flows.'],
            [/\bcobertura en escenarios críticos\b/gi, 'coverage in critical scenarios'],
            [/\bdefectos tardíos\b/gi, 'late defects'],
            [/\bAutomatización de cuentas de inversión y ahorro\./gi, 'Automation of investment and savings accounts.'],
            [/\bciclo de validación\b/gi, 'validation cycle'],
            [/\bAutomatización de regresión de procesos críticos\./gi, 'Regression automation for critical processes.'],
            [/\btiempo de regresión\b/gi, 'regression time'],
            [/\bParticipación en actividades de análisis, planificación y ejecución de pruebas para productos financieros, colaborando con equipos QA y desarrollo\./gi, 'Participated in analysis, planning, and test execution activities for financial products, collaborating with QA and development teams.'],
            [/\bAnálisis de requerimientos\./gi, 'Requirements analysis.'],
            [/\bDiseño de casos de prueba\./gi, 'Test case design.'],
            [/\bEjecución funcional\./gi, 'Functional execution.'],
            [/\bGestión de defectos\./gi, 'Defect management.'],
            [/\bSeguimiento de calidad\./gi, 'Quality follow-up.'],
            [/\bclaridad de criterios de aceptación\b/gi, 'acceptance criteria clarity'],
            [/\bresolución en primer ciclo\b/gi, 'first-cycle resolution'],
            [/\bretrabajos previos a pruebas\b/gi, 'pre-test rework'],
            [/\bvisibilidad de calidad\b/gi, 'quality visibility'],
            [/\bOptimización del proceso de preparación para pruebas\./gi, 'Optimization of the test readiness process.'],
            [/\bmenos retrabajo\b/gi, 'less rework'],
            [/\bmayor alineación entre equipos\b/gi, 'better team alignment'],
            [/\bParticipación en pruebas automatizadas y de rendimiento para aplicaciones web empresariales\./gi, 'Participated in automated and performance testing for enterprise web applications.'],
            [/\bDiseño de pruebas automatizadas\./gi, 'Automated test design.'],
            [/\bEjecución de pruebas de carga\./gi, 'Load test execution.'],
            [/\bValidación cross-browser\./gi, 'Cross-browser validation.'],
            [/\bReportería de calidad\./gi, 'Quality reporting.'],
            [/\bincidencias productivas\b/gi, 'production incidents'],
            [/\bestabilidad cross-platform\b/gi, 'cross-platform stability'],
            [/\bvelocidad de liberación\b/gi, 'release speed'],
            [/\bdefectos repetitivos\b/gi, 'repetitive defects'],
            [/\bAutomatización funcional para aplicaciones web\./gi, 'Functional automation for web applications.'],
            [/\bmenos incidencias productivas\b/gi, 'fewer production incidents'],
            [/\bmayor cobertura funcional\b/gi, 'higher functional coverage'],
            [/\bPruebas de carga y estrés\./gi, 'Load and stress testing.'],
            [/\boptimización de estabilidad\b/gi, 'stability optimization'],
            [/\bApoyo en iniciativas de calidad para aplicaciones de seguros mediante automatización, pruebas funcionales y validación de rendimiento\./gi, 'Supported quality initiatives for insurance applications through automation, functional testing, and performance validation.'],
            [/\bEjecución de pruebas funcionales y automatizadas en módulos de seguros\./gi, 'Executed functional and automated tests in insurance modules.'],
            [/\bValidación de datos de prueba con apoyo de SQL y Excel\./gi, 'Validated test data using SQL and Excel.'],
            [/\bSoporte a iniciativas de performance y documentación de resultados\./gi, 'Supported performance initiatives and results documentation.'],
            [/\bcobertura de escenarios críticos\b/gi, 'critical scenario coverage'],
            [/\binconsistencias de datos\b/gi, 'data inconsistencies'],
            [/\bvisibilidad de cobertura\b/gi, 'coverage visibility'],
            [/\breprocesos de validación\b/gi, 'validation rework'],
            [/\bAutomatización y validación de sistemas de seguros\./gi, 'Automation and validation of insurance systems.'],
            [/\bSoporte operativo y tecnológico para sistemas bancarios\./gi, 'Operational and technological support for banking systems.'],
            [/\bSoporte técnico a usuarios y seguimiento de incidencias\./gi, 'Technical user support and incident follow-up.'],
            [/\bEjecución de mantenimiento preventivo y correctivo\./gi, 'Preventive and corrective maintenance execution.'],
            [/\bGestión de prioridades operativas bajo SLA\./gi, 'Operational priority management under SLA.'],
            [/\bMejora en atención de incidencias\b/gi, 'incident response improvement'],
            [/\bInterrupciones operativas\b/gi, 'operational interruptions'],
            [/\bCumplimiento SLA\b/gi, 'SLA compliance'],
            [/\beficiencia operativa\b/gi, 'operational efficiency'],
            [/\bMesa de ayuda\b/gi, 'Help Desk'],
            [/\bSoporte operativo\b/gi, 'Operational support'],
            [/\bGestión de tickets\b/gi, 'Ticket management'],
            [/\bSoporte tecnológico para usuarios locales y remotos en operaciones petroleras\./gi, 'Technological support for local and remote users in oil operations.'],
            [/\bAtención a incidencias de primer nivel para usuarios locales y remotos\./gi, 'First-level incident support for local and remote users.'],
            [/\bDocumentación y seguimiento de fallas recurrentes\./gi, 'Documentation and follow-up of recurring failures.'],
            [/\bCoordinación con mesa internacional para resolución de casos\./gi, 'Coordination with international help desk for case resolution.'],
            [/\bMejora en tiempos de respuesta\b/gi, 'response time improvement'],
            [/\bReincidencias\b/gi, 'recurrences'],
            [/\bCierre efectivo de casos\b/gi, 'effective case closure'],
            [/\bSoporte remoto\b/gi, 'Remote support'],
            [/\bGestión de incidentes\b/gi, 'Incident management'],
            [/\bTesting Funcional\b/gi, 'Functional Testing']
          ];

          let result = text || '';
          pairs.forEach(([pattern, replacement]) => {
            result = result.replace(pattern, replacement);
          });
          return result;
        }

        window.XP_DETAIL_TRANSLATE = autoTranslateToEnglish;

        function setText(selector, value) {
          const node = document.querySelector(selector);
          if (node && value) node.textContent = value;
        }

        function translateDynamicNodeList(lang) {
          const selectors = [
            '.xp-timeline-role',
            '.xp-timeline-status',
            '.contact-cta-btn'
          ];

          selectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((node) => {
              if (!node.dataset.esText) {
                node.dataset.esText = node.textContent.trim();
              }
              if (lang === 'en') {
                node.textContent = autoTranslateToEnglish(node.dataset.esText);
              } else {
                node.textContent = node.dataset.esText;
              }
            });
          });

          const ctaButton = document.getElementById('contact-cta-btn');
          if (ctaButton) {
            ctaButton.innerHTML = lang === 'en' ? 'Contact <span aria-hidden="true">→</span>' : 'Contactar <span aria-hidden="true">→</span>';
          }
        }

        function applyStructuredTranslations(lang) {
          const arqDescEs = [
            'Automatización de flujos end-to-end de aplicaciones críticas de negocio.',
            'Validación de servicios y contratos API de forma robusta y escalable.',
            'Pruebas de carga, estrés y capacidad para garantizar rendimiento y estabilidad.'
          ];
          const arqDescEn = [
            'End-to-end automation for critical business application flows.',
            'Robust and scalable validation of API services and contracts.',
            'Load, stress, and capacity testing to ensure performance and stability.'
          ];

          const arqListEs = [
            'Selenium, SerenityBDD, Cucumber, Gradle',
            'Screenplay Pattern, POM, OOP, SOLID',
            'Data-Driven Testing (Excel/CSV)',
            'Reportes avanzados (Serenity, JUnit, Cucumber JSON)',
            'Integración CI/CD (PowerShell, multi-navegador)',
            'Prácticas ISTQB: cobertura, trazabilidad, regresión',
            'Agile Tester & TAE: BDD, modularidad, arquitectura robusta',
            'Karate, Cucumber, Gherkin, Java, Gradle, Postman',
            'Validación de contratos y esquemas',
            'Manejo de datos y pruebas negativas',
            'Mocks & Stubs, colecciones Postman',
            'Reportes automáticos (Karate, Cucumber HTML)',
            'Integración CI/CD, pipelines',
            'Prácticas ISTQB: cobertura, regresión, trazabilidad',
            'Agile Tester & TAE: BDD, documentación viva, suites reutilizables',
            'k6, JMeter, JavaScript, Grafana',
            'Escenarios de carga, stress, usuarios concurrentes',
            'Validación de SLAs, checks automáticos',
            'Reportes y dashboards visuales (Grafana, k6 Cloud)',
            'Integración CI/CD, scripts versionados',
            'Prácticas ISTQB: pruebas no funcionales, regresión, trazabilidad',
            'Agile Tester & TAE: automatización, reporting visual, scripts mantenibles'
          ];
          const arqListEn = [
            'Selenium, SerenityBDD, Cucumber, Gradle',
            'Screenplay Pattern, POM, OOP, SOLID',
            'Data-Driven Testing (Excel/CSV)',
            'Advanced reporting (Serenity, JUnit, Cucumber JSON)',
            'CI/CD integration (PowerShell, multi-browser)',
            'ISTQB practices: coverage, traceability, regression',
            'Agile Tester & TAE: BDD, modularity, robust architecture',
            'Karate, Cucumber, Gherkin, Java, Gradle, Postman',
            'Contract and schema validation',
            'Data handling and negative testing',
            'Mocks & stubs, Postman collections',
            'Automated reports (Karate, Cucumber HTML)',
            'CI/CD integration, pipelines',
            'ISTQB practices: coverage, regression, traceability',
            'Agile Tester & TAE: BDD, living documentation, reusable suites',
            'k6, JMeter, JavaScript, Grafana',
            'Load scenarios, stress, concurrent users',
            'SLA validation, automated checks',
            'Reports and visual dashboards (Grafana, k6 Cloud)',
            'CI/CD integration, versioned scripts',
            'ISTQB practices: non-functional testing, regression, traceability',
            'Agile Tester & TAE: automation, visual reporting, maintainable scripts'
          ];

          const skillsEs = [
            'Selenium', 'SerenityBDD', 'Cucumber', 'Karate', 'Screenplay Pattern', 'POM',
            'REST APIs', 'Postman', 'Karate', 'RestAssured', 'API Contract Testing',
            'K6', 'JMeter', 'Gatling', 'Análisis de Resultados', 'Monitoreo',
            'Git', 'Jenkins', 'Docker', 'Azure DevOps',
            'Java', 'Python', 'JavaScript', 'SQL',
            'Scrum / Kanban', 'Jira / X-ray', 'Trello', 'Confluence', 'TDD / BDD / ATDD'
          ];
          const skillsEn = [
            'Selenium', 'SerenityBDD', 'Cucumber', 'Karate', 'Screenplay Pattern', 'POM',
            'REST APIs', 'Postman', 'Karate', 'RestAssured', 'API Contract Testing',
            'K6', 'JMeter', 'Gatling', 'Results Analysis', 'Monitoring',
            'Git', 'Jenkins', 'Docker', 'Azure DevOps',
            'Java', 'Python', 'JavaScript', 'SQL',
            'Scrum / Kanban', 'Jira / X-ray', 'Trello', 'Confluence', 'TDD / BDD / ATDD'
          ];

          const descSet = lang === 'en' ? arqDescEn : arqDescEs;
          document.querySelectorAll('.arquetipo-desc').forEach((node, idx) => {
            if (descSet[idx]) node.textContent = descSet[idx];
          });

          const listSet = lang === 'en' ? arqListEn : arqListEs;
          document.querySelectorAll('.arquetipo-list li').forEach((node, idx) => {
            if (listSet[idx]) node.textContent = listSet[idx];
          });

          const skillSet = lang === 'en' ? skillsEn : skillsEs;
          document.querySelectorAll('.skills-tech-card li').forEach((node, idx) => {
            if (skillSet[idx]) node.textContent = skillSet[idx];
          });
        }

        function applyLanguage(lang) {
          document.documentElement.lang = lang;
          localStorage.setItem('site-lang', lang);

          const langSet = navLabels[lang] || navLabels.es;
          navItems.forEach((item, index) => {
            if (langSet[index]) item.textContent = langSet[index];
          });

          Object.entries(fixedTextBySelector).forEach(([selector, values]) => {
            setText(selector, values[lang] || values.es);
          });

          const cvButton = document.querySelector('.navbar-cv');
          if (cvButton) {
            cvButton.setAttribute('href', lang === 'en' ? 'cv-resumen-en.html' : 'cv-resumen.html');
          }

          const titleEs = 'Bryan Alexander Freire Chamorro - QA Automation & API + Performance Engineer';
          const titleEn = 'Bryan Alexander Freire Chamorro - QA Automation & API + Performance Engineer';
          document.title = lang === 'en' ? titleEn : titleEs;

          const descriptionNode = document.querySelector('meta[name="description"]');
          if (descriptionNode) {
            const descriptionEs = 'Landing profesional de Bryan Alexander Freire Chamorro, QA Automation, API y Performance Engineer. Estrategias de automatización, testing y DevOps.';
            const descriptionEn = 'Professional landing page of Bryan Alexander Freire Chamorro, QA Automation, API and Performance Engineer. Automation, testing and DevOps strategies.';
            descriptionNode.setAttribute('content', lang === 'en' ? descriptionEn : descriptionEs);
          }

          applyStructuredTranslations(lang);
          translateDynamicNodeList(lang);
          langButtons.forEach((other) => {
            other.classList.toggle('active', other.getAttribute('data-lang') === lang);
          });

          if (typeof window.renderXpDetailPanel === 'function') {
            const currentIdx = typeof window.getXpCurrentIndex === 'function' ? window.getXpCurrentIndex() : 0;
            window.renderXpDetailPanel(currentIdx);
          }
        }

        const savedLang = localStorage.getItem('site-lang') || 'es';
        applyLanguage(savedLang);

        langButtons.forEach((btn) => {
          btn.addEventListener('click', function () {
            const lang = btn.getAttribute('data-lang') || 'es';
            applyLanguage(lang);
          });
        });

        clearHashFromUrl();
      });

document.addEventListener('DOMContentLoaded', function () {
        const navItems = Array.from(document.querySelectorAll('.navbar-menu li[data-target]'));

        function clearHashFromUrl() {
          if (window.location.hash) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }

        function scrollToTarget(targetId) {
          const section = targetId ? document.getElementById(targetId) : null;
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            clearHashFromUrl();
          }
        }

        const pendingTarget = sessionStorage.getItem('pending-scroll-target');
        if (pendingTarget) {
          sessionStorage.removeItem('pending-scroll-target');
          window.requestAnimationFrame(() => {
            scrollToTarget(pendingTarget);
            setActiveNav(pendingTarget);
          });
        }

        function setActiveNav(targetId) {
          navItems.forEach((item) => {
            item.classList.toggle('active', item.getAttribute('data-target') === targetId);
          });
        }

        navItems.forEach((item) => {
          item.addEventListener('click', function () {
            const targetId = item.getAttribute('data-target');
            scrollToTarget(targetId);
            if (targetId) setActiveNav(targetId);
          });
        });

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
          anchor.addEventListener('click', function (event) {
            const targetId = anchor.getAttribute('href').slice(1);
            const target = targetId ? document.getElementById(targetId) : null;
            if (!target) return;
            event.preventDefault();
            scrollToTarget(targetId);
            setActiveNav(targetId);
          });
        });

        const langButtons = Array.from(document.querySelectorAll('.lang-btn[data-lang]'));
        const navLabels = {
          es: ['Inicio', 'Experiencia', 'Arquetipos', 'Habilidades', 'Certificaciones', 'Educación', 'Contacto'],
          en: ['Home', 'Experience', 'Blueprints', 'Skills', 'Certifications', 'Education', 'Contact']
        };

        const fixedTextBySelector = {
          '.navbar-cv': { es: 'Descargar CV ATS', en: 'Download ATS CV' },
          '.hero-links a[href="#arquetipos"]': { es: 'Ver proyectos', en: 'View projects' },
          '.specialties-title': { es: 'Especialidades', en: 'Specialties' },
          '.hero-subtitle': { es: 'QA Automation & API + Performance Engineer', en: 'QA Automation & API + Performance Engineer' },
          '.hero-description': { es: 'Ingeniero de Calidad de Software con 4+ años de experiencia en automatización de pruebas, API Testing y Performance Testing. Especializado en diseñar estrategias de calidad, framework robustos y pipelines de CI/CD que impulsan la calidad y aceleran la entrega de software.', en: 'Software Quality Engineer with 4+ years of experience in test automation, API Testing, and Performance Testing. Specialized in designing quality strategies, robust frameworks, and CI/CD pipelines that improve quality and speed up software delivery.' },
          '.skills-tech-title': { es: 'Habilidades Técnicas', en: 'Technical Skills' },
          '.cert-highlight-title': { es: 'Certificaciones Destacadas', en: 'Featured Certifications' },
          '.cert-highlight-link': { es: 'Ver todas las certificaciones →', en: 'View all certifications →' },
          '.contact-cta-copy h3': { es: '¿Hablamos sobre cómo puedo aportar a tu equipo?', en: 'Shall we talk about how I can add value to your team?' },
          '.contact-cta-copy p': { es: 'Estoy abierto a nuevas oportunidades y proyectos desafiantes.', en: 'I am open to new opportunities and challenging projects.' },
          '.xp-pro-title': { es: 'Experiencia Profesional', en: 'Professional Experience' },
          '.xp-pro-subtitle': { es: 'Trayectoria en calidad, automatización y performance testing', en: 'Track record in quality, automation, and performance testing' },
          '.arquetipos-title': { es: 'Arquetipos de Automatización', en: 'Automation Blueprints' },
          '.arquetipos-subtitle': { es: 'Enfoques y soluciones implementadas en diferentes tipos de pruebas automatizadas.', en: 'Approaches and solutions implemented across different automated testing types.' },
          '.arquetipos-grid .arquetipo-card:nth-child(1) h3': { es: 'E2E Automation', en: 'E2E Automation' },
          '.arquetipos-grid .arquetipo-card:nth-child(2) h3': { es: 'API Automation', en: 'API Automation' },
          '.arquetipos-grid .arquetipo-card:nth-child(3) h3': { es: 'Performance Testing', en: 'Performance Testing' },
          '.arquetipos-grid .arquetipo-card:nth-child(1) .arquetipo-btn': { es: 'Ver arquetipo E2E →', en: 'View E2E blueprint →' },
          '.arquetipos-grid .arquetipo-card:nth-child(2) .arquetipo-btn': { es: 'Ver arquetipo API →', en: 'View API blueprint →' },
          '.arquetipos-grid .arquetipo-card:nth-child(3) .arquetipo-btn': { es: 'Ver arquetipo Performance →', en: 'View Performance blueprint →' },
          '.skills-tech-card:nth-child(1) .skills-tech-card-header': { es: '⚙️ Automatización', en: '⚙️ Automation' },
          '.skills-tech-card:nth-child(2) .skills-tech-card-header': { es: '🔗 APIs & Backend', en: '🔗 APIs & Backend' },
          '.skills-tech-card:nth-child(3) .skills-tech-card-header': { es: '⚡ Performance', en: '⚡ Performance' },
          '.skills-tech-card:nth-child(4) .skills-tech-card-header': { es: '🔧 DevOps & CI/CD', en: '🔧 DevOps & CI/CD' },
          '.skills-tech-card:nth-child(5) .skills-tech-card-header': { es: '💻 Lenguajes', en: '💻 Languages' },
          '.skills-tech-card:nth-child(6) .skills-tech-card-header': { es: '🧪 Gestión & Calidad', en: '🧪 Management & Quality' },
          '.metric-card.green:nth-child(1) .metric-text span': { es: 'Cobertura funcional y de regresión', en: 'Functional and regression coverage' },
          '.metric-card.blue:nth-child(2) .metric-text span': { es: 'Tiempo de feedback técnico', en: 'Technical feedback time' },
          '.metric-card.purple:nth-child(3) .metric-text span': { es: 'Defectos post-release en producción', en: 'Post-release production defects' },
          '.metric-card.green:nth-child(4) .metric-text span': { es: 'Productividad y autonomía del equipo', en: 'Team productivity and autonomy' }
        };

        function autoTranslateToEnglish(text) {
          const pairs = [
            [/\bIngeniero de Calidad de Software\b/gi, 'Software Quality Engineer'],
            [/\bcon 4\+ años de experiencia\b/gi, 'with 4+ years of experience'],
            [/\bautomatización de pruebas\b/gi, 'test automation'],
            [/\bEspecializado en diseñar estrategias de calidad\b/gi, 'Specialized in designing quality strategies'],
            [/\bframework robustos\b/gi, 'robust frameworks'],
            [/\by pipelines de CI\/CD\b/gi, 'and CI/CD pipelines'],
            [/\bque impulsan la calidad y aceleran la entrega de software\b/gi, 'that increase quality and speed up software delivery'],
            [/\bAutomatización de flujos end-to-end\b/gi, 'End-to-end flow automation'],
            [/\bde aplicaciones críticas de negocio\b/gi, 'for critical business applications'],
            [/\bValidación de servicios y contratos API\b/gi, 'Validation of API services and contracts'],
            [/\bde forma robusta y escalable\b/gi, 'in a robust and scalable way'],
            [/\bPruebas de carga, estrés y capacidad\b/gi, 'Load, stress, and capacity testing'],
            [/\bpara garantizar rendimiento y estabilidad\b/gi, 'to ensure performance and stability'],
            [/\bReportes avanzados\b/gi, 'Advanced reporting'],
            [/\bIntegración\b/gi, 'Integration'],
            [/\bPrácticas\b/gi, 'Practices'],
            [/\bcobertura\b/gi, 'coverage'],
            [/\btrazabilidad\b/gi, 'traceability'],
            [/\bregresión\b/gi, 'regression'],
            [/\bManejo de datos y pruebas negativas\b/gi, 'Data handling and negative testing'],
            [/\bReportes automáticos\b/gi, 'Automated reports'],
            [/\bdocumentación viva\b/gi, 'living documentation'],
            [/\bsuites reutilizables\b/gi, 'reusable suites'],
            [/\bEscenarios de carga\b/gi, 'Load scenarios'],
            [/\busuarios concurrentes\b/gi, 'concurrent users'],
            [/\bValidación de SLAs\b/gi, 'SLA validation'],
            [/\bchecks automáticos\b/gi, 'automated checks'],
            [/\bReportes y dashboards visuales\b/gi, 'Reports and visual dashboards'],
            [/\bscripts versionados\b/gi, 'versioned scripts'],
            [/\bautomatización\b/gi, 'automation'],
            [/\breporting visual\b/gi, 'visual reporting'],
            [/\bmantenibles\b/gi, 'maintainable'],
            [/\bAnálisis de Resultados\b/gi, 'Results Analysis'],
            [/\bMonitoreo\b/gi, 'Monitoring'],
            [/\bLenguajes\b/gi, 'Languages'],
            [/\bGestión & Calidad\b/gi, 'Management & Quality'],
            [/\bVer arquetipo\b/gi, 'View blueprint'],
            [/\bEne\.\b/g, 'Jan.'],
            [/\bAbr\.\b/g, 'Apr.'],
            [/\bAgo\.\b/g, 'Aug.'],
            [/\bDic\.\b/g, 'Dec.'],
            [/\bPresente\b/gi, 'Present'],
            [/\bPosición actual\b/gi, 'Current position'],
            [/\bPasante QA\b/gi, 'QA Intern'],
            [/\bResponsable de liderar iniciativas de calidad para productos bancarios digitales mediante automatización de APIs, pruebas de rendimiento y estrategias de validación basadas en riesgo\./gi, 'Responsible for leading quality initiatives for digital banking products through API automation, performance testing, and risk-based validation strategies.'],
            [/\bParticipación activa en iniciativas CI\/CD, optimización de ciclos de regresión y fortalecimiento de capacidades técnicas del equipo QA\./gi, 'Active participation in CI/CD initiatives, regression cycle optimization, and strengthening technical capabilities of the QA team.'],
            [/\bLideré iniciativas de automatización API utilizando Karate y SerenityBDD\./gi, 'Led API automation initiatives using Karate and SerenityBDD.'],
            [/\bDiseñé estrategias de validación basadas en riesgo junto a negocio y riesgos\./gi, 'Designed risk-based validation strategies together with business and risk teams.'],
            [/\bImplementé pruebas de rendimiento en flujos bancarios de alto volumen mediante K6\./gi, 'Implemented performance testing on high-volume banking flows using K6.'],
            [/\bIntegré controles de calidad dentro de pipelines CI\/CD\./gi, 'Integrated quality controls into CI/CD pipelines.'],
            [/\bPriorizé suites de validación API según criticidad funcional\./gi, 'Prioritized API validation suites by functional criticality.'],
            [/\bMentoricé QA en automatización, API testing y BDD\./gi, 'Mentored QA engineers in automation, API testing, and BDD.'],
            [/\bcobertura funcional y regresión\b/gi, 'functional and regression coverage'],
            [/\bdefectos post-release\b/gi, 'post-release defects'],
            [/\btiempo de feedback técnico\b/gi, 'technical feedback time'],
            [/\bdetección temprana de incidencias críticas\b/gi, 'early detection of critical incidents'],
            [/\btiempos de respuesta en pruebas de performance\b/gi, 'response times in performance tests'],
            [/\bautonomía técnica del equipo\b/gi, 'team technical autonomy'],
            [/\bAutomatización de validaciones de APIs bancarias críticas\./gi, 'Automation of critical banking API validations.'],
            [/\bIntegración Azure DevOps\b/gi, 'Azure DevOps integration'],
            [/\bEjecución paralela\b/gi, 'Parallel execution'],
            [/\bPruebas de rendimiento para servicios bancarios de alto volumen\./gi, 'Performance testing for high-volume banking services.'],
            [/\breportes automatizados\b/gi, 'automated reports'],
            [/\bdetección temprana de cuellos de botella\b/gi, 'early bottleneck detection'],
            [/\bFramework de priorización basado en riesgo para ciclos de regresión\./gi, 'Risk-based prioritization framework for regression cycles.'],
            [/\bClasificación por criticidad\b/gi, 'Criticality classification'],
            [/\bPriorización de escenarios\b/gi, 'Scenario prioritization'],
            [/\bMatriz riesgo-impacto\b/gi, 'Risk-impact matrix'],
            [/\bdefectos productivos\b/gi, 'production defects'],
            [/\bResponsable del diseño y ejecución de estrategias de pruebas funcionales, automatizadas y de rendimiento para proyectos financieros y empresariales\./gi, 'Responsible for designing and executing functional, automated, and performance testing strategies for financial and enterprise projects.'],
            [/\bParticipación en iniciativas de automatización E2E, APIs y mejora continua dentro de equipos ágiles\./gi, 'Participated in E2E automation, API initiatives, and continuous improvement within agile teams.'],
            [/\bDiseñé estrategias de pruebas funcionales y automatizadas\./gi, 'Designed functional and automated testing strategies.'],
            [/\bImplementé automatización API y E2E\./gi, 'Implemented API and E2E automation.'],
            [/\bEjecuté pruebas de rendimiento con K6\./gi, 'Executed performance tests with K6.'],
            [/\bGestioné riesgos y planificación en equipos ágiles\./gi, 'Managed risks and planning in agile teams.'],
            [/\bValidé integraciones mediante REST APIs y PostgreSQL\./gi, 'Validated integrations through REST APIs and PostgreSQL.'],
            [/\bcobertura de requerimientos\b/gi, 'requirements coverage'],
            [/\btiempo de regresión por release\b/gi, 'regression time per release'],
            [/\bpredictibilidad de entregas\b/gi, 'delivery predictability'],
            [/\bdefectos detectados en UAT\b/gi, 'defects detected in UAT'],
            [/\bValidación de APIs para recarga de Tarjeta Ciudad\./gi, 'API validation for Tarjeta Ciudad top-up flows.'],
            [/\bcobertura en escenarios críticos\b/gi, 'coverage in critical scenarios'],
            [/\bdefectos tardíos\b/gi, 'late defects'],
            [/\bAutomatización de cuentas de inversión y ahorro\./gi, 'Automation of investment and savings accounts.'],
            [/\bciclo de validación\b/gi, 'validation cycle'],
            [/\bAutomatización de regresión de procesos críticos\./gi, 'Regression automation for critical processes.'],
            [/\btiempo de regresión\b/gi, 'regression time'],
            [/\bParticipación en actividades de análisis, planificación y ejecución de pruebas para productos financieros, colaborando con equipos QA y desarrollo\./gi, 'Participated in analysis, planning, and test execution activities for financial products, collaborating with QA and development teams.'],
            [/\bAnálisis de requerimientos\./gi, 'Requirements analysis.'],
            [/\bDiseño de casos de prueba\./gi, 'Test case design.'],
            [/\bEjecución funcional\./gi, 'Functional execution.'],
            [/\bGestión de defectos\./gi, 'Defect management.'],
            [/\bSeguimiento de calidad\./gi, 'Quality follow-up.'],
            [/\bclaridad de criterios de aceptación\b/gi, 'acceptance criteria clarity'],
            [/\bresolución en primer ciclo\b/gi, 'first-cycle resolution'],
            [/\bretrabajos previos a pruebas\b/gi, 'pre-test rework'],
            [/\bvisibilidad de calidad\b/gi, 'quality visibility'],
            [/\bOptimización del proceso de preparación para pruebas\./gi, 'Optimization of the test readiness process.'],
            [/\bmenos retrabajo\b/gi, 'less rework'],
            [/\bmayor alineación entre equipos\b/gi, 'better team alignment'],
            [/\bParticipación en pruebas automatizadas y de rendimiento para aplicaciones web empresariales\./gi, 'Participated in automated and performance testing for enterprise web applications.'],
            [/\bDiseño de pruebas automatizadas\./gi, 'Automated test design.'],
            [/\bEjecución de pruebas de carga\./gi, 'Load test execution.'],
            [/\bValidación cross-browser\./gi, 'Cross-browser validation.'],
            [/\bReportería de calidad\./gi, 'Quality reporting.'],
            [/\bincidencias productivas\b/gi, 'production incidents'],
            [/\bestabilidad cross-platform\b/gi, 'cross-platform stability'],
            [/\bvelocidad de liberación\b/gi, 'release speed'],
            [/\bdefectos repetitivos\b/gi, 'repetitive defects'],
            [/\bAutomatización funcional para aplicaciones web\./gi, 'Functional automation for web applications.'],
            [/\bmenos incidencias productivas\b/gi, 'fewer production incidents'],
            [/\bmayor cobertura funcional\b/gi, 'higher functional coverage'],
            [/\bPruebas de carga y estrés\./gi, 'Load and stress testing.'],
            [/\boptimización de estabilidad\b/gi, 'stability optimization'],
            [/\bApoyo en iniciativas de calidad para aplicaciones de seguros mediante automatización, pruebas funcionales y validación de rendimiento\./gi, 'Supported quality initiatives for insurance applications through automation, functional testing, and performance validation.'],
            [/\bEjecución de pruebas funcionales y automatizadas en módulos de seguros\./gi, 'Executed functional and automated tests in insurance modules.'],
            [/\bValidación de datos de prueba con apoyo de SQL y Excel\./gi, 'Validated test data using SQL and Excel.'],
            [/\bSoporte a iniciativas de performance y documentación de resultados\./gi, 'Supported performance initiatives and results documentation.'],
            [/\bcobertura de escenarios críticos\b/gi, 'critical scenario coverage'],
            [/\binconsistencias de datos\b/gi, 'data inconsistencies'],
            [/\bvisibilidad de cobertura\b/gi, 'coverage visibility'],
            [/\breprocesos de validación\b/gi, 'validation rework'],
            [/\bAutomatización y validación de sistemas de seguros\./gi, 'Automation and validation of insurance systems.'],
            [/\bSoporte operativo y tecnológico para sistemas bancarios\./gi, 'Operational and technological support for banking systems.'],
            [/\bSoporte técnico a usuarios y seguimiento de incidencias\./gi, 'Technical user support and incident follow-up.'],
            [/\bEjecución de mantenimiento preventivo y correctivo\./gi, 'Preventive and corrective maintenance execution.'],
            [/\bGestión de prioridades operativas bajo SLA\./gi, 'Operational priority management under SLA.'],
            [/\bMejora en atención de incidencias\b/gi, 'incident response improvement'],
            [/\bInterrupciones operativas\b/gi, 'operational interruptions'],
            [/\bCumplimiento SLA\b/gi, 'SLA compliance'],
            [/\beficiencia operativa\b/gi, 'operational efficiency'],
            [/\bMesa de ayuda\b/gi, 'Help Desk'],
            [/\bSoporte operativo\b/gi, 'Operational support'],
            [/\bGestión de tickets\b/gi, 'Ticket management'],
            [/\bSoporte tecnológico para usuarios locales y remotos en operaciones petroleras\./gi, 'Technological support for local and remote users in oil operations.'],
            [/\bAtención a incidencias de primer nivel para usuarios locales y remotos\./gi, 'First-level incident support for local and remote users.'],
            [/\bDocumentación y seguimiento de fallas recurrentes\./gi, 'Documentation and follow-up of recurring failures.'],
            [/\bCoordinación con mesa internacional para resolución de casos\./gi, 'Coordination with international help desk for case resolution.'],
            [/\bMejora en tiempos de respuesta\b/gi, 'response time improvement'],
            [/\bReincidencias\b/gi, 'recurrences'],
            [/\bCierre efectivo de casos\b/gi, 'effective case closure'],
            [/\bSoporte remoto\b/gi, 'Remote support'],
            [/\bGestión de incidentes\b/gi, 'Incident management'],
            [/\bTesting Funcional\b/gi, 'Functional Testing']
          ];

          let result = text || '';
          pairs.forEach(([pattern, replacement]) => {
            result = result.replace(pattern, replacement);
          });
          return result;
        }

        window.XP_DETAIL_TRANSLATE = autoTranslateToEnglish;

        function setText(selector, value) {
          const node = document.querySelector(selector);
          if (node && value) node.textContent = value;
        }

        function translateDynamicNodeList(lang) {
          const selectors = [
            '.xp-timeline-role',
            '.xp-timeline-status',
            '.contact-cta-btn'
          ];

          selectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((node) => {
              if (!node.dataset.esText) {
                node.dataset.esText = node.textContent.trim();
              }
              if (lang === 'en') {
                node.textContent = autoTranslateToEnglish(node.dataset.esText);
              } else {
                node.textContent = node.dataset.esText;
              }
            });
          });

          const ctaButton = document.getElementById('contact-cta-btn');
          if (ctaButton) {
            ctaButton.innerHTML = lang === 'en' ? 'Contact <span aria-hidden="true">→</span>' : 'Contactar <span aria-hidden="true">→</span>';
          }
        }

        function applyStructuredTranslations(lang) {
          const arqDescEs = [
            'Automatización de flujos end-to-end de aplicaciones críticas de negocio.',
            'Validación de servicios y contratos API de forma robusta y escalable.',
            'Pruebas de carga, estrés y capacidad para garantizar rendimiento y estabilidad.'
          ];
          const arqDescEn = [
            'End-to-end automation for critical business application flows.',
            'Robust and scalable validation of API services and contracts.',
            'Load, stress, and capacity testing to ensure performance and stability.'
          ];

          const arqListEs = [
            'Selenium, SerenityBDD, Cucumber, Gradle',
            'Screenplay Pattern, POM, OOP, SOLID',
            'Data-Driven Testing (Excel/CSV)',
            'Reportes avanzados (Serenity, JUnit, Cucumber JSON)',
            'Integración CI/CD (PowerShell, multi-navegador)',
            'Prácticas ISTQB: cobertura, trazabilidad, regresión',
            'Agile Tester & TAE: BDD, modularidad, arquitectura robusta',
            'Karate, Cucumber, Gherkin, Java, Gradle, Postman',
            'Validación de contratos y esquemas',
            'Manejo de datos y pruebas negativas',
            'Mocks & Stubs, colecciones Postman',
            'Reportes automáticos (Karate, Cucumber HTML)',
            'Integración CI/CD, pipelines',
            'Prácticas ISTQB: cobertura, regresión, trazabilidad',
            'Agile Tester & TAE: BDD, documentación viva, suites reutilizables',
            'k6, JMeter, JavaScript, Grafana',
            'Escenarios de carga, stress, usuarios concurrentes',
            'Validación de SLAs, checks automáticos',
            'Reportes y dashboards visuales (Grafana, k6 Cloud)',
            'Integración CI/CD, scripts versionados',
            'Prácticas ISTQB: pruebas no funcionales, regresión, trazabilidad',
            'Agile Tester & TAE: automatización, reporting visual, scripts mantenibles'
          ];
          const arqListEn = [
            'Selenium, SerenityBDD, Cucumber, Gradle',
            'Screenplay Pattern, POM, OOP, SOLID',
            'Data-Driven Testing (Excel/CSV)',
            'Advanced reporting (Serenity, JUnit, Cucumber JSON)',
            'CI/CD integration (PowerShell, multi-browser)',
            'ISTQB practices: coverage, traceability, regression',
            'Agile Tester & TAE: BDD, modularity, robust architecture',
            'Karate, Cucumber, Gherkin, Java, Gradle, Postman',
            'Contract and schema validation',
            'Data handling and negative testing',
            'Mocks & stubs, Postman collections',
            'Automated reports (Karate, Cucumber HTML)',
            'CI/CD integration, pipelines',
            'ISTQB practices: coverage, regression, traceability',
            'Agile Tester & TAE: BDD, living documentation, reusable suites',
            'k6, JMeter, JavaScript, Grafana',
            'Load scenarios, stress, concurrent users',
            'SLA validation, automated checks',
            'Reports and visual dashboards (Grafana, k6 Cloud)',
            'CI/CD integration, versioned scripts',
            'ISTQB practices: non-functional testing, regression, traceability',
            'Agile Tester & TAE: automation, visual reporting, maintainable scripts'
          ];

          const skillsEs = [
            'Selenium', 'SerenityBDD', 'Cucumber', 'Karate', 'Screenplay Pattern', 'POM',
            'REST APIs', 'Postman', 'Karate', 'RestAssured', 'API Contract Testing',
            'K6', 'JMeter', 'Gatling', 'Análisis de Resultados', 'Monitoreo',
            'Git', 'Jenkins', 'Docker', 'Azure DevOps',
            'Java', 'Python', 'JavaScript', 'SQL',
            'Scrum / Kanban', 'Jira / X-ray', 'Trello', 'Confluence', 'TDD / BDD / ATDD'
          ];
          const skillsEn = [
            'Selenium', 'SerenityBDD', 'Cucumber', 'Karate', 'Screenplay Pattern', 'POM',
            'REST APIs', 'Postman', 'Karate', 'RestAssured', 'API Contract Testing',
            'K6', 'JMeter', 'Gatling', 'Results Analysis', 'Monitoring',
            'Git', 'Jenkins', 'Docker', 'Azure DevOps',
            'Java', 'Python', 'JavaScript', 'SQL',
            'Scrum / Kanban', 'Jira / X-ray', 'Trello', 'Confluence', 'TDD / BDD / ATDD'
          ];

          const descSet = lang === 'en' ? arqDescEn : arqDescEs;
          document.querySelectorAll('.arquetipo-desc').forEach((node, idx) => {
            if (descSet[idx]) node.textContent = descSet[idx];
          });

          const listSet = lang === 'en' ? arqListEn : arqListEs;
          document.querySelectorAll('.arquetipo-list li').forEach((node, idx) => {
            if (listSet[idx]) node.textContent = listSet[idx];
          });

          const skillSet = lang === 'en' ? skillsEn : skillsEs;
          document.querySelectorAll('.skills-tech-card li').forEach((node, idx) => {
            if (skillSet[idx]) node.textContent = skillSet[idx];
          });
        }

        function applyLanguage(lang) {
          document.documentElement.lang = lang;
          localStorage.setItem('site-lang', lang);

          const langSet = navLabels[lang] || navLabels.es;
          navItems.forEach((item, index) => {
            if (langSet[index]) item.textContent = langSet[index];
          });

          Object.entries(fixedTextBySelector).forEach(([selector, values]) => {
            setText(selector, values[lang] || values.es);
          });

          const cvButton = document.querySelector('.navbar-cv');
          if (cvButton) {
            cvButton.setAttribute('href', lang === 'en' ? 'cv-resumen-en.html' : 'cv-resumen.html');
          }

          const titleEs = 'Bryan Alexander Freire Chamorro - QA Automation & API + Performance Engineer';
          const titleEn = 'Bryan Alexander Freire Chamorro - QA Automation & API + Performance Engineer';
          document.title = lang === 'en' ? titleEn : titleEs;

          const descriptionNode = document.querySelector('meta[name="description"]');
          if (descriptionNode) {
            const descriptionEs = 'Landing profesional de Bryan Alexander Freire Chamorro, QA Automation, API y Performance Engineer. Estrategias de automatización, testing y DevOps.';
            const descriptionEn = 'Professional landing page of Bryan Alexander Freire Chamorro, QA Automation, API and Performance Engineer. Automation, testing and DevOps strategies.';
            descriptionNode.setAttribute('content', lang === 'en' ? descriptionEn : descriptionEs);
          }

          applyStructuredTranslations(lang);
          translateDynamicNodeList(lang);
          langButtons.forEach((other) => {
            other.classList.toggle('active', other.getAttribute('data-lang') === lang);
          });

          if (typeof window.renderXpDetailPanel === 'function') {
            const currentIdx = typeof window.getXpCurrentIndex === 'function' ? window.getXpCurrentIndex() : 0;
            window.renderXpDetailPanel(currentIdx);
          }
        }

        const savedLang = localStorage.getItem('site-lang') || 'es';
        applyLanguage(savedLang);

        langButtons.forEach((btn) => {
          btn.addEventListener('click', function () {
            const lang = btn.getAttribute('data-lang') || 'es';
            applyLanguage(lang);
          });
        });

        clearHashFromUrl();
      });

