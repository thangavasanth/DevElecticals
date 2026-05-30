/* ===== About Page ===== */
const AboutPage = (() => {

  async function render() {
    const content = await I18n.loadContent();
    const lang = I18n.getLang();
    const t = I18n.t;
    const about = content.about;

    return `
      <section class="page-hero">
        <div class="container">
          <h1>${t(content.pages.about)}</h1>
          <div class="accent-line"></div>
        </div>
      </section>

      <!-- Company Profile -->
      <section class="page-section">
        <div class="container">
          <div class="about-profile">
            <div class="about-profile-text reveal-left">
              <h2>${lang === 'ta' ? 'நிறுவன விவரம்' : 'Company Profile'}</h2>
              <p>${t(about.profile)}</p>
              <p>${t(about.experience)}</p>
              <p style="margin-top: 8px;">
                <strong>GST:</strong> ${content.company.gst}<br>
                <strong>${lang === 'ta' ? 'இடம்' : 'Location'}:</strong> ${t(content.company.location)}
              </p>
            </div>
            <div class="about-profile-img reveal-right">
              <img src="assets/images/logo.png" alt="DEV ELECTRICALS">
            </div>
          </div>
        </div>
      </section>

      <!-- Vision & Mission -->
      <section class="page-section" style="background: var(--off-white);">
        <div class="container">
          <div class="vision-mission">
            <div class="vm-card vision reveal stagger-1">
              <h3><i class="fas fa-eye"></i> ${lang === 'ta' ? 'நோக்கம்' : 'Vision'}</h3>
              <p>${t(about.vision)}</p>
            </div>
            <div class="vm-card mission reveal stagger-2">
              <h3><i class="fas fa-bullseye"></i> ${lang === 'ta' ? 'பணி' : 'Mission'}</h3>
              <p>${t(about.mission)}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Core Values -->
      <section class="page-section">
        <div class="container">
          <div class="section-header reveal">
            <h2>${lang === 'ta' ? 'அடிப்படை மதிப்புகள்' : 'Core Values'}</h2>
            <div class="accent-line"></div>
          </div>
          <div class="values-grid">
            ${about.coreValues.map((val, i) => `
              <div class="value-card reveal stagger-${(i % 5) + 1}">
                <div class="value-icon"><i class="${Utils.getValueIcon(val.icon)}"></i></div>
                <h4>${t(val.title)}</h4>
                <p>${t(val.desc)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function afterRender() {
    Utils.initScrollReveal();
  }

  return { render, afterRender };
})();
