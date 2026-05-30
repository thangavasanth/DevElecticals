/* ===== App Router & Init ===== */
const Router = (() => {
  const app = document.getElementById('app');
  let currentRoute = '';

  const routes = {
    '/': { page: HomePage, title: 'Home' },
    '/about': { page: AboutPage, title: 'About Us' },
    '/services': { page: ServicesPage, title: 'Services' },
    '/projects': { page: ProjectsPage, title: 'Projects' },
    '/gallery': { page: GalleryPage, title: 'Gallery' },
    '/testimonials': { page: TestimonialsPage, title: 'Testimonials' },
    '/contact': { page: ContactPage, title: 'Contact Us' }
  };

  async function navigate(hash) {
    const path = hash.replace('#', '') || '/';

    // Project detail route
    const projectMatch = path.match(/^\/project\/(\d+)$/);

    let page, param;
    if (projectMatch) {
      page = ProjectDetailPage;
      param = projectMatch[1];
    } else {
      const route = routes[path];
      if (!route) {
        page = routes['/'].page;
      } else {
        page = route.page;
      }
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Render
    const html = param ? await page.render(param) : await page.render();
    app.innerHTML = html;
    app.style.animation = 'none';
    app.offsetHeight; // trigger reflow
    app.style.animation = 'fadeInUp 0.4s ease';

    // After render hooks
    if (page.afterRender) page.afterRender();

    // Update nav
    Components.updateActiveNav('#' + path);

    // Update i18n static elements
    I18n.updateStaticElements();

    currentRoute = path;
  }

  function reload() {
    navigate(window.location.hash || '#/');
  }

  async function init() {
    // Load content first
    await I18n.loadContent();
    I18n.init();
    Components.initHeader();
    Utils.initLightbox();

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      navigate(window.location.hash);
    });

    // Initial route
    await navigate(window.location.hash || '#/');

    // Update static elements
    I18n.updateStaticElements();

    // Hide loading screen
    setTimeout(() => {
      const loader = document.getElementById('loading-screen');
      if (loader) loader.classList.add('hidden');
      setTimeout(() => { if (loader) loader.remove(); }, 500);
    }, 1200);
  }

  return { init, navigate, reload };
})();

// Start
document.addEventListener('DOMContentLoaded', Router.init);
