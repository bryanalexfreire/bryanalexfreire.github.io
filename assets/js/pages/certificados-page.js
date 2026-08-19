const certificateItems = [
      { title: 'Stratio Generative AI Data Governance', issuer: 'StratioBD', year: '2025', type: 'certificacion metodologia', kind: 'certificacion', logo: 'S', desc: 'Gobernanza y gestion de datos aplicada IA generativa.', file: 'assets/docs/certificados/Stratio Generative AI Data Governance.pdf' },
      { title: 'Stratio Generative AI Data Fabric Basics', issuer: 'StratioBD', year: '2025', type: 'certificacion devops', kind: 'certificacion', logo: 'S', desc: 'Fundamentos de Data Fabric e integracion inteligente de datos.', file: 'assets/docs/certificados/Stratio Generative AI Data Fabric Basics.pdf' },
      { title: 'Stratio Generative AI Data Processing', issuer: 'StratioBD', year: '2025', type: 'certificacion devops', kind: 'certificacion', logo: 'S', desc: 'Procesamiento avanzado de datos con IA generativa.', file: 'assets/docs/certificados/Stratio Generative AI Data Procesing.pdf' },
      { title: 'ISTQB Certified Tester Foundation Level - Agile', issuer: 'ISTQB', year: '2025', type: 'certificacion testing metodologia', kind: 'certificacion', isCoreSkill: true, logo: 'ISTQB', desc: 'Fundamentos de pruebas agiles y ciclo de calidad.', file: 'assets/docs/certificados/ISTQB® Certified Tester, Foundation Level - Agile Tester (2014).pdf' },
      { title: 'CSM - Scrum Master', issuer: 'Scrum Alliance', year: '2024', type: 'certificacion metodologia', kind: 'certificacion', isCoreSkill: true, logo: 'CSM', desc: 'Liderazgo agil para equipos y gestion de entregas.', file: 'assets/docs/certificados/CSM - SCRUM MASTER.pdf' },
      { title: 'ISTQB Foundation Level 4.0', issuer: 'ISTQB', year: '2024', type: 'certificacion testing', kind: 'certificacion', isCoreSkill: true, logo: 'ISTQB', desc: 'Version actualizada de fundamentos de pruebas de software.', file: 'assets/docs/certificados/ISTQB® Foundation Level 4.0.pdf' },
      { title: 'Curso de QA Automation con Serenity', issuer: 'Udemy', year: '2025', type: 'curso testing', kind: 'curso', logo: 'U', desc: 'Automatizacion E2E con SerenityBDD, Cucumber y buenas practicas.', file: 'assets/docs/certificados/Curso de QA Automation con Serenity - De novato a experto!.pdf' },
      { title: 'Fundamentos de pruebas Agiles', issuer: 'Full Advanced', year: '2025', type: 'curso testing metodologia', kind: 'curso', logo: 'FA', desc: 'Principios, tecnicas y estrategias de testing en metodologias agiles.', file: 'assets/docs/certificados/Fundamentos de pruebas Agiles.pdf' },
      { title: 'K6 Pruebas de performance para principiantes', issuer: 'Udemy', year: '2025', type: 'curso testing', kind: 'curso', logo: 'U', desc: 'Introduccion a performance testing con K6 y escenarios de carga.', file: 'assets/docs/certificados/K6 Pruebas de performance para principiantes.pdf' },
      { title: 'Karate DSL API Automation and performance', issuer: 'Udemy', year: '2025', type: 'curso testing', kind: 'curso', logo: 'U', desc: 'Automatizacion API y performance con Karate DSL.', file: 'assets/docs/certificados/Karate DSL Api Automation and performance from zero to hero.pdf' },
      { title: 'Dynatrace Fundamentals', issuer: 'Pluralsight', year: '2025', type: 'curso devops testing', kind: 'curso', logo: 'P', desc: 'Monitoreo, observabilidad y diagnostico en aplicaciones.', file: 'assets/docs/certificados/Dynatrace Fundamentals.pdf' },
      { title: 'Observability Technologies and implementation', issuer: 'Pluralsight', year: '2025', type: 'curso devops', kind: 'curso', logo: 'P', desc: 'Tecnologias de observabilidad para ambientes productivos.', file: 'assets/docs/certificados/Observability Technologies and implementation.pdf' },
      { title: 'Site Reliability Engineering The big picture', issuer: 'Pluralsight', year: '2025', type: 'curso devops', kind: 'curso', logo: 'P', desc: 'Principios de SRE para confiabilidad y escalabilidad.', file: 'assets/docs/certificados/Site reliability Engineering The big picture.pdf' },
      { title: 'DevOps Foundations CI and CD', issuer: 'Pluralsight', year: '2025', type: 'curso devops', kind: 'curso', logo: 'P', desc: 'Integracion y entrega continua para equipos de desarrollo.', file: 'assets/docs/certificados/DevOps Foundations Continuous Integration and Continuous Delivery.pdf' },
      { title: 'Developing Docker Apps Core', issuer: 'Pluralsight', year: '2025', type: 'curso devops', kind: 'curso', logo: 'P', desc: 'Principios basicos para aplicaciones Docker modernas.', file: 'assets/docs/certificados/Developing Docker Apps Core.pdf' },
      { title: 'Git Fundamentals', issuer: 'Pluralsight', year: '2025', type: 'curso devops', kind: 'curso', logo: 'P', desc: 'Control de versiones y flujos Git para equipos agiles.', file: 'assets/docs/certificados/Git Fundamentals.pdf' },
      { title: 'Devops y cloud con Azure DevOps', issuer: 'Udemy', year: '2025', type: 'curso devops', kind: 'curso', logo: 'U', desc: 'Pipelines, App Service, Git y automatizacion de despliegues.', file: 'assets/docs/certificados/Devops y cloud con azure devops, app service pipelines y git.pdf' },
      { title: 'DevOps TOTAL Docker Kubernetes Jenkins AWS', issuer: 'Udemy', year: '2025', type: 'curso devops', kind: 'curso', logo: 'U', desc: 'Stack DevOps completo para integracion y entrega.', file: 'assets/docs/certificados/DevOps TOTAL Docker, Kubernetes, Jenkins, AWS, Git & Más!.pdf' },
      { title: 'Ultimate Docker guia de cero hasta despliegues', issuer: 'Udemy', year: '2025', type: 'curso devops', kind: 'curso', logo: 'U', desc: 'Docker desde fundamentos hasta entornos de produccion.', file: 'assets/docs/certificados/Ultimate Docker  guía de cero hasta despliegues.pdf' },
      { title: 'Curso de introduccion al desarrollo web HTML y CSS 1-2', issuer: 'Google', year: '2025', type: 'curso devops', kind: 'curso', logo: 'G', desc: 'Fundamentos de HTML y CSS para desarrollo web.', file: 'assets/docs/certificados/Curso de introducción al desarrollo web HTML y CSS 1-2.pdf' },
      { title: 'Curso de introduccion al desarrollo web HTML y CSS 2-2', issuer: 'Google', year: '2025', type: 'curso devops', kind: 'curso', logo: 'G', desc: 'Profundizacion en HTML y CSS para interfaces.', file: 'assets/docs/certificados/Curso de introducción al desarrollo web HTML y CSS 2-2.pdf' },
      { title: 'Aspectos basicos de GitHub Copilot', issuer: 'Microsoft Learn', year: '2025', type: 'curso devops', kind: 'curso', logo: 'AI', desc: 'Uso de GitHub Copilot para acelerar productividad en codigo.', file: 'assets/docs/certificados/Aspectos básicos de GitHub Copilot (descripción del programador de pares de inteligencia artificial).pdf' },
      { title: 'Aceleracion del desarrollo con GitHub Copilot', issuer: 'Microsoft Learn', year: '2025', type: 'curso devops', kind: 'curso', logo: 'AI', desc: 'Estrategias para mejorar velocidad de desarrollo asistido.', file: 'assets/docs/certificados/Aceleración del desarrollo de aplicaciones mediante GitHub Copilot.pdf' },
      { title: 'Curso Completo en Design Thinking', issuer: 'Udemy', year: '2025', type: 'curso metodologia', kind: 'curso', logo: 'U', desc: 'Resolucion de problemas y diseno centrado en usuario.', file: 'assets/docs/certificados/Curso Completo en Design Thinking.pdf' },
      { title: 'Liderazgo y Gestion de equipos', issuer: 'Udemy', year: '2025', type: 'curso metodologia', kind: 'curso', isLifeSkill: true, logo: 'U', desc: 'Habilidades de liderazgo para equipos colaborativos.', file: 'assets/docs/certificados/Liderazgo y Gestión de equipos.pdf' },
      { title: 'Decidir y Priorizar para lograr tus metas', issuer: 'Udemy', year: '2025', type: 'curso metodologia', kind: 'curso', isLifeSkill: true, logo: 'U', desc: 'Toma de decisiones y priorizacion orientada a resultados.', file: 'assets/docs/certificados/Decidir y Priorizar- Para lograr tus metas.pdf' },
      { title: 'Servicio al cliente Como manejar clientes dificiles', issuer: 'Udemy', year: '2025', type: 'curso metodologia', kind: 'curso', isLifeSkill: true, logo: 'U', desc: 'Manejo de situaciones complejas de atencion al cliente.', file: 'assets/docs/certificados/Servicio al cliente- Como manejar clientes difíciles.pdf' },
      { title: 'Inteligencia Emocional para la Atencion al Cliente', issuer: 'Udemy', year: '2025', type: 'curso metodologia', kind: 'curso', isLifeSkill: true, logo: 'U', desc: 'Comunicacion empatica y relacion efectiva con usuarios.', file: 'assets/docs/certificados/Inteligencia Emocional para la Atención al Cliente.pdf' }
    ];

    (function () {
      const translations = {
        es: {
          'meta.title': 'Certificaciones - Bryan Freire',
          'meta.description': 'Catalogo de certificaciones y cursos de Bryan Freire para QA, automatizacion, performance y DevOps.',
          title: 'Certificaciones',
          subtitle: 'Certificaciones y cursos que respaldan mi formacion continua en calidad de software, automatizacion, performance y metodologias agiles.',
          'tab.all': 'Todas',
          'tab.certs': 'Certificaciones',
          'tab.courses': 'Cursos',
          'tab.methods': 'Metodologias',
          'tab.devops': 'Cloud & DevOps',
          'tab.testing': 'Testing & Calidad',
          'btn.home': '<- Volver al inicio',
          'btn.download': 'Descargar resumen',
          'stat.certs': 'Certificaciones',
          'stat.courses': 'Cursos completados',
          'stat.hours': 'Horas de formacion',
          'stat.period': 'Formacion continua',
          'section.certs': 'Certificaciones Profesionales',
          'section.courses': 'Cursos y Especializaciones',
          'section.lifeskills': 'Habilidades Complementarias',
          'foot.copy': 'Todas las certificaciones son verificables y respaldan mi compromiso con la mejora continua. Hago aprendizaje constante para mantenerme actualizado con las mejores practicas y tecnologias del mercado.',
          'foot.link': 'Ver todas las certificaciones en LinkedIn ->',
          credential: 'Ver credencial ->'
        },
        en: {
          'meta.title': 'Certifications - Bryan Freire',
          'meta.description': 'Catalog of certifications and courses by Bryan Freire in QA, automation, performance, and DevOps.',
          title: 'Certifications',
          subtitle: 'Certifications and courses that support my continuous learning in software quality, automation, performance, and agile methodologies.',
          'tab.all': 'All',
          'tab.certs': 'Certifications',
          'tab.courses': 'Courses',
          'tab.methods': 'Methodologies',
          'tab.devops': 'Cloud & DevOps',
          'tab.testing': 'Testing & Quality',
          'btn.home': '<- Back to home',
          'btn.download': 'Download summary',
          'stat.certs': 'Certifications',
          'stat.courses': 'Completed courses',
          'stat.hours': 'Training hours',
          'stat.period': 'Continuous learning',
          'section.certs': 'Professional Certifications',
          'section.courses': 'Courses and Specializations',
          'section.lifeskills': 'Complementary Skills',
          'foot.copy': 'All certifications are verifiable and support my commitment to continuous improvement. I keep learning to stay current with best practices and market technologies.',
          'foot.link': 'View all certifications on LinkedIn ->',
          credential: 'View credential ->'
        }
      };

      let currentLang = localStorage.getItem('site-lang') || 'es';

      const tabs = Array.from(document.querySelectorAll('.cert-tab'));
      const langButtons = Array.from(document.querySelectorAll('.lang-btn[data-lang]'));
      const certGrid = document.getElementById('cert-grid');
      const courseGrid = document.getElementById('course-grid');
      const lifeskillGrid = document.getElementById('lifeskill-grid');
      const sections = Array.from(document.querySelectorAll('section[data-section]'));

      function applyTranslations() {
        const dict = translations[currentLang] || translations.es;
        document.documentElement.lang = currentLang;
        if (dict['meta.title']) document.title = dict['meta.title'];
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && dict['meta.description']) {
          metaDescription.setAttribute('content', dict['meta.description']);
        }
        const cvLink = document.querySelector('.cert-btn-download');
        if (cvLink) {
          cvLink.setAttribute('href', currentLang === 'en' ? 'cv-resumen-en.html' : 'cv-resumen.html');
        }
        document.querySelectorAll('[data-i18n]').forEach((node) => {
          const key = node.getAttribute('data-i18n');
          if (dict[key]) node.textContent = dict[key];
        });
      }

      function setActiveLang() {
        langButtons.forEach((btn) => {
          btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
        });
      }

      function buildCard(item) {
        const dict = translations[currentLang] || translations.es;
        const titleText = currentLang === 'en' ? (item.titleEn || item.title) : (item.titleEs || item.title);
        const descText = currentLang === 'en'
          ? (item.descEn || autoTranslateToEnglish(item.desc))
          : (item.descEs || item.desc);
        const card = document.createElement('article');
        card.className = 'cert-card';
        card.setAttribute('data-type', item.type);
        card.setAttribute('data-kind', item.kind || 'curso');
        if (item.isCoreSkill) card.setAttribute('data-core', 'true');
        if (item.isLifeSkill) card.setAttribute('data-lifeskill', 'true');
        const badgeHTML = item.isCoreSkill ? '<span class="cert-card-badge" aria-label="Certificacion clave">⭐</span>' : '';
        card.innerHTML = `
          <div class="cert-card-top">
            <span class="cert-card-logo">${item.logo}</span>
            <span class="cert-card-year">${item.year}</span>
            ${badgeHTML}
          </div>
          <h3>${titleText}</h3>
          <p class="cert-card-issuer">${item.issuer}</p>
          <p class="cert-card-desc">${descText}</p>
          <a class="cert-card-link" href="${item.file}" target="_blank" rel="noopener noreferrer">${dict.credential}</a>
        `;
        return card;
      }

      function autoTranslateToEnglish(text) {
        const translationPairs = [
          [/\bGobernanza\b/gi, 'Governance'],
          [/\bgestion\b/gi, 'management'],
          [/\baplicada\b/gi, 'applied'],
          [/\bFundamentos\b/gi, 'Fundamentals'],
          [/\bintegracion\b/gi, 'integration'],
          [/\binteligente\b/gi, 'intelligent'],
          [/\bProcesamiento\b/gi, 'Advanced processing'],
          [/\bavanzado\b/gi, 'advanced'],
          [/\bdatos\b/gi, 'data'],
          [/\bpruebas\b/gi, 'testing'],
          [/\bagiles\b/gi, 'agile'],
          [/\bciclo de calidad\b/gi, 'quality lifecycle'],
          [/\bLiderazgo agil\b/gi, 'Agile leadership'],
          [/\bequipos\b/gi, 'teams'],
          [/\bgestion de entregas\b/gi, 'delivery management'],
          [/\bVersion actualizada\b/gi, 'Updated version'],
          [/\bfundamentos\b/gi, 'foundations'],
          [/\bsoftware\b/gi, 'software'],
          [/\bAutomatizacion\b/gi, 'Automation'],
          [/\bE2E\b/gi, 'E2E'],
          [/\bbuenas practicas\b/gi, 'best practices'],
          [/\bPrincipios\b/gi, 'Principles'],
          [/\btecnicas\b/gi, 'techniques'],
          [/\bestrategias\b/gi, 'strategies'],
          [/\bmetodologias\b/gi, 'methodologies'],
          [/\bIntroduccion\b/gi, 'Introduction'],
          [/\bescenarios de carga\b/gi, 'load scenarios'],
          [/\bMonitoreo\b/gi, 'Monitoring'],
          [/\bobservabilidad\b/gi, 'observability'],
          [/\bdiagnostico\b/gi, 'diagnostics'],
          [/\baplicaciones\b/gi, 'applications'],
          [/\bTecnologias\b/gi, 'Technologies'],
          [/\bambientes productivos\b/gi, 'production environments'],
          [/\bPrincipios de SRE\b/gi, 'SRE principles'],
          [/\bconfiabilidad\b/gi, 'reliability'],
          [/\bescalabilidad\b/gi, 'scalability'],
          [/\bIntegracion\b/gi, 'Integration'],
          [/\bentrega continua\b/gi, 'continuous delivery'],
          [/\bequipos de desarrollo\b/gi, 'development teams'],
          [/\bPrincipios basicos\b/gi, 'Core principles'],
          [/\baplicaciones Docker modernas\b/gi, 'modern Docker applications'],
          [/\bControl de versiones\b/gi, 'Version control'],
          [/\bflujos Git\b/gi, 'Git workflows'],
          [/\bequipos agiles\b/gi, 'agile teams'],
          [/\bPipelines\b/gi, 'Pipelines'],
          [/\bautomatizacion de despliegues\b/gi, 'deployment automation'],
          [/\bcompleto\b/gi, 'complete'],
          [/\bFundamentos de HTML y CSS\b/gi, 'HTML and CSS fundamentals'],
          [/\bdesarrollo web\b/gi, 'web development'],
          [/\bProfundizacion\b/gi, 'Deep dive'],
          [/\binterfaces\b/gi, 'interfaces'],
          [/\bUso de GitHub Copilot\b/gi, 'Using GitHub Copilot'],
          [/\bacelerar productividad\b/gi, 'to accelerate productivity'],
          [/\bcodigo\b/gi, 'code'],
          [/\bEstrategias\b/gi, 'Strategies'],
          [/\bmejorar velocidad de desarrollo asistido\b/gi, 'to improve assisted development speed'],
          [/\bResolucion de problemas\b/gi, 'Problem solving'],
          [/\bdiseno centrado en usuario\b/gi, 'user-centered design'],
          [/\bHabilidades de liderazgo\b/gi, 'Leadership skills'],
          [/\bcolaborativos\b/gi, 'collaborative'],
          [/\bToma de decisiones\b/gi, 'Decision making'],
          [/\bpriorizacion\b/gi, 'prioritization'],
          [/\borientada a resultados\b/gi, 'results-oriented'],
          [/\bManejo de situaciones complejas\b/gi, 'Handling complex situations'],
          [/\batencion al cliente\b/gi, 'customer service'],
          [/\bComunicacion empatica\b/gi, 'Empathetic communication'],
          [/\brelacion efectiva\b/gi, 'effective relationship'],
          [/\busuarios\b/gi, 'users']
        ];

        let translated = text || '';
        translationPairs.forEach(([pattern, replacement]) => {
          translated = translated.replace(pattern, replacement);
        });
        return translated;
      }

      const certItems = certificateItems.filter((item) => item.kind === 'certificacion');
      const courseItems = certificateItems.filter((item) => item.kind === 'curso' && !item.isLifeSkill);
      const lifeskillItems = certificateItems.filter((item) => item.isLifeSkill);

      function renderCards() {
        certGrid.innerHTML = '';
        courseGrid.innerHTML = '';
        lifeskillGrid.innerHTML = '';
        certItems.forEach((item) => certGrid.appendChild(buildCard(item)));
        courseItems.forEach((item) => courseGrid.appendChild(buildCard(item)));
        lifeskillItems.forEach((item) => lifeskillGrid.appendChild(buildCard(item)));
      }

      renderCards();

      function getCards() {
        return Array.from(document.querySelectorAll('.cert-card'));
      }

      function updateStats() {
        const certCount = certItems.length;
        const courseCount = courseItems.length;
        document.getElementById('stat-certs').textContent = String(certCount);
        document.getElementById('stat-courses').textContent = String(courseCount);
      }

      function applyFilter(filter) {
        const cards = getCards();
        cards.forEach((card) => {
          const types = (card.getAttribute('data-type') || '').split(/\s+/);
          const isVisible = filter === 'all' || types.includes(filter);
          card.classList.toggle('hidden', !isVisible);
        });

        sections.forEach((section) => {
          const visibleInSection = Array.from(section.querySelectorAll('.cert-card')).some((card) => !card.classList.contains('hidden'));
          section.classList.toggle('hidden', !visibleInSection);
        });

        tabs.forEach((tab) => {
          tab.classList.toggle('active', tab.getAttribute('data-filter') === filter);
        });
      }

      tabs.forEach((tab) => {
        tab.addEventListener('click', function () {
          applyFilter(tab.getAttribute('data-filter') || 'all');
        });
      });

      langButtons.forEach((btn) => {
        btn.addEventListener('click', function () {
          const lang = btn.getAttribute('data-lang');
          if (!lang) return;
          currentLang = lang;
          localStorage.setItem('site-lang', lang);
          setActiveLang();
          applyTranslations();
          const activeTab = document.querySelector('.cert-tab.active');
          const filter = activeTab ? activeTab.getAttribute('data-filter') || 'all' : 'all';
          renderCards();
          applyFilter(filter);
        });
      });

      setActiveLang();
      applyTranslations();
      updateStats();
      applyFilter('testing');
    })();

