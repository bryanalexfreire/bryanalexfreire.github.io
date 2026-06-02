// Datos de experiencia laboral (puedes completar los campos vacíos luego)
    const xpData = [
      {
        id: 'pichincha',
        logo: 'assets/img/banco_pichincha_ca_logo.ico',
        company: 'Banco Pichincha S.A',
        role: 'QA Engineer',
        roleEn: 'QA Engineer',
        date: 'Ene. 2026 – Presente',
        dateEn: 'Jan. 2026 - Present',
        location: 'Quito, Ecuador',
        locationEn: 'Quito, Ecuador',
        status: '★ Posición actual',
        statusEn: '★ Current position',
        kpis: [
          { color: 'green', icon: '✔️', value: '+30%', label: 'Cobertura funcional y regresión', labelEn: 'Functional and regression coverage' },
          { color: 'blue', icon: '🛡️', value: '-35%', label: 'Defectos post-release', labelEn: 'Post-release defects' },
          { color: 'purple', icon: '⏱️', value: '-50%', label: 'Tiempo de feedback técnico', labelEn: 'Technical feedback time' }
        ],
        about: 'Responsable de liderar iniciativas de calidad para productos bancarios digitales mediante automatización de APIs, pruebas de rendimiento y estrategias de validación basadas en riesgo. Participación activa en iniciativas CI/CD, optimización de ciclos de regresión y fortalecimiento de capacidades técnicas del equipo QA.',
        aboutEn: 'Responsible for leading quality initiatives for digital banking products through API automation, performance testing, and risk-based validation strategies. Active participation in CI/CD initiatives, regression cycle optimization, and strengthening the QA team technical capabilities.',
        responsibilities: [
          'Lideré iniciativas de automatización API utilizando Karate y SerenityBDD.',
          'Diseñé estrategias de validación basadas en riesgo junto a negocio y riesgos.',
          'Implementé pruebas de rendimiento en flujos bancarios de alto volumen mediante K6.',
          'Integré controles de calidad dentro de pipelines CI/CD.',
          'Priorizé suites de validación API según criticidad funcional.',
          'Mentoricé QA en automatización, API testing y BDD.'
        ],
        responsibilitiesEn: [
          'Led API automation initiatives using Karate and SerenityBDD.',
          'Designed risk-based validation strategies together with business and risk teams.',
          'Implemented performance testing on high-volume banking flows using K6.',
          'Integrated quality controls into CI/CD pipelines.',
          'Prioritized API validation suites based on functional criticality.',
          'Mentored QA engineers in automation, API testing, and BDD.'
        ],
        projects: [
          {
            title: 'Banking API Automation Suite',
            desc: '<b>Tipo:</b> API<br>Automatización de validaciones de APIs bancarias críticas.<br><b>Características:</b> Karate DSL, Contract Testing, Data Driven Testing, Integración Azure DevOps, Ejecución paralela.<br><b>Resultados:</b> +30% cobertura y -50% tiempo de validación.',
            descEn: '<b>Type:</b> API<br>Automation of critical banking API validations.<br><b>Features:</b> Karate DSL, Contract Testing, Data Driven Testing, Azure DevOps integration, parallel execution.<br><b>Results:</b> +30% coverage and -50% validation time.',
            evid: 'Ver evidencia →'
            ,evidEn: 'View evidence →'
          },
          {
            title: 'Performance Banking Platform',
            desc: '<b>Tipo:</b> PERF<br>Pruebas de rendimiento para servicios bancarios de alto volumen.<br><b>Características:</b> K6, Stress Testing, Load Testing, Capacity Testing, reportes automatizados.<br><b>Resultados:</b> -25% tiempos de respuesta y detección temprana de cuellos de botella.',
            descEn: '<b>Type:</b> PERF<br>Performance testing for high-volume banking services.<br><b>Features:</b> K6, Stress Testing, Load Testing, Capacity Testing, automated reports.<br><b>Results:</b> -25% response times and early bottleneck detection.',
            evid: 'Ver evidencia →'
            ,evidEn: 'View evidence →'
          },
          {
            title: 'Risk-Based Validation Framework',
            desc: '<b>Tipo:</b> QA<br>Framework de priorización basado en riesgo para ciclos de regresión.<br><b>Características:</b> Clasificación por criticidad, priorización de escenarios, matriz riesgo-impacto.<br><b>Resultados:</b> +40% detección temprana y -35% defectos productivos.',
            descEn: '<b>Type:</b> QA<br>Risk-based prioritization framework for regression cycles.<br><b>Features:</b> Criticality classification, scenario prioritization, risk-impact matrix.<br><b>Results:</b> +40% early detection and -35% production defects.',
            evid: 'Ver evidencia →'
            ,evidEn: 'View evidence →'
          }
        ],
        tools: ['Karate', 'SerenityBDD', 'Java', 'K6', 'Azure DevOps', 'Git', 'Postman', 'PostgreSQL', 'Jira', 'Confluence', 'BDD', 'Risk-Based Testing'],
        toolsEn: ['Karate', 'SerenityBDD', 'Java', 'K6', 'Azure DevOps', 'Git', 'Postman', 'PostgreSQL', 'Jira', 'Confluence', 'BDD', 'Risk-Based Testing'],
        achievements: [
          { color: 'green', value: '+30%', label: 'cobertura funcional y regresión', labelEn: 'functional and regression coverage' },
          { color: 'blue', value: '-35%', label: 'defectos post-release', labelEn: 'post-release defects' },
          { color: 'purple', value: '-50%', label: 'tiempo de feedback técnico', labelEn: 'technical feedback time' },
          { color: 'green', value: '+40%', label: 'detección temprana de incidencias críticas', labelEn: 'early detection of critical incidents' },
          { color: 'blue', value: '-25%', label: 'tiempos de respuesta en pruebas de performance', labelEn: 'response times in performance tests' },
          { color: 'green', value: '+30%', label: 'autonomía técnica del equipo', labelEn: 'team technical autonomy' }
        ]
      },
      {
        id: 'ntt',
        logo: 'assets/img/ntt_data_europe_latam_logo.ico',
        company: 'NTT DATA',
        role: 'QA Engineer',
        roleEn: 'QA Engineer',
        date: 'Sep. 2023 – Ene. 2026',
        dateEn: 'Sep. 2023 - Jan. 2026',
        location: 'Quito, Ecuador',
        locationEn: 'Quito, Ecuador',
        status: '',
        kpis: [
          { color: 'blue', icon: '📈', value: '+28%', label: 'Cobertura de requerimientos', labelEn: 'Requirements coverage' },
          { color: 'purple', icon: '⏱️', value: '-35%', label: 'Tiempo de regresión por release', labelEn: 'Regression time per release' },
          { color: 'green', icon: '✅', value: '+20%', label: 'Predictibilidad de entregas', labelEn: 'Delivery predictability' }
        ],
        about: 'Responsable del diseño y ejecución de estrategias de pruebas funcionales, automatizadas y de rendimiento para proyectos financieros y empresariales. Participación en iniciativas de automatización E2E, APIs y mejora continua dentro de equipos ágiles.',
        aboutEn: 'Responsible for designing and executing functional, automated, and performance testing strategies for financial and enterprise projects. Participated in E2E automation, API initiatives, and continuous improvement within agile teams.',
        responsibilities: [
          'Diseñé estrategias de pruebas funcionales y automatizadas.',
          'Implementé automatización API y E2E.',
          'Ejecuté pruebas de rendimiento con K6.',
          'Gestioné riesgos y planificación en equipos ágiles.',
          'Validé integraciones mediante REST APIs y PostgreSQL.'
        ],
        responsibilitiesEn: [
          'Designed functional and automated testing strategies.',
          'Implemented API and E2E automation.',
          'Executed performance tests with K6.',
          'Managed risks and planning in agile teams.',
          'Validated integrations through REST APIs and PostgreSQL.'
        ],
        projects: [
          {
            title: 'Transporte Metropolitano',
            titleEn: 'Metropolitan Transport',
            desc: '<b>Tipo:</b> API<br>Validación de APIs para recarga de Tarjeta Ciudad.<br><b>Características:</b> Karate DSL, SerenityBDD, PostgreSQL, Azure DevOps.<br><b>Resultados:</b> +30% cobertura en escenarios críticos y -40% defectos tardíos.',
            descEn: '<b>Type:</b> API<br>API validation for Tarjeta Ciudad top-ups.<br><b>Features:</b> Karate DSL, SerenityBDD, PostgreSQL, Azure DevOps.<br><b>Results:</b> +30% coverage in critical scenarios and -40% late defects.',
            evid: 'Ver evidencia →'
            ,evidEn: 'View evidence →'
          },
          {
            title: 'Investment Accounts Platform',
            desc: '<b>Tipo:</b> API<br>Automatización de cuentas de inversión y ahorro.<br><b>Características:</b> Karate, Cucumber, Contract Testing, CI/CD.<br><b>Resultados:</b> -35% defectos post-release y -50% ciclo de validación.',
            descEn: '<b>Type:</b> API<br>Automation of investment and savings accounts.<br><b>Features:</b> Karate, Cucumber, Contract Testing, CI/CD.<br><b>Results:</b> -35% post-release defects and -50% validation cycle.',
            evid: 'Ver evidencia →'
            ,evidEn: 'View evidence →'
          },
          {
            title: 'Release Regression Framework',
            desc: '<b>Tipo:</b> E2E<br>Automatización de regresión de procesos críticos.<br><b>Características:</b> SerenityBDD, Cucumber, Java.<br><b>Resultados:</b> -35% tiempo de regresión y +28% cobertura.',
            descEn: '<b>Type:</b> E2E<br>Regression automation for critical processes.<br><b>Features:</b> SerenityBDD, Cucumber, Java.<br><b>Results:</b> -35% regression time and +28% coverage.',
            evid: 'Ver evidencia →'
            ,evidEn: 'View evidence →'
          }
        ],
        tools: ['SerenityBDD', 'Karate', 'K6', 'Postman', 'PostgreSQL', 'Jira', 'Azure DevOps', 'Git', 'Java', 'Cucumber', 'Scrum', 'Kanban'],
        toolsEn: ['SerenityBDD', 'Karate', 'K6', 'Postman', 'PostgreSQL', 'Jira', 'Azure DevOps', 'Git', 'Java', 'Cucumber', 'Scrum', 'Kanban'],
        achievements: [
          { color: 'blue', value: '+28%', label: 'cobertura de requerimientos', labelEn: 'requirements coverage' },
          { color: 'purple', value: '-35%', label: 'tiempo de regresión por release', labelEn: 'regression time per release' },
          { color: 'green', value: '+20%', label: 'predictibilidad de entregas', labelEn: 'delivery predictability' },
          { color: 'blue', value: '-25%', label: 'defectos detectados en UAT', labelEn: 'defects detected in UAT' }
        ]
      },
      {
        id: 'bayteq',
        logo: 'assets/img/bayteq_logo.ico',
        company: 'Bayteq',
        role: 'QA Intern',
        roleEn: 'QA Intern',
        date: 'Mar. 2023 – Jun. 2023',
        dateEn: 'Mar. 2023 - Jun. 2023',
        location: 'Quito, Ecuador',
        locationEn: 'Quito, Ecuador',
        status: '',
        kpis: [
          { color: 'green', icon: '✔️', value: '+25%', label: 'Claridad de criterios de aceptación' },
          { color: 'blue', icon: '🛡️', value: '+20%', label: 'Resolución en primer ciclo' },
          { color: 'purple', icon: '⏱️', value: '-15%', label: 'Retrabajos previos a pruebas' }
        ],
        about: 'Participación en actividades de análisis, planificación y ejecución de pruebas para productos financieros, colaborando con equipos QA y desarrollo.',
        aboutEn: 'Participated in analysis, planning, and test execution activities for financial products, collaborating with QA and development teams.',
        responsibilities: [
          'Análisis de requerimientos.',
          'Diseño de casos de prueba.',
          'Ejecución funcional.',
          'Gestión de defectos.',
          'Seguimiento de calidad.'
        ],
        responsibilitiesEn: [
          'Requirements analysis.',
          'Test case design.',
          'Functional execution.',
          'Defect management.',
          'Quality follow-up.'
        ],
        projects: [
          {
            title: 'QA Readiness Process',
            desc: 'Optimización del proceso de preparación para pruebas.<br><b>Resultados:</b> menos retrabajo y mayor alineación entre equipos.',
            descEn: 'Optimization of the test readiness process.<br><b>Results:</b> less rework and better team alignment.',
            evid: 'Ver evidencia →'
            ,evidEn: 'View evidence →'
          }
        ],
        tools: ['Jira', 'Confluence', 'Excel', 'SQL', 'Testing Funcional', 'Scrum'],
        toolsEn: ['Jira', 'Confluence', 'Excel', 'SQL', 'Functional Testing', 'Scrum'],
        achievements: [
          { color: 'green', value: '+25%', label: 'claridad de criterios de aceptación', labelEn: 'acceptance criteria clarity' },
          { color: 'blue', value: '+20%', label: 'resolución en primer ciclo', labelEn: 'first-cycle resolution' },
          { color: 'purple', value: '-15%', label: 'retrabajos previos a pruebas', labelEn: 'pre-test rework' },
          { color: 'green', value: '+30%', label: 'visibilidad de calidad', labelEn: 'quality visibility' }
        ]
      },
      {
        id: 'perseject',
        logo: 'assets/img/perseject_logo.ico',
        company: 'Perseject',
        role: 'QA Analyst',
        roleEn: 'QA Analyst',
        date: 'Dic. 2022 – Mar. 2023',
        dateEn: 'Dec. 2022 - Mar. 2023',
        location: 'Quito, Ecuador',
        locationEn: 'Quito, Ecuador',
        status: '',
        kpis: [
          { color: 'green', icon: '✔️', value: '-22%', label: 'Incidencias productivas' },
          { color: 'blue', icon: '🛡️', value: '+30%', label: 'Estabilidad cross-platform' },
          { color: 'purple', icon: '⏱️', value: '+20%', label: 'Velocidad de liberación' }
        ],
        about: 'Participación en pruebas automatizadas y de rendimiento para aplicaciones web empresariales.',
        aboutEn: 'Participated in automated and performance testing for enterprise web applications.',
        responsibilities: [
          'Diseño de pruebas automatizadas.',
          'Ejecución de pruebas de carga.',
          'Validación cross-browser.',
          'Reportería de calidad.'
        ],
        responsibilitiesEn: [
          'Automated test design.',
          'Load test execution.',
          'Cross-browser validation.',
          'Quality reporting.'
        ],
        projects: [
          {
            title: 'Web Automation Framework',
            desc: '<b>Tipo:</b> E2E<br>Automatización funcional para aplicaciones web.<br><b>Resultados:</b> menos incidencias productivas y mayor cobertura funcional.',
            descEn: '<b>Type:</b> E2E<br>Functional automation for web applications.<br><b>Results:</b> fewer production incidents and higher functional coverage.',
            evid: 'Ver evidencia →'
            ,evidEn: 'View evidence →'
          },
          {
            title: 'Performance Validation Suite',
            desc: '<b>Tipo:</b> PERF<br>Pruebas de carga y estrés.<br><b>Resultados:</b> optimización de estabilidad y detección de cuellos de botella.',
            descEn: '<b>Type:</b> PERF<br>Load and stress testing.<br><b>Results:</b> stability optimization and bottleneck detection.',
            evid: 'Ver evidencia →'
            ,evidEn: 'View evidence →'
          }
        ],
        tools: ['Selenium', 'K6', 'Java', 'ChromeDriver', 'Testing Funcional', 'Performance Testing'],
        toolsEn: ['Selenium', 'K6', 'Java', 'ChromeDriver', 'Functional Testing', 'Performance Testing'],
        achievements: [
          { color: 'green', value: '-22%', label: 'incidencias productivas', labelEn: 'production incidents' },
          { color: 'blue', value: '+30%', label: 'estabilidad cross-platform', labelEn: 'cross-platform stability' },
          { color: 'purple', value: '+20%', label: 'velocidad de liberación', labelEn: 'release speed' },
          { color: 'green', value: '-18%', label: 'defectos repetitivos', labelEn: 'repetitive defects' }
        ]
      },
      {
        id: 'zurich',
        logo: 'assets/img/zurich_insurance_company_ltd_logo.ico',
        company: 'Zurich Insurance',
        role: 'Pasante QA',
        roleEn: 'QA Intern',
        date: 'Jun. 2022 – Dic. 2022',
        dateEn: 'Jun. 2022 - Dec. 2022',
        location: 'Quito, Ecuador',
        locationEn: 'Quito, Ecuador',
        status: '',
        kpis: [
          { color: 'green', icon: '✔️', value: '+25%', label: 'Cobertura de escenarios críticos' },
          { color: 'blue', icon: '🛡️', value: '-20%', label: 'Inconsistencias de datos' },
          { color: 'purple', icon: '⏱️', value: '+30%', label: 'Visibilidad de cobertura' }
        ],
        about: 'Apoyo en iniciativas de calidad para aplicaciones de seguros mediante automatización, pruebas funcionales y validación de rendimiento.',
        aboutEn: 'Supported quality initiatives for insurance applications through automation, functional testing, and performance validation.',
        responsibilities: [
          'Ejecución de pruebas funcionales y automatizadas en módulos de seguros.',
          'Validación de datos de prueba con apoyo de SQL y Excel.',
          'Soporte a iniciativas de performance y documentación de resultados.'
        ],
        responsibilitiesEn: [
          'Executed functional and automated tests in insurance modules.',
          'Validated test data using SQL and Excel.',
          'Supported performance initiatives and results documentation.'
        ],
        projects: [
          {
            title: 'Insurance Testing Framework',
            desc: 'Automatización y validación de sistemas de seguros.',
            descEn: 'Automation and validation of insurance systems.',
            evid: 'Ver evidencia →'
            ,evidEn: 'View evidence →'
          }
        ],
        tools: ['Selenium', 'JMeter', 'Excel', 'Jira', 'SQL'],
        toolsEn: ['Selenium', 'JMeter', 'Excel', 'Jira', 'SQL'],
        achievements: [
          { color: 'green', value: '+25%', label: 'cobertura de escenarios críticos', labelEn: 'critical scenario coverage' },
          { color: 'blue', value: '-20%', label: 'inconsistencias de datos', labelEn: 'data inconsistencies' },
          { color: 'purple', value: '+30%', label: 'visibilidad de cobertura', labelEn: 'coverage visibility' },
          { color: 'green', value: '-15%', label: 'reprocesos de validación', labelEn: 'validation rework' }
        ]
      },
      {
        id: 'guayaquil',
        logo: 'assets/img/1769034424777.ico',
        company: 'Banco Guayaquil',
        role: 'IT Intern',
        roleEn: 'IT Intern',
        date: 'Ene. 2022 – Jun. 2022',
        dateEn: 'Jan. 2022 - Jun. 2022',
        location: 'Quito, Ecuador',
        locationEn: 'Quito, Ecuador',
        status: '',
        kpis: [
          { color: 'green', icon: '✔️', value: '+20%', label: 'Mejora en atención de incidencias' },
          { color: 'blue', icon: '🛡️', value: '-18%', label: 'Interrupciones operativas' },
          { color: 'purple', icon: '⏱️', value: '+15%', label: 'Cumplimiento SLA' }
        ],
        about: 'Soporte operativo y tecnológico para sistemas bancarios.',
        aboutEn: 'Operational and technological support for banking systems.',
        responsibilities: [
          'Soporte técnico a usuarios y seguimiento de incidencias.',
          'Ejecución de mantenimiento preventivo y correctivo.',
          'Gestión de prioridades operativas bajo SLA.'
        ],
        responsibilitiesEn: [
          'Provided technical user support and incident follow-up.',
          'Executed preventive and corrective maintenance.',
          'Managed operational priorities under SLA.'
        ],
        projects: [],
        tools: ['Mesa de ayuda', 'Soporte operativo', 'Gestión de tickets'],
        toolsEn: ['Help Desk', 'Operational support', 'Ticket management'],
        achievements: [
          { color: 'green', value: '+20%', label: 'mejora en atención de incidencias', labelEn: 'incident response improvement' },
          { color: 'blue', value: '-18%', label: 'interrupciones operativas', labelEn: 'operational interruptions' },
          { color: 'purple', value: '+15%', label: 'cumplimiento SLA', labelEn: 'SLA compliance' },
          { color: 'green', value: '+20%', label: 'eficiencia operativa', labelEn: 'operational efficiency' }
        ]
      },
      {
        id: 'halliburton',
        logo: 'assets/img/halliburton_logo.ico',
        company: 'Halliburton',
        role: 'IT Intern',
        roleEn: 'IT Intern',
        date: 'Mar. 2018 – Ago. 2018',
        dateEn: 'Mar. 2018 - Aug. 2018',
        location: 'Orellana, Ecuador',
        locationEn: 'Orellana, Ecuador',
        status: '',
        kpis: [
          { color: 'green', icon: '✔️', value: '+25%', label: 'Mejora en tiempos de respuesta' },
          { color: 'blue', icon: '🛡️', value: '-15%', label: 'Reincidencias' },
          { color: 'purple', icon: '⏱️', value: '+20%', label: 'Cierre efectivo de casos' }
        ],
        about: 'Soporte tecnológico para usuarios locales y remotos en operaciones petroleras.',
        aboutEn: 'Technological support for local and remote users in oil operations.',
        responsibilities: [
          'Atención a incidencias de primer nivel para usuarios locales y remotos.',
          'Documentación y seguimiento de fallas recurrentes.',
          'Coordinación con mesa internacional para resolución de casos.'
        ],
        responsibilitiesEn: [
          'Provided first-level incident support for local and remote users.',
          'Documented and tracked recurring failures.',
          'Coordinated with international help desk for case resolution.'
        ],
        projects: [],
        tools: ['Help Desk', 'Soporte remoto', 'Gestión de incidentes'],
        toolsEn: ['Help Desk', 'Remote support', 'Incident management'],
        achievements: [
          { color: 'green', value: '+25%', label: 'mejora en tiempos de respuesta', labelEn: 'response time improvement' },
          { color: 'blue', value: '-15%', label: 'reincidencias', labelEn: 'recurrences' },
          { color: 'purple', value: '+20%', label: 'cierre efectivo de casos', labelEn: 'effective case closure' }
        ]
      }
    ];

