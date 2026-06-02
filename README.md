# CV Profesional - Bryan Alexander Freire Chamorro

Proyecto de portafolio/CV construido con HTML, CSS y JavaScript vanilla.

## Estructura vigente

```text
.
├── index.html
├── certificados.html
├── cv-resumen.html
├── cv-resumen-en.html
├── assets/
│   ├── css/
│   │   ├── styles.css
│   │   ├── xp-pro.css
│   │   └── pages/
│   │       ├── certificados.css
│   │       └── cv-resumen.css
│   ├── docs/
│   │   └── certificados/
│   └── js/
│       ├── theme.js
│       ├── xp-pro.js
│       ├── data/
│       │   └── xp-data.js
│       └── pages/
│           ├── index-page.js
│           ├── certificados-page.js
│           ├── cv-resumen-common.js
│           ├── cv-resumen-es.js
│           └── cv-resumen-en.js
└── README.md
```

## Arquitectura

El proyecto fue depurado para dejar unicamente el runtime activo:

- [index.html](index.html)
- [certificados.html](certificados.html)
- [cv-resumen.html](cv-resumen.html)
- [cv-resumen-en.html](cv-resumen-en.html)
- [assets/css/styles.css](assets/css/styles.css)
- [assets/css/xp-pro.css](assets/css/xp-pro.css)
- [assets/css/pages/certificados.css](assets/css/pages/certificados.css)
- [assets/css/pages/cv-resumen.css](assets/css/pages/cv-resumen.css)
- [assets/docs/certificados](assets/docs/certificados)
- [assets/js/theme.js](assets/js/theme.js)
- [assets/js/xp-pro.js](assets/js/xp-pro.js)
- [assets/js/data/xp-data.js](assets/js/data/xp-data.js)
- [assets/js/pages/index-page.js](assets/js/pages/index-page.js)
- [assets/js/pages/certificados-page.js](assets/js/pages/certificados-page.js)
- [assets/js/pages/cv-resumen-common.js](assets/js/pages/cv-resumen-common.js)
- [assets/js/pages/cv-resumen-es.js](assets/js/pages/cv-resumen-es.js)
- [assets/js/pages/cv-resumen-en.js](assets/js/pages/cv-resumen-en.js)

## Uso

1. Abre [index.html](index.html) en el navegador.
2. Usa los botones superiores para cambiar idioma y tema.
3. Usa "Descargar CV rapido" para abrir [cv-resumen.html](cv-resumen.html) (español) o [cv-resumen-en.html](cv-resumen-en.html) (inglés).
4. Abre [certificados.html](certificados.html) para ver la galeria.

## Mantenimiento

- Edita contenido del CV directamente en [index.html](index.html)
- Edita resúmenes en [cv-resumen.html](cv-resumen.html) (español) y [cv-resumen-en.html](cv-resumen-en.html) (inglés)
- Edita experiencias en [assets/js/data/xp-data.js](assets/js/data/xp-data.js)
- Edita lógica de landing en [assets/js/pages/index-page.js](assets/js/pages/index-page.js)
- Edita la galeria en [assets/js/pages/certificados-page.js](assets/js/pages/certificados-page.js)
- Ajusta estilos globales en [assets/css/styles.css](assets/css/styles.css) y [assets/css/xp-pro.css](assets/css/xp-pro.css)
- Ajusta estilos de páginas en [assets/css/pages/certificados.css](assets/css/pages/certificados.css) y [assets/css/pages/cv-resumen.css](assets/css/pages/cv-resumen.css)

## Tecnologias

- HTML5 semantico
- CSS3 con variables de tema
- JavaScript vanilla para interactividad