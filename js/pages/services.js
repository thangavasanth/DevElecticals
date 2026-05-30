/* ===== Services Page ===== */
const ServicesPage = (() => {
  let servicesData = null;

  async function loadData() {
    if (servicesData) return servicesData;
    const res = await fetch('data/services.json');
    servicesData = await res.json();
    return servicesData;
  }

  async function render() {
    const content = await I18n.loadContent();
    const services = await loadData();
    const lang = I18n.getLang();
    const t = I18n.t;

    return `
      <section class="page-hero">
        <div class="container">
          <h1>${t(content.pages.services)}</h1>
          <div class="accent-line"></div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <div class="section-header reveal">
            <p>${lang === 'ta' ? 'தமிழ்நாடு முழுவதும் தரமான மின்கட்டமைப்பு சேவைகள்' : 'Quality electrical infrastructure services across Tamil Nadu'}</p>
          </div>
          <div class="services-grid">
            ${services.map((svc, i) => `
              <div class="service-card reveal stagger-${(i % 4) + 1} glow-hover">
                <div class="service-icon"><i class="${Utils.getServiceIcon(svc.icon)}"></i></div>
                <h3>${t(svc.title)}</h3>
                <p>${t(svc.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="page-section" style="background: var(--off-white); text-align: center;">
        <div class="container reveal">
          <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--dark-blue); margin-bottom: 12px;">
            ${lang === 'ta' ? 'சேவை வேண்டுமா?' : 'Need Our Services?'}
          </h2>
          <p style="color: var(--text-secondary); margin-bottom: 24px;">
            ${lang === 'ta' ? 'எங்களை தொடர்புகொண்டு உங்கள் தேவைகளை பகிருங்கள்' : 'Contact us to discuss your project requirements'}
          </p>
          <a href="#/contact" class="btn btn-primary">${t(content.buttons.contactUs)}</a>
        </div>
      </section>
    `;
  }

  function afterRender() {
    Utils.initScrollReveal();
  }

  return { render, afterRender };
})();
