/* ===== Project Detail Page ===== */
const ProjectDetailPage = (() => {

  async function render(projectId) {
    const content = await I18n.loadContent();
    const projects = await ProjectsPage.loadData();
    const lang = I18n.getLang();
    const t = I18n.t;

    const project = projects.find(p => p.id === parseInt(projectId));
    if (!project) {
      return `<section class="page-hero"><div class="container"><h1>${lang === 'ta' ? 'திட்டம் கிடைக்கவில்லை' : 'Project Not Found'}</h1></div></section>`;
    }

    const statusLabel = project.status === 'completed'
      ? (lang === 'ta' ? 'நிறைவு' : 'Completed')
      : (lang === 'ta' ? 'நடப்பு' : 'Ongoing');

    return `
      <section class="project-detail-hero">
        <div class="container">
          <span class="project-status ${project.status}" style="margin-bottom: 12px; display: inline-block;">${statusLabel}</span>
          <h1>${t(project.name)}</h1>
          <div class="project-detail-meta">
            <span><i class="fas fa-building"></i> ${t(project.client)}</span>
            <span><i class="fas fa-landmark"></i> ${t(project.department)}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${t(project.location)}</span>
          </div>
        </div>
      </section>

      <section class="page-section">
        <div class="container">
          <div class="detail-grid">
            <div class="detail-main">
              <!-- Overview -->
              <h2><i class="fas fa-info-circle" style="color: var(--electric-blue); margin-right: 8px;"></i>${lang === 'ta' ? 'மேலோட்டம்' : 'Overview'}</h2>
              <p>${t(project.description)}</p>

              <!-- Scope of Work -->
              <h2><i class="fas fa-tasks" style="color: var(--electric-blue); margin-right: 8px;"></i>${lang === 'ta' ? 'பணி நோக்கம்' : 'Scope of Work'}</h2>
              <ul class="scope-list">
                ${t(project.scope).map(item => `<li><i class="fas fa-check-circle"></i> ${item}</li>`).join('')}
              </ul>

              <!-- Progress -->
              <h2><i class="fas fa-chart-line" style="color: var(--electric-blue); margin-right: 8px;"></i>${lang === 'ta' ? 'முன்னேற்றம்' : 'Progress'}</h2>
              <div class="project-progress" style="margin-bottom: 32px;">
                <div class="progress-bar" style="height: 12px;">
                  <div class="progress-fill" data-width="${project.completion}" style="height: 100%;"></div>
                </div>
                <div class="progress-text" style="font-size: 0.9rem; margin-top: 6px;">${project.completion}% ${lang === 'ta' ? 'நிறைவு' : 'Complete'}</div>
              </div>

              <!-- Gallery placeholder -->
              ${project.photos && project.photos.length > 0 ? `
                <h2><i class="fas fa-images" style="color: var(--electric-blue); margin-right: 8px;"></i>${lang === 'ta' ? 'புகைப்படங்கள்' : 'Photos'}</h2>
                <div class="gallery-grid" style="margin-bottom: 32px;">
                  ${project.photos.map((photo, i) => `
                    <div class="gallery-item" onclick="Utils.openLightbox(${JSON.stringify(project.photos.map(p => ({type:'photo', src: p, title: t(project.name)})))}, ${i})">
                      <img src="${photo}" alt="${t(project.name)}">
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              <!-- Map -->
              ${project.mapCoords ? `
                <h2><i class="fas fa-map-marked-alt" style="color: var(--electric-blue); margin-right: 8px;"></i>${lang === 'ta' ? 'இடம்' : 'Location'}</h2>
                <div class="contact-map" style="margin-bottom: 24px;">
                  <iframe
                    src="https://maps.google.com/maps?q=${project.mapCoords.lat},${project.mapCoords.lng}&z=13&output=embed"
                    allowfullscreen loading="lazy"
                    title="Project Location">
                  </iframe>
                </div>
                <a href="https://maps.google.com/?q=${project.mapCoords.lat},${project.mapCoords.lng}" target="_blank" class="btn btn-primary btn-sm" style="margin-bottom: 24px;">
                  <i class="fas fa-directions"></i> ${t(content.buttons.navigate)}
                </a>
              ` : ''}

              <!-- Testimonial -->
              ${project.testimonial ? `
                <h2><i class="fas fa-quote-left" style="color: var(--electric-blue); margin-right: 8px;"></i>${lang === 'ta' ? 'சான்றிதழ்' : 'Testimonial'}</h2>
                <div class="testimonial-card" style="margin-top: 12px;">
                  <i class="fas fa-quote-right testimonial-quote"></i>
                  <p class="testimonial-text">"${t(project.testimonial.feedback)}"</p>
                  <div class="testimonial-author">
                    <div class="testimonial-avatar">${t(project.testimonial.name).charAt(0)}</div>
                    <div class="testimonial-info">
                      <h4>${t(project.testimonial.name)}</h4>
                      <p>${t(project.testimonial.designation)}, ${t(project.testimonial.department)}</p>
                    </div>
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Sidebar -->
            <div class="detail-sidebar">
              <div class="sidebar-card">
                <h3>${lang === 'ta' ? 'திட்ட தகவல்' : 'Project Info'}</h3>
                <div class="sidebar-info">
                  <div class="sidebar-info-item">
                    <span class="label">${lang === 'ta' ? 'வாடிக்கையாளர்' : 'Client'}</span>
                    <span class="value">${t(project.client)}</span>
                  </div>
                  <div class="sidebar-info-item">
                    <span class="label">${lang === 'ta' ? 'துறை' : 'Department'}</span>
                    <span class="value">${t(project.department)}</span>
                  </div>
                  <div class="sidebar-info-item">
                    <span class="label">${lang === 'ta' ? 'மதிப்பு' : 'Value'}</span>
                    <span class="value">${project.value}</span>
                  </div>
                  <div class="sidebar-info-item">
                    <span class="label">${lang === 'ta' ? 'தொடக்கம்' : 'Start Date'}</span>
                    <span class="value">${Utils.formatDate(project.startDate, lang)}</span>
                  </div>
                  <div class="sidebar-info-item">
                    <span class="label">${lang === 'ta' ? 'முடிவு' : 'End Date'}</span>
                    <span class="value">${Utils.formatDate(project.endDate, lang)}</span>
                  </div>
                  <div class="sidebar-info-item">
                    <span class="label">${lang === 'ta' ? 'நிலை' : 'Status'}</span>
                    <span class="value"><span class="project-status ${project.status}">${statusLabel}</span></span>
                  </div>
                </div>
              </div>

              <a href="#/projects" class="btn btn-outline" style="width: 100%; justify-content: center; border-color: var(--electric-blue); color: var(--electric-blue);">
                <i class="fas fa-arrow-left"></i> ${lang === 'ta' ? 'திட்டங்களுக்கு திரும்பு' : 'Back to Projects'}
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function afterRender() {
    Utils.initProgressBars();
    Utils.initScrollReveal();
  }

  return { render, afterRender };
})();
