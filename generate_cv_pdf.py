#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Generate Professional CV PDF - Bryan Alexander Freire Chamorro
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

# PDF setup with metadata
pdf_file = "Bryan-Freire-CV.pdf"
doc = SimpleDocTemplate(
    pdf_file,
    pagesize=letter,
    rightMargin=0.35*inch,
    leftMargin=0.35*inch,
    topMargin=0.4*inch,
    bottomMargin=0.4*inch,
    title="Bryan Alexander Freire CV",
    author="Bryan Alexander Freire Chamorro",
    subject="Curriculum Vitae - QA Engineer",
    creator="Professional CV Generator"
)

# Container for PDF elements
elements = []

# Define styles
styles = getSampleStyleSheet()

# Create custom styles
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

# PAGE 1 CONTENT

# Title and Contact
elements.append(Paragraph("BRYAN ALEXANDER FREIRE CHAMORRO", title_style))
elements.append(Paragraph("QA Engineer | Software Quality Automation | Test Strategy", title_role_style))
elements.append(Spacer(1, 0.03*inch))

# Contact info
contact_info = "bryanalexfreire@gmail.com | +593 984 291 545 | Quito, Ecuador"
elements.append(Paragraph(contact_info, subtitle_style))
linkedin_github = "linkedin.com/in/bryanalexanderfreire | github.com/bryanalexfreire"
elements.append(Paragraph(linkedin_github, subtitle_style))
portfolio = "Portfolio: https://bryanalexfreire.github.io/"
elements.append(Paragraph(portfolio, subtitle_style))
elements.append(Spacer(1, 0.04*inch))

# Professional Summary
elements.append(Paragraph("PROFESSIONAL SUMMARY", section_style))
summary_text = "Results-driven QA Engineer with 4+ years of experience designing and implementing comprehensive quality strategies across fintech, enterprise systems, and banking sectors. Expert in test automation, CI/CD integration, and quality metrics optimization. Proven ability to reduce regression cycles by 67-75% while improving defect detection by 35%. Skilled team leader with experience mentoring QA teams and establishing quality best practices. Passionate about building scalable testing frameworks that enable faster, more reliable software delivery."
elements.append(Paragraph(summary_text, body_style))
elements.append(Spacer(1, 0.03*inch))

# Professional Experience
elements.append(Paragraph("PROFESSIONAL EXPERIENCE", section_style))

# Job 1 - Current
elements.append(Paragraph("QA Engineer | Banco Pichincha S.A", position_style))
elements.append(Paragraph("Quito, Ecuador | January 2026 - Present", company_style))
achievements_qa1 = [
    "Designed and implemented E2E, API, and mobile testing strategies reducing cycles by 67-75%",
    "Normalized 30+ regulatory compliance test cases down to 13 certified cases (100% coverage)",
    "Reduced post-release defects by 35% through intelligent automation and risk-based testing",
    "Automated daily reporting, reducing manual effort from 2 hours to 45 minutes (62.5% efficiency gain)",
    "Established contract testing for microservices, enabling parallel service development",
    "Increased team test execution autonomy by 30% through framework training and documentation",
    "Implemented performance baselines for critical banking transactions (e.g., transfers, payments)"
]
for achievement in achievements_qa1:
    elements.append(Paragraph(f"• {achievement}", bullet_style))
elements.append(Spacer(1, 0.02*inch))

# Job 2
elements.append(Paragraph("QA Engineer | NTT DATA", position_style))
elements.append(Paragraph("Quito, Ecuador | September 2023 - January 2026", company_style))
achievements_qa2 = [
    "Architected SerenityBDD/Cucumber automation framework for enterprise applications",
    "Implemented Selenium-based E2E automation suite reducing regression testing by 40%",
    "Designed and executed API testing strategies using Karate framework with 85% code coverage",
    "Integrated automated testing into Jenkins CI/CD pipelines enabling daily deployments",
    "Performed load testing with k6 on microservices, identifying bottlenecks in distributed systems",
    "Mentored junior QA engineers on automation best practices and testing methodologies"
]
for achievement in achievements_qa2:
    elements.append(Paragraph(f"• {achievement}", bullet_style))
elements.append(Spacer(1, 0.02*inch))

