/* =================================================================
   main.js — renders data.js content into the DOM and wires up
   all interaction. No build step, no dependencies.
   ================================================================= */

/* ---------------------------- Icon set (inline SVG, currentColor) ---------------------------- */
const ICONS = {
  mountainMark: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 25L11 10L16.5 18.5L20 13L30 25H2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="24" cy="8" r="2" fill="currentColor"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.5"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 9.5L15 12L10.5 14.5V9.5Z" fill="currentColor"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 3v10.6a3.4 3.4 0 1 1-3.4-3.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M15 3c0 2.5 2 4.5 4.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4L20 20M20 4L4 20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 21v-7h2.5l.5-3H14V9c0-.9.3-1.5 1.7-1.5H17V4.8C16.7 4.8 15.7 4.7 14.6 4.7c-2.3 0-3.9 1.4-3.9 4V11H8v3h2.7v7H14Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="2.5" width="19" height="19" rx="3" stroke="currentColor" stroke-width="1.5"/><circle cx="7.7" cy="8" r="1.15" fill="currentColor"/><path d="M7.7 11v6.2M12 11v6.2M12 13.6c0-1.7 1.1-2.6 2.4-2.6 1.3 0 2.1.9 2.1 2.6v3.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  arrow: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  close: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
};

function socialIcon(name) { return ICONS[name] || ICONS.arrow; }

/* ---------------------------- Header / Nav ---------------------------- */
function renderNav() {
  document.querySelectorAll("[data-nav-links]").forEach((el) => {
    el.innerHTML = NAV_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("");
  });
  document.querySelectorAll("[data-brand-name]").forEach((el) => { el.textContent = SITE.name; });
  document.querySelectorAll("[data-brand-mark]").forEach((el) => { el.innerHTML = ICONS.mountainMark; });
}

