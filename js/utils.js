/* ===== Utility Functions ===== */
const Utils = (() => {

  /* Animated counter */
  function animateCounter(el, target, suffix = '', display = null) {
    if (display) {
      el.textContent = display;
      return;
    }
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + suffix;
    }, 25);
  }

  /* Scroll reveal using IntersectionObserver */
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      observer.observe(el);
    });
  }

  /* Counter observer */
  function initCounterObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          const display = el.dataset.display || null;
          animateCounter(el, target, suffix, display);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(el => observer.observe(el));
  }

  /* Progress bar animation */
  function initProgressBars() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = fill.dataset.width + '%';
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.progress-fill').forEach(el => {
      el.style.width = '0%';
      observer.observe(el);
    });
  }

  /* Lightbox */
  let lightboxItems = [];
  let lightboxIndex = 0;

  function openLightbox(items, index) {
    lightboxItems = items;
    lightboxIndex = index;
    showLightboxItem();
    document.getElementById('lightbox').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
    document.body.style.overflow = '';
    const video = document.getElementById('lightbox-video');
    video.pause();
    video.style.display = 'none';
  }

  function showLightboxItem() {
    const item = lightboxItems[lightboxIndex];
    const img = document.getElementById('lightbox-img');
    const video = document.getElementById('lightbox-video');
    const caption = document.querySelector('.lightbox-caption');

    if (item.type === 'video') {
      img.style.display = 'none';
      video.style.display = 'block';
      video.src = item.src;
    } else {
      video.style.display = 'none';
      video.pause();
      img.style.display = 'block';
      img.src = item.src;
      img.alt = item.title || '';
    }
    caption.textContent = item.title || '';
  }

  function lightboxPrev() {
    lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
    showLightboxItem();
  }

  function lightboxNext() {
    lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
    showLightboxItem();
  }

  function initLightbox() {
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', lightboxPrev);
    document.querySelector('.lightbox-next').addEventListener('click', lightboxNext);
    document.getElementById('lightbox').addEventListener('click', (e) => {
      if (e.target === document.getElementById('lightbox')) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (document.getElementById('lightbox').classList.contains('hidden')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    });
  }

  /* Format date */
  function formatDate(dateStr, lang) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const opts = { year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', opts);
  }

  /* Get service icon class */
  function getServiceIcon(iconName) {
    const icons = {
      'streetlight': 'fas fa-lightbulb',
      'bolt': 'fas fa-bolt',
      'cable': 'fas fa-plug',
      'landmark': 'fas fa-landmark',
      'phone': 'fas fa-phone-alt',
      'network': 'fas fa-project-diagram',
      'wrench': 'fas fa-wrench',
      'cpu': 'fas fa-microchip'
    };
    return icons[iconName] || 'fas fa-cog';
  }

  /* Get why-choose icon */
  function getWhyIcon(iconName) {
    const icons = {
      'award': 'fas fa-award',
      'landmark': 'fas fa-landmark',
      'shield-check': 'fas fa-shield-alt',
      'clock': 'fas fa-clock',
      'hard-hat': 'fas fa-hard-hat',
      'users': 'fas fa-users'
    };
    return icons[iconName] || 'fas fa-star';
  }

  /* Get value icon */
  function getValueIcon(iconName) {
    const icons = {
      'handshake': 'fas fa-handshake',
      'gem': 'fas fa-gem',
      'shield': 'fas fa-shield-alt',
      'target': 'fas fa-bullseye',
      'lightbulb': 'fas fa-lightbulb'
    };
    return icons[iconName] || 'fas fa-star';
  }

  /* Generate placeholder SVG */
  function placeholderSvg(text, w, h) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect fill="#e8ecf1" width="${w}" height="${h}"/>
      <text fill="#8896a7" font-family="Inter,sans-serif" font-size="14" text-anchor="middle" dominant-baseline="central" x="${w/2}" y="${h/2}">${text}</text>
    </svg>`;
    return 'data:image/svg+xml;base64,' + btoa(svg);
  }

  return {
    animateCounter, initScrollReveal, initCounterObserver, initProgressBars,
    openLightbox, closeLightbox, initLightbox,
    formatDate, getServiceIcon, getWhyIcon, getValueIcon, placeholderSvg
  };
})();
