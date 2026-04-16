// ── Hero Stats
function renderHeroStats() {
  const container = document.getElementById("heroStats");
  if (!container) return;

  STATS.forEach((stat, i) => {
    if (i > 0) {
      const divider = document.createElement("div");
      divider.className = "hero-stat-divider";
      container.appendChild(divider);
    }
    const el = document.createElement("div");
    el.innerHTML = `
      <div class="hero-stat-num">${stat.num}</div>
      <div class="hero-stat-label">${stat.label}</div>
    `;
    container.appendChild(el);
  });
}

// ── Services
function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;

  SERVICES.forEach((service) => {
    const card = document.createElement("div");
    card.className = "service-card fade-up";
    card.innerHTML = `
      <div class="service-icon"><i class="${service.icon}"></i></div>
      <div class="service-title">${service.title}</div>
      <div class="service-desc">${service.desc}</div>
      <div class="service-price">${service.price}</div>
    `;
    grid.appendChild(card);
  });
}

// ── Why Us Points
function renderWhyPoints() {
  const container = document.getElementById("whyPoints");
  if (!container) return;

  WHY_POINTS.forEach((point) => {
    const el = document.createElement("div");
    el.className = "why-point";
    el.innerHTML = `
      <div class="why-point-icon"><i class="${point.icon}"></i></div>
      <div>
        <div class="why-point-title">${point.title}</div>
        <div class="why-point-desc">${point.desc}</div>
      </div>
    `;
    container.appendChild(el);
  });
}

// ── Routes
function renderRoutes() {
  const grid = document.getElementById("routesGrid");
  if (!grid) return;

  ROUTES.forEach((route, i) => {
    const card = document.createElement("div");
    card.className = "route-card fade-up";
    card.setAttribute("data-num", String(i + 1).padStart(2, "0"));
    card.innerHTML = `
      <div class="route-from">${route.type}</div>
      <div class="route-name">${route.from}</div>
      <div class="route-arrow"><i class="fas fa-arrow-right"></i></div>
      <div class="route-to">${route.to}</div>
      <div class="route-fare">${route.fare}</div>
      <div class="route-fare-label">${route.fareLabel}</div>
    `;
    grid.appendChild(card);
  });
}

// ── Reviews
function renderReviews() {
  const grid = document.getElementById("reviewsGrid");
  if (!grid) return;

  REVIEWS.forEach((review) => {
    const card = document.createElement("div");
    card.className = "review-card fade-up";
    card.innerHTML = `
      <div class="review-quote">"</div>
      <div class="review-stars">★★★★★</div>
      <p class="review-text">${review.text}</p>
      <div class="review-author">
        <div class="review-avatar">${review.initial}</div>
        <div>
          <div class="review-name">${review.name}</div>
          <div class="review-area">${review.area}</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── Contact Details
function renderContactDetails() {
  const container = document.getElementById("contactDetails");
  if (!container) return;

  CONTACT_DETAILS.forEach((item) => {
    const el = document.createElement("div");
    el.className = "contact-detail-item";
    el.innerHTML = `<i class="${item.icon}"></i> ${item.text}`;
    container.appendChild(el);
  });
}

// ── Footer Links
function renderFooterLinks() {
  const linksEl = document.getElementById("footerLinks");
  if (linksEl) {
    FOOTER_NAV.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.label;
      linksEl.appendChild(a);
    });
  }

  const servicesEl = document.getElementById("footerServices");
  if (servicesEl) {
    FOOTER_SERVICES.forEach((name) => {
      const a = document.createElement("a");
      a.href = "#services";
      a.textContent = name;
      servicesEl.appendChild(a);
    });
  }

  const contactEl = document.getElementById("footerContact");
  if (contactEl) {
    FOOTER_CONTACT.forEach((item) => {
      const div = document.createElement("div");
      div.className = "footer-contact-item";
      div.innerHTML = `<i class="${item.icon}"></i> ${item.text}`;
      contactEl.appendChild(div);
    });
  }
}

// ── Run all renderers
renderHeroStats();
renderServices();
renderWhyPoints();
renderRoutes();
renderReviews();
renderContactDetails();
renderFooterLinks();