function wireNavBehavior() {
  const nav = document.querySelector(".site-nav");
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = document.querySelector(".nav-toggle");
  const root = document.documentElement;
  toggle.addEventListener("click", () => {
    const isOpen = root.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  document.querySelectorAll(".mobile-menu a").forEach((a) => {
    a.addEventListener("click", () => root.classList.remove("nav-open"));
  });
}

/* ---------------------------- Hero ---------------------------- */
function renderHero() {
  document.querySelectorAll("[data-hero-name]").forEach((el) => { el.textContent = SITE.name; });
  document.querySelectorAll("[data-hero-tagline]").forEach((el) => { el.textContent = SITE.tagline; });
  document.querySelectorAll("[data-hero-role]").forEach((el) => { el.textContent = SITE.role; });
  const social = document.querySelector("[data-hero-social]");
  if (social) {
    social.innerHTML = SOCIAL_LINKS.slice(0, 4)
      .map((s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${SITE.name} on ${s.platform}">${socialIcon(s.icon)}</a>`)
      .join("");
  }
}

/* ---------------------------- About / Stats ---------------------------- */
function renderStats() {
  document.querySelectorAll("[data-stats]").forEach((el) => {
    el.innerHTML = STATS.map((s) => `
      <div class="stat">
        <div class="stat-num">${s.number}</div>
        <div class="stat-label">${s.label}</div>
      </div>`).join("");
  });
}

/* ---------------------------- Journeys ---------------------------- */
function renderJourneys() {
  const grid = document.querySelector("[data-journey-grid]");
  if (!grid) return;
  grid.innerHTML = JOURNEYS.map((j) => `
    <a class="journey-card reveal" href="#" data-slug="${j.slug}" aria-label="View the ${j.title} journey, ${j.region}, ${j.year}">
      <img src="${j.image}" alt="${j.title}, ${j.region}" loading="lazy" width="900" height="1200" />
      <div class="journey-meta">
        <div class="journey-region">${j.region}, ${j.year}</div>
        <div class="journey-title">${j.title}</div>
        <div class="journey-facts">
          <span>${j.duration}</span>
          <span>${j.difficulty}</span>
        </div>
      </div>
    </a>
  `).join("");
}

/* ---------------------------- Trail Log ---------------------------- */
function renderTrailFilters() {
  const row = document.querySelector("[data-trail-filters]");
  if (!row) return;
  row.innerHTML = TREK_CATEGORIES.map((c, i) => `<button class="filter-pill${i === 0 ? " active" : ""}" data-filter="${c}">${c}</button>`).join("");
  row.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-pill");
    if (!btn) return;
    row.querySelectorAll(".filter-pill").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderTrailGrid(btn.dataset.filter);
  });
}

function renderTrailGrid(filter = "All") {
  const grid = document.querySelector("[data-trail-grid]");
  if (!grid) return;
  const items = filter === "All" ? TRAIL_LOG : TRAIL_LOG.filter((t) => t.category === filter);
  grid.innerHTML = items.map((t) => `
    <article class="trail-row reveal in-view">
      <div class="trail-thumb"><img src="${t.image}" alt="${t.title}, ${t.location}" loading="lazy" width="280" height="210" /></div>
      <div class="trail-body">
        <div class="trail-toprow">
          <h3 class="trail-title">${t.title}</h3>
          <span class="trail-tag">${t.category}</span>
        </div>
        <div class="trail-meta">${t.location}, ${t.date}</div>
        <p class="trail-excerpt">${t.excerpt}</p>
      </div>
    </article>
  `).join("");
}

/* ---------------------------- Films ---------------------------- */
function renderVideos() {
  const featured = document.querySelector("[data-featured-video]");
  if (featured) {
    featured.innerHTML = `
      <img src="${FEATURED_VIDEO.thumbnail}" alt="${FEATURED_VIDEO.title}" loading="lazy" />
      <div class="featured-video-info">
        <div>
          <div class="trail-tag" style="color:var(--ember)">${FEATURED_VIDEO.location}</div>
          <h3 class="featured-video-title">${FEATURED_VIDEO.title}</h3>
          <div class="featured-video-meta">${FEATURED_VIDEO.description}</div>
        </div>
        <button class="play-btn" type="button" aria-label="Play: ${FEATURED_VIDEO.title}"></button>
      </div>`;
    featured.addEventListener("click", () => openVideoModal(FEATURED_VIDEO.youtubeId, FEATURED_VIDEO.title));
    featured.tabIndex = 0;
    featured.setAttribute("role", "button");
    featured.addEventListener("keydown", (e) => { if (e.key === "Enter") openVideoModal(FEATURED_VIDEO.youtubeId, FEATURED_VIDEO.title); });
  }

  const grid = document.querySelector("[data-video-grid]");
  if (grid) {
    grid.innerHTML = VIDEOS.map((v, i) => `
      <button class="video-card reveal" type="button" data-index="${i}" aria-label="Play: ${v.title}">
        <img src="${v.thumbnail}" alt="${v.title}" loading="lazy" width="480" height="300" />
        <span class="video-card-duration">${v.duration}</span>
        <span class="play-btn" aria-hidden="true"></span>
        <span class="video-card-info">
          <span class="video-card-title" style="display:block">${v.title}</span>
          <span class="video-card-meta">${v.location}</span>
        </span>
      </button>
    `).join("");
    grid.querySelectorAll(".video-card").forEach((card) => {
      card.addEventListener("click", () => {
        const v = VIDEOS[Number(card.dataset.index)];
        openVideoModal(v.youtubeId, v.title);
      });
    });
  }
}

/* ---------------------------- Photography ---------------------------- */
function renderPhotoFilters() {
  const row = document.querySelector("[data-photo-filters]");
  if (!row) return;
  row.innerHTML = PHOTO_CATEGORIES.map((c, i) => `<button class="filter-pill${i === 0 ? " active" : ""}" data-filter="${c}" style="border-color:rgba(244,241,233,0.28); color:var(--stone)">${c}</button>`).join("");
  row.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-pill");
    if (!btn) return;
    row.querySelectorAll(".filter-pill").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderPhotoGrid(btn.dataset.filter);
  });
}

