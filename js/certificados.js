(function () {
  const SELECTORS = {
    cards: '.cert-grid .card',
    cardButtons: '.card-buttons',
    filterButtons: '.filter-btn',
    searchInput: '#cert-search',
    sortSelect: '#cert-sort',
    resultsCount: '#results-count',
    sectionBlocks: '.cert-section-block',
    lightbox: '#lightbox',
    lightboxMedia: '#lightbox-media',
    lightboxTitle: '#lightbox-title',
    lightboxMeta: '#lightbox-meta',
    lightboxSourceLink: '#lightbox-source-link',
    lightboxVerifiedLink: '#lightbox-verified-link',
    lightboxSeparator: '.lightbox-separator',
    footerYear: '#year'
  };

  const state = {
    previews: [],
    currentIndex: null,
    activeFilter: 'all',
    searchTerm: '',
    sortOrder: 'recent'
  };

  const RESULT_MESSAGES = {
    es: {
      all: 'Mostrando todos los certificados',
      single: 'Se encontró 1 certificado',
      multiple: (count) => `Se encontraron ${count} certificados`
    },
    en: {
      all: 'Showing all certificates',
      single: 'Found 1 certificate',
      multiple: (count) => `Found ${count} certificates`
    }
  };

  const VERIFIED_LABELS = {
    es: '🔗 Ver credencial verificada',
    en: '🔗 View verified credential'
  };

  function getCards() {
    return Array.from(document.querySelectorAll(SELECTORS.cards));
  }

  function getCurrentLanguage() {
    return localStorage.getItem('site-lang') || 'es';
  }

  function buildPreviews() {
    state.previews = getCards().map((card, index) => {
      const fileLink = card.querySelector('.btn-credential');
      const title = card.querySelector('.cert-name')?.textContent.trim() ?? 'Certificado';
      const meta = Array.from(card.querySelectorAll('.cert-details span'))
        .map((item) => item.textContent.trim())
        .join(' • ');

      return {
        index,
        src: fileLink?.getAttribute('href') ?? '',
        verifiedUrl: card.dataset.verifiedUrl ?? '',
        title,
        meta,
        type: resolvePreviewType(fileLink?.getAttribute('href') ?? '')
      };
    });
  }

  function getVerifiedLabel() {
    return VERIFIED_LABELS[getCurrentLanguage()] || VERIFIED_LABELS.es;
  }

  function setupVerifiedCredentialButtons() {
    document.querySelectorAll(SELECTORS.cards).forEach((card) => {
      const verifiedUrl = card.dataset.verifiedUrl?.trim();

      if (!verifiedUrl) {
        return;
      }

      const buttonsContainer = card.querySelector(SELECTORS.cardButtons);

      if (!buttonsContainer || buttonsContainer.querySelector('.btn-verified')) {
        return;
      }

      const verifiedLink = document.createElement('a');
      verifiedLink.className = 'btn btn-verified';
      verifiedLink.href = verifiedUrl;
      verifiedLink.target = '_blank';
      verifiedLink.rel = 'noopener noreferrer';
      verifiedLink.textContent = getVerifiedLabel();
      buttonsContainer.appendChild(verifiedLink);
    });
  }

  function updateVerifiedCredentialButtonsLanguage() {
    const text = getVerifiedLabel();
    document.querySelectorAll('.btn-verified').forEach((button) => {
      button.textContent = text;
    });
  }

  function resolvePreviewType(src) {
    const normalized = src.toLowerCase();

    if (normalized.endsWith('.pdf')) {
      return 'pdf';
    }

    if (/\.(png|jpe?g|gif|webp|svg)$/.test(normalized)) {
      return 'image';
    }

    if (normalized.startsWith('http')) {
      return 'external';
    }

    return 'missing';
  }

  function renderPreview(preview) {
    const lightboxMedia = document.querySelector(SELECTORS.lightboxMedia);
    const titleElement = document.querySelector(SELECTORS.lightboxTitle);
    const metaElement = document.querySelector(SELECTORS.lightboxMeta);

    if (!lightboxMedia || !titleElement || !metaElement) {
      return;
    }

    const sourceLink = document.querySelector(SELECTORS.lightboxSourceLink);
    const verifiedLink = document.querySelector(SELECTORS.lightboxVerifiedLink);
    const separator = document.querySelector(SELECTORS.lightboxSeparator);

    lightboxMedia.innerHTML = '';
    titleElement.textContent = preview.title;
    metaElement.textContent = preview.meta;

    if (sourceLink) {
      if (preview.src) {
        sourceLink.href = preview.src;
        sourceLink.hidden = false;
      } else {
        sourceLink.href = '#';
        sourceLink.hidden = true;
      }
    }

    if (verifiedLink) {
      if (preview.verifiedUrl) {
        verifiedLink.href = preview.verifiedUrl;
        verifiedLink.hidden = false;
        verifiedLink.textContent = getVerifiedLabel();
      } else {
        verifiedLink.href = '#';
        verifiedLink.hidden = true;
      }
    }

    if (separator && verifiedLink) {
      separator.hidden = verifiedLink.hidden;
    }

    if (preview.type === 'pdf') {
      const iframe = document.createElement('iframe');
      iframe.src = preview.src;
      iframe.title = `Vista previa de ${preview.title}`;
      lightboxMedia.appendChild(iframe);
      return;
    }

    if (preview.type === 'image') {
      const image = document.createElement('img');
      image.src = preview.src;
      image.alt = preview.title;
      lightboxMedia.appendChild(image);
      return;
    }

    const fallback = document.createElement('p');
    fallback.textContent = 'Vista previa no disponible. Usa el enlace de descarga para abrir el certificado.';
    lightboxMedia.appendChild(fallback);
  }

  function openLightbox(index) {
    const preview = state.previews[Number(index)];
    const lightbox = document.querySelector(SELECTORS.lightbox);

    if (!preview || !lightbox) {
      return;
    }

    state.currentIndex = Number(index);
    renderPreview(preview);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    const lightbox = document.querySelector(SELECTORS.lightbox);
    const lightboxMedia = document.querySelector(SELECTORS.lightboxMedia);

    if (!lightbox || !lightboxMedia) {
      return;
    }

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxMedia.innerHTML = '';
    state.currentIndex = null;
  }

  function changeImage(step) {
    if (state.currentIndex === null || state.previews.length === 0) {
      return;
    }

    const lastIndex = state.previews.length - 1;
    let nextIndex = state.currentIndex + step;

    if (nextIndex < 0) {
      nextIndex = lastIndex;
    }

    if (nextIndex > lastIndex) {
      nextIndex = 0;
    }

    openLightbox(nextIndex);
  }

  function updateSectionVisibility() {
    document.querySelectorAll(SELECTORS.sectionBlocks).forEach((sectionBlock) => {
      const visibleCards = Array.from(sectionBlock.querySelectorAll('.card')).some((card) => !card.hidden);
      sectionBlock.hidden = !visibleCards;
    });
  }

  function getCardSortValue(card, sortOrder) {
    if (sortOrder === 'name') {
      return card.querySelector('.cert-name')?.textContent.trim().toLowerCase() ?? '';
    }

    return Number(card.dataset.originalIndex || 0);
  }

  function sortCardsInSections() {
    document.querySelectorAll(SELECTORS.sectionBlocks).forEach((sectionBlock) => {
      const grid = sectionBlock.querySelector('.cert-grid');

      if (!grid) {
        return;
      }

      const cards = Array.from(grid.querySelectorAll('.card'));

      cards.sort((a, b) => {
        const aValue = getCardSortValue(a, state.sortOrder);
        const bValue = getCardSortValue(b, state.sortOrder);

        if (state.sortOrder === 'name') {
          return String(aValue).localeCompare(String(bValue));
        }

        if (state.sortOrder === 'oldest') {
          return Number(bValue) - Number(aValue);
        }

        return Number(aValue) - Number(bValue);
      });

      cards.forEach((card) => grid.appendChild(card));
    });
  }

  function updateResultsCount() {
    const resultsElement = document.querySelector(SELECTORS.resultsCount);

    if (!resultsElement) {
      return;
    }

    const language = getCurrentLanguage();
    const messages = RESULT_MESSAGES[language] || RESULT_MESSAGES.es;
    const visibleCount = getCards().filter((card) => !card.hidden).length;
    const totalCount = getCards().length;
    const isDefaultView = state.activeFilter === 'all' && !state.searchTerm;

    if (isDefaultView && visibleCount === totalCount) {
      resultsElement.textContent = messages.all;
      return;
    }

    resultsElement.textContent = visibleCount === 1 ? messages.single : messages.multiple(visibleCount);
  }

  function applyFiltersAndSort() {
    const normalizedSearch = state.searchTerm.trim().toLowerCase();

    getCards().forEach((card) => {
      const cardType = card.dataset.type || '';
      const cardText = card.textContent.toLowerCase();
      const matchesFilter = state.activeFilter === 'all' || cardType === state.activeFilter;
      const matchesSearch = !normalizedSearch || cardText.includes(normalizedSearch);

      card.hidden = !(matchesFilter && matchesSearch);
    });

    sortCardsInSections();
    updateSectionVisibility();
    updateResultsCount();
  }

  function setupFilters() {
    const buttons = document.querySelectorAll(SELECTORS.filterButtons);

    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', button.classList.contains('is-active') ? 'true' : 'false');
    });

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((item) => {
          item.classList.remove('is-active');
          item.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('is-active');
        button.setAttribute('aria-pressed', 'true');
        state.activeFilter = button.dataset.filter || 'all';
        applyFiltersAndSort();
      });
    });
  }

  function setupSearchAndSort() {
    const searchInput = document.querySelector(SELECTORS.searchInput);
    const sortSelect = document.querySelector(SELECTORS.sortSelect);

    searchInput?.addEventListener('input', (event) => {
      state.searchTerm = event.target.value || '';
      applyFiltersAndSort();
    });

    sortSelect?.addEventListener('change', (event) => {
      state.sortOrder = event.target.value || 'recent';
      applyFiltersAndSort();
    });
  }

  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
      const lightbox = document.querySelector(SELECTORS.lightbox);
      const isLightboxOpen = lightbox?.classList.contains('is-open');

      if (!isLightboxOpen) {
        return;
      }

      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowLeft') {
        changeImage(-1);
      }

      if (event.key === 'ArrowRight') {
        changeImage(1);
      }
    });
  }

  function setupLanguageSync() {
    document.querySelectorAll('.lang-btn').forEach((button) => {
      button.addEventListener('click', () => {
        window.setTimeout(() => {
          updateResultsCount();
          updateVerifiedCredentialButtonsLanguage();
        }, 0);
      });
    });
  }

  function updateFooterYear() {
    const yearElement = document.querySelector(SELECTORS.footerYear);

    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  function init() {
    getCards().forEach((card, index) => {
      card.dataset.originalIndex = String(index);
    });

    setupVerifiedCredentialButtons();
    buildPreviews();
    setupFilters();
    setupSearchAndSort();
    setupKeyboardShortcuts();
    setupLanguageSync();
    applyFiltersAndSort();
    updateFooterYear();
  }

  window.openLightbox = openLightbox;
  window.closeLightbox = closeLightbox;
  window.changeImage = changeImage;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
