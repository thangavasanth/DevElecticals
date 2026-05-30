# DEV ELECTRICALS — Corporate Website

Modern, premium, bilingual (English/Tamil) corporate website for **DEV ELECTRICALS**, an electrical infrastructure and government contracting company based in Chennai, Tamil Nadu, India.

## Features

- **Bilingual** — English & Tamil with instant language switching (persisted in localStorage)
- **JSON-driven content** — All text, projects, services, testimonials, gallery data in `data/*.json`
- **Responsive** — Mobile-first design, tested at 320px, 768px, 1024px+
- **SEO** — Meta tags, JSON-LD structured data, sitemap.xml, robots.txt
- **Google Maps** — Interactive maps on Contact page and per-project detail pages
- **Project Gallery** — Filterable by category with lightbox viewer
- **Project Tracking** — Progress bars for ongoing projects, detailed project pages
- **Animated Stats** — Counter animations with IntersectionObserver
- **Scroll Animations** — Fade-in reveal effects
- **Floating Buttons** — WhatsApp + Call floating action buttons
- **Premium UI** — Dark blue/electric blue/gold theme, corporate design

## Quick Start

No build step required. Serve the files with any static file server:

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8080
```

Then open `http://localhost:8080` in your browser.

## File Structure

```
index.html              ← SPA shell
css/
  style.css             ← main theme & layout
  animations.css        ← scroll animations, keyframes
  responsive.css        ← mobile breakpoints
js/
  app.js                ← router & initialization
  i18n.js               ← language switching
  components.js         ← header, footer, nav
  utils.js              ← counters, lightbox, helpers
  pages/                ← page modules (home, about, services, etc.)
data/
  content.json          ← bilingual static content
  projects.json         ← project entries
  services.json         ← service listings
  testimonials.json     ← client testimonials
  gallery.json          ← gallery items
assets/images/          ← logo, project photos
sitemap.xml
robots.txt
```

## Updating Content

All content lives in JSON files under `data/`. Edit these files to update text, add projects, etc.

### Adding a Project

Add a new entry to `data/projects.json` with EN/Tamil translations:

```json
{
  "id": 4,
  "name": { "en": "Project Name", "ta": "திட்டத்தின் பெயர்" },
  "client": { ... },
  "status": "ongoing",
  "completion": 30,
  ...
}
```

### Updating Contact Info

Edit `data/content.json` → `company` section with phone numbers, email, and map coordinates.

## Deployment

Deploy to any static hosting:
- **GitHub Pages** — push to `gh-pages` branch
- **Vercel / Netlify** — connect the repo, no build command needed
- **S3 + CloudFront** — upload all files

## License

Proprietary — DEV ELECTRICALS
