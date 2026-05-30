/* ===== Gallery Page ===== */
const GalleryPage = (() => {
  let galleryData = null;

  async function loadData() {
    if (galleryData) return galleryData;
    const res = await fetch('data/gallery.json');
    galleryData = await res.json();
    return galleryData;
  }

  async function render() {
    const content = await I18n.loadContent();
    const gallery = await loadData();
    const lang = I18n.getLang();
    const t = I18n.t;

    const categories = [
      { id: 'all', label: { en: 'All', ta: 'அனைத்தும்' } },
      { id: 'street-lights', label: { en: 'Street Lights', ta: 'தெரு விளக்குகள்' } },
      { id: 'cable-works', label: { en: 'Cable Works', ta: 'கேபிள் பணிகள்' } },
      { id: 'infrastructure', label: { en: 'Infrastructure', ta: 'கட்டமைப்பு' } },
      { id: 'government', label: { en: 'Government Projects', ta: 'அரசு திட்டங்கள்' } },
      { id: 'maintenance', label: { en: 'Maintenance', ta: 'பராமரிப்பு' } }
    ];

    return `
      <section class="page-hero">
        <div class="container">
          <h1>${t(content.pages.gallery)}</h1>
          <div class="accent-line"></div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <div class="gallery-filters">
            ${categories.map(cat => `
              <button class="filter-btn ${cat.id === 'all' ? 'active' : ''}" data-filter="${cat.id}">${t(cat.label)}</button>
            `).join('')}
          </div>
          <div class="gallery-grid" id="gallery-grid">
            ${renderGalleryItems(gallery, t, lang)}
          </div>
        </div>
      </section>
    `;
  }

  function renderGalleryItems(items, t, lang) {
    if (items.length === 0) {
      return `<div class="empty-state" style="grid-column: 1/-1;"><i class="fas fa-images"></i><p>${lang === 'ta' ? 'படங்கள் இல்லை' : 'No gallery items yet'}</p></div>`;
    }
    return items.map((item, i) => {
      const title = t(item.title);
      return `
        <div class="gallery-item reveal stagger-${(i % 3) + 1}" data-category="${item.category}" data-index="${i}">
          <div class="gallery-placeholder"><i class="fas fa-${item.type === 'video' ? 'video' : 'image'}"></i></div>
          <div class="gallery-overlay"><p>${title}</p></div>
        </div>
      `;
    }).join('');
  }

  function afterRender() {
    Utils.initScrollReveal();

    // Category filter
    document.querySelectorAll('.gallery-filters .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gallery-filters .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item => {
          item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
        });
      });
    });

    // Lightbox click
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.index);
        if (galleryData && galleryData[idx]) {
          const items = galleryData.map(g => ({
            type: g.type || 'photo',
            src: g.src,
            title: I18n.t(g.title)
          }));
          Utils.openLightbox(items, idx);
        }
      });
    });
  }

  return { render, afterRender };
})();