function renderPhotoGrid(filter = "All") {
  const grid = document.querySelector("[data-photo-grid]");
  if (!grid) return;
  const items = filter === "All" ? PHOTOS : PHOTOS.filter((p) => p.category === filter);
  grid.innerHTML = items.map((p, i) => `
    <button class="masonry-item" type="button" data-index="${i}" aria-label="Open photo: ${p.caption}">
      <img src="${p.image}" alt="${p.caption}" loading="lazy" />
      <span class="masonry-cap">${p.caption}</span>
    </button>
  `).join("");
  grid.querySelectorAll(".masonry-item").forEach((item, i) => {
    item.addEventListener("click", () => openPhotoLightbox(items[i]));
  });
}

/* ---------------------------- Featured Story ---------------------------- */
function renderStory() {
  const root = document.querySelector("[data-story]");
  if (!root) return;
  document.querySelectorAll("[data-story-title]").forEach((el) => { el.textContent = FEATURED_STORY.title; });
  document.querySelectorAll("[data-story-subtitle]").forEach((el) => { el.textContent = FEATURED_STORY.subtitle; });
  document.querySelectorAll("[data-story-location]").forEach((el) => { el.textContent = FEATURED_STORY.location; });
  document.querySelectorAll("[data-story-date]").forEach((el) => { el.textContent = FEATURED_STORY.date; });
  document.querySelectorAll("[data-story-duration]").forEach((el) => { el.textContent = FEATURED_STORY.duration; });
  document.querySelectorAll("[data-story-hero]").forEach((el) => { el.src = FEATURED_STORY.heroImage; el.alt = FEATURED_STORY.title; });
  document.querySelectorAll("[data-story-quote]").forEach((el) => { el.textContent = FEATURED_STORY.quote; });
  const textEl = document.querySelector("[data-story-text]");
  if (textEl) textEl.innerHTML = FEATURED_STORY.body.map((p) => `<p>${p}</p>`).join("");
  const sideEl = document.querySelector("[data-story-side]");
  if (sideEl) sideEl.innerHTML = FEATURED_STORY.supportingImages.map((src) => `<img src="${src}" alt="${FEATURED_STORY.title} — supporting image" loading="lazy" />`).join("");
}

/* ---------------------------- Gear ---------------------------- */
function renderGear() {
  const grid = document.querySelector("[data-gear-grid]");
  if (!grid) return;
  grid.innerHTML = GEAR.map((g) => `
    <div class="gear-row reveal in-view">
      <div class="gear-cat">${g.category}</div>
      <div class="gear-name">${g.name}</div>
      <div class="gear-note">${g.note}</div>
    </div>
  `).join("");
}

/* ---------------------------- Social ---------------------------- */
function renderSocial() {
  const list = document.querySelector("[data-social-list]");
  if (list) {
    list.innerHTML = SOCIAL_LINKS.map((s) => `
      <a class="social-row" href="${s.url}" target="_blank" rel="noopener">
        <span class="social-row-left">
          <span class="social-icon">${socialIcon(s.icon)}</span>
          <span>
            <span class="social-platform" style="display:block">${s.platform}</span>
            <span class="social-handle">${s.handle}</span>
          </span>
        </span>
        <span class="social-arrow">${ICONS.arrow}</span>
      </a>
    `).join("");
  }
  const strip = document.querySelector("[data-insta-strip]");
  if (strip) {
    strip.innerHTML = INSTAGRAM_STRIP.map((src) => `
      <a href="${SOCIAL_LINKS[0].url}" target="_blank" rel="noopener" aria-label="View on Instagram">
        <img src="${src}" alt="Recent moment from the trail" loading="lazy" width="400" height="400" />
      </a>
    `).join("");
  }
}

/* ---------------------------- Contact ---------------------------- */
function renderContact() {
  document.querySelectorAll("[data-contact-email]").forEach((el) => { el.textContent = SITE.email; el.href = `mailto:${SITE.email}`; });
  document.querySelectorAll("[data-contact-base]").forEach((el) => { el.textContent = SITE.base; });
}

