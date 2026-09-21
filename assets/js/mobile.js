/* ════════════════════════════════════════════════════════════════════
   SELFISH TRAVELLER — MOBILE LAYER  (loads after data.js + site.js)
   On phones (≤ 760px wide, or a phone turned sideways) the header and hero stay exactly as on the
   big screen; everything below the hero on the homepage switches to the
   "Pocket" layout, and every page gets a bottom tab bar, a theme sheet
   and a compact footer. Desktop never runs any of this.
   ════════════════════════════════════════════════════════════════════ */
(() => {
"use strict";
const MQ = matchMedia("(max-width:760px), (hover:none) and (pointer:coarse) and (max-height:500px)");
const d = document, $ = (s, c = d) => c.querySelector(s), $$ = (s, c = d) => [...c.querySelectorAll(s)];
const S = window.ST; if (!S) return;
const esc = S.esc, PAGE = d.body.dataset.page || "home", HOME = PAGE === "home" ? "" : "index.html";
S.mobile = () => MQ.matches;
S.openThemes = () => M.open("themes");

// Crossing the breakpoint (e.g. rotating a tablet or resizing a window) re-lays the page cleanly.
MQ.addEventListener?.("change", () => location.reload());
if (!MQ.matches) return;

const M = {};

/* ── bottom sheets ── */
const scrim = d.createElement("div"); scrim.className = "scrim fx"; d.body.append(scrim);
let openSheet = null;
M.sheet = (html, id) => { const s = d.createElement("div"); s.className = "bsheet fx"; s.id = id; s.setAttribute("role", "dialog"); s.setAttribute("aria-modal", "true");
  s.innerHTML = `<div class="grab"></div>${html}`; d.body.append(s);
  let y0 = null;
  s.addEventListener("touchstart", e => { if (s.scrollTop <= 0) y0 = e.touches[0].clientY; }, { passive: true });
  s.addEventListener("touchmove", e => { if (y0 == null) return; const dy = e.touches[0].clientY - y0; if (dy > 0) s.style.transform = `translateY(${dy}px)`; }, { passive: true });
  s.addEventListener("touchend", e => { if (y0 == null) return; const dy = e.changedTouches[0].clientY - y0; s.style.transform = ""; y0 = null; if (dy > 90) M.close(); });
  return s; };
M.open = id => { const s = d.getElementById(id); if (!s) return; if (openSheet) openSheet.classList.remove("open"); else S.lock(true); openSheet = s; s.classList.add("open"); scrim.classList.add("open"); };
M.close = () => { if (!openSheet) return; openSheet.classList.remove("open"); scrim.classList.remove("open"); openSheet = null; S.lock(false); };
scrim.addEventListener("click", M.close);
addEventListener("keydown", e => { if (e.key === "Escape") M.close(); });
d.addEventListener("click", e => { const o = e.target.closest("[data-open]"); if (o) { e.preventDefault(); M.open(o.dataset.open); } if (e.target.closest("[data-close]")) M.close(); });

M.sheet(`<h3>Pick the weather</h3><p class="s">Recolours the site, swaps the photos and changes the walkers' weather.</p>
  <div class="tgrid">${THEMES.map(t => `<button class="tcard${t.key === "live" ? " wide" : ""}" data-theme-opt="${t.key}" aria-checked="false" style="--sw:${S.SWATCH[t.key]}">${S.icon(t.key, S.TICONS)}<span style="display:block"><b>${t.name}</b><br><span>${t.note}</span></span></button>`).join("")}</div>
  <div class="livebox"><i></i><span><span class="mono" style="font-size:10.5px;color:var(--fog-3)">Now in ${esc(SITE.weather.place)}</span><br><span data-live>Checking…</span></span></div>`, "themes");
d.addEventListener("click", e => { if (e.target.closest(".tcard")) setTimeout(M.close, 250); });
S.applyTheme();

/* ── helpers ── */
M.pips = row => {
  const kids = [...row.children]; if (kids.length < 2) return;
  const p = d.createElement("div"); p.className = "pips"; p.setAttribute("aria-hidden", "true");
  p.innerHTML = kids.map(() => "<i></i>").join(""); row.after(p);
  const set = () => { const x = row.scrollLeft + 20; let i = 0; kids.forEach((k, j) => { if (k.offsetLeft - row.offsetLeft - 18 <= x) i = j; });
    if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 4) i = kids.length - 1; [...p.children].forEach((c, j) => c.classList.toggle("on", j === i)); };
  row.addEventListener("scroll", set, { passive: true }); set();
};
M.spy = links => {
  const map = links.map(a => { const h = a.getAttribute("href"), i = h.indexOf("#"); return [a, i > -1 && (i === 0 || HOME === "") ? d.getElementById(h.slice(i + 1)) : null]; }).filter(x => x[1]);
  if (!map.length) return;
  const upd = () => { let cur = map[0]; const y = innerHeight * .35; map.forEach(m => { if (m[1].getBoundingClientRect().top <= y) cur = m; }); map.forEach(m => m[0].classList.toggle("on", m === cur)); };
  addEventListener("scroll", upd, { passive: true }); upd();
};

/* ── story viewer (Instagram highlights) ── */
const sv = d.createElement("div"); sv.className = "sv fx"; sv.setAttribute("role", "dialog"); sv.setAttribute("aria-label", "Stories");
sv.innerHTML = `<div class="sv__img"><img alt=""></div><div class="sv__bars"></div>
  <div class="sv__who"><span class="ph"><img src="${S.IMG("u:filmer", 120, "1/1")}" alt=""></span><b>${esc(INSTAGRAM.handle)}</b><span class="sv__lab"></span><button class="x" aria-label="Close stories">✕</button></div>
  <button class="sv__tap sv__tap--p" aria-label="Previous"></button><button class="sv__tap sv__tap--n" aria-label="Next"></button>
  <div class="sv__cap"><b></b><span></span></div>
  <div class="sv__cta"><a class="btn btn--light" target="_blank" rel="noopener">${S.icon("instagram")} Watch on Instagram</a></div>`;
d.body.append(sv);
const SV = { set: [], i: 0, t: null };
const frames = h => { const pool = PHOTOS.filter(p => p.img !== h.img); const k = h.label.length % pool.length;
  return [{ img: h.img, title: h.label, sub: "Highlight" }, ...[pool[k], pool[(k + 5) % pool.length]].map(p => ({ img: p.img, title: p.title, sub: p.location }))]; };
const svShow = () => { const f = SV.set[SV.i]; clearTimeout(SV.t);
  $(".sv__img img", sv).src = S.IMG(f.img, 900, "9/16"); $(".sv__cap b", sv).textContent = f.title; $(".sv__cap span", sv).textContent = f.sub;
  $(".sv__bars", sv).innerHTML = SV.set.map((_, j) => `<i class="${j < SV.i ? "done" : j === SV.i ? "on" : ""}"><b></b></i>`).join("");
  SV.t = setTimeout(() => svStep(1), 5000); };
const svClose = () => { clearTimeout(SV.t); if (!sv.classList.contains("open")) return; sv.classList.remove("open"); S.lock(false); };
const svStep = n => { SV.i += n; if (SV.i < 0) SV.i = 0; if (SV.i >= SV.set.length) return svClose(); svShow(); };
const svOpen = i => { const h = INSTAGRAM.highlights[i]; SV.set = frames(h); SV.i = 0; $(".sv__lab", sv).textContent = h.label; $(".sv__cta a", sv).href = h.url || INSTAGRAM.url; sv.classList.add("open"); S.lock(true); svShow(); };
$(".x", sv).onclick = svClose; $(".sv__tap--p", sv).onclick = () => svStep(-1); $(".sv__tap--n", sv).onclick = () => svStep(1);
sv.addEventListener("pointerdown", e => { if (e.target.closest(".sv__tap")) { sv.classList.add("paused"); clearTimeout(SV.t); } });
sv.addEventListener("pointerup", () => sv.classList.remove("paused"));
addEventListener("keydown", e => { if (!sv.classList.contains("open")) return; if (e.key === "Escape") svClose(); if (e.key === "ArrowRight") svStep(1); if (e.key === "ArrowLeft") svStep(-1); });
d.addEventListener("click", e => { const r = e.target.closest("[data-story]"); if (r) { e.preventDefault(); svOpen(+r.dataset.story); } });

/* lightbox hint */
const lbStage = $(".lb__stage"); if (lbStage) lbStage.insertAdjacentHTML("beforeend", '<span class="lb__hint">Swipe ← → · Swipe down to close</span>');

/* ── bottom tab bar (every page) ── */
const TAB_ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M3 20l6-9 4 5 3-3 5 7z"/><circle cx="17" cy="6" r="2"/></svg>',
  films: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>',
  wild: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="7" cy="7" r="2"/><circle cx="17" cy="7" r="2"/><circle cx="4.5" cy="12.5" r="1.8"/><circle cx="19.5" cy="12.5" r="1.8"/><path d="M12 11c-3 0-5.5 4-5.5 6.3 0 2 2 2.2 3 1.7 1-.5 1.7-.8 2.5-.8s1.5.3 2.5.8c1 .5 3 .3 3-1.7C17.5 15 15 11 12 11z"/></svg>',
  photos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="12" cy="12" r="3.6"/><path d="M7 4l1.5-2h7L17 4"/></svg>',
  follow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>'
};
const TABS = PAGE === "home"
  ? [["Home", "#top", "home"], ["Films", "#films", "films"], ["Wildlife", "#wild", "wild"], ["Photos", "#photos", "photos"], ["Follow", "#follow", "follow"]]
  : [["Home", "index.html", "home"], ["Films", "films.html", "films"], ["Wildlife", "index.html#wild", "wild"], ["Photos", "photography.html", "photos"], ["Follow", "index.html#follow", "follow"]];
