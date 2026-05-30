/* ===== Testimonials Page ===== */
const TestimonialsPage = (() => {
  let testimonialsData = null;

  async function loadData() {
    if (testimonialsData) return testimonialsData;
    const res = await fetch('data/testimonials.json');
    testimonialsData = await res.json();
    return testimonialsData;
  }

  async function render() {
    const content = await I18n.loadContent();
    const testimonials = await loadData();
    const lang = I18n.getLang();
    const t = I18n.t;

    return `
      <section class="page-hero">
        <div class="container">
          <h1>${t(content.pages.testimonials)}</h1>
          <div class="accent-line"></div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <div class="section-header reveal">
            <p>${lang === 'ta' ? 'எங்கள் வாடிக்கையாளர்கள் எங்களைப் பற்றி என்ன சொல்கிறார்கள்' : 'What our clients say about us'}</p>
          </div>
          <div class="testimonials-grid">
            ${testimonials.map((test, i) => `
              <div class="testimonial-card reveal stagger-${(i % 3) + 1}">
                <i class="fas fa-quote-right testimonial-quote"></i>
                <p class="testimonial-text">"${t(test.feedback)}"</p>
                <div class="testimonial-author">
                  <div class="testimonial-avatar">${t(test.name).charAt(0)}</div>
                  <div class="testimonial-info">
                    <h4>${t(test.name)}</h4>
                    <p>${t(test.designation)}, ${t(test.department)}</p>
                  </div>
                </div>
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
