/* ===== Internationalization (i18n) Module ===== */
const I18n = (() => {
  let currentLang = localStorage.getItem('develectricals-lang') || 'en';
  let contentData = null;

  function getLang() { return currentLang; }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('develectricals-lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'ta' ? 'ta' : 'en');
    updateLangButton();
    updateStaticElements();
    if (typeof Router !== 'undefined' && Router.reload) {
      Router.reload();
    }
  }

  function toggle() {
    setLang(currentLang === 'en' ? 'ta' : 'en');
  }

  function updateLangButton() {
    const btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.querySelector('.lang-label').textContent = currentLang === 'en' ? 'தமிழ்' : 'English';
    }
  }

  function t(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[currentLang] || obj['en'] || '';
  }

  function getContent() { return contentData; }

  async function loadContent() {
    if (contentData) return contentData;
    const res = await fetch('data/content.json');
    contentData = await res.json();
    return contentData;
  }

  function updateStaticElements() {
    if (!contentData) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const keys = key.split('.');
      let val = contentData;
      for (const k of keys) {
        if (val) val = val[k];
      }
      if (val) el.textContent = t(val);
    });
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const key = el.getAttribute('data-i18n-key');
      if (key === 'tagline') el.textContent = t(contentData.tagline);
      if (key === 'location') el.textContent = t(contentData.company.location);
    });
    // Update SEO
    const title = t(contentData.seo.title);
    const desc = t(contentData.seo.description);
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
  }

  function init() {
    document.documentElement.setAttribute('data-lang', currentLang);
    document.documentElement.setAttribute('lang', currentLang === 'ta' ? 'ta' : 'en');
    updateLangButton();
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.addEventListener('click', toggle);
  }

  return { getLang, setLang, toggle, t, loadContent, getContent, init, updateStaticElements };
})();