# Job 3
elements.append(Paragraph("Quality Assurance Analyst | Perseject", position_style))
elements.append(Paragraph("Quito, Ecuador | March 2022 - August 2023", company_style))
achievements_qa3 = [
    "Established QA processes for 5+ enterprise projects from requirements analysis to production deployment",
    "Created test plans covering functional, non-functional, and regression testing scenarios",
    "Collaborated with developers to reduce time-to-resolution for defects by 25%"
]
for achievement in achievements_qa3:
    elements.append(Paragraph(f"• {achievement}", bullet_style))

# Job 4
elements.append(Paragraph("QA Analyst | Bayteq", position_style))
elements.append(Paragraph("Quito, Ecuador | November 2021 - February 2022", company_style))
achievements_qa4 = [
    "Performed comprehensive functional and regression testing for e-commerce platforms",
    "Documented test cases and defects with clear reproduction steps and severity levels"
]
for achievement in achievements_qa4:
    elements.append(Paragraph(f"• {achievement}", bullet_style))
elements.append(Spacer(1, 0.01*inch))

# Job 5
elements.append(Paragraph("QA Tester | Zurich Insurance", position_style))
elements.append(Paragraph("Quito, Ecuador | June 2021 - October 2021", company_style))
achievements_qa5 = [
    "Validated insurance claim processing workflows and policy management systems",
    "Ensured compliance with regulatory requirements in financial services"
]
for achievement in achievements_qa5:
    elements.append(Paragraph(f"• {achievement}", bullet_style))
elements.append(Spacer(1, 0.015*inch))

# Technical Skills - ON PAGE 1
elements.append(Paragraph("TECHNICAL SKILLS", section_style))

skills_data = [
    ("<b>Test Automation:</b>", "Selenium WebDriver, SerenityBDD, Cucumber, Karate, Appium"),
    ("<b>API Testing:</b>", "Postman, REST, GraphQL, Contract Testing, WireMock"),
    ("<b>Performance & Load:</b>", "k6, Grafana, LoadRunner, Apache JMeter, Performance Baselines"),
    ("<b>CI/CD & DevOps:</b>", "Jenkins, Azure DevOps, Git, GitLab CI, Docker basics"),
    ("<b>Programming:</b>", "Java, JavaScript/Node.js, SQL, Gherkin/BDD"),
    ("<b>Databases:</b>", "PostgreSQL, Oracle, MySQL, SQL Server"),
    ("<b>Test Management:</b>", "TestRail, Azure Test Plans, Jira, Confluence"),
    ("<b>Methodologies:</b>", "Agile/Scrum, Risk-Based Testing, BDD, Test Automation Strategy"),
]

for skill_cat, skill_list in skills_data:
    elements.append(Paragraph(f"{skill_cat} {skill_list}", body_style))

elements.append(Spacer(1, 0.015*inch))

# Certifications & Learning
elements.append(Paragraph("CERTIFICATIONS & PROFESSIONAL DEVELOPMENT", section_style))

certs = [
    "ISTQB Certified Tester Foundation Level 4.0 (Advanced Testing)",
    "ISTQB Certified Tester, Foundation Level - Agile Tester (Agile-focused QA)",
    "K6 Certified: Performance Testing & Load Testing",
    "Certified Scrum Master (CSM) - Agile Team Practices",
    "DevOps Foundations: CI/CD - Infrastructure & Automation",
    "Specialized Training: Docker Fundamentals, Azure Cloud Services, Design Thinking, Leadership in Technology",
    "22+ Professional Development Courses: Selenium Advanced, Karate API Testing, k6 Performance Engineering, Database Testing, Test Strategy & Planning",
]

for cert in certs:
    elements.append(Paragraph(f"• {cert}", bullet_style))

elements.append(Spacer(1, 0.015*inch))

# PAGE BREAK
elements.append(PageBreak())

# Education
elements.append(Paragraph("EDUCATION", section_style))
elements.append(Paragraph("<b>Bachelor's Degree in Information Systems Engineering</b>", body_style))
elements.append(Paragraph("Focus Areas: Software Quality Assurance, Test Automation, DevOps & Cloud Infrastructure", bullet_style))
elements.append(Paragraph("Graduation: 2024", bullet_style))
elements.append(Spacer(1, 0.02*inch))

# Languages
elements.append(Paragraph("LANGUAGES", section_style))
elements.append(Paragraph("Spanish (Native) | English (Professional Proficiency)", body_style))

# Build PDF with metadata
doc.build(elements)
print(f"✓ CV PDF generated successfully: {pdf_file}")
