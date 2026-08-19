# Portafolio Digital - Bryan Alexander Freire Chamorro

Portafolio profesional de **QA Engineer** construido con HTML5, CSS3 modular y JavaScript vanilla. Single Page Application (SPA) con soporte multi-idioma (ES/EN) y sistema de temas (dark/light).

## 📁 Estructura del Proyecto

```
.
├── index.html                    # Página principal SPA (única página activa)
├── Bryan-Freire-CV-es.pdf       # Curriculum Vitae en PDF - Español (descargable)
├── Bryan-Freire-CV-en.pdf       # Curriculum Vitae en PDF - English (descargable)
├── generate_cv_pdf_bilingual.py # Script para generar PDFs bilingües del CV
├── sitemap.xml                  # Mapa del sitio para SEO
├── robots.txt                   # Directivas para crawlers
├── .htaccess                    # Configuración Apache (caché, compresión, seguridad)
├── assets/
│   ├── css/                     # Sistema de diseño modular
│   │   ├── variables.css        # 80+ variables de tema (colores, espaciado, tipografía)
│   │   ├── base.css             # Reset CSS y estilos base
│   │   ├── components.css       # Componentes UI reutilizables
│   │   ├── layout.css           # Grid y sistemas de flexbox
│   │   ├── theme.css            # Estilos de secciones y componentes
│   │   ├── responsive.css       # Media queries (6 breakpoints)
│   │   ├── print.css            # Optimización para impresión/PDF
│   │   └── xp-pro.css           # Estilos avanzados específicos
│   ├── docs/
│   │   └── certificados/        # 31 PDFs de certificaciones profesionales
│   └── img/
│       ├── profile-og.png       # Imagen meta Open Graph (redes sociales)
│       └── profile.png          # Imagen JSON-LD schema
└── README.md                    # Este archivo
```

## ✨ Características Principales

### 🎯 Arquitectura SPA
- **Single Page Application** - Todas las secciones en un único index.html
- **JavaScript inline** - Sin dependencias externas, 0 peticiones a archivos JS
- **Navegación hash** - Secciones: #hero, #problem-solve, #archetypes, #experience, #skills, #credentials
- **Modal system** - Visualizador de certificados PDF con overlay

### 🌐 Multi-idioma (i18n)
- **120+ claves de traducción** - Cobertura completa (97.5%)
- **Idiomas soportados**: Español (ES) e Inglés (EN)
- **Toggle con localStorage** - Persistencia de preferencia de idioma
- **Términos técnicos** - Se mantienen en inglés en ambos idiomas (Selenium, Karate, k6, etc.)

### 🎨 Sistema de Diseño
- **80+ CSS Custom Properties** - Variables de tema y espaciado
- **2 modos de tema** - Dark (default) y Light
- **6 breakpoints responsive** - 1024px, 800px, 640px, 480px, 360px, landscape
- **Diseño accesible** - Soporte para `prefers-reduced-motion`

### 📊 Contenido Optimizado
- **8 secciones temáticas** - Cada una responde una pregunta clave del reclutador
- **7 posiciones profesionales** - Con logros cuantificables
- **6 certificaciones destacadas** - Con descarga de PDFs
- **31 certificaciones totales** - Visualizador modal integrado
- **6 categorías de habilidades** - ~50 tecnologías clasificadas

### 🔍 SEO Completo
- **Meta tags OG** - 8 tags Open Graph para redes sociales
- **Twitter Card tags** - 3 tags para compatibilidad Twitter
- **JSON-LD schemas** - Person schema + Breadcrumb list
- **hreflang alternates** - Configuración multilenguaje para Google
- **sitemap.xml** - Registro de URLs con metadata
- **robots.txt** - Directivas de crawl y permitidos

### 📱 Características de UX
- **Ticker animado** - Barra de progreso con texto dinámico
- **Tooltips contextuales** - En tabla de estadísticas
- **SVG diagrama interactivo** - Pipeline de automatización
- **Tarjetas de arquetipos** - With hover effects
- **Buttons con eventos** - Prevención de navegación en certificados
- **Modal accesible** - Cierre con ESC o click fuera

## 🚀 Uso

### Abrir el portafolio
```bash
# Opción 1: Abrir directamente en navegador
open index.html

# Opción 2: Servir localmente (Python 3)
python -m http.server 8000
# Acceder a http://localhost:8000

# Opción 3: Usar VS Code Live Server
# Click derecho en index.html → "Open with Live Server"
```

### Interacción
- **Cambiar idioma**: Click en botón "EN" / "ES"
- **Cambiar tema**: Click en botón "☀️ / 🌙"
- **Descargar CV**: Click en "↓ CV" (descarga automáticamente según idioma: Bryan-Freire-CV-es.pdf o Bryan-Freire-CV-en.pdf)
- **Ver certificados**: Click en botones 👁 (ver) o ⬇ (descargar) en sección Credentials
- **Navegar secciones**: Usar nav superior o hacer scroll

