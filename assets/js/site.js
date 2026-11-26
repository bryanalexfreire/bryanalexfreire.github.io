/* Page behavior: language, theme, CV links, certificates toggle and scroll ticker. */
(function () {
  'use strict';

  var I18N = window.I18N;
  var CV = { es: 'cv/CV Bryan Freire.pdf', en: 'cv/CV Bryan Freire EN.pdf' };
  var state = { lang: 'es', theme: 'dark', certsOpen: false };

  function store(key, value) {
    try {
      if (value === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
    return null;
  }

  function $(id) { return document.getElementById(id); }

  function renderThemeButton() {
    var dict = I18N[state.lang];
    var btn = $('theme-toggle');
    var label = state.theme === 'dark' ? dict.light_mode : dict.dark_mode;
    btn.innerHTML = (state.theme === 'dark' ? '☀️ ' : '🌙 ') + '<span>' + label + '</span>';
    btn.setAttribute('aria-pressed', state.theme === 'light' ? 'true' : 'false');
  }

  function renderCertToggle() {
    var dict = I18N[state.lang];
    var btn = $('cert-toggle-btn');
    btn.textContent = state.certsOpen ? dict.cert_toggle_less : dict.cert_toggle;
    btn.setAttribute('aria-expanded', state.certsOpen ? 'true' : 'false');
    $('more-certs').classList.toggle('show', state.certsOpen);
  }

  function applyLang(lang) {
    var dict = I18N[lang];
    if (!dict) return;
    state.lang = lang;
    document.documentElement.lang = lang;
    document.body.setAttribute('data-lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = dict[el.getAttribute('data-i18n')];
      if (value !== undefined) el.innerHTML = value;
    });

    var other = lang === 'es' ? 'en' : 'es';
    var langBtn = $('lang-toggle');
    langBtn.textContent = other.toUpperCase();
    langBtn.setAttribute('title', other === 'en' ? 'English' : 'Español');

    $('cv-main').setAttribute('href', CV[lang]);
    $('cv-header').setAttribute('href', CV[lang]);
    $('cv-alt').setAttribute('href', CV[other]);

    renderThemeButton();
    renderCertToggle();
    onScroll();
    store('lang', lang);
  }

  function applyTheme(theme) {
    state.theme = theme === 'light' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', state.theme);
    renderThemeButton();
    store('theme', state.theme);
  }

  var fill = $('ticker-fill');
  var pct = $('ticker-pct');
  var tickerText = $('ticker-text');
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var scrolled = max > 0 ? (h.scrollTop / max) * 100 : 0;
    var clamped = Math.max(0, Math.min(100, scrolled));
    fill.style.width = clamped + '%';
    pct.textContent = Math.round(clamped) + '%';
    var texts = I18N[state.lang].ticker_texts;
    var idx = Math.min(texts.length - 1, Math.floor((clamped / 100) * texts.length));
    tickerText.textContent = clamped >= 99 ? texts[texts.length - 1] : texts[idx];
  }

  function initialLang() {
    var param = new URLSearchParams(window.location.search).get('lang');
    if (param === 'es' || param === 'en') return param;
    var saved = store('lang');
    return saved === 'en' ? 'en' : 'es';
  }

  $('lang-toggle').addEventListener('click', function () {
    applyLang(state.lang === 'es' ? 'en' : 'es');
  });
  $('theme-toggle').addEventListener('click', function () {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  });
  $('cert-toggle-btn').addEventListener('click', function () {
    state.certsOpen = !state.certsOpen;
    renderCertToggle();
  });
  window.addEventListener('scroll', onScroll, { passive: true });

  applyTheme(store('theme') === 'light' ? 'light' : 'dark');
  applyLang(initialLang());
})();
