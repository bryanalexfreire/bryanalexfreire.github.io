// JS para la sección de experiencia profesional (xp-pro)
// Requiere que xpData esté definido globalmente
let xpCurrentIndex = 0;

function getXpLang() {
  return localStorage.getItem('site-lang') || 'es';
}

function getXpLabels(lang) {
  if (lang === 'en') {
    return {
      previous: '< Previous experience',
      next: 'Next experience >',
      of: 'of',
      responsibilities: 'Key responsibilities',
      achievements: 'Key achievements',
      about: 'About the role',
      projects: 'Featured projects',
      tools: 'Technologies and tools'
    };
  }

  return {
    previous: '< Experiencia anterior',
    next: 'Siguiente experiencia >',
    of: 'de',
    responsibilities: 'Responsabilidades principales',
    achievements: 'Logros alcanzados',
    about: 'Sobre el rol',
    projects: 'Proyectos destacados',
    tools: 'Tecnologías y herramientas'
  };
}

function renderXpDetailPanel(idx) {
  const xp = xpData[idx];
  if (!xp) return;
  const lang = getXpLang();
  const labels = getXpLabels(lang);
  const translateFn = typeof window.XP_DETAIL_TRANSLATE === 'function' ? window.XP_DETAIL_TRANSLATE : null;
  const maybeTranslate = (text) => {
    if (lang !== 'en' || !translateFn) return text;
    return translateFn(text);
  };
  const resolveText = (baseValue, enValue) => {
    if (lang === 'en' && enValue) return enValue;
    return maybeTranslate(baseValue);
  };
  const content = {
    role: resolveText(xp.role, xp.roleEn),
    date: resolveText(xp.date, xp.dateEn),
    location: resolveText(xp.location, xp.locationEn),
    status: resolveText(xp.status, xp.statusEn),
    about: resolveText(xp.about, xp.aboutEn),
    responsibilities: (xp.responsibilities || []).map((item, index) => {
      const enList = xp.responsibilitiesEn || [];
      return resolveText(item, enList[index]);
    }),
    tools: (xp.tools || []).map((item, index) => {
      const enList = xp.toolsEn || [];
      return resolveText(item, enList[index]);
    }),
    kpis: (xp.kpis || []).map((kpi) => ({
      ...kpi,
      label: resolveText(kpi.label, kpi.labelEn)
    })),
    achievements: (xp.achievements || []).map((item) => ({
      ...item,
      label: resolveText(item.label, item.labelEn)
    })),
    projects: (xp.projects || []).map((project) => ({
      ...project,
      title: resolveText(project.title, project.titleEn),
      desc: resolveText(project.desc, project.descEn),
      evid: resolveText(project.evid, project.evidEn)
    }))
  };

  // Navegación
  const nav = `
    <div class="xp-detail-nav">
      <button id="xp-prev-btn" ${idx === 0 ? 'disabled' : ''}>${labels.previous}</button>
      <span class="xp-detail-nav-ind">${idx + 1} ${labels.of} ${xpData.length}</span>
      <button id="xp-next-btn" ${idx === xpData.length - 1 ? 'disabled' : ''}>${labels.next}</button>
    </div>
  `;

  // Header y KPIs en una sola fila
  const headerAndKpis = `
    <div class="xp-detail-header-row-2col">
      <div class="xp-detail-header">
        <span class="xp-detail-logo"><img src="${xp.logo}" alt="${xp.company}" /></span>
        <div class="xp-detail-header-main">
          <span class="xp-detail-role">${content.role}</span>
          <span class="xp-detail-company">${xp.company}</span>
          <div class="xp-detail-meta">
            <span class="xp-detail-date">${content.date}</span>
            <span class="xp-detail-location">${content.location}</span>
          </div>
        </div>
        ${xp.status ? `<span class="xp-detail-status">${content.status}</span>` : ''}
      </div>
      ${content.kpis && content.kpis.length ? `<div class="xp-detail-kpis">${content.kpis.map(kpi => `<div class="xp-kpi-chip ${kpi.color}">${kpi.value}<br><span class="xp-kpi-label">${kpi.label}</span></div>`).join('')}</div>` : ''}
    </div>
  `;

  // Bloque doble: responsabilidades y logros en dos columnas
  const respAchievements = (content.responsibilities && content.responsibilities.length) || (content.achievements && content.achievements.length) ? `
    <div class="xp-detail-row-2col">
      <div class="xp-detail-section">
        <h5>${labels.responsibilities}</h5>
        <ul class="xp-detail-resp">${content.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
      </div>
      <div class="xp-detail-section">
        <h5>${labels.achievements}</h5>
        <ul class="xp-detail-achievements">${content.achievements.map(a => `<li><b class='${a.color}'>${a.value}</b> ${a.label}</li>`).join('')}</ul>
      </div>
    </div>
  ` : '';

  // Sobre
  const about = xp.about ? `<div class="xp-detail-section"><h5>${labels.about}</h5><div class="xp-detail-about">${content.about}</div></div>` : '';
  // Proyectos
  const projects = content.projects && content.projects.length ? `<div class="xp-detail-section"><h5>${labels.projects}</h5><div class="xp-projects-list">${content.projects.map(p => `<div class="xp-project-card"><div class="xp-project-title">${p.title}</div><div class="xp-project-desc">${p.desc}</div>${p.evid ? `<div class="xp-project-evid">${p.evid}</div>` : ''}</div>`).join('')}</div></div>` : '';
  // Herramientas
  const tools = content.tools && content.tools.length ? `<div class="xp-detail-section"><h5>${labels.tools}</h5><div class="xp-tools-list">${content.tools.map(t => `<span class="xp-tool">${t}</span>`).join('')}</div></div>` : '';

  document.getElementById('xp-detail-dynamic').innerHTML = `
    ${nav}
    ${headerAndKpis}
    ${about}
    ${respAchievements}
    ${projects}
    ${tools}
  `;

  // Botones navegación
  document.getElementById('xp-prev-btn').onclick = function() {
    if (xpCurrentIndex > 0) {
      xpCurrentIndex--;
      renderXpDetailPanel(xpCurrentIndex);
    }
  };
  document.getElementById('xp-next-btn').onclick = function() {
    if (xpCurrentIndex < xpData.length - 1) {
      xpCurrentIndex++;
      renderXpDetailPanel(xpCurrentIndex);
    }
  };
}

document.addEventListener('DOMContentLoaded', function() {
  // Timeline click
  document.querySelectorAll('.xp-timeline-item').forEach((item, idx) => {
    item.setAttribute('data-xp-id', xpData[idx].id);
    item.addEventListener('click', function() {
      xpCurrentIndex = idx;
      renderXpDetailPanel(xpCurrentIndex);
    });
  });
  // Tabla click
  document.querySelectorAll('.xp-more-detail-btn').forEach((btn, idx) => {
    btn.addEventListener('click', function() {
      const xpIdx = xpData.findIndex(x => x.id === btn.getAttribute('data-xp'));
      if(xpIdx !== -1) {
        xpCurrentIndex = xpIdx;
        renderXpDetailPanel(xpCurrentIndex);
      }
    });
  });
  // Por defecto mostrar la primera experiencia
  renderXpDetailPanel(xpCurrentIndex);
});

window.renderXpDetailPanel = renderXpDetailPanel;
window.getXpCurrentIndex = function () {
  return xpCurrentIndex;
};
