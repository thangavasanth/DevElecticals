/* ===== Contact Page ===== */
const ContactPage = (() => {

  async function render() {
    const content = await I18n.loadContent();
    const lang = I18n.getLang();
    const t = I18n.t;
    const company = content.company;

    return `
      <section class="page-hero">
        <div class="container">
          <h1>${t(content.pages.contact)}</h1>
          <div class="accent-line"></div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <div class="contact-grid">
            <div class="contact-info-cards">
              <div class="contact-card">
                <div class="contact-card-icon"><i class="fas fa-building"></i></div>
                <div>
                  <h4>${company.name}</h4>
                  <p>${lang === 'ta' ? 'மின்கட்டமைப்பு ஒப்பந்ததாரர்' : 'Electrical Infrastructure Contractor'}</p>
                </div>
              </div>

              <div class="contact-card">
                <div class="contact-card-icon"><i class="fas fa-map-marker-alt"></i></div>
                <div>
                  <h4>${lang === 'ta' ? 'முகவரி' : 'Address'}</h4>
                  <p>${t(company.address)}</p>
                </div>
              </div>

              <div class="contact-card">
                <div class="contact-card-icon"><i class="fas fa-phone-alt"></i></div>
                <div>
                  <h4>${lang === 'ta' ? 'தொலைபேசி' : 'Phone'}</h4>
                  ${company.phone.map(p => `<p><a href="tel:${p.replace(/[^+\\d]/g, '')}">${p}</a></p>`).join('')}
                </div>
              </div>

              <div class="contact-card">
                <div class="contact-card-icon"><i class="fas fa-envelope"></i></div>
                <div>
                  <h4>${lang === 'ta' ? 'மின்னஞ்சல்' : 'Email'}</h4>
                  <p><a href="mailto:${company.email}">${company.email}</a></p>
                </div>
              </div>

              <div class="contact-card">
                <div class="contact-card-icon"><i class="fas fa-id-card"></i></div>
                <div>
                  <h4>GST ${lang === 'ta' ? 'எண்' : 'Number'}</h4>
                  <p>${company.gst}</p>
                </div>
              </div>

              <a href="${company.mapLink}" target="_blank" class="btn btn-primary" style="width: fit-content;">
                <i class="fas fa-directions"></i> ${t(content.buttons.navigate)}
              </a>
            </div>

            <div class="contact-map">
              <iframe
                src="https://maps.google.com/maps?q=${company.mapCoords.lat},${company.mapCoords.lng}&z=15&output=embed"
                allowfullscreen loading="lazy"
                title="DEV ELECTRICALS Location">
              </iframe>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function afterRender() {
    // No scroll reveal — all items visible immediately
  }

  return { render, afterRender };
})();
