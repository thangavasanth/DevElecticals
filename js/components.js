/* ===== Shared Components ===== */
const Components = (() => {

  function initHeader() {
    const header = document.getElementById('header');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('main-nav');

    // Scroll effect
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
      const backToTop = document.getElementById('back-to-top');
      if (backToTop) {
        backToTop.classList.toggle('visible', window.scrollY > 400);
      }
    });

    // Mobile menu toggle
    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.toggle('active');
      nav.classList.toggle('open');
    });

    // Close mobile menu on link click
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileBtn.classList.remove('active');
        nav.classList.remove('open');
      });
    });

    // Back to top
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Footer year
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function updateActiveNav(hash) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active',
        href === hash || (hash === '' && href === '#/') || (hash === '#/' && href === '#/')
      );
    });
  }

  return { initHeader, updateActiveNav };
})();
