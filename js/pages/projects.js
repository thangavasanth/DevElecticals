/* ===== Projects Page ===== */
const ProjectsPage = (() => {
  let projectsData = null;

  async function loadData() {
    if (projectsData) return projectsData;
    const res = await fetch('data/projects.json');
    projectsData = await res.json();
    return projectsData;
  }

  async function render() {
    const content = await I18n.loadContent();
    const projects = await loadData();
    const lang = I18n.getLang();
    const t = I18n.t;

    return `
      <section class="page-hero">
        <div class="container">
          <h1>${t(content.pages.projects)}</h1>
          <div class="accent-line"></div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <div class="projects-filters">
            <button class="filter-btn active" data-filter="all">${t(content.buttons.allProjects)}</button>
            <button class="filter-btn" data-filter="completed">${t(content.buttons.completed)}</button>
            <button class="filter-btn" data-filter="ongoing">${t(content.buttons.ongoing)}</button>
          </div>
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" id="project-search" placeholder="${t(content.buttons.search)}">
          </div>
          <div class="projects-grid" id="projects-list">
            ${renderProjectCards(projects, t, lang)}
          </div>
        </div>
      </section>
    `;
  }

  function renderProjectCards(projects, t, lang) {
    if (projects.length === 0) {
      return `<div class="empty-state"><i class="fas fa-folder-open"></i><p>${lang === 'ta' ? 'திட்டங்கள் எதுவும் இல்லை' : 'No projects found'}</p></div>`;
    }
    return projects.map((proj, i) => `
      <div class="project-card reveal stagger-${(i % 3) + 1}" data-status="${proj.status}" data-name="${t(proj.name).toLowerCase()}">
        <div class="project-card-header">
          <span class="project-status ${proj.status}">${proj.status === 'completed' ? (lang === 'ta' ? 'நிறைவு' : 'Completed') : (lang === 'ta' ? 'நடப்பு' : 'Ongoing')}</span>
          <h3>${t(proj.name)}</h3>
        </div>
        <div class="project-card-body">
          <div class="project-meta">
            <div class="project-meta-item"><i class="fas fa-building"></i> ${t(proj.client)}</div>
            <div class="project-meta-item"><i class="fas fa-map-marker-alt"></i> ${t(proj.location)}</div>
            <div class="project-meta-item"><i class="fas fa-rupee-sign"></i> ${proj.value}</div>
          </div>
          <div class="project-progress">
            <div class="progress-bar"><div class="progress-fill" data-width="${proj.completion}"></div></div>
            <div class="progress-text">${proj.completion}% ${lang === 'ta' ? 'நிறைவு' : 'Complete'}</div>
          </div>
        </div>
        <div class="project-card-footer">
          <a href="#/project/${proj.id}" class="btn btn-primary btn-sm">
            ${t({ en: 'View Details', ta: 'விவரங்களை காண' })} <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    `).join('');
  }

  function afterRender() {
    Utils.initScrollReveal();
    Utils.initProgressBars();

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProjects();
      });
    });

    // Search
    const searchInput = document.getElementById('project-search');
    if (searchInput) {
      searchInput.addEventListener('input', filterProjects);
    }
  }

  function filterProjects() {
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const searchTerm = document.getElementById('project-search')?.value.toLowerCase() || '';

    document.querySelectorAll('.project-card').forEach(card => {
      const status = card.dataset.status;
      const name = card.dataset.name;
      const matchesFilter = activeFilter === 'all' || status === activeFilter;
      const matchesSearch = name.includes(searchTerm);
      card.style.display = (matchesFilter && matchesSearch) ? '' : 'none';
    });
  }

  return { render, afterRender, loadData };
})();
