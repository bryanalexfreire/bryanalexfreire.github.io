document.addEventListener('DOMContentLoaded', function () {
        const navItems = Array.from(document.querySelectorAll('.navbar-menu li[data-target]'));
        const navbar = document.querySelector('.navbar');
        const navbarToggle = document.querySelector('.navbar-toggle');

        function closeMobileMenu() {
          if (!navbar || !navbarToggle) return;
          navbar.classList.remove('is-open');
          navbarToggle.setAttribute('aria-expanded', 'false');
          navbarToggle.setAttribute('aria-label', 'Abrir menu');
        }

        function toggleMobileMenu() {
          if (!navbar || !navbarToggle) return;
          const isOpen = navbar.classList.toggle('is-open');
          navbarToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          navbarToggle.setAttribute('aria-label', isOpen ? 'Cerrar menu' : 'Abrir menu');
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
          es: ['Inicio', 'Experiencia', 'Arquetipos', 'Habilidades', 'Certificaciones', 'Educaci�n', 'Contacto'],
          en: ['Home', 'Experience', 'Blueprints', 'Skills', 'Certifications', 'Education', 'Contact']
        };

        const fixedTextBySelector = {
          '.navbar-cv': { es: 'Descargar CV ATS', en: 'Download ATS CV' },
          '.hero-links a[href="#arquetipos"]': { es: 'Ver proyectos', en: 'View projects' },
          '.specialties-title': { es: 'Especialidades', en: 'Specialties' },
          '.hero-subtitle': { es: 'QA Engineer � Testing Funcional en Banca & Automatizaci�n (E2E/API/Performance)', en: 'QA Engineer � Banking Functional Testing & Automation (E2E/API/Performance)' },
          '.hero-description': { es: 'Ingeniero de Calidad con 4+ a�os combinando testing funcional en banca y fintech (validaci�n basada en riesgo, reglas de negocio) con automatizaci�n E2E, API y Performance. Dise�o estrategias de calidad y frameworks integrados a CI/CD que aceleran la entrega sin comprometer la confiabilidad.', en: 'Quality Engineer with 4+ years of experience combining functional testing in banking and fintech (risk-based validation, business rules) with E2E, API, and Performance automation. I design quality strategies and CI/CD-integrated frameworks that speed up delivery without compromising reliability.' },
          '.hero-quick-facts': { es: '?? Quito, Ecuador (GMT-5) � ?? Remoto / reubicaci�n (visa) � ?? 4+ a�os � ?? Banca & Fintech � ?? Espa�ol (nativo) � Ingl�s (B1)', en: '?? Quito, Ecuador (GMT-5) � ?? Remote / relocation (visa) � ?? 4+ years � ?? Banking & Fintech � ?? Spanish (native) � English (B1)' },
          '.hero-links a[href="#freelance-availability"]': { es: 'Disponibilidad freelance', en: 'Freelance availability' },
          '.cert-highlight-title': { es: 'Certificaciones Destacadas', en: 'Featured Certifications' },
          '.cert-highlight-link': { es: 'Ver todas las certificaciones ?', en: 'View all certifications ?' },
          '.contact-cta-copy h3': { es: '�Hablamos sobre c�mo puedo aportar a tu equipo?', en: 'Shall we talk about how I can add value to your team?' },
          '.contact-cta-copy p': { es: 'Estoy abierto a nuevas oportunidades y proyectos desafiantes.\nTambi�n disponible para proyectos freelance selectos de tiempo parcial (noches, fines de semana, feriados).', en: 'I am open to new opportunities and challenging projects.\nAlso available for select part-time freelance projects (evenings, weekends, holidays).' },
          '.xp-pro-title': { es: 'Experiencia Profesional', en: 'Professional Experience' },
          '.xp-pro-subtitle': { es: 'Trayectoria en calidad, automatizaci�n y performance testing', en: 'Track record in quality, automation, and performance testing' },
          '.arquetipos-title': { es: 'Arquetipos de Calidad y Automatización', en: 'Quality & Automation Blueprints' },
          '.arquetipos-subtitle': { es: 'Enfoques y soluciones implementadas en diferentes tipos de pruebas automatizadas y testing funcional.', en: 'Approaches and solutions implemented across different automated testing types and functional testing.' },
          '.arquetipos-grid .arquetipo-card:nth-child(1) h3': { es: 'E2E Automation', en: 'E2E Automation' },
          '.arquetipos-grid .arquetipo-card:nth-child(2) h3': { es: 'API Automation', en: 'API Automation' },
          '.arquetipos-grid .arquetipo-card:nth-child(3) h3': { es: 'Performance Testing', en: 'Performance Testing' },
          '.arquetipos-grid .arquetipo-card:nth-child(4) h3': { es: 'Liderazgo en Testing Funcional & Ágil', en: 'Functional & Agile Testing Leadership' },
          '.arquetipos-grid .arquetipo-card:nth-child(1) .arquetipo-btn': { es: 'Ver arquetipo E2E ?', en: 'View E2E blueprint ?' },
          '.arquetipos-grid .arquetipo-card:nth-child(2) .arquetipo-btn': { es: 'Ver arquetipo API ?', en: 'View API blueprint ?' },
          '.arquetipos-grid .arquetipo-card:nth-child(3) .arquetipo-btn': { es: 'Ver arquetipo Performance ?', en: 'View Performance blueprint ?' },
          '.arquetipos-grid .arquetipo-card:nth-child(4) .arquetipo-btn': { es: 'Ver blueprint de Testing Funcional →', en: 'View Functional Testing blueprint →' },
          '.skills-tech-card:nth-child(1) .skills-tech-card-header': { es: '?? Automatizaci�n', en: '?? Automation' },
          '.skills-tech-card:nth-child(2) .skills-tech-card-header': { es: '?? APIs & Backend', en: '?? APIs & Backend' },
          '.skills-tech-card:nth-child(3) .skills-tech-card-header': { es: '? Performance', en: '? Performance' },
          '.skills-tech-card:nth-child(4) .skills-tech-card-header': { es: '?? DevOps & CI/CD', en: '?? DevOps & CI/CD' },
          '.skills-tech-card:nth-child(5) .skills-tech-card-header': { es: '?? Lenguajes', en: '?? Languages' },
          '.skills-tech-card:nth-child(6) .skills-tech-card-header': { es: '?? Gesti�n & Calidad', en: '?? Management & Quality' },
          '.metric-card.green:nth-child(1) .metric-text span': { es: 'Cobertura funcional y de regresi�n', en: 'Functional and regression coverage' },
          '.metric-card.blue:nth-child(2) .metric-text span': { es: 'Tiempo de feedback t�cnico', en: 'Technical feedback time' },
          '.metric-card.purple:nth-child(3) .metric-text span': { es: 'Defectos post-release en producci�n', en: 'Post-release production defects' },
          '.metric-card.green:nth-child(4) .metric-text span': { es: 'Productividad y autonom�a del equipo', en: 'Team productivity and autonomy' },
          '.specialties-list li:nth-child(1) .specialty-text': { es: 'Testing Funcional & Basado en Riesgo <span class="specialty-detail">(Banca/Fintech)</span>', en: 'Risk-Based & Functional Testing <span class="specialty-detail">(Banking/Fintech)</span>' },
          '.specialties-list li:nth-child(2) .specialty-text': { es: 'Automatizaci�n QA <span class="specialty-detail">(E2E, API)</span>', en: 'QA Automation <span class="specialty-detail">(E2E, API)</span>' },
          '.specialties-list li:nth-child(3) .specialty-text': { es: 'Testing de Rendimiento', en: 'Performance Testing' },
          '.specialties-list li:nth-child(4) .specialty-text': { es: 'Ingenier�a de Calidad', en: 'Quality Engineering' },
          '.specialties-list li:nth-child(5) .specialty-text': { es: 'CI/CD & DevOps', en: 'CI/CD & DevOps' }
        };

        function autoTranslateToEnglish(text) {
          const pairs = [            [/\bIngeniero de Calidad con 4\+ años combinando testing funcional\b/gi, 'Quality Engineer with 4+ years combining functional testing'],
            [/\ben banca y fintech\b/gi, 'in banking and fintech'],
            [/\bvalidación basada en riesgo\b/gi, 'risk-based validation'],
            [/\breglas de negocio\b/gi, 'business rules'],
            [/\bcon automatización E2E, API y Performance\b/gi, 'with E2E, API, and Performance automation'],
            [/\bDiseño estrategias de calidad\b/gi, 'I design quality strategies'],
            [/\bframeworks integrados a CI\/CD\b/gi, 'CI/CD-integrated frameworks'],
            [/\bque aceleran la entrega\b/gi, 'that speed up delivery'],
            [/\bsin comprometer la confiabilidad\b/gi, 'without compromising reliability'],            [/\bIngeniero de Calidad de Software\b/gi, 'Software Quality Engineer'],
            [/\bcon 4\+ a�os de experiencia\b/gi, 'with 4+ years of experience'],
            [/\bautomatizaci�n de pruebas\b/gi, 'test automation'],
            [/\bEspecializado en dise�ar estrategias de calidad\b/gi, 'Specialized in designing quality strategies'],
            [/\bframework robustos\b/gi, 'robust frameworks'],
            [/\by pipelines de CI\/CD\b/gi, 'and CI/CD pipelines'],
            [/\bque impulsan la calidad y aceleran la entrega de software\b/gi, 'that increase quality and speed up software delivery'],
            [/\bAutomatizaci�n de flujos end-to-end\b/gi, 'End-to-end flow automation'],
            [/\bde aplicaciones cr�ticas de negocio\b/gi, 'for critical business applications'],
            [/\bValidaci�n de servicios y contratos API\b/gi, 'Validation of API services and contracts'],
            [/\bde forma robusta y escalable\b/gi, 'in a robust and scalable way'],
            [/\bPruebas de carga, estr�s y capacidad\b/gi, 'Load, stress, and capacity testing'],
            [/\bpara garantizar rendimiento y estabilidad\b/gi, 'to ensure performance and stability'],
            [/\bReportes avanzados\b/gi, 'Advanced reporting'],
            [/\bIntegraci�n\b/gi, 'Integration'],
            [/\bPr�cticas\b/gi, 'Practices'],
            [/\bcobertura\b/gi, 'coverage'],
            [/\btrazabilidad\b/gi, 'traceability'],
            [/\bregresi�n\b/gi, 'regression'],
            [/\bManejo de datos y pruebas negativas\b/gi, 'Data handling and negative testing'],
            [/\bReportes autom�ticos\b/gi, 'Automated reports'],
            [/\bdocumentaci�n viva\b/gi, 'living documentation'],
            [/\bsuites reutilizables\b/gi, 'reusable suites'],
            [/\bEscenarios de carga\b/gi, 'Load scenarios'],
            [/\busuarios concurrentes\b/gi, 'concurrent users'],
            [/\bValidaci�n de SLAs\b/gi, 'SLA validation'],
            [/\bchecks autom�ticos\b/gi, 'automated checks'],
            [/\bReportes y dashboards visuales\b/gi, 'Reports and visual dashboards'],
            [/\bscripts versionados\b/gi, 'versioned scripts'],
            [/\bautomatizaci�n\b/gi, 'automation'],
            [/\breporting visual\b/gi, 'visual reporting'],
            [/\bmantenibles\b/gi, 'maintainable'],
            [/\bAn�lisis de Resultados\b/gi, 'Results Analysis'],
            [/\bMonitoreo\b/gi, 'Monitoring'],
            [/\bLenguajes\b/gi, 'Languages'],
            [/\bGesti�n & Calidad\b/gi, 'Management & Quality'],
            [/\bVer arquetipo\b/gi, 'View blueprint'],
            [/\bEne\.\b/g, 'Jan.'],
            [/\bAbr\.\b/g, 'Apr.'],
            [/\bAgo\.\b/g, 'Aug.'],
            [/\bDic\.\b/g, 'Dec.'],
            [/\bPresente\b/gi, 'Present'],
            [/\bPosici�n actual\b/gi, 'Current position'],
            [/\bPasante QA\b/gi, 'QA Intern'],
            [/\bResponsable de liderar iniciativas de calidad para productos bancarios digitales mediante automatizaci�n de APIs, pruebas de rendimiento y estrategias de validaci�n basadas en riesgo\./gi, 'Responsible for leading quality initiatives for digital banking products through API automation, performance testing, and risk-based validation strategies.'],
            [/\bParticipaci�n activa en iniciativas CI\/CD, optimizaci�n de ciclos de regresi�n y fortalecimiento de capacidades t�cnicas del equipo QA\./gi, 'Active participation in CI/CD initiatives, regression cycle optimization, and strengthening technical capabilities of the QA team.'],
            [/\bLider� iniciativas de automatizaci�n API utilizando Karate y SerenityBDD\./gi, 'Led API automation initiatives using Karate and SerenityBDD.'],
            [/\bDise�� estrategias de validaci�n basadas en riesgo junto a negocio y riesgos\./gi, 'Designed risk-based validation strategies together with business and risk teams.'],
            [/\bImplement� pruebas de rendimiento en flujos bancarios de alto volumen mediante K6\./gi, 'Implemented performance testing on high-volume banking flows using K6.'],
            [/\bIntegr� controles de calidad dentro de pipelines CI\/CD\./gi, 'Integrated quality controls into CI/CD pipelines.'],
            [/\bPrioriz� suites de validaci�n API seg�n criticidad funcional\./gi, 'Prioritized API validation suites by functional criticality.'],
            [/\bMentoric� QA en automatizaci�n, API testing y BDD\./gi, 'Mentored QA engineers in automation, API testing, and BDD.'],
            [/\bcobertura funcional y regresi�n\b/gi, 'functional and regression coverage'],
            [/\bdefectos post-release\b/gi, 'post-release defects'],
            [/\btiempo de feedback t�cnico\b/gi, 'technical feedback time'],
            [/\bdetecci�n temprana de incidencias cr�ticas\b/gi, 'early detection of critical incidents'],
            [/\btiempos de respuesta en pruebas de performance\b/gi, 'response times in performance tests'],
            [/\bautonom�a t�cnica del equipo\b/gi, 'team technical autonomy'],
            [/\bAutomatizaci�n de validaciones de APIs bancarias cr�ticas\./gi, 'Automation of critical banking API validations.'],
            [/\bIntegraci�n Azure DevOps\b/gi, 'Azure DevOps integration'],
            [/\bEjecuci�n paralela\b/gi, 'Parallel execution'],
            [/\bPruebas de rendimiento para servicios bancarios de alto volumen\./gi, 'Performance testing for high-volume banking services.'],
            [/\breportes automatizados\b/gi, 'automated reports'],
            [/\bdetecci�n temprana de cuellos de botella\b/gi, 'early bottleneck detection'],
            [/\bFramework de priorizaci�n basado en riesgo para ciclos de regresi�n\./gi, 'Risk-based prioritization framework for regression cycles.'],
            [/\bClasificaci�n por criticidad\b/gi, 'Criticality classification'],
            [/\bPriorizaci�n de escenarios\b/gi, 'Scenario prioritization'],
            [/\bMatriz riesgo-impacto\b/gi, 'Risk-impact matrix'],
            [/\bdefectos productivos\b/gi, 'production defects'],
            [/\bResponsable del dise�o y ejecuci�n de estrategias de pruebas funcionales, automatizadas y de rendimiento para proyectos financieros y empresariales\./gi, 'Responsible for designing and executing functional, automated, and performance testing strategies for financial and enterprise projects.'],
            [/\bParticipaci�n en iniciativas de automatizaci�n E2E, APIs y mejora continua dentro de equipos �giles\./gi, 'Participated in E2E automation, API initiatives, and continuous improvement within agile teams.'],
            [/\bDise�� estrategias de pruebas funcionales y automatizadas\./gi, 'Designed functional and automated testing strategies.'],
            [/\bImplement� automatizaci�n API y E2E\./gi, 'Implemented API and E2E automation.'],
            [/\bEjecut� pruebas de rendimiento con K6\./gi, 'Executed performance tests with K6.'],
            [/\bGestion� riesgos y planificaci�n en equipos �giles\./gi, 'Managed risks and planning in agile teams.'],
            [/\bValid� integraciones mediante REST APIs y PostgreSQL\./gi, 'Validated integrations through REST APIs and PostgreSQL.'],
            [/\bcobertura de requerimientos\b/gi, 'requirements coverage'],
            [/\btiempo de regresi�n por release\b/gi, 'regression time per release'],
            [/\bpredictibilidad de entregas\b/gi, 'delivery predictability'],
            [/\bdefectos detectados en UAT\b/gi, 'defects detected in UAT'],
            [/\bValidaci�n de APIs para recarga de Tarjeta Ciudad\./gi, 'API validation for Tarjeta Ciudad top-up flows.'],
            [/\bcobertura en escenarios cr�ticos\b/gi, 'coverage in critical scenarios'],
            [/\bdefectos tard�os\b/gi, 'late defects'],
            [/\bAutomatizaci�n de cuentas de inversi�n y ahorro\./gi, 'Automation of investment and savings accounts.'],
            [/\bciclo de validaci�n\b/gi, 'validation cycle'],
            [/\bAutomatizaci�n de regresi�n de procesos cr�ticos\./gi, 'Regression automation for critical processes.'],
            [/\btiempo de regresi�n\b/gi, 'regression time'],
            [/\bParticipaci�n en actividades de an�lisis, planificaci�n y ejecuci�n de pruebas para productos financieros, colaborando con equipos QA y desarrollo\./gi, 'Participated in analysis, planning, and test execution activities for financial products, collaborating with QA and development teams.'],
            [/\bAn�lisis de requerimientos\./gi, 'Requirements analysis.'],
            [/\bDise�o de casos de prueba\./gi, 'Test case design.'],
            [/\bEjecuci�n funcional\./gi, 'Functional execution.'],
            [/\bGesti�n de defectos\./gi, 'Defect management.'],
            [/\bSeguimiento de calidad\./gi, 'Quality follow-up.'],
            [/\bclaridad de criterios de aceptaci�n\b/gi, 'acceptance criteria clarity'],
            [/\bresoluci�n en primer ciclo\b/gi, 'first-cycle resolution'],
            [/\bretrabajos previos a pruebas\b/gi, 'pre-test rework'],
            [/\bvisibilidad de calidad\b/gi, 'quality visibility'],
            [/\bOptimizaci�n del proceso de preparaci�n para pruebas\./gi, 'Optimization of the test readiness process.'],
            [/\bmenos retrabajo\b/gi, 'less rework'],
            [/\bmayor alineaci�n entre equipos\b/gi, 'better team alignment'],
            [/\bParticipaci�n en pruebas automatizadas y de rendimiento para aplicaciones web empresariales\./gi, 'Participated in automated and performance testing for enterprise web applications.'],
            [/\bDise�o de pruebas automatizadas\./gi, 'Automated test design.'],
            [/\bEjecuci�n de pruebas de carga\./gi, 'Load test execution.'],
            [/\bValidaci�n cross-browser\./gi, 'Cross-browser validation.'],
            [/\bReporter�a de calidad\./gi, 'Quality reporting.'],
            [/\bincidencias productivas\b/gi, 'production incidents'],
            [/\bestabilidad cross-platform\b/gi, 'cross-platform stability'],
            [/\bvelocidad de liberaci�n\b/gi, 'release speed'],
            [/\bdefectos repetitivos\b/gi, 'repetitive defects'],
            [/\bAutomatizaci�n funcional para aplicaciones web\./gi, 'Functional automation for web applications.'],
            [/\bmenos incidencias productivas\b/gi, 'fewer production incidents'],
            [/\bmayor cobertura funcional\b/gi, 'higher functional coverage'],
            [/\bPruebas de carga y estr�s\./gi, 'Load and stress testing.'],
            [/\boptimizaci�n de estabilidad\b/gi, 'stability optimization'],
            [/\bApoyo en iniciativas de calidad para aplicaciones de seguros mediante automatizaci�n, pruebas funcionales y validaci�n de rendimiento\./gi, 'Supported quality initiatives for insurance applications through automation, functional testing, and performance validation.'],
            [/\bEjecuci�n de pruebas funcionales y automatizadas en m�dulos de seguros\./gi, 'Executed functional and automated tests in insurance modules.'],
            [/\bValidaci�n de datos de prueba con apoyo de SQL y Excel\./gi, 'Validated test data using SQL and Excel.'],
            [/\bSoporte a iniciativas de performance y documentaci�n de resultados\./gi, 'Supported performance initiatives and results documentation.'],
            [/\bcobertura de escenarios cr�ticos\b/gi, 'critical scenario coverage'],
            [/\binconsistencias de datos\b/gi, 'data inconsistencies'],
            [/\bvisibilidad de cobertura\b/gi, 'coverage visibility'],
            [/\breprocesos de validaci�n\b/gi, 'validation rework'],
            [/\bAutomatizaci�n y validaci�n de sistemas de seguros\./gi, 'Automation and validation of insurance systems.'],
            [/\bSoporte operativo y tecnol�gico para sistemas bancarios\./gi, 'Operational and technological support for banking systems.'],
            [/\bSoporte t�cnico a usuarios y seguimiento de incidencias\./gi, 'Technical user support and incident follow-up.'],
            [/\bEjecuci�n de mantenimiento preventivo y correctivo\./gi, 'Preventive and corrective maintenance execution.'],
            [/\bGesti�n de prioridades operativas bajo SLA\./gi, 'Operational priority management under SLA.'],
            [/\bMejora en atenci�n de incidencias\b/gi, 'incident response improvement'],
            [/\bInterrupciones operativas\b/gi, 'operational interruptions'],
            [/\bCumplimiento SLA\b/gi, 'SLA compliance'],
            [/\beficiencia operativa\b/gi, 'operational efficiency'],
            [/\bMesa de ayuda\b/gi, 'Help Desk'],
            [/\bSoporte operativo\b/gi, 'Operational support'],
            [/\bGesti�n de tickets\b/gi, 'Ticket management'],
            [/\bSoporte tecnol�gico para usuarios locales y remotos en operaciones petroleras\./gi, 'Technological support for local and remote users in oil operations.'],
            [/\bAtenci�n a incidencias de primer nivel para usuarios locales y remotos\./gi, 'First-level incident support for local and remote users.'],
            [/\bDocumentaci�n y seguimiento de fallas recurrentes\./gi, 'Documentation and follow-up of recurring failures.'],
            [/\bCoordinaci�n con mesa internacional para resoluci�n de casos\./gi, 'Coordination with international help desk for case resolution.'],
            [/\bMejora en tiempos de respuesta\b/gi, 'response time improvement'],
            [/\bReincidencias\b/gi, 'recurrences'],
            [/\bCierre efectivo de casos\b/gi, 'effective case closure'],
            [/\bSoporte remoto\b/gi, 'Remote support'],
            [/\bGesti�n de incidentes\b/gi, 'Incident management'],
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
            ctaButton.innerHTML = lang === 'en' ? 'Contact <span aria-hidden="true">?</span>' : 'Contactar <span aria-hidden="true">?</span>';
          }
        }

        function applyStructuredTranslations(lang) {
          const arqDescEs = [
            'Automatizaci�n de flujos end-to-end de aplicaciones cr�ticas de negocio.',
            'Validaci�n de servicios y contratos API de forma robusta y escalable.',
            'Pruebas de carga, estrés y capacidad para garantizar rendimiento y estabilidad.',
            'Testing funcional manual y basado en riesgo, liderazgo de calidad ágil, y diseño de estrategia de pruebas para entornos regulados.'
          ];
          const arqDescEn = [
            'End-to-end automation for critical business application flows.',
            'Robust and scalable validation of API services and contracts.',
            'Load, stress, and capacity testing to ensure performance and stability.',
            'Manual and risk-based functional testing, Agile quality leadership, and test strategy design for regulated environments.'
          ];

          const arqListEs = [
            'Selenium, SerenityBDD, Cucumber, Gradle',
            'Screenplay Pattern, POM, OOP, SOLID',
            'Data-Driven Testing (Excel/CSV)',
            'Reportes avanzados (Serenity, JUnit, Cucumber JSON)',
            'Integraci�n CI/CD (PowerShell, multi-navegador)',
            'Pr�cticas ISTQB: cobertura, trazabilidad, regresi�n',
            'Agile Tester & TAE: BDD, modularidad, arquitectura robusta',
            'Karate, Cucumber, Gherkin, Java, Gradle, Postman',
            'Validaci�n de contratos y esquemas',
            'Manejo de datos y pruebas negativas',
            'Mocks & Stubs, colecciones Postman',
            'Reportes autom�ticos (Karate, Cucumber HTML)',
            'Integraci�n CI/CD, pipelines',
            'Pr�cticas ISTQB: cobertura, regresi�n, trazabilidad',
            'Agile Tester & TAE: BDD, documentaci�n viva, suites reutilizables',
            'k6, JMeter, JavaScript, Grafana',
            'Escenarios de carga, stress, usuarios concurrentes',
            'Validaci�n de SLAs, checks autom�ticos',
            'Reportes y dashboards visuales (Grafana, k6 Cloud)',
            'Integraci�n CI/CD, scripts versionados',
            'Pr�cticas ISTQB: pruebas no funcionales, regresi�n, trazabilidad',
            'Agile Tester & TAE: automatización, reporting visual, scripts mantenibles',
            'Diseño de casos de prueba & testing exploratorio para reglas de negocio complejas',
            'Priorización basada en riesgo & definición de alcance de regresión',
            'Gestión de defectos & triaje de causa raíz (Jira/X-ray)',
            'Facilitación de ceremonias ágiles & coaching QA (Certified Scrum Master)',
            'Estrategia y arquitectura de automatización de pruebas (ISTQB TAE)',
            'Prácticas ISTQB: Nivel Fundacional, Agile Tester'
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
            'Agile Tester & TAE: automation, visual reporting, maintainable scripts',
            'Test case design & exploratory testing for complex business rules',
            'Risk-based prioritization & regression scope definition',
            'Defect management & root-cause triage (Jira/X-ray)',
            'Agile ceremonies facilitation & QA coaching (Certified Scrum Master)',
            'Test automation strategy & architecture (ISTQB TAE)',
            'ISTQB practices: Foundation Level, Agile Tester'
          ];

          const skillsEs = [
            'Selenium', 'SerenityBDD', 'Cucumber', 'Karate', 'Screenplay Pattern', 'POM',
            'REST APIs', 'Postman', 'Karate', 'RestAssured', 'API Contract Testing',
            'K6', 'JMeter', 'Gatling', 'An�lisis de Resultados', 'Monitoreo',
            'Git', 'Docker', 'Azure DevOps',
            'Java', 'Python', 'JavaScript', 'SQL',
            'Scrum / Kanban', 'Jira / X-ray', 'Trello', 'Confluence', 'TDD / BDD / ATDD'
          ];
          const skillsEn = [
            'Selenium', 'SerenityBDD', 'Cucumber', 'Karate', 'Screenplay Pattern', 'POM',
            'REST APIs', 'Postman', 'Karate', 'RestAssured', 'API Contract Testing',
            'K6', 'JMeter', 'Gatling', 'Results Analysis', 'Monitoring',
            'Git', 'Docker', 'Azure DevOps',
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

        function updateTimelineOnLanguageChange(lang) {
          // Wait for xpData to be available
          if (typeof xpData === 'undefined' || !xpData) {
            console.warn('xpData not available for timeline update');
            return;
          }
          
          xpData.forEach((xp, idx) => {
            // Try both methods to find the item: by data-xp-id or by index
            let item = document.querySelector(`.xp-timeline-item[data-xp-id="${xp.id}"]`);
            if (!item) {
              item = document.querySelectorAll('.xp-timeline-item')[idx];
            }
            if (!item) return;
            
            const roleEl = item.querySelector('.xp-timeline-role');
            const dateEl = item.querySelector('.xp-timeline-date');
            const statusEl = item.querySelector('.xp-timeline-status');
            
            // Update role
            if (roleEl && xp.roleEn) {
              roleEl.textContent = lang === 'en' ? xp.roleEn : xp.role;
            }
            
            // Update date - handle the format properly
            if (dateEl && xp.dateEn) {
              dateEl.textContent = lang === 'en' ? xp.dateEn : xp.date;
            }
            
            // Update status - handle the format properly  
            if (statusEl && xp.statusEn) {
              statusEl.textContent = lang === 'en' ? xp.statusEn : xp.status;
            }
          });
        }

        clearHashFromUrl();
      });

        function autoTranslateToEnglish(text) {
          const pairs = [
            [/\bIngeniero de Calidad de Software\b/gi, 'Software Quality Engineer'],
            [/\bcon 4\+ a�os de experiencia\b/gi, 'with 4+ years of experience'],
            [/\bautomatizaci�n de pruebas\b/gi, 'test automation'],
            [/\bEspecializado en dise�ar estrategias de calidad\b/gi, 'Specialized in designing quality strategies'],
            [/\bframework robustos\b/gi, 'robust frameworks'],
            [/\by pipelines de CI\/CD\b/gi, 'and CI/CD pipelines'],
            [/\bque impulsan la calidad y aceleran la entrega de software\b/gi, 'that increase quality and speed up software delivery'],
            [/\bAutomatizaci�n de flujos end-to-end\b/gi, 'End-to-end flow automation'],
            [/\bde aplicaciones cr�ticas de negocio\b/gi, 'for critical business applications'],
            [/\bValidaci�n de servicios y contratos API\b/gi, 'Validation of API services and contracts'],
            [/\bde forma robusta y escalable\b/gi, 'in a robust and scalable way'],
            [/\bPruebas de carga, estr�s y capacidad\b/gi, 'Load, stress, and capacity testing'],
            [/\bpara garantizar rendimiento y estabilidad\b/gi, 'to ensure performance and stability'],
            [/\bReportes avanzados\b/gi, 'Advanced reporting'],
            [/\bIntegraci�n\b/gi, 'Integration'],
            [/\bPr�cticas\b/gi, 'Practices'],
            [/\bcobertura\b/gi, 'coverage'],
            [/\btrazabilidad\b/gi, 'traceability'],
            [/\bregresi�n\b/gi, 'regression'],
            [/\bManejo de datos y pruebas negativas\b/gi, 'Data handling and negative testing'],
            [/\bReportes autom�ticos\b/gi, 'Automated reports'],
            [/\bdocumentaci�n viva\b/gi, 'living documentation'],
            [/\bsuites reutilizables\b/gi, 'reusable suites'],
            [/\bEscenarios de carga\b/gi, 'Load scenarios'],
            [/\busuarios concurrentes\b/gi, 'concurrent users'],
            [/\bValidaci�n de SLAs\b/gi, 'SLA validation'],
            [/\bchecks autom�ticos\b/gi, 'automated checks'],
            [/\bReportes y dashboards visuales\b/gi, 'Reports and visual dashboards'],
            [/\bscripts versionados\b/gi, 'versioned scripts'],
            [/\bautomatizaci�n\b/gi, 'automation'],
            [/\breporting visual\b/gi, 'visual reporting'],
            [/\bmantenibles\b/gi, 'maintainable'],
            [/\bAn�lisis de Resultados\b/gi, 'Results Analysis'],
            [/\bMonitoreo\b/gi, 'Monitoring'],
            [/\bLenguajes\b/gi, 'Languages'],
            [/\bGesti�n & Calidad\b/gi, 'Management & Quality'],
            [/\bVer arquetipo\b/gi, 'View blueprint'],
            [/\bEne\.\b/g, 'Jan.'],
            [/\bAbr\.\b/g, 'Apr.'],
            [/\bAgo\.\b/g, 'Aug.'],
            [/\bDic\.\b/g, 'Dec.'],
            [/\bPresente\b/gi, 'Present'],
            [/\bPosici�n actual\b/gi, 'Current position'],
            [/\bPasante QA\b/gi, 'QA Intern'],
            [/\bResponsable de liderar iniciativas de calidad para productos bancarios digitales mediante automatizaci�n de APIs, pruebas de rendimiento y estrategias de validaci�n basadas en riesgo\./gi, 'Responsible for leading quality initiatives for digital banking products through API automation, performance testing, and risk-based validation strategies.'],
            [/\bParticipaci�n activa en iniciativas CI\/CD, optimizaci�n de ciclos de regresi�n y fortalecimiento de capacidades t�cnicas del equipo QA\./gi, 'Active participation in CI/CD initiatives, regression cycle optimization, and strengthening technical capabilities of the QA team.'],
            [/\bLider� iniciativas de automatizaci�n API utilizando Karate y SerenityBDD\./gi, 'Led API automation initiatives using Karate and SerenityBDD.'],
            [/\bDise�� estrategias de validaci�n basadas en riesgo junto a negocio y riesgos\./gi, 'Designed risk-based validation strategies together with business and risk teams.'],
            [/\bImplement� pruebas de rendimiento en flujos bancarios de alto volumen mediante K6\./gi, 'Implemented performance testing on high-volume banking flows using K6.'],
            [/\bIntegr� controles de calidad dentro de pipelines CI\/CD\./gi, 'Integrated quality controls into CI/CD pipelines.'],
            [/\bPrioriz� suites de validaci�n API seg�n criticidad funcional\./gi, 'Prioritized API validation suites by functional criticality.'],
            [/\bMentoric� QA en automatizaci�n, API testing y BDD\./gi, 'Mentored QA engineers in automation, API testing, and BDD.'],
            [/\bcobertura funcional y regresi�n\b/gi, 'functional and regression coverage'],
            [/\bdefectos post-release\b/gi, 'post-release defects'],
            [/\btiempo de feedback t�cnico\b/gi, 'technical feedback time'],
            [/\bdetecci�n temprana de incidencias cr�ticas\b/gi, 'early detection of critical incidents'],
            [/\btiempos de respuesta en pruebas de performance\b/gi, 'response times in performance tests'],
            [/\bautonom�a t�cnica del equipo\b/gi, 'team technical autonomy'],
            [/\bAutomatizaci�n de validaciones de APIs bancarias cr�ticas\./gi, 'Automation of critical banking API validations.'],
            [/\bIntegraci�n Azure DevOps\b/gi, 'Azure DevOps integration'],
            [/\bEjecuci�n paralela\b/gi, 'Parallel execution'],
            [/\bPruebas de rendimiento para servicios bancarios de alto volumen\./gi, 'Performance testing for high-volume banking services.'],
            [/\breportes automatizados\b/gi, 'automated reports'],
            [/\bdetecci�n temprana de cuellos de botella\b/gi, 'early bottleneck detection'],
            [/\bFramework de priorizaci�n basado en riesgo para ciclos de regresi�n\./gi, 'Risk-based prioritization framework for regression cycles.'],
            [/\bClasificaci�n por criticidad\b/gi, 'Criticality classification'],
            [/\bPriorizaci�n de escenarios\b/gi, 'Scenario prioritization'],
            [/\bMatriz riesgo-impacto\b/gi, 'Risk-impact matrix'],
            [/\bdefectos productivos\b/gi, 'production defects'],
            [/\bResponsable del dise�o y ejecuci�n de estrategias de pruebas funcionales, automatizadas y de rendimiento para proyectos financieros y empresariales\./gi, 'Responsible for designing and executing functional, automated, and performance testing strategies for financial and enterprise projects.'],
            [/\bParticipaci�n en iniciativas de automatizaci�n E2E, APIs y mejora continua dentro de equipos �giles\./gi, 'Participated in E2E automation, API initiatives, and continuous improvement within agile teams.'],
            [/\bDise�� estrategias de pruebas funcionales y automatizadas\./gi, 'Designed functional and automated testing strategies.'],
            [/\bImplement� automatizaci�n API y E2E\./gi, 'Implemented API and E2E automation.'],
            [/\bEjecut� pruebas de rendimiento con K6\./gi, 'Executed performance tests with K6.'],
            [/\bGestion� riesgos y planificaci�n en equipos �giles\./gi, 'Managed risks and planning in agile teams.'],
            [/\bValid� integraciones mediante REST APIs y PostgreSQL\./gi, 'Validated integrations through REST APIs and PostgreSQL.'],
            [/\bcobertura de requerimientos\b/gi, 'requirements coverage'],
            [/\btiempo de regresi�n por release\b/gi, 'regression time per release'],
            [/\bpredictibilidad de entregas\b/gi, 'delivery predictability'],
            [/\bdefectos detectados en UAT\b/gi, 'defects detected in UAT'],
            [/\bValidaci�n de APIs para recarga de Tarjeta Ciudad\./gi, 'API validation for Tarjeta Ciudad top-up flows.'],
            [/\bcobertura en escenarios cr�ticos\b/gi, 'coverage in critical scenarios'],
            [/\bdefectos tard�os\b/gi, 'late defects'],
            [/\bAutomatizaci�n de cuentas de inversi�n y ahorro\./gi, 'Automation of investment and savings accounts.'],
            [/\bciclo de validaci�n\b/gi, 'validation cycle'],
            [/\bAutomatizaci�n de regresi�n de procesos cr�ticos\./gi, 'Regression automation for critical processes.'],
            [/\btiempo de regresi�n\b/gi, 'regression time'],
            [/\bParticipaci�n en actividades de an�lisis, planificaci�n y ejecuci�n de pruebas para productos financieros, colaborando con equipos QA y desarrollo\./gi, 'Participated in analysis, planning, and test execution activities for financial products, collaborating with QA and development teams.'],
            [/\bAn�lisis de requerimientos\./gi, 'Requirements analysis.'],
            [/\bDise�o de casos de prueba\./gi, 'Test case design.'],
            [/\bEjecuci�n funcional\./gi, 'Functional execution.'],
            [/\bGesti�n de defectos\./gi, 'Defect management.'],
            [/\bSeguimiento de calidad\./gi, 'Quality follow-up.'],
            [/\bclaridad de criterios de aceptaci�n\b/gi, 'acceptance criteria clarity'],
            [/\bresoluci�n en primer ciclo\b/gi, 'first-cycle resolution'],
            [/\bretrabajos previos a pruebas\b/gi, 'pre-test rework'],
            [/\bvisibilidad de calidad\b/gi, 'quality visibility'],
            [/\bOptimizaci�n del proceso de preparaci�n para pruebas\./gi, 'Optimization of the test readiness process.'],
            [/\bmenos retrabajo\b/gi, 'less rework'],
            [/\bmayor alineaci�n entre equipos\b/gi, 'better team alignment'],
            [/\bParticipaci�n en pruebas automatizadas y de rendimiento para aplicaciones web empresariales\./gi, 'Participated in automated and performance testing for enterprise web applications.'],
            [/\bDise�o de pruebas automatizadas\./gi, 'Automated test design.'],
            [/\bEjecuci�n de pruebas de carga\./gi, 'Load test execution.'],
            [/\bValidaci�n cross-browser\./gi, 'Cross-browser validation.'],
            [/\bReporter�a de calidad\./gi, 'Quality reporting.'],
            [/\bincidencias productivas\b/gi, 'production incidents'],
            [/\bestabilidad cross-platform\b/gi, 'cross-platform stability'],
            [/\bvelocidad de liberaci�n\b/gi, 'release speed'],
            [/\bdefectos repetitivos\b/gi, 'repetitive defects'],
            [/\bAutomatizaci�n funcional para aplicaciones web\./gi, 'Functional automation for web applications.'],
            [/\bmenos incidencias productivas\b/gi, 'fewer production incidents'],
            [/\bmayor cobertura funcional\b/gi, 'higher functional coverage'],
            [/\bPruebas de carga y estr�s\./gi, 'Load and stress testing.'],
            [/\boptimizaci�n de estabilidad\b/gi, 'stability optimization'],
            [/\bApoyo en iniciativas de calidad para aplicaciones de seguros mediante automatizaci�n, pruebas funcionales y validaci�n de rendimiento\./gi, 'Supported quality initiatives for insurance applications through automation, functional testing, and performance validation.'],
            [/\bEjecuci�n de pruebas funcionales y automatizadas en m�dulos de seguros\./gi, 'Executed functional and automated tests in insurance modules.'],
            [/\bValidaci�n de datos de prueba con apoyo de SQL y Excel\./gi, 'Validated test data using SQL and Excel.'],
            [/\bSoporte a iniciativas de performance y documentaci�n de resultados\./gi, 'Supported performance initiatives and results documentation.'],
            [/\bcobertura de escenarios cr�ticos\b/gi, 'critical scenario coverage'],
            [/\binconsistencias de datos\b/gi, 'data inconsistencies'],
            [/\bvisibilidad de cobertura\b/gi, 'coverage visibility'],
            [/\breprocesos de validaci�n\b/gi, 'validation rework'],
            [/\bAutomatizaci�n y validaci�n de sistemas de seguros\./gi, 'Automation and validation of insurance systems.'],
            [/\bSoporte operativo y tecnol�gico para sistemas bancarios\./gi, 'Operational and technological support for banking systems.'],
            [/\bSoporte t�cnico a usuarios y seguimiento de incidencias\./gi, 'Technical user support and incident follow-up.'],
            [/\bEjecuci�n de mantenimiento preventivo y correctivo\./gi, 'Preventive and corrective maintenance execution.'],
            [/\bGesti�n de prioridades operativas bajo SLA\./gi, 'Operational priority management under SLA.'],
            [/\bMejora en atenci�n de incidencias\b/gi, 'incident response improvement'],
            [/\bInterrupciones operativas\b/gi, 'operational interruptions'],
            [/\bCumplimiento SLA\b/gi, 'SLA compliance'],
            [/\beficiencia operativa\b/gi, 'operational efficiency'],
            [/\bMesa de ayuda\b/gi, 'Help Desk'],
            [/\bSoporte operativo\b/gi, 'Operational support'],
            [/\bGesti�n de tickets\b/gi, 'Ticket management'],
            [/\bSoporte tecnol�gico para usuarios locales y remotos en operaciones petroleras\./gi, 'Technological support for local and remote users in oil operations.'],
            [/\bAtenci�n a incidencias de primer nivel para usuarios locales y remotos\./gi, 'First-level incident support for local and remote users.'],
            [/\bDocumentaci�n y seguimiento de fallas recurrentes\./gi, 'Documentation and follow-up of recurring failures.'],
            [/\bCoordinaci�n con mesa internacional para resoluci�n de casos\./gi, 'Coordination with international help desk for case resolution.'],
            [/\bMejora en tiempos de respuesta\b/gi, 'response time improvement'],
            [/\bReincidencias\b/gi, 'recurrences'],
            [/\bCierre efectivo de casos\b/gi, 'effective case closure'],
            [/\bSoporte remoto\b/gi, 'Remote support'],
            [/\bGesti�n de incidentes\b/gi, 'Incident management'],
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
            ctaButton.innerHTML = lang === 'en' ? 'Contact <span aria-hidden="true">?</span>' : 'Contactar <span aria-hidden="true">?</span>';
          }
        }

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
            const descriptionEs = 'Landing profesional de Bryan Alexander Freire Chamorro, QA Automation, API y Performance Engineer. Estrategias de automatizaci�n, testing y DevOps.';
            const descriptionEn = 'Professional landing page of Bryan Alexander Freire Chamorro, QA Automation, API and Performance Engineer. Automation, testing and DevOps strategies.';
            descriptionNode.setAttribute('content', lang === 'en' ? descriptionEn : descriptionEs);
          }

          applyStructuredTranslations(lang);
          translateDynamicNodeList(lang);
          updateTimelineOnLanguageChange(lang);
          langButtons.forEach((other) => {
            other.classList.toggle('active', other.getAttribute('data-lang') === lang);
          });

          if (typeof window.renderXpDetailPanel === 'function') {
            const currentIdx = typeof window.getXpCurrentIndex === 'function' ? window.getXpCurrentIndex() : 0;
            window.renderXpDetailPanel(currentIdx);
          }
        }
        
        // Expose to window for global access
        window.applyLanguage = applyLanguage;
        
        // Also expose a method to trigger language change
        window.setLanguage = function(lang) {
          applyLanguage(lang);
        };

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


