(function redirectByPreferredLanguage() {
      try {
        const preferredLang = localStorage.getItem('site-lang') || 'es';
        if (preferredLang === 'es') {
          window.location.replace('cv-resumen.html' + window.location.search + window.location.hash);
        }
      } catch (_) {
        // Ignore storage access failures.
      }
    })();

