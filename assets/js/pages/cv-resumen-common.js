(function normalizeUrl() {
      if (window.location.pathname.endsWith('.html')) {
        const cleanPath = window.location.pathname.replace(/\.html$/i, '');
        history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
      }
    })();

    document.addEventListener('DOMContentLoaded', function () {
      const experienceLink = document.querySelector('.cv-more-link[data-scroll-target="experiencia"]');
      if (!experienceLink) return;

      experienceLink.addEventListener('click', function (event) {
        event.preventDefault();
        sessionStorage.setItem('pending-scroll-target', experienceLink.getAttribute('data-scroll-target'));
        window.location.href = experienceLink.href;
      });
    });