const tabs = d.createElement("nav"); tabs.className = "tabs fx"; tabs.setAttribute("aria-label", "Sections");
tabs.innerHTML = TABS.map(([l, h, k]) => `<a href="${h}" data-k="${k}"${(PAGE === "films" && k === "films") || (PAGE === "photography" && k === "photos") ? ' class="on" aria-current="page"' : ""}>${TAB_ICONS[k]}${l}</a>`).join("");
d.body.append(tabs); d.body.classList.add("has-tabs");
// Keep the approved hero clean: the tab bar slides in once you scroll past it.
const hero = $(".hero");
const tabVis = () => { const past = !hero || hero.getBoundingClientRect().bottom < innerHeight * .6; tabs.classList.toggle("away", !past); };
tabVis(); addEventListener("scroll", tabVis, { passive: true });

/* ── compact footer (every page) ── */
const mft = d.createElement("footer"); mft.className = "mft mob-only";
const Y = new Date().getFullYear(), yrs = SITE.copyrightStart < Y ? `${SITE.copyrightStart}–${Y}` : Y;
mft.innerHTML = `<span class="mono" style="color:var(--glow)">Say hello</span><h2>Let's make something <em>worth the walk.</em></h2>
  <a class="mail" href="mailto:${esc(SITE.email)}"><span>${esc(SITE.email)}<small>Collabs · licensing · press — replies in a few days</small></span>${S.icon("arrow")}</a>
  <div class="icons">${SOCIAL.map(s => `<a ${S.socialHref(s)} aria-label="${s.label}">${S.icon(s.key)}</a>`).join("")}</div>
  <div class="acc">
    <details><summary>Explore</summary><ul><li><a href="${HOME || "#top"}">Home</a></li><li><a href="films.html">Films &amp; shorts</a></li><li><a href="photography.html">Photography</a></li><li><a href="${HOME}#wild">Wildlife</a></li><li><a href="photography.html#licensing">Licensing &amp; prints</a></li></ul></details>
    <details><summary>Base camp</summary><p class="ans">${esc(SITE.base)} · <span class="mono">${esc(SITE.coords)}</span><br><span data-live>Checking the weather…</span></p></details>
  </div>
  <p class="legal"><b>© ${yrs} ${esc(SITE.creator)} · ${esc(SITE.name)}.</b> All photographs, films and writing are protected by copyright and may not be copied, downloaded or reused without written permission.</p>`;
