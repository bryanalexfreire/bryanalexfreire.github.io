#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Generate Professional CV PDF in Spanish and English - Bryan Alexander Freire Chamorro
"""

try:
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
    from reportlab.lib import colors
    from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
    from reportlab.pdfgen import canvas
except ImportError:
    print("Installing reportlab...")
    import subprocess
    subprocess.check_call(['pip', 'install', 'reportlab'])
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
    from reportlab.lib import colors
    from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
    from reportlab.pdfgen import canvas

# Custom class for metadata
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs)
        self._saved_state = None
    
    def showPage(self):
        canvas.Canvas.showPage(self)

# Content dictionary for both languages
CONTENT = {
    'es': {
        'title': "BRYAN ALEXANDER FREIRE CHAMORRO",
        'subtitle': "Ingeniero de Calidad | Automatización QA | Testing de APIs y Performance",
        'contact_email': "bryanalexfreire@gmail.com | +593 984 291 545 | Quito, Ecuador",
        'contact_social': "linkedin.com/in/bryanalexanderfreire | github.com/bryanalexfreire",
        'portfolio': "Portafolio: https://bryanalexfreire.github.io/",
        'professional_summary': "Ingeniero de Calidad especializado en QA Automation, API Testing y Performance Testing en banca y fintech. Diseño estrategias de Risk-Based Testing integradas a CI/CD para acelerar entregas con calidad. Logré reducir 35% defectos post-release y optimizar ciclos validación APIs de 60 a 15 minutos. Enfocado en liderazgo técnico, colaboración cross-functional y resultados medibles de negocio.",
        'section_experience': "EXPERIENCIA PROFESIONAL",
        'section_skills': "HABILIDADES TÉCNICAS",
        'section_soft_skills': "HABILIDADES BLANDAS",
        'section_certs': "CERTIFICACIONES Y FORMACIONES",
        'section_education': "EDUCACIÓN",
        'section_languages': "IDIOMAS",
        'experience': [
            {
                'position': "QA Engineer — Banco Pichincha S.A.",
                'company': "Ene. 2026 – Presente | Quito, Ecuador",
                'achievements': [
                    "Lideré QA de productos bancarios (Cuentas, Inversiones, Core Migrations, Normativa) reduciendo ciclos regresión 75% con implementación E2E/APIs/Mobile/Performance",
                    "Optimizé ejecución: E2E 60→20 min, APIs 60→15 min, Mobile 30→15 min; acelerando feedback técnico 50% y feedback en tiempo real",
                    "Integré controles calidad CI/CD Azure DevOps/Git, disminuyendo defectos post-release 35% mediante Risk-Based Testing",
                    "Gestioné equipo transversal ~5 QAs. Normalicé 30 casos retenciones → 13 certificados (100% cobertura, BDD con Cucumber)",
                    "Implementé Contract Testing e integración CI/CD. Documentación viva y dashboards operacionales para validaciones críticas",
                    "Mentoricé equipo en automatización BDD, Karate DSL, testing performance; fortaleciendo autonomía técnica 30%"
                ]
            },
            {
                'position': "QA Engineer — NTT DATA",
                'company': "Ago. 2025 – Ene. 2026 | Quito, Ecuador",
                'achievements': [
                    "Diseñé estrategias pruebas funcionales, automatizadas y performance SerenityBDD/Karate/K6, incrementando cobertura 28%",
                    "Automaticé escenarios críticos negocio APIs y flujos E2E, reduciendo tiempos regresión 35%",
                    "Estandaricé planificación, estimación y gestión riesgos Scrum/Kanban, mejorando predictibilidad 20%",
                    "Coordiné validaciones desarrollo y operaciones Jira/X-Ray, disminuyendo incidencias integración 25%"
                ]
            },
            {
                'position': "QA Intern — Bayteq",
                'company': "Mar. 2023 – Jun. 2023 | Quito, Ecuador",
                'achievements': [
                    "Apoyé análisis requerimientos y planificación pruebas Jira, elevando claridad criterios aceptación 25%",
                    "Ejecuté pruebas funcionales módulos priorizados, mejorando resolución primer ciclo 20%",
                    "Colaboré sesiones readiness QA/desarrollo, reduciendo retrabajos 15%",
                    "Consolidé reportes avance y defectos, mejorando visibilidad estado calidad 30%"
                ]
            },
            {
                'position': "Analista QA — Perseject",
                'company': "Dic. 2022 – Mar. 2023 | Quito, Ecuador",
                'achievements': [
                    "Diseñé y ejecuté pruebas automatizadas/performance web apps Selenium/K6, reduciendo incidencias producción 22%",
                    "Validé compatibilidad cross-browser y cross-device, incrementando estabilidad 30%",
                    "Documenté resultados indicadores severidad y prioridad, acelerando decisiones liberación 20%",
                    "Propuse mejoras preventivas calidad, disminuyendo defectos repetitivos 18%"
                ]
            },
            {
                'position': "Pasante QA — Zurich Insurance",
                'company': "Jun. 2022 – Dic. 2022 | Quito, Ecuador",
                'achievements': [
                    "Diseñé y ejecuté pruebas automatizadas/performance aplicaciones seguros, mejorando cobertura escenarios 25%",
                    "Preparé y optimicé datos prueba casos complejos, reduciendo inconsistencias 20%",
                    "Validé cumplimiento requisitos matrices trazabilidad, elevando visibilidad cobertura 30%",
                    "Colaboré equipos internacionales revisiones calidad, disminuyendo reprocesos 15%"
                ]
            },
            {
                'position': "IT Intern — Banco Guayaquil",
                'company': "Ene. 2022 – Jun. 2022 | Quito, Ecuador",
                'achievements': [
                    "Brindé soporte técnico operativo sistemas bancarios, mejorando tiempos atención incidencias 20%",
                    "Ejecuté mantenimiento preventivo/correctivo equipos, reduciendo interrupciones operativas 18%",
                    "Gestioné tickets priorización por impacto, incrementando cumplimiento SLA 15%",
                    "Elaboré reportes control operativo, optimizando toma decisiones 20%"
                ]
            }
        ],
        'skills': [
            ("Automatización y Frameworks:", "Selenium, SerenityBDD, Karate DSL, Cucumber, TestNG, Pytest, Screenplay, BDD"),
            ("Lenguajes y desarrollo:", "Java, JavaScript, Python, SQL"),
            ("Pruebas de rendimiento:", "K6, JMeter"),
            ("APIs y Backend:", "REST APIs, Postman, Validación API, Contract Testing"),
            ("Bases de Datos:", "PostgreSQL, Redis"),
            ("DevOps y CI/CD:", "Azure DevOps, Git, Maven, Gradle, SonarCloud"),
            ("Gestión de Calidad:", "Jira, X-Ray, Zephyr, Confluence"),
            ("Metodologías:", "Scrum, Kanban, TDD, ATDD, DDT, KDT, Testing Basado en Riesgo, Shift Left Testing, Shift Right Testing"),
        ],
        'soft_skills': [
            "Technical Leadership",
            "Stakeholder Management",
            "Risk-Based Decision Making"
        ],
        'certifications': [
            "ISTQB® Agile Tester",
            "ISTQB® Foundation Level 4.0",
            "Karate DSL: API Automation and Performance",
            "K6 Performance Testing",
            "DevOps Foundations: CI/CD",
            "Site Reliability Engineering Fundamentals",
            "Stratio Generative AI: Data Governance",
            "Stratio Generative AI: Data Fabric Basics",
            "Stratio Generative AI: Data Processing",
            "GitHub Copilot Fundamentals",
            "Certified ScrumMaster (CSM®)"
        ],
        'education': [
            {"institution": "Universidad Tecnológica Israel, Quito, Ecuador", "degree": "Ingeniería en sistemas de información", "dates": "Oct. 2021 – Sep. 2024"},
            {"institution": "Kruger Instituto Xponencial, Quito, Ecuador", "degree": "Full Stack Bootcamp", "dates": "Jul. 2024 – Nov. 2024"}
        ],
        'languages': "Español (nativo) | Inglés (B1 – competencia laboral)"
    },
    'en': {
        'title': "BRYAN ALEXANDER FREIRE CHAMORRO",
        'subtitle': "QA Engineer | Test Automation | API & Performance Testing",
        'contact_email': "bryanalexfreire@gmail.com | +593 984 291 545 | Quito, Ecuador",
        'contact_social': "linkedin.com/in/bryanalexanderfreire | github.com/bryanalexfreire",
        'portfolio': "Portfolio: https://bryanalexfreire.github.io/",
        'professional_summary': "Software Quality Engineer specialized in QA Automation, API Testing, and Performance Testing in banking and fintech. Design Risk-Based Testing strategies integrated with CI/CD to accelerate delivery with quality. Achieved 35% reduction in post-release defects and optimized API validation cycles from 60 to 15 minutes. Focused on technical leadership, cross-functional collaboration, and measurable business results.",
        'section_experience': "PROFESSIONAL EXPERIENCE",
        'section_skills': "TECHNICAL SKILLS",
        'section_soft_skills': "SOFT SKILLS",
        'section_certs': "CERTIFICATIONS AND TRAINING",
        'section_education': "EDUCATION",
        'section_languages': "LANGUAGES",
        'experience': [
            {
                'position': "QA Engineer — Banco Pichincha S.A.",
                'company': "Jan. 2026 – Present | Quito, Ecuador",
                'achievements': [
                    "Led QA for banking products (Accounts, Investments, Core Migrations, Regulatory Compliance) reducing regression cycles 75% with E2E/APIs/Mobile/Performance implementation",
                    "Optimized execution: E2E 60→20 min, APIs 60→15 min, Mobile 30→15 min; accelerating technical feedback 50% with real-time validation dashboards",
                    "Integrated quality controls in CI/CD Azure DevOps/Git pipelines, decreasing post-release defects 35% through Risk-Based Testing strategy",
                    "Managed cross-functional team ~5 QAs. Normalized 30 retention cases → 13 certified (100% coverage, BDD with Cucumber)",
                    "Implemented Contract Testing and CI/CD integration. Living documentation and operational dashboards for critical validations",
                    "Mentored team in BDD automation, Karate DSL, performance testing; strengthening technical autonomy 30%"
                ]
            },
            {
                'position': "QA Engineer — NTT DATA",
                'company': "Aug. 2025 – Jan. 2026 | Quito, Ecuador",
                'achievements': [
                    "Designed functional, automated, and performance testing strategies with SerenityBDD/Karate/K6, increasing coverage 28%",
                    "Automated critical business scenarios in APIs and E2E flows, reducing regression time per release 35%",
                    "Standardized planning, estimation, and risk management in Scrum/Kanban, improving delivery predictability 20%",
                    "Coordinated validations with development and operations via Jira/X-Ray, decreasing integration incidents 25%"
                ]
            },
            {
                'position': "QA Intern — Bayteq",
                'company': "Mar. 2023 – Jun. 2023 | Quito, Ecuador",
                'achievements': [
                    "Supported requirements analysis and test planning with Jira, improving acceptance criteria clarity 25%",
                    "Executed functional tests on prioritized modules, improving first-cycle resolution 20%",
                    "Collaborated in QA and development readiness sessions, reducing pre-testing rework 15%",
                    "Consolidated progress and defect reports, improving quality status visibility 30%"
                ]
            },
            {
                'position': "QA Analyst — Perseject",
                'company': "Dec. 2022 – Mar. 2023 | Quito, Ecuador",
                'achievements': [
                    "Designed and executed automated and performance tests for web apps with Selenium and K6, reducing production incidents 22%",
                    "Validated cross-browser and cross-device compatibility, increasing functional stability 30%",
                    "Documented results with severity and priority indicators, accelerating release decisions 20%",
                    "Proposed preventive quality improvements, decreasing repetitive defects 18%"
                ]
            },
            {
                'position': "QA Intern — Zurich Insurance",
                'company': "Jun. 2022 – Dec. 2022 | Quito, Ecuador",
                'achievements': [
                    "Designed and executed automated and performance tests for insurance applications, improving scenario coverage 25%",
                    "Prepared and optimized test data for complex cases, reducing execution inconsistencies 20%",
                    "Validated functional and non-functional requirements with traceability matrices, improving coverage visibility 30%",
                    "Collaborated with international teams in quality reviews, decreasing validation rework 15%"
                ]
            },
            {
                'position': "IT Intern — Banco Guayaquil",
                'company': "Jan. 2022 – Jun. 2022 | Quito, Ecuador",
                'achievements': [
                    "Provided operational technical support for banking system users, improving incident response times 20%",
                    "Executed preventive and corrective equipment maintenance, reducing operational interruptions 18%",
                    "Managed tickets with impact-based prioritization, increasing SLA compliance 15%",
                    "Prepared operational control reports, optimizing area decision-making 20%"
                ]
            }
        ],
        'skills': [
            ("Test Automation and Frameworks:", "Selenium, SerenityBDD, Karate DSL, Cucumber, TestNG, Pytest, Screenplay, BDD"),
            ("Languages and Development:", "Java, JavaScript, Python, SQL"),
            ("Performance Testing:", "K6, JMeter"),
            ("APIs and Backend:", "REST APIs, Postman, API Validation, Contract Testing"),
            ("Databases:", "PostgreSQL, Redis"),
            ("DevOps and CI/CD:", "Azure DevOps, Git, Maven, Gradle, SonarCloud"),
            ("Quality Management:", "Jira, X-Ray, Zephyr, Confluence"),
            ("Methodologies:", "Scrum, Kanban, TDD, ATDD, DDT, KDT, Risk-Based Testing, Shift Left Testing, Shift Right Testing"),
        ],
        'soft_skills': [
            "Technical Leadership",
            "Stakeholder Management",
            "Risk-Based Decision Making"
        ],
        'certifications': [
            "ISTQB® Agile Tester",
            "ISTQB® Foundation Level 4.0",
            "Karate DSL: API Automation and Performance",
            "K6 Performance Testing",
            "DevOps Foundations: CI/CD",
            "Site Reliability Engineering Fundamentals",
            "Stratio Generative AI: Data Governance",
            "Stratio Generative AI: Data Fabric Basics",
            "Stratio Generative AI: Data Processing",
            "GitHub Copilot Fundamentals",
            "Certified ScrumMaster (CSM®)"
        ],
        'education': [
            {"institution": "Universidad Tecnológica Israel, Quito, Ecuador", "degree": "Engineering in Information Systems", "dates": "Oct. 2021 – Sep. 2024"},
            {"institution": "Kruger Instituto Xponencial, Quito, Ecuador", "degree": "Full Stack Bootcamp", "dates": "Jul. 2024 – Nov. 2024"}
        ],
        'languages': "Spanish (native) | English (B1 – professional proficiency)"
    }
}

def create_custom_styles():
    """Create and return custom styles"""
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=16,
        textColor=colors.HexColor('#1a1a1a'),
        spaceAfter=2,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )

    title_role_style = ParagraphStyle(
        'TitleRole',
        parent=styles['Normal'],
        fontSize=9.5,
        textColor=colors.HexColor('#0066cc'),
        spaceAfter=0,
        alignment=TA_CENTER,
        fontName='Helvetica'
    )

    section_style = ParagraphStyle(
        'SectionTitle',
        parent=styles['Heading2'],
        fontSize=10,
        textColor=colors.HexColor('#0066cc'),
        spaceAfter=3,
        spaceBefore=4,
        fontName='Helvetica-Bold',
        borderColor=colors.HexColor('#0066cc'),
        borderWidth=0,
        borderBottomWidth=1.5,
        borderPadding=1
    )

    subtitle_style = ParagraphStyle(
        'Subtitle',
        parent=styles['Normal'],
        fontSize=8,
        textColor=colors.HexColor('#666666'),
        spaceAfter=0,
        alignment=TA_CENTER
    )

    body_style = ParagraphStyle(
        'BodyText',
        parent=styles['Normal'],
        fontSize=8,
        spaceAfter=2,
        leading=9,
        alignment=TA_JUSTIFY
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontSize=8,
        spaceAfter=1,
        leftIndent=10,
        leading=8.5
    )

    position_style = ParagraphStyle(
        'Position',
        parent=styles['Normal'],
        fontSize=8.5,
        textColor=colors.HexColor('#1a1a1a'),
        spaceAfter=0,
        fontName='Helvetica-Bold'
    )

    company_style = ParagraphStyle(
        'Company',
        parent=styles['Normal'],
        fontSize=8,
        textColor=colors.HexColor('#333333'),
        spaceAfter=1,
        fontName='Helvetica'
    )

    return {
        'title': title_style,
        'title_role': title_role_style,
        'section': section_style,
        'subtitle': subtitle_style,
        'body': body_style,
        'bullet': bullet_style,
        'position': position_style,
        'company': company_style
    }

def generate_cv_pdf(language='es'):
    """Generate CV PDF for specified language"""
    content = CONTENT[language]
    styles = create_custom_styles()
    
    # Determine output filename
    pdf_file = f"Bryan-Freire-CV-{language}.pdf"
    
    # Create document
    doc = SimpleDocTemplate(
        pdf_file,
        pagesize=letter,
        rightMargin=0.35*inch,
        leftMargin=0.35*inch,
        topMargin=0.4*inch,
        bottomMargin=0.4*inch,
        title="Bryan Alexander Freire CV",
        author="Bryan Alexander Freire Chamorro",
        subject=f"Curriculum Vitae - QA Engineer ({language.upper()})",
        creator="Professional CV Generator"
    )

    elements = []

    # Title and Contact
    elements.append(Paragraph(content['title'], styles['title']))
    elements.append(Paragraph(content['subtitle'], styles['title_role']))
    elements.append(Spacer(1, 0.03*inch))

    # Contact info
    elements.append(Paragraph(content['contact_email'], styles['subtitle']))
    elements.append(Paragraph(content['contact_social'], styles['subtitle']))
    elements.append(Paragraph(content['portfolio'], styles['subtitle']))
    elements.append(Spacer(1, 0.02*inch))

    # Professional Summary
    elements.append(Paragraph("<b>Perfil Profesional</b>" if language == 'es' else "<b>Professional Profile</b>", styles['body']))
    elements.append(Paragraph(content['professional_summary'], styles['body']))
    elements.append(Spacer(1, 0.01*inch))

    # Competencias Clave / Key Competencies
    elements.append(Paragraph("<b>Competencias Clave</b>" if language == 'es' else "<b>Key Competencies</b>", styles['body']))
    key_comps = [
        "QA Automation (Karate, SerenityBDD, Cucumber, Selenium)",
        "API Testing (REST, Postman, SQL Validation, Contract Testing)",
        "Performance Testing (K6, JMeter)",
        "CI/CD Quality Validation (Azure DevOps, Git)",
        "Risk-Based Testing | Test Strategy Design | Technical Leadership"
    ]
    for comp in key_comps:
        elements.append(Paragraph(f"• {comp}", styles['bullet']))
    elements.append(Spacer(1, 0.01*inch))

    # Experience
    elements.append(Paragraph(content['section_experience'], styles['section']))
    for i, job in enumerate(content['experience']):
        elements.append(Paragraph(job['position'], styles['position']))
        elements.append(Paragraph(job['company'], styles['company']))
        for achievement in job['achievements']:
            elements.append(Paragraph(f"• {achievement}", styles['bullet']))
        if i < len(content['experience']) - 1:
            elements.append(Spacer(1, 0.005*inch))
    elements.append(Spacer(1, 0.01*inch))

    # PAGE BREAK
    elements.append(PageBreak())

    # Technical Skills
    elements.append(Paragraph(content['section_skills'], styles['section']))
    for skill_cat, skill_list in content['skills']:
        elements.append(Paragraph(f"<b>{skill_cat}</b> {skill_list}", styles['body']))
    elements.append(Spacer(1, 0.01*inch))

    # Soft Skills
    elements.append(Paragraph(content['section_soft_skills'], styles['section']))
    for skill in content['soft_skills']:
        elements.append(Paragraph(f"• {skill}", styles['bullet']))
    elements.append(Spacer(1, 0.01*inch))

    # Certifications
    elements.append(Paragraph(content['section_certs'], styles['section']))
    for cert in content['certifications']:
        elements.append(Paragraph(f"• {cert}", styles['bullet']))
    elements.append(Spacer(1, 0.01*inch))

    # Education
    elements.append(Paragraph(content['section_education'], styles['section']))
    for edu in content['education']:
        elements.append(Paragraph(f"<b>{edu['institution']}</b>", styles['body']))
        elements.append(Paragraph(edu['degree'], styles['bullet']))
        elements.append(Paragraph(edu['dates'], styles['bullet']))
    elements.append(Spacer(1, 0.01*inch))

    # Languages
    elements.append(Paragraph(content['section_languages'], styles['section']))
    elements.append(Paragraph(content['languages'], styles['body']))

    # Build PDF
    doc.build(elements)
    return pdf_file

# Generate both versions
if __name__ == "__main__":
    print("Generating CV PDFs in both languages...")
    pdf_es = generate_cv_pdf('es')
    print(f"✓ Spanish CV generated: {pdf_es}")
    
    pdf_en = generate_cv_pdf('en')
    print(f"✓ English CV generated: {pdf_en}")
    
    print("\n✓ Both CV versions created successfully!")
    print("  - Bryan-Freire-CV-es.pdf (Español)")
    print("  - Bryan-Freire-CV-en.pdf (English)")