## 🔧 Mantenimiento

### Editar contenido
- **Todo el contenido está en [index.html](index.html)**
- Las secciones se identifican con `id=""` en `<section>` tags
- Las traducciones usan atributos `data-i18n="key"`

### Estructura de datos
- **Experiencias**: Hardcodeadas en secciones `.exp-featured` y `.exp-compact`
- **Habilidades**: Arrays de categorías en sección `#skills`
- **Certificaciones**: Listadas en sección `#credentials` con PDFs en assets/docs/certificados/

### Generar PDFs del CV (Bilingües)
```bash
python generate_cv_pdf_bilingual.py
# Genera:
# - Bryan-Freire-CV-es.pdf (Español)
# - Bryan-Freire-CV-en.pdf (English)
```

### Agregar nuevos certificados
1. Guardar PDF en `assets/docs/certificados/`
2. Agregar tarjeta en `#credentials` con estructura:
```html
<div class="cert-card">
  <span class="c-year">2025</span>
  <div class="c-title">Título del certificado</div>
  <div class="c-issuer">Emisor</div>
  <div class="cert-actions">
    <button class="cert-btn cert-view" onclick="viewCertificate('Filename.pdf', event)">👁</button>
    <button class="cert-btn cert-download" onclick="downloadCertificate('Filename.pdf', event)">⬇</button>
  </div>
</div>
```

### Agregar nuevas traducciones
1. Editar el objeto `translations` en el `<script>` al final de index.html
2. Agregar clave: `"nueva_clave": "Texto en español"` en `es: {}`
3. Agregar clave: `"nueva_clave": "Text in English"` en `en: {}`
4. Usar en HTML: `<element data-i18n="nueva_clave">Fallback text</element>`

## 📊 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| Tamaño total | ~2.5 MB (sin .git) |
| Líneas de HTML | 1200+ |
| Líneas de CSS | 3500+ |
| Líneas de JS | 200+ (inline) |
| Claves de traducción | 120 |
| Cobertura de idiomas | 97.5% |
| Certificados incluidos | 31 |
| Responsivos breakpoints | 6 |
| CSS Variables | 80+ |

## ✅ Archivos Activos vs Eliminados

### ✅ Archivos Activos en Uso
- index.html ✓
- assets/css/* (7 archivos)
- assets/docs/certificados/* (31 PDFs)
- assets/img/profile-og.png, profile.png
- Bryan-Freire-CV-es.pdf (Español)
- Bryan-Freire-CV-en.pdf (English)
- generate_cv_pdf_bilingual.py

### ❌ Archivos Eliminados (Limpieza de Proyecto)
- ~~certificados.html~~ → Funcionalidad migrada a modal en index.html
- ~~cv-resumen.html~~ → Reemplazado por PDFs bilingües (Bryan-Freire-CV-es.pdf, Bryan-Freire-CV-en.pdf)
- ~~cv-resumen-en.html~~ → Reemplazado por PDFs bilingües (Bryan-Freire-CV-es.pdf, Bryan-Freire-CV-en.pdf)
- ~~Bryan-Freire-CV.pdf~~ → Reemplazado por versiones bilingües
- ~~assets/js/theme.js~~ → Código inline en index.html
- ~~assets/js/xp-pro.js~~ → No utilizado
- ~~assets/js/pages/* (5 archivos)~~ → Código heredado
- ~~assets/js/data/xp-data.js~~ → Datos inline en HTML
- ~~assets/css/styles.css~~ → Reemplazado por sistema modular
- ~~assets/css/pages/* (2 archivos)~~ → Estilos consolidados en theme.css
- ~~assets/img/*.ico (6 logos)~~ → No utilizados

**Resultado**: 48% de clutter eliminado, proyecto limpio y mantenible.

## 🛠️ Stack Tecnológico

- **HTML5** - Semántico, con data attributes
- **CSS3** - Variables, Grid, Flexbox, Media Queries
- **JavaScript ES6+** - Vanilla (sin frameworks)
- **GitHub Pages** - Compatible para hosting gratuito

## 📈 Métricas de Rendimiento

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **Carga inicial**: <2 segundos (dependiendo de caché del navegador)
- **Sin CDN**: Todos los assets locales
- **Offline ready**: Con cache headers en .htaccess (1 año para imágenes)

## 📝 Licencia

Proyecto personal de portafolio. Libre para uso y modificación personal.

---

**Última actualización**: 2026-08-19  
**Versión**: 2.0 (Post-limpieza)  
**Autor**: Bryan Alexander Freire Chamorro  
**Contacto**: bryanalexfreire@gmail.com