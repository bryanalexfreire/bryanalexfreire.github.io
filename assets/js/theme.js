/**
 * Sistema de Temas (Claro/Oscuro)
 * Gestiona la alternancia entre temas y persiste la preferencia del usuario
 */

const ThemeManager = (() => {
  // Constantes
  const THEME_KEY = 'preferred-theme';
  const LIGHT_THEME = 'light';
  const DARK_THEME = 'dark';
  const AUTO_THEME = 'auto';

  /**
   * Inicializa el sistema de temas
   */
  function init() {
    // Detectar tema guardado o usar preferencia del sistema
    const savedTheme = localStorage.getItem(THEME_KEY) || AUTO_THEME;
    setTheme(savedTheme);
    
    // Configurar listeners de cambio de sistema
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme === AUTO_THEME || !savedTheme) {
          applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
        }
      });
    }

    // Configurar botones de tema
    setupThemeButtons();
  }

  /**
   * Establece el tema (guardándolo)
   * @param {string} theme - 'light', 'dark', o 'auto'
   */
  function setTheme(theme) {
    if (theme === AUTO_THEME) {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? DARK_THEME : LIGHT_THEME);
    } else {
      applyTheme(theme);
    }
    localStorage.setItem(THEME_KEY, theme);
    updateThemeButtons(theme);
  }

  /**
   * Aplica el tema directamente sin guardar
   * @param {string} theme - 'light' o 'dark'
   */
  function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    
    // Actualizar meta theme-color para navegadores móviles
    const metaThemeColor = document.querySelector('meta[name=\"theme-color\"]');
    if (metaThemeColor) {
      const color = theme === DARK_THEME ? '#0a0a0a' : '#ffffff';
      metaThemeColor.setAttribute('content', color);
    }
  }

  /**
   * Configura los botones de cambio de tema
   */
  function setupThemeButtons() {
    // Buscar botones de tema con selector CSS
    const themeButtons = document.querySelectorAll('[data-theme-btn]');
    
    themeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const theme = btn.getAttribute('data-theme-btn');
        setTheme(theme);
      });
    });

    // Detectar e inicializar botones legacy (si existen)
    const legacyLightBtn = document.querySelector('.theme-btn-light');
    const legacyDarkBtn = document.querySelector('.theme-btn-dark');
    const legacyAutoBtn = document.querySelector('.theme-btn-auto');

    if (legacyLightBtn) {
      legacyLightBtn.addEventListener('click', () => setTheme(LIGHT_THEME));
    }
    if (legacyDarkBtn) {
      legacyDarkBtn.addEventListener('click', () => setTheme(DARK_THEME));
    }
    if (legacyAutoBtn) {
      legacyAutoBtn.addEventListener('click', () => setTheme(AUTO_THEME));
    }
  }

  /**
   * Actualiza el estado visual de los botones de tema
   * @param {string} theme - Tema actual
   */
  function updateThemeButtons(theme) {
    // Actualizar nuevos botones
    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
      const btnTheme = btn.getAttribute('data-theme-btn');
      if (btnTheme === theme) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Actualizar botones legacy
    document.querySelectorAll('.theme-btn-light, .theme-btn-dark, .theme-btn-auto').forEach(btn => {
      btn.classList.remove('active');
    });

    if (theme === LIGHT_THEME && document.querySelector('.theme-btn-light')) {
      document.querySelector('.theme-btn-light').classList.add('active');
    } else if (theme === DARK_THEME && document.querySelector('.theme-btn-dark')) {
      document.querySelector('.theme-btn-dark').classList.add('active');
    } else if (theme === AUTO_THEME && document.querySelector('.theme-btn-auto')) {
      document.querySelector('.theme-btn-auto').classList.add('active');
    }
  }

  /**
   * Obtiene el tema actual
   * @returns {string} Tema actual
   */
  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
  }

  /**
   * Obtiene la preferencia guardada del usuario
   * @returns {string} Preferencia guardada
   */
  function getSavedPreference() {
    return localStorage.getItem(THEME_KEY) || AUTO_THEME;
  }

  /**
   * Alterna entre tema claro y oscuro
   */
  function toggle() {
    const current = getCurrentTheme();
    setTheme(current === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
  }

  // Exponedor público
  return {
    init,
    setTheme,
    applyTheme,
    getCurrentTheme,
    getSavedPreference,
    toggle,
    LIGHT_THEME,
    DARK_THEME,
    AUTO_THEME
  };
})();

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ThemeManager.init);
} else {
  ThemeManager.init();
}

// Ocultar extensiones .html en la barra de direcciones sin romper la navegación actual.
(function normalizePageUrl() {
  if (typeof window === 'undefined' || typeof history === 'undefined') return;

  const { pathname, search, hash, origin } = window.location;
  if (!pathname.endsWith('.html')) return;

  let cleanPath = pathname.replace(/\/index\.html$/i, '/').replace(/\.html$/i, '');
  if (!cleanPath) cleanPath = '/';

  const cleanUrl = `${origin}${cleanPath}${search}${hash}`;
  history.replaceState(null, '', cleanUrl);
})();
