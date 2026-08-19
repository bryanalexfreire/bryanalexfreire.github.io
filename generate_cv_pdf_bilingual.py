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
        'subtitle': "Ingeniero de Calidad | Automatización de Pruebas | Estrategia de Testing",
        'contact_email': "bryanalexfreire@gmail.com | +593 984 291 545 | Quito, Ecuador",
        'contact_social': "linkedin.com/in/bryanalexanderfreire | github.com/bryanalexfreire",
        'portfolio': "Portafolio: https://bryanalexfreire.github.io/",
        'professional_summary': "Ingeniero de Calidad con 4+ años diseñando estrategias de testing end-to-end: desde pruebas manuales hasta suites de automatización integradas en CI/CD. Especialista en BDD, frameworks de automatización (Selenium, SerenityBDD, Karate) y testing de performance. Enfoque en calidad mediante exploración, documentación en vivo y prevención de defectos.",
        'section_experience': "EXPERIENCIA PROFESIONAL",
        'section_skills': "HABILIDADES TÉCNICAS",
        'section_certs': "CERTIFICACIONES Y DESARROLLO PROFESIONAL",
        'section_education': "EDUCACIÓN",
        'section_languages': "IDIOMAS",
        'experience': [
            {
                'position': "Ingeniero QA | Banco Pichincha S.A.",
                'company': "Quito, Ecuador | Enero 2026 - Presente",
                'achievements': [
                    "Liderazgo QA de productos bancarios (Cuentas, Inversiones, Core Migrations): implementación E2E/APIs/Mobile que reducen ciclos de regresión 75%",
                    "Gestión de equipo transversal (~5 QAs). Normalización de 30 casos retenciones → 13 certificados (100% cobertura)",
                    "Automatización BDD con Cucumber/Selenium. Contract testing integrado en CI/CD. Documentación viva para flujos críticos"
                ]
            },
            {
                'position': "QA Specialist | Halliburton (Contractor)",
                'company': "Quito, Ecuador | Septiembre 2023 - Enero 2026",
                'achievements': [
                    "Automatización y testing funcional en proyectos cloud. Diseño de suites E2E con Selenium/Cucumber. Reducción 40% ciclos testing",
                    "Integración CI/CD con Jenkins. Análisis cobertura SonarQube. Reportes automáticos. Testing performance con k6"
                ]
            },
            {
                'position': "QA Analyst | NTT Data Europe & Latam",
                'company': "Quito, Ecuador | Marzo 2023 - Junio 2023",
                'achievements': [
                    "Fundamentos testing: casos manuales, ejecución navegadores, reportes defectos. Aprendizaje metodología ISTQB",
                    "Regresión funcional aplicaciones web. Stack: Jira, Postman, navegadores modernos"
                ]
            },
            {
                'position': "QA Analyst | Bayteq",
                'company': "Quito, Ecuador | Noviembre 2021 - Febrero 2022",
                'achievements': [
                    "Testing funcional y regresión plataformas e-commerce. Documentación casos prueba y defectos con pasos reproducibles",
                    "Validación flujos críticos. Niveles severidad y trazabilidad requisitos"
                ]
            },
            {
                'position': "QA Tester | Zurich Insurance",
                'company': "Quito, Ecuador | Junio 2021 - Octubre 2021",
                'achievements': [
                    "Validación workflows procesamiento siniestros y gestión pólizas. Cumplimiento requisitos regulatorios financieros",
                    "Testing en sistemas legacy. Aseguración compatibilidad normativa"
                ]
            }
        ],
        'skills': [
            ("<b>Automatización de Pruebas:</b>", "Selenium WebDriver, SerenityBDD, Cucumber, Karate, Appium"),
            ("<b>Testing de APIs:</b>", "Postman, REST, GraphQL, Contract Testing, WireMock"),
            ("<b>Performance & Carga:</b>", "k6, Grafana, LoadRunner, Apache JMeter, Baselines de Performance"),
            ("<b>CI/CD & DevOps:</b>", "Jenkins, Azure DevOps, Git, GitLab CI, Docker basics"),
            ("<b>Programación:</b>", "Java, JavaScript/Node.js, SQL, Gherkin/BDD"),
            ("<b>Bases de Datos:</b>", "PostgreSQL, Oracle, MySQL, SQL Server"),
            ("<b>Gestión Testing:</b>", "TestRail, Azure Test Plans, Jira, Confluence"),
            ("<b>Metodologías:</b>", "Agile/Scrum, Testing basado en Riesgos, BDD, Estrategia Automatización"),
        ],
        'certifications': [
            "ISTQB Certified Tester Foundation Level 4.0 (Testing Avanzado)",
            "ISTQB Certified Tester, Foundation Level - Agile Tester (QA enfocado en Agile)",
            "K6 Certificado: Performance Testing & Load Testing",
            "Certified Scrum Master (CSM) - Prácticas Agile",
            "DevOps Foundations: CI/CD - Infraestructura & Automatización",
            "Entrenamiento Especializado: Docker Fundamentals, Azure Cloud Services, Design Thinking, Liderazgo en Tecnología",
            "22+ Cursos Desarrollo Profesional: Selenium Avanzado, Karate API Testing, k6 Performance Engineering, Database Testing, Test Strategy & Planning",
        ],
        'education_degree': "<b>Ingeniería en Sistemas de Información</b>",
        'education_focus': "Áreas de Enfoque: Aseguración de Calidad de Software, Automatización de Testing, DevOps & Infraestructura Cloud",
        'education_graduation': "Graduación: 2024",
        'languages': "Español (Nativo) | Inglés (Dominio Profesional)",
    },
    'en': {
        'title': "BRYAN ALEXANDER FREIRE CHAMORRO",
        'subtitle': "QA Engineer | Test Automation | Testing Strategy",
        'contact_email': "bryanalexfreire@gmail.com | +593 984 291 545 | Quito, Ecuador",
        'contact_social': "linkedin.com/in/bryanalexanderfreire | github.com/bryanalexfreire",
        'portfolio': "Portfolio: https://bryanalexfreire.github.io/",
        'professional_summary': "Software Quality Engineer with 4+ years designing end-to-end testing strategies: from manual exploration to CI/CD-integrated automation suites. Specialist in BDD, automation frameworks (Selenium, SerenityBDD, Karate), and performance testing. Focus on quality through exploration, living documentation, and defect prevention.",
        'section_experience': "PROFESSIONAL EXPERIENCE",
        'section_skills': "TECHNICAL SKILLS",
        'section_certs': "CERTIFICATIONS & PROFESSIONAL DEVELOPMENT",
        'section_education': "EDUCATION",
        'section_languages': "LANGUAGES",
        'experience': [
            {
                'position': "QA Engineer | Banco Pichincha S.A.",
                'company': "Quito, Ecuador | January 2026 - Present",
                'achievements': [
                    "QA leadership for banking products (Accounts, Investments, Core Migrations): E2E/APIs/Mobile implementation reducing regression cycles 75%",
                    "Cross-functional team management (~5 QAs). Normalization of 30 retention cases → 13 certified (100% coverage)",
                    "BDD automation with Cucumber/Selenium. Contract testing integrated in CI/CD. Living documentation for critical flows"
                ]
            },
            {
                'position': "QA Specialist | Halliburton (Contractor)",
                'company': "Quito, Ecuador | September 2023 - January 2026",
                'achievements': [
                    "Cloud project automation and functional testing. E2E test suite design with Selenium/Cucumber. 40% reduction in testing cycles",
                    "CI/CD integration with Jenkins. SonarQube coverage analysis. Automated reporting. Performance testing with k6"
                ]
            },
            {
                'position': "QA Analyst | NTT Data Europe & Latam",
                'company': "Quito, Ecuador | March 2023 - June 2023",
                'achievements': [
                    "Testing fundamentals: manual test cases, browser execution, defect reporting. ISTQB methodology learning",
                    "Functional regression for web applications. Stack: Jira, Postman, modern browsers"
                ]
            },
            {
                'position': "QA Analyst | Bayteq",
                'company': "Quito, Ecuador | November 2021 - February 2022",
                'achievements': [
                    "Functional and regression testing for e-commerce platforms. Test case and defect documentation with clear reproduction steps",
                    "Critical flow validation. Severity levels and requirements traceability"
                ]
            },
            {
                'position': "QA Tester | Zurich Insurance",
                'company': "Quito, Ecuador | June 2021 - October 2021",
                'achievements': [
                    "Insurance claim processing workflows and policy management system validation. Compliance with financial regulatory requirements",
                    "Legacy system testing. Regulatory compatibility assurance"
                ]
            }
        ],
        'skills': [
            ("<b>Test Automation:</b>", "Selenium WebDriver, SerenityBDD, Cucumber, Karate, Appium"),
            ("<b>API Testing:</b>", "Postman, REST, GraphQL, Contract Testing, WireMock"),
            ("<b>Performance & Load:</b>", "k6, Grafana, LoadRunner, Apache JMeter, Performance Baselines"),
            ("<b>CI/CD & DevOps:</b>", "Jenkins, Azure DevOps, Git, GitLab CI, Docker basics"),
            ("<b>Programming:</b>", "Java, JavaScript/Node.js, SQL, Gherkin/BDD"),
            ("<b>Databases:</b>", "PostgreSQL, Oracle, MySQL, SQL Server"),
            ("<b>Test Management:</b>", "TestRail, Azure Test Plans, Jira, Confluence"),
            ("<b>Methodologies:</b>", "Agile/Scrum, Risk-Based Testing, BDD, Test Automation Strategy"),
        ],
        'certifications': [
            "ISTQB Certified Tester Foundation Level 4.0 (Advanced Testing)",
            "ISTQB Certified Tester, Foundation Level - Agile Tester (Agile-focused QA)",
            "K6 Certified: Performance Testing & Load Testing",
            "Certified Scrum Master (CSM) - Agile Team Practices",
            "DevOps Foundations: CI/CD - Infrastructure & Automation",
            "Specialized Training: Docker Fundamentals, Azure Cloud Services, Design Thinking, Leadership in Technology",
            "22+ Professional Development Courses: Selenium Advanced, Karate API Testing, k6 Performance Engineering, Database Testing, Test Strategy & Planning",
        ],
        'education_degree': "<b>Bachelor's Degree in Information Systems Engineering</b>",
        'education_focus': "Focus Areas: Software Quality Assurance, Test Automation, DevOps & Cloud Infrastructure",
        'education_graduation': "Graduation: 2024",
        'languages': "Spanish (Native) | English (Professional Proficiency)",
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
    elements.append(Paragraph(content['professional_summary'], styles['body']))
    elements.append(Spacer(1, 0.015*inch))

    # Experience
    elements.append(Paragraph(content['section_experience'], styles['section']))
    for i, job in enumerate(content['experience']):
        elements.append(Paragraph(job['position'], styles['position']))
        elements.append(Paragraph(job['company'], styles['company']))
        for achievement in job['achievements']:
            elements.append(Paragraph(f"• {achievement}", styles['bullet']))
        if i < len(content['experience']) - 1:
            elements.append(Spacer(1, 0.01*inch))
    elements.append(Spacer(1, 0.015*inch))

    # Technical Skills
    elements.append(Paragraph(content['section_skills'], styles['section']))
    for skill_cat, skill_list in content['skills']:
        elements.append(Paragraph(f"{skill_cat} {skill_list}", styles['body']))
    elements.append(Spacer(1, 0.015*inch))

    # Certifications
    elements.append(Paragraph(content['section_certs'], styles['section']))
    for cert in content['certifications']:
        elements.append(Paragraph(f"• {cert}", styles['bullet']))

    # Page break
    elements.append(PageBreak())

    # Education
    elements.append(Paragraph(content['section_education'], styles['section']))
    elements.append(Paragraph(content['education_degree'], styles['body']))
    elements.append(Paragraph(content['education_focus'], styles['bullet']))
    elements.append(Paragraph(content['education_graduation'], styles['bullet']))
    elements.append(Spacer(1, 0.02*inch))

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
