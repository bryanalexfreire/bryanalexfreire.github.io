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
│   │   └── styles.css
│   ├── docs/
│   │   └── certificados/
│   └── js/
│       └── theme.js
├── js/
│   ├── i18n.js
│   └── certificados.js
└── README.md
```

## Arquitectura

El proyecto fue depurado para dejar unicamente el runtime activo:

- [index.html](index.html)
- [certificados.html](certificados.html)
- [cv-resumen.html](cv-resumen.html)
- [cv-resumen-en.html](cv-resumen-en.html)
- [assets/css/styles.css](assets/css/styles.css)
- [assets/docs/certificados](assets/docs/certificados)
- [assets/js/theme.js](assets/js/theme.js)
- [js/i18n.js](js/i18n.js)
- [js/certificados.js](js/certificados.js)

## Uso

1. Abre [index.html](index.html) en el navegador.
2. Usa los botones superiores para cambiar idioma y tema.
3. Usa "Descargar CV rapido" para abrir [cv-resumen.html](cv-resumen.html) (español) o [cv-resumen-en.html](cv-resumen-en.html) (inglés).
4. Abre [certificados.html](certificados.html) para ver la galeria.

## Mantenimiento

- Edita contenido del CV directamente en [index.html](index.html)
- Edita resúmenes en [cv-resumen.html](cv-resumen.html) (español) y [cv-resumen-en.html](cv-resumen-en.html) (inglés)
- Edita traducciones en [js/i18n.js](js/i18n.js)
- Edita la galeria en [certificados.html](certificados.html)
- Ajusta estilos en [assets/css/styles.css](assets/css/styles.css)

## Tecnologias

- HTML5 semantico
- CSS3 con variables de tema
- JavaScript vanilla para interactividad