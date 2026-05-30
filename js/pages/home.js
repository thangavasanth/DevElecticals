/* ===== Home Page ===== */
const HomePage = (() => {

  async function render() {
    const content = await I18n.loadContent();
    const lang = I18n.getLang();
    const t = I18n.t;

    return `
      <!-- Hero -->
      <section class="hero">
        <div class="container">
          <div class="hero-grid">
            <div class="hero-content">
              <span class="hero-badge"><i class="fas fa-bolt"></i> ${lang === 'ta' ? 'மின்கட்டமைப்பு ஒப்பந்ததாரர்' : 'Electrical Infrastructure Contractor'}</span>
              <h1><span class="brand">DEV</span> ELECTRICALS</h1>
              <p class="hero-tagline">${t(content.tagline)}</p>
              <p class="hero-desc">${t(content.hero)}</p>
              <div class="hero-buttons">
                <a href="#/projects" class="btn btn-primary">
                  <i class="fas fa-project-diagram"></i> ${t(content.buttons.viewProjects)}
                </a>
                <a href="#/contact" class="btn btn-outline">
                  <i class="fas fa-envelope"></i> ${t(content.buttons.contactUs)}
                </a>
              </div>
            </div>
            <div class="hero-visual">
              <img src="assets/images/logo.png" alt="DEV ELECTRICALS" class="hero-logo-large">
            </div>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="stats-section">
        <div class="container">
          <div class="stats-grid">
            ${content.stats.map((stat, i) => `
              <div class="stat-card reveal stagger-${i + 1}">
                <div class="stat-icon">
                  <i class="${getStatIcon(i)}"></i>
                </div>
                <div class="stat-number counter" data-target="${stat.value}" data-suffix="${stat.suffix}" ${stat.display ? `data-display="${stat.display}"` : ''}>0</div>
                <div class="stat-label">${t(stat.label)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Why Choose Us -->
      <section class="page-section why-section">
        <div class="container">
          <div class="section-header reveal">
            <h2>${lang === 'ta' ? 'ஏன் எங்களை தேர்வு செய்ய வேண்டும்?' : 'Why Choose Us?'}</h2>
            <div class="accent-line"></div>
          </div>
          <div class="why-grid">
            ${content.whyChooseUs.map((item, i) => `
              <div class="why-card reveal stagger-${(i % 3) + 1}">
                <div class="why-icon"><i class="${Utils.getWhyIcon(item.icon)}"></i></div>
                <h3>${t(item)}</h3>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="page-section" style="background: linear-gradient(135deg, var(--dark-blue), var(--navy)); text-align: center; color: white;">
        <div class="container reveal">
          <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 12px;">
            ${lang === 'ta' ? 'உங்கள் திட்டத்தை இன்றே தொடங்குங்கள்' : 'Start Your Project Today'}
          </h2>
          <p style="opacity: 0.8; margin-bottom: 24px; max-width: 500px; margin-left: auto; margin-right: auto;">
            ${lang === 'ta' ? 'எங்கள் நிபுணர் குழுவுடன் இன்றே தொடர்பு கொள்ளுங்கள்' : 'Get in touch with our expert team for your electrical infrastructure needs'}
          </p>
          <a href="#/contact" class="btn btn-primary" style="font-size: 1rem;">
            <i class="fas fa-phone-alt"></i> ${t(content.buttons.contactUs)}
          </a>
        </div>
      </section>
    `;
  }

  function getStatIcon(index) {
    const icons = ['fas fa-calendar-check', 'fas fa-project-diagram', 'fas fa-map-marked-alt', 'fas fa-landmark'];
    return icons[index] || 'fas fa-star';
  }

  function afterRender() {
    Utils.initScrollReveal();
    Utils.initCounterObserver();
  }

  return { render, afterRender };
})();
