(function redirectByPreferredLanguage() {
      try {
        const preferredLang = localStorage.getItem('site-lang') || 'es';
        if (preferredLang === 'en') {
          window.location.replace('cv-resumen-en.html' + window.location.search + window.location.hash);
        }
      } catch (_) {
        // Ignore storage access failures.
      }
    })();