const dft = $("#site-footer"); (dft || $("main")).after(mft);

if (PAGE === "home") home();
S.watch && S.watch();
// Deep links such as index.html#wild land on the mobile section.
if (location.hash) { const t = d.getElementById(location.hash.slice(1)); if (t) setTimeout(() => t.scrollIntoView(), 60); }

/* reels with an exported video autoplay (muted) while centred on screen */
const vio = new IntersectionObserver(es => es.forEach(e => { const v = $("video", e.target); if (!v) return;
  if (e.isIntersecting) v.play().then(() => e.target.classList.add("playing")).catch(() => {}); else { v.pause(); e.target.classList.remove("playing"); } }), { threshold: .7 });
$$(".reel").forEach(r => $("video", r) && vio.observe(r));

/* ═══════════════ HOME — the "Pocket" layout below the hero ═══════════════ */
function home() {
  const mob = $("#mob"); if (!mob) return;
  // hand the familiar ids (#films, #wild, …) to the mobile sections so every existing link still lands
  ["films", "wild", "about", "follow", "collab", "instagram", "photos"].forEach(id => { const el = d.getElementById(id); if (el && !el.closest("#mob")) el.id = id + "-desktop"; });

  const feat = FILMS.find(f => f.featured) || FILMS[0], other = FILMS.filter(f => f !== feat), fid = S.ytId(feat.url);
  const W = [["p03","Grizzly bear","Ursus arctos horribilis","Salmon rivers in autumn — watched across the water for an afternoon.","Rare"],
    ["p06","Mountain goat","Oreamnos americanus","Always higher than you think.","Common"],["p09","Bald eagle","Haliaeetus leucocephalus","Coastal inlets at low tide.","Common"],
    ["p12","Grey wolf","Canis lupus","Tracks for days, a glimpse for seconds.","Legendary"],["p23","Brown bear","Ursus arctos","Berry season in the north.","Rare"]];
  const live = SOCIAL.filter(s => s.url), soon = SOCIAL.filter(s => !s.url);

  mob.innerHTML = `
  <div class="glance">
    <a class="latest" ${S.videoAttrs(feat.url, feat.title)}><span class="ph"><img src="${S.ytThumb(fid)}" alt=""></span><span><span class="mono" style="display:block;margin-bottom:3px">Latest upload</span><b>${esc(feat.title)}</b></span><i>${S.playSvg}</i></a>
    <div class="wx-now"><span class="mono">Now in ${esc(SITE.weather.place)}</span><b data-live>Checking…</b></div>
    <button class="th" data-open="themes"><span style="display:flex;flex-direction:column;gap:6px"><span class="mono">Site weather</span><b data-theme-name>Dusk</b></span><span data-theme-ico></span></button>
    <div><span class="mono">On the channel</span><b>${FILMS.length} films · ${SHORTS.length} shorts</b></div>
    <div><span class="mono">In the archive</span><b>${PHOTOS.length} photographs</b></div>
  </div>

  <section class="msec" style="padding-top:26px" id="instagram" aria-label="Instagram highlights">
    <div class="m-rings">
      <a class="m-ring me" href="${esc(INSTAGRAM.url)}" target="_blank" rel="noopener"><span class="o"><span class="ph" style="display:block"><img src="${S.IMG("u:filmer", 160, "1/1")}" alt=""></span></span>Follow</a>
      ${INSTAGRAM.highlights.map((h, i) => `<button class="m-ring" data-story="${i}"><span class="o"><span class="ph" style="display:block"><img src="${S.IMG(h.img, 160, "1/1")}" alt="" loading="lazy"></span></span>${esc(h.label)}</button>`).join("")}
    </div>
  </section>

  <section class="msec" id="films">
    <div class="mhead"><div><span class="k">01 · Watch</span><h2>Latest <em>film</em></h2></div><a class="more" href="films.html">All films →</a></div>
    <div class="afilm"><a class="feature" ${S.videoAttrs(feat.url, feat.title)} aria-label="Play ${esc(feat.title)}"><img src="${S.ytThumb(fid)}" alt="" loading="lazy"><span class="bigplay">${S.playSvg}</span></a>
      <div class="afilm__b"><span class="mono" style="color:var(--glow);font-size:10.5px"><span class="rec" style="width:6px;height:6px"></span> Now showing</span><h3>${esc(feat.title)}</h3><p>${esc(feat.blurb || "")}</p>
      <div class="tags"><span class="tag2">${esc(feat.category || "Film")}</span><span class="tag2">📍 ${esc(feat.location || SITE.base)}</span><span class="tag2">YouTube</span></div></div></div>
    ${other.map(f => `<a class="arow" ${S.videoAttrs(f.url, f.title)}><span class="ph"><img src="${S.ytThumb(S.ytId(f.url))}" alt="" loading="lazy"></span><span><b>${esc(f.title)}</b><span>${esc(f.location || f.category || "")}</span></span></a>`).join("")}
    <div class="sub3"><h3>Shorts <em>from the trail</em></h3><span class="mono" style="font-size:10.5px;color:var(--fog-3)">Swipe →</span></div>
    <div class="hrow" id="m-shorts">${SHORTS.map(S.shortCard).join("")}<div class="more-card"><span class="mono" style="color:var(--glow);font-size:10px">New every few weeks</span><h4>More trails.<br><em>More fails.</em></h4><p>Subscribe so the next one finds you.</p><a class="btn btn--light" href="${esc((SOCIAL.find(s => s.key === "youtube") || {}).url || "#")}?sub_confirmation=1" target="_blank" rel="noopener">${S.icon("youtube")} Subscribe</a></div></div>
  </section>

  <div class="trek-slot m-trek" style="margin-top:44px" aria-hidden="true"></div>

  <section class="msec" id="wild">
    <div class="mhead"><div><span class="k">02 · Field guide</span><h2>The locals <em>don't pose</em></h2></div></div>
    <p class="lede">Shot from a respectful distance. Tap a card for the full frame.</p>
    <div class="hrow" id="m-wild">${W.map(([id, n, l, t, r]) => { const p = S.photo(id); if (!p) return "";
      return `<button class="wcard" data-photo="${id}" data-group="m-wild"><span class="ph"><img src="${S.IMG(p.img, 800, "4/5")}" alt="${esc(p.alt)}" loading="lazy"></span><span class="chip3 mono">${r}</span><span class="zm">${S.icon("expand")}</span><span class="wcard__b"><h3>${n}</h3><i>${l}</i><p>${t}</p></span></button>`; }).join("")}</div>
  </section>

  <section class="msec" id="photos">
    <div class="mhead"><div><span class="k">03 · Photographs</span><h2>Still <em>frames</em></h2></div></div>
    <div class="seg" id="m-seg" aria-label="Filter photographs"></div>
    <div class="pgrid" id="m-pgrid"></div>
    <a class="wide-btn" href="photography.html">See all <b>${PHOTOS.length}</b> photographs →</a>
  </section>

  <section class="msec" id="about">
    <div class="mhead"><div><span class="k">04 · About</span><h2>Behind <em>the lens</em></h2></div></div>
    <div class="about">
      <div class="about__me"><span class="ph"><img src="${S.IMG("u:filmer", 200, "1/1")}" alt="${esc(SITE.creator)} (stand-in photo)"></span><div><b>${esc(SITE.creator)}</b><span>Solo filmmaker, trekker &amp; wildlife photographer · BC</span></div></div>
      <blockquote>I go out for myself first. The film is what's left over — <em>the cold mornings and the animals that never cared I was there.</em></blockquote>
      <div class="tenet"><i>1</i><div><b>One person, one pack</b><span>No crew. Every frame carried in and shot alone.</span></div></div>
      <div class="tenet"><i>✦</i><div><b>Nothing staged</b><span>When the weather wins, that's the story.</span></div></div>
      <div class="tenet"><i>◎</i><div><b>Distance first</b><span>Long lenses, patience, leave no trace.</span></div></div>
    </div>
  </section>

  <section class="msec" id="follow">
    <div class="mhead"><div><span class="k">05 · Follow</span><h2>Pick <em>your trail</em></h2></div></div>
    <div class="slist">${live.map(s => `<a class="srow${s.key === "youtube" ? " big" : s.key === "instagram" ? " ig" : ""}" ${S.socialHref(s)} style="--bc2:${(S.BRAND[s.key] || [])[1]}"><span class="ic">${S.icon(s.key)}</span><span><b>${s.label}</b><small>${esc(s.handle)} · ${esc(s.note)}</small></span><span class="go">${s.key === "youtube" ? "Subscribe" : "Follow"}</span></a>`).join("")}
      <a class="srow" href="mailto:${esc(SITE.email)}" style="--bc2:var(--glow)"><span class="ic" style="color:#140c06">${S.icon("mail")}</span><span><b>Email</b><small>${esc(SITE.email)}</small></span><span class="go">Write</span></a>
      ${soon.length ? `<div class="srow soonrow"><span class="mono" style="font-size:10.5px;color:var(--fog-3)">Coming soon</span><span class="soonic">${soon.map(s => `<a ${S.socialHref(s)} aria-label="${s.label} — coming soon">${S.icon(s.key)}</a>`).join("")}</span></div>` : ""}</div>
    <div class="sub3"><h3>Latest <em>reels</em></h3><a class="mono" style="font-size:10.5px;color:var(--fog-3)" href="${esc(INSTAGRAM.url)}" target="_blank" rel="noopener">Instagram ↗</a></div>
    <div class="hrow" id="m-reels">${INSTAGRAM.reels.map(r => `<a class="reel ph m-reel" href="${esc(r.url)}" target="_blank" rel="noopener" aria-label="Watch reel on Instagram${r.title ? ": " + esc(r.title) : ""}"><img src="${S.IMG(r.poster, 420, "9/16")}" alt="" loading="lazy">${r.file ? `<video src="${esc(r.file)}" muted loop playsinline preload="none"></video>` : ""}<span class="reel__i">${S.icon("reel")}</span><span class="reel__t">${esc(r.title || "Reel")}<span>Watch on Instagram ↗</span></span></a>`).join("")}</div>
  </section>

  <section class="msec" id="collab" style="padding-bottom:44px">
    <div class="collab2">
      <div class="ph"><img src="${S.IMG("u:tent2", 900, "4/5")}" alt="" loading="lazy"></div>
      <span class="mono" style="color:var(--glow);font-size:11px">Work together</span>
      <h2>Take your audience <em>somewhere real.</em></h2>
      <p>Films, photography and social content for outdoor brands, tourism boards and lodges.</p>
      <div class="tags"><span class="tag2">Brand films</span><span class="tag2">Destinations</span><span class="tag2">Photo licensing</span><span class="tag2">Prints</span><span class="tag2">Reels</span></div>
      <div class="cta"><a class="btn btn--glow" href="mailto:${esc(SITE.email)}">Start a project →</a><a class="btn btn--ghost" href="photography.html#licensing">Licensing &amp; prints</a></div>
    </div>
  </section>`;

  S.applyTheme();
  S.mountTrek($(".m-trek", mob));
  M.pips($("#m-shorts")); M.pips($("#m-wild"));

  const cats = ["All", ...new Set(PHOTOS.map(p => p.cat))], seg = $("#m-seg"), grid = $("#m-pgrid");
  seg.innerHTML = cats.map((c, i) => `<button aria-pressed="${!i}" data-c="${esc(c)}">${esc(c)}</button>`).join("");
  const draw = c => { grid.innerHTML = PHOTOS.filter(p => c === "All" || p.cat === c).slice(0, 7).map((p, i) => `<button class="pt ph" data-photo="${p.id}" data-group="m-grid" aria-label="Open ${esc(p.title)}"><img src="${S.IMG(p.img, i ? 500 : 900, i ? "1/1" : "16/10")}" alt="${esc(p.alt)}" loading="lazy"><span class="cap2">${esc(p.title)}</span></button>`).join(""); };
  seg.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; [...seg.children].forEach(x => x.setAttribute("aria-pressed", x === b)); draw(b.dataset.c); });
  draw("All");

  M.spy($$("a", tabs));
}
})();