/* ---------------------------- Footer ---------------------------- */
function renderFooter() {
  document.querySelectorAll("[data-footer-name]").forEach((el) => { el.textContent = SITE.name; });
  document.querySelectorAll("[data-footer-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll("[data-footer-copyright-name]").forEach((el) => { el.textContent = SITE.copyrightName; });
  const nav = document.querySelector("[data-footer-nav]");
  if (nav) nav.innerHTML = NAV_LINKS.map((l) => `<li><a class="text-link" href="${l.href}">${l.label}</a></li>`).join("");
  const social = document.querySelector("[data-footer-social]");
  if (social) social.innerHTML = SOCIAL_LINKS.map((s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.platform}">${socialIcon(s.icon)}</a>`).join("");
}

/* ---------------------------- Video Modal (lightbox) ---------------------------- */
function openVideoModal(youtubeId, title) {
  const lb = document.querySelector("#video-lightbox");
  const wrap = lb.querySelector(".lightbox-frame-wrap");
  const isPlaceholder = !youtubeId || youtubeId.startsWith("REPLACE");
  wrap.innerHTML = isPlaceholder
    ? `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--ink-soft);color:var(--stone);text-align:center;padding:2rem;">Add a YouTube video ID in data.js to play "${title}" here.</div>`
    : `<iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0" title="${title}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  lb.querySelector(".lightbox-caption").textContent = title;
  lb.classList.add("open");
  lb.querySelector(".lightbox-close").focus();
}

function closeVideoModal() {
  const lb = document.querySelector("#video-lightbox");
  lb.classList.remove("open");
  lb.querySelector(".lightbox-frame-wrap").innerHTML = "";
}

/* ---------------------------- Photo Lightbox ---------------------------- */
function openPhotoLightbox(photo) {
  const lb = document.querySelector("#photo-lightbox");
  lb.querySelector(".lightbox-content img").src = photo.image.replace(/w=\d+/, "w=1800");
  lb.querySelector(".lightbox-content img").alt = photo.caption;
  lb.querySelector(".lightbox-caption").textContent = photo.caption;
  lb.classList.add("open");
  lb.querySelector(".lightbox-close").focus();
}

function closePhotoLightbox() {
  document.querySelector("#photo-lightbox").classList.remove("open");
}

function wireLightboxes() {
  document.querySelectorAll(".lightbox").forEach((lb) => {
    lb.querySelector(".lightbox-close").addEventListener("click", () => {
      lb.id === "video-lightbox" ? closeVideoModal() : closePhotoLightbox();
    });
    lb.addEventListener("click", (e) => {
      if (e.target === lb) lb.id === "video-lightbox" ? closeVideoModal() : closePhotoLightbox();
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeVideoModal(); closePhotoLightbox(); }
  });
}

/* ---------------------------- Scroll reveals ---------------------------- */
function wireReveals() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  els.forEach((el) => io.observe(el));
}

/* Re-observe dynamically inserted .reveal nodes (journey/video cards) */
function observeNewReveals() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => io.observe(el));
}

/* ---------------------------- Contact form (static — ready for Formspree/Netlify) ---------------------------- */
function wireForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    // Static site: no backend wired yet.
    // To go live, either:
    //  1) Set the form action to your Formspree endpoint and remove this handler, or
    //  2) Add data-netlify="true" to the <form> tag for Netlify Forms and remove this handler.
    e.preventDefault();
    const status = document.querySelector("#form-status");
    status.textContent = "This form isn't connected yet — wire it to Formspree or Netlify Forms to go live.";
    status.style.display = "block";
  });
}

/* ---------------------------- Init ---------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  wireNavBehavior();
  renderHero();
  renderStats();
  renderJourneys();
  renderTrailFilters();
  renderTrailGrid();
  renderVideos();
  renderPhotoFilters();
  renderPhotoGrid();
  renderStory();
  renderGear();
  renderSocial();
  renderContact();
  renderFooter();
  wireLightboxes();
  wireForm();

  wireReveals();
  requestAnimationFrame(observeNewReveals);
});
