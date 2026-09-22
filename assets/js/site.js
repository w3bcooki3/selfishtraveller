/* ════════════════════════════════════════════════════════════════════
   SELFISH TRAVELLER — site behaviour
   Plain JavaScript, no framework. Reads everything from data.js.
   ════════════════════════════════════════════════════════════════════ */
(() => {
"use strict";
const d = document, root = d.documentElement;
root.classList.add("js");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, c = d) => c.querySelector(s);
const $$ = (s, c = d) => [...c.querySelectorAll(s)];
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const PAGE = d.body.dataset.page || "home";
const isFile = location.protocol === "file:";
const YEAR = new Date().getFullYear();
const HOME = PAGE === "home" ? "" : "index.html";

/* ───────── images ───────── */
const IMG = (src, w = 1600, ratio) => {
  if (!src) return "";
  w = Math.min(w, Math.max(400, Math.ceil(innerWidth * Math.min(devicePixelRatio || 1, 2) / 200) * 200));
  if (src.startsWith("u:")) {
    const id = STOCK[src.slice(2)];
    let h = "";
    if (ratio) { const [a, b] = ratio.split("/").map(Number); h = "&h=" + Math.round(w * b / a); }
    return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}${h}&q=78`;
  }
  return src;
};
const ytId = u => { const m = String(u).match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/); return m ? m[1] : String(u); };
const ytThumb = (id, vertical) => `https://i.ytimg.com/vi/${id}/${vertical ? "oardefault" : "maxresdefault"}.jpg`;
const photo = id => PHOTOS.find(p => p.id === id);
// YouTube serves a 120px grey placeholder when a size doesn't exist; swap to one that does.
d.addEventListener("load", e => {
  const i = e.target;
  if (i.tagName === "IMG" && /maxresdefault/.test(i.src) && i.naturalWidth <= 120) i.src = i.src.replace("maxresdefault", "hqdefault");
}, true);
d.addEventListener("error", e => {
  const i = e.target;
  if (i.tagName !== "IMG") return;
  if (/maxresdefault|oardefault/.test(i.src)) { i.src = i.src.replace(/maxresdefault|oardefault/, "hqdefault"); return; }
  i.style.opacity = 0;
}, true);

/* ───────── icons ───────── */
const ICONS = {
  youtube:'<path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.5 31 31 0 0 0-.5-4.5zM9.8 15.2V8.8l6 3.2z"/>',
  instagram:'<path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.8-.1zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3zm6.9-11.1a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z"/>',
  tiktok:'<path d="M16.6 5.8a4.8 4.8 0 0 1-1.1-3.1h-3.3v13.3a2.9 2.9 0 1 1-2-2.8V9.8a6.2 6.2 0 1 0 5.3 6.1V9.2a8 8 0 0 0 4.7 1.5V7.4a4.8 4.8 0 0 1-3.6-1.6z"/>',
  facebook:'<path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/>',
  x:'<path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.2l-4.9-6.4L5.1 21H2l7.3-8.3L2.4 3h6.4l4.4 5.8zm-1.1 16.1h1.7L7.7 4.8H5.9z"/>',
  threads:'<path d="M17.5 11.2c-.1 0-.2-.1-.3-.1-.2-3.2-1.9-5-4.8-5-2 0-3.6.9-4.5 2.4l1.7 1.2c.7-1 1.7-1.3 2.8-1.3 1.6 0 2.7.9 2.9 2.6-.8-.2-1.7-.3-2.6-.2-2.7.1-4.4 1.7-4.3 3.9.1 2.1 1.9 3.4 4 3.3 2.1-.1 3.6-1.4 4.1-3.6.7.5 1.2 1.2 1.4 2.1.3 1.4-.8 3.4-3.8 3.6-2.6.1-4.6-1.5-5-4.4-.1-.7-.1-1.4 0-2.1.4-3.4 2.5-5.3 5.7-5.3 2.5 0 4.3 1.1 5.2 3.1l1.9-.8C20.6 7.6 18.1 6 14.8 6c-4.2 0-7 2.6-7.5 6.9-.1.8-.1 1.7 0 2.5.5 3.9 3.3 6.3 7.1 6.2 4.1-.2 6.1-3 5.6-5.6-.3-1.8-1.3-3.1-2.5-3.8zm-4.7 4.7c-1.1.1-1.9-.5-2-1.4 0-.9.8-1.7 2.3-1.8.8 0 1.5.1 2.2.3-.2 1.8-1.2 2.8-2.5 2.9z"/>',
  pinterest:'<path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.9 0-2.6-1.8-4.4-4.5-4.4A4.6 4.6 0 0 0 7.2 12c0 .9.3 1.8.8 2.3.1.1.1.2.1.3l-.3 1.1c0 .2-.1.2-.3.1-1.3-.6-2.1-2.5-2.1-4C5.4 8.5 7.8 5.6 12.3 5.6c3.6 0 6.4 2.6 6.4 6 0 3.6-2.2 6.4-5.4 6.4-1 0-2-.5-2.4-1.2l-.6 2.5c-.2.9-.8 2-1.2 2.6A10 10 0 1 0 12 2z"/>',
  mail:'<path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2.2V17h16V7.2l-8 5.2z"/>',
  play:'<path d="M0 0l8 5-8 5z"/>',
  arrow:'<path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  expand:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  heart:'<path d="M12 21s-7.5-4.6-9.6-9.2C1 8.7 2.9 5 6.6 5c2.1 0 3.6 1.2 5.4 3.2C13.8 6.2 15.3 5 17.4 5 21.1 5 23 8.7 21.6 11.8 19.5 16.4 12 21 12 21z"/>',
  reel:'<path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 5v11h14V8zm.5-3 2 3h2.3l-2-3zm5 0 2 3h2.3l-2-3zm5 0 2 3H19V5zM10 10.5l5 3-5 3z"/>'
};
const TICONS = {
  dusk:'<path d="M3 17h18M6 13.5a6 6 0 0 1 12 0M12 4v3M4.6 7.6l2 2M19.4 7.6l-2 2M8 21h8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  sun:'<circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  rain:'<path d="M7 15.5a4.5 4.5 0 1 1 1.2-8.8A5.5 5.5 0 0 1 18.5 9 3.3 3.3 0 0 1 17.5 15.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.5 18l-1 2.5M12.5 18l-1 2.5M16.5 18l-1 2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  wind:'<path d="M3 9h11a3 3 0 1 0-3-3M3 13h15a3 3 0 1 1-3 3M3 17h7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  forest:'<path d="M9 3 4 11h3l-3.5 5H9m0-13 5 8h-3l3.5 5H9m0 0v5M16.5 7l3.5 6h-2l3 4h-4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>',
  night:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M17 3.5v3M15.5 5h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  live:'<circle cx="12" cy="12" r="2.2" fill="currentColor"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'
};
const SWATCH = { dusk:"linear-gradient(135deg,#2a1c16,#e3915a)", sun:"linear-gradient(135deg,#b5561a,#ffc56b)", rain:"linear-gradient(135deg,#0f1a1f,#5f8fa0)",
  wind:"linear-gradient(135deg,#2e3834,#cdbf94)", forest:"linear-gradient(135deg,#0c2014,#6fa55a)", night:"linear-gradient(135deg,#050818,#5b6dd6)", live:"linear-gradient(135deg,#1b2a30,#7fb8cb)" };
const BRAND = { youtube:["rgba(255,0,0,.55)","#ff2d2d"], instagram:["rgba(214,41,118,.55)","linear-gradient(135deg,#feda75,#fa7e1e,#d62976,#962fbf)"],
  tiktok:["rgba(37,244,238,.35)","#111"], facebook:["rgba(24,119,242,.5)","#1877f2"], x:["rgba(255,255,255,.2)","#000"],
  threads:["rgba(255,255,255,.18)","#101010"], pinterest:["rgba(230,0,35,.45)","#e60023"] };
const icon = (k, set = ICONS, vb = "0 0 24 24") => `<svg viewBox="${vb}" aria-hidden="true">${set[k] || ""}</svg>`;
const playSvg = '<svg viewBox="0 0 8 10" aria-hidden="true"><path d="M0 0l8 5-8 5z"/></svg>';
const socialHref = s => s.url ? `href="${esc(s.url)}" target="_blank" rel="noopener me"` : `href="#" data-soon aria-disabled="true"`;

/* ───────── toast ───────── */
/* Scroll lock for overlays (menu, sheets, photo viewer, video, stories).
   Idempotent: opening the same overlay twice can never leave the page frozen,
   and a safety net releases the lock if no overlay is actually open. */
let lockY = 0, lockedOn = false;
const overlayOpen = () => !!d.querySelector(".lb.open,.vm.open,.bsheet.open,.sv.open,.tpop.open") || d.body.classList.contains("menu-open");
const release = () => { if (!lockedOn) return; lockedOn = false; Object.assign(d.body.style, { position: "", top: "", left: "", right: "", width: "", overflow: "" }); scrollTo(0, lockY); };
const lock = on => {
  if (on) { if (lockedOn) return; lockedOn = true; lockY = scrollY; Object.assign(d.body.style, { position: "fixed", top: -lockY + "px", left: "0", right: "0", width: "100%", overflow: "hidden" }); }
  else setTimeout(() => { if (!overlayOpen()) release(); }, 0);
};
["touchstart", "wheel", "pageshow", "visibilitychange"].forEach(ev => addEventListener(ev, () => { if (lockedOn && !overlayOpen()) release(); }, { passive: true, capture: true }));
const toastEl = d.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); d.body.append(toastEl);
let toastT;
const toast = msg => { toastEl.textContent = msg; toastEl.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("on"), 3200); };
d.addEventListener("click", e => { const a = e.target.closest("[data-soon]"); if (a) { e.preventDefault(); toast("Coming soon — this channel isn't live yet."); } });

/* ───────── copyright guard (a deterrent, not a lock) ───────── */
d.addEventListener("contextmenu", e => { if (e.target.tagName === "IMG") { e.preventDefault(); toast(`Photographs © ${SITE.creator}. Ask about licensing — ${SITE.email}`); } });
d.addEventListener("dragstart", e => { if (e.target.tagName === "IMG") e.preventDefault(); });

/* ═══════════════ THEMES ═══════════════ */
const TKEY = "st-theme";
let choice = "dusk";
try { const s = localStorage.getItem(TKEY); if (THEMES.some(t => t.key === s)) choice = s; } catch (e) {}
let live = null;
const WMO = c => c === 0 ? "Clear sky" : c <= 2 ? "Partly cloudy" : c === 3 ? "Overcast" : c <= 48 ? "Fog" : c <= 57 ? "Drizzle" : c <= 67 ? "Rain" : c <= 77 ? "Snow" : c <= 82 ? "Rain showers" : c <= 86 ? "Snow showers" : "Thunderstorm";
const liveTheme = w => {
  if (!w.is_day) return "night";
  const c = w.weather_code;
  if ((c >= 51 && c <= 67) || (c >= 80 && c <= 82) || c >= 95) return "rain";
  if (w.wind_speed_10m >= 28 || (c >= 71 && c <= 77) || c === 85 || c === 86) return "wind";
  if (c === 45 || c === 48) return "forest";
  if (c <= 1) return "sun";
  return "dusk";
};
const resolved = () => choice === "live" ? (live ? live.theme : "dusk") : choice;
const themeListeners = [];
const onTheme = fn => themeListeners.push(fn);
function applyTheme() {
  const t = resolved();
  const changed = root.dataset.theme !== t;
  root.dataset.theme = t;
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = getComputedStyle(root).getPropertyValue("--ink").trim() || "#0b0e0d";
  $$("[data-theme-opt]").forEach(b => b.setAttribute("aria-checked", b.dataset.themeOpt === choice));
  $$("[data-theme-name]").forEach(el => el.textContent = (THEMES.find(x => x.key === choice) || {}).name);
  $$("[data-theme-ico]").forEach(el => el.innerHTML = icon(choice, TICONS));
  if (changed) themeListeners.forEach(fn => fn(t));
}
function setTheme(k) {
  choice = k;
  try { localStorage.setItem(TKEY, k); } catch (e) {}
  applyTheme();
  if (k === "live") {
    if (live) toast(`Live BC: ${live.desc}, ${live.temp}°C in ${SITE.weather.place}.`);
    else toast("Checking the sky over BC…");
  } else toast(`Theme: ${(THEMES.find(x => x.key === k) || {}).name}`);
}
async function fetchLive() {
  const w = SITE.weather;
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${w.lat}&longitude=${w.lon}&current=temperature_2m,weather_code,wind_speed_10m,is_day&timezone=America%2FVancouver`);
    if (!r.ok) throw 0;
    const c = (await r.json()).current;
    live = { theme: liveTheme(c), desc: WMO(c.weather_code), temp: Math.round(c.temperature_2m), wind: Math.round(c.wind_speed_10m), day: !!c.is_day };
  } catch (e) { live = null; }
  $$("[data-live]").forEach(el => el.textContent = live ? `${live.desc} · ${live.temp}°C · wind ${live.wind} km/h` : "Weather unavailable right now");
  if (choice === "live") { applyTheme(); if (live) toast(`Live BC: ${live.desc}, ${live.temp}°C in ${w.place}.`); }
}

/* ═══════════════ CHROME: header, menu, rail, footer ═══════════════ */
const NAV = [
  ["Home", HOME || "#top", "home"], ["Films", "films.html", "films"], ["Photography", "photography.html", "photography"],
  ["Wildlife", HOME + "#wild"], ["Instagram", HOME + "#instagram"], ["About", HOME + "#about"]
];
const hdr = $("#site-header");
if (hdr) {
  hdr.className = "hdr";
  hdr.innerHTML = `
  <div class="hdr__in">
    <a class="brand" href="${HOME || "#top"}" aria-label="${esc(SITE.name)} — home">
      <span class="brand__mark">AS</span>
      <span class="brand__txt"><b>${esc(SITE.name)}</b><span>${esc(SITE.creator)} · BC, Canada</span></span>
    </a>
    <ul class="nav">${NAV.map(([l, h, k]) => `<li><a href="${h}"${k === PAGE ? ' aria-current="page"' : ""}>${l}</a></li>`).join("")}</ul>
    <button class="tbtn" id="tbtn" aria-haspopup="true" aria-expanded="false" aria-controls="tpop"><span data-theme-ico></span><span data-theme-name>Dusk</span></button>
    <a class="btn btn--light" href="${HOME}#collab">Work with me</a>
    <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="sheet"><span></span></button>
  </div>
  <div class="tpop" id="tpop" role="menu" aria-label="Choose a theme">
    <div class="tpop__h mono"><span>Theme</span><span>Weather mood</span></div>
    ${THEMES.map(t => `<button class="topt" role="menuitemradio" data-theme-opt="${t.key}" aria-checked="false"><span class="ico" style="--sw:${SWATCH[t.key]}">${icon(t.key, TICONS)}</span><span><b>${t.name}</b><span>${t.note}</span></span><i></i></button>`).join("")}
    <div class="tpop__live"><span class="mono">Now in ${esc(SITE.weather.place)}</span><br><span data-live>Checking…</span></div>
  </div>`;
  const sheet = d.createElement("nav");
  sheet.className = "sheet"; sheet.id = "sheet"; sheet.setAttribute("aria-label", "Menu");
  sheet.innerHTML = `<ol>${NAV.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join("")}<li><a href="${HOME}#collab">Work with me</a></li></ol>
    <div><p class="mono" style="color:var(--fog-3);margin:0 0 12px">Theme</p><div class="sheet__themes">${THEMES.map(t => `<button data-theme-opt="${t.key}" aria-checked="false">${icon(t.key, TICONS)}${t.name}</button>`).join("")}</div></div>
    <div><p class="mono" style="color:var(--fog-3);margin:0 0 12px">Follow</p><div class="sheet__soc">${SOCIAL.map(s => `<a ${socialHref(s)} aria-label="${s.label}">${icon(s.key)}</a>`).join("")}</div></div>`;
  hdr.after(sheet);

  const tbtn = $("#tbtn"), tpop = $("#tpop");
  const pop = o => { tpop.classList.toggle("open", o); tbtn.setAttribute("aria-expanded", o); };
  tbtn.addEventListener("click", e => { e.stopPropagation(); if (window.ST && ST.mobile && ST.mobile()) { ST.openThemes(); return; } pop(!tpop.classList.contains("open")); });
  d.addEventListener("click", e => { if (!e.target.closest("#tpop")) pop(false); });
  
  const burger = $("#burger");
  const menu = o => { d.body.classList.toggle("menu-open", o); burger.setAttribute("aria-expanded", o); lock(o); };
  burger.addEventListener("click", () => menu(!d.body.classList.contains("menu-open")));
  $$(".sheet ol a").forEach(a => a.addEventListener("click", () => menu(false)));
  addEventListener("keydown", e => { if (e.key === "Escape") { menu(false); pop(false); } });
  const solid = () => hdr.classList.toggle("solid", scrollY > 40);
  solid(); addEventListener("scroll", solid, { passive: true });
}

// left social rail
const rail = d.createElement("aside");
rail.className = "rail"; rail.setAttribute("aria-label", "Social channels");
rail.innerHTML = `<span class="rail__lab">Follow</span><span class="rail__line"></span>` +
  SOCIAL.filter(s => s.rail).map(s => `<a ${socialHref(s)} aria-label="${s.label}" title="${s.label}">${icon(s.key)}</a>`).join("");
if (d.body.dataset.rail !== "off") d.body.append(rail);

// footer
const ft = $("#site-footer");
if (ft) {
  ft.className = "ft";
  const yrs = SITE.copyrightStart && SITE.copyrightStart < YEAR ? `${SITE.copyrightStart}–${YEAR}` : YEAR;
  ft.innerHTML = `
  <div class="wrap">
    <div class="ft__cta">
      <div><span class="mono" style="color:var(--glow)">Say hello</span><h2>Let's make something <em>worth the walk.</em></h2></div>
      <div><a class="ft__mail" href="mailto:${esc(SITE.email)}">${esc(SITE.email)} ${icon("arrow")}</a>
        <p style="color:var(--fog-3);margin:18px 0 0">Brand films, destination campaigns, photo licensing and prints. Replies within a few days — longer if I'm out of signal.</p></div>
    </div>
    <div class="ft__grid">
      <div class="ft__about">
        <a class="brand" href="${HOME || "#top"}" style="margin-bottom:18px"><span class="brand__mark">AS</span><span class="brand__txt"><b>${esc(SITE.name)}</b><span>${esc(SITE.creator)}</span></span></a>
        <p>Solo films, photographs and field notes from the mountains, forests and wildlife of ${esc(SITE.base)}.</p>
        <div class="ft__icons">${SOCIAL.map(s => `<a ${socialHref(s)} aria-label="${s.label}" title="${s.label}">${icon(s.key)}</a>`).join("")}</div>
      </div>
      <div><h4 class="mono">Explore</h4><ul><li><a href="films.html">Films</a></li><li><a href="photography.html">Photography</a></li><li><a href="${HOME}#wild">Wildlife</a></li><li><a href="${HOME}#journal">Field journal</a></li><li><a href="${HOME}#about">About Aman</a></li></ul></div>
      <div><h4 class="mono">Follow</h4><ul>${SOCIAL.map(s => `<li><a ${socialHref(s)}>${s.label}${s.url ? "" : ' <span style="opacity:.5">· soon</span>'}</a></li>`).join("")}</ul></div>
      <div class="ft__live"><h4 class="mono">Base camp</h4>
        <span><b>${esc(SITE.base)}</b></span><span class="mono">${esc(SITE.coords)}</span>
        <span>Local time <b data-clock>—</b></span><span data-live>Checking the weather…</span>
        <span>Theme <b data-theme-name>Dusk</b></span></div>
    </div>
    <p class="ft__word" aria-hidden="true">Selfish <em>Traveller</em></p>
    <div class="ft__bot mono">
      <div><span>© ${yrs} ${esc(SITE.creator)} · ${esc(SITE.name)}. All rights reserved.</span>
        <p class="ft__legal" style="margin:8px 0 0">All photographs, films and writing on this site are the work of ${esc(SITE.creator)} and are protected by copyright. They may not be copied, downloaded, edited or reused without written permission.</p></div>
      <a href="#top" onclick="window.scrollTo({top:0,behavior:'smooth'});return false">Back to top ↑</a>
    </div>
  </div>`;
  const clock = $("[data-clock]", ft);
  const tick = () => { try { clock.textContent = new Date().toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit", timeZone: "America/Vancouver" }) + " PT"; } catch (e) {} };
  tick(); setInterval(tick, 30000);
}

/* ═══════════════ WEATHER CANVAS ═══════════════ */
class Weather {
  constructor(canvas, density = 1) {
    this.c = canvas; this.x = canvas.getContext("2d"); this.density = density; this.p = []; this.on = false; this.mode = null;
    this.resize = this.resize.bind(this); this.loop = this.loop.bind(this);
    addEventListener("resize", this.resize); this.resize();
    new IntersectionObserver(es => es.forEach(e => { this.on = e.isIntersecting; if (this.on && !reduce) requestAnimationFrame(this.loop); })).observe(canvas);
  }
  resize() {
    const r = this.c.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5);
    this.w = r.width; this.h = r.height; this.c.width = r.width * dpr; this.c.height = r.height * dpr;
    this.x.setTransform(dpr, 0, 0, dpr, 0, 0); if (this.mode) this.seed();
  }
  setMode(m) { this.mode = m; this.rgb = getComputedStyle(root).getPropertyValue("--glow-rgb").trim() || "227,145,90"; this.seed(); if (reduce) this.draw(0); }
  seed() {
    const W = this.w, H = this.h, A = W * H / 10000 * this.density, R = Math.random, m = this.mode;
    const n = { rain: A * 1.4, wind: A * .5, night: A * 1.1, forest: A * .12, sun: A * .18, dusk: A * .1 }[m] || 0;
    this.p = Array.from({ length: Math.min(Math.round(n), 520) }, () => ({ x: R() * W, y: R() * H, v: .5 + R(), s: R(), a: R() * 6.28, k: R() }));
    if (m === "night") this.p.forEach(p => p.y = R() * H * .62);
    this.shoot = null;
  }
  loop(t) { if (!this.on || reduce) return; this.draw(t); requestAnimationFrame(this.loop); }
  draw(t) {
    const x = this.x, W = this.w, H = this.h, m = this.mode, rgb = this.rgb;
    x.clearRect(0, 0, W, H);
    if (m === "rain") {
      x.strokeStyle = "rgba(205,225,238,.42)"; x.lineWidth = 1; x.beginPath();
      for (const p of this.p) { const l = 10 + p.v * 14; x.moveTo(p.x, p.y); x.lineTo(p.x - l * .28, p.y + l); p.y += 9 + p.v * 9; p.x -= 2.6 + p.v * 2; if (p.y > H) { p.y = -20; p.x = Math.random() * (W + 80); } }
      x.stroke();
    } else if (m === "wind") {
      for (const p of this.p) {
        if (p.k < .72) { x.strokeStyle = `rgba(240,236,224,${.08 + p.s * .16})`; x.lineWidth = 1; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(p.x + 40 + p.v * 60, p.y + Math.sin(p.a) * 3); x.stroke(); p.x -= 14 + p.v * 12; }
        else { x.save(); x.translate(p.x, p.y + Math.sin(t / 300 + p.a) * 10); x.rotate(t / 200 + p.a); x.fillStyle = `rgba(${rgb},.75)`; x.beginPath(); x.ellipse(0, 0, 4, 1.8, 0, 0, 6.28); x.fill(); x.restore(); p.x -= 6 + p.v * 5; }
        if (p.x < -120) { p.x = W + Math.random() * 100; p.y = Math.random() * H; }
      }
    } else if (m === "night") {
      for (const p of this.p) { const a = .25 + .75 * Math.abs(Math.sin(t / (900 + p.v * 900) + p.a)); x.fillStyle = `rgba(235,240,255,${a * (.35 + p.s * .65)})`; const r = p.s > .93 ? 1.6 : .9; x.fillRect(p.x, p.y, r, r); }
      if (!this.shoot && Math.random() < .004) this.shoot = { x: Math.random() * W * .7 + W * .2, y: Math.random() * H * .3, l: 0 };
      if (this.shoot) { const s = this.shoot; s.l += 14; const g = x.createLinearGradient(s.x, s.y, s.x - 90, s.y + 36); g.addColorStop(0, "rgba(255,255,255,.9)"); g.addColorStop(1, "rgba(255,255,255,0)"); x.strokeStyle = g; x.lineWidth = 1.4; x.beginPath(); x.moveTo(s.x, s.y); x.lineTo(s.x - 90, s.y + 36); x.stroke(); s.x -= 12; s.y += 5; if (s.l > 380) this.shoot = null; }
    } else if (m === "forest" || m === "sun" || m === "dusk") {
      const col = m === "forest" ? "210,255,140" : rgb;
      for (const p of this.p) {
        const f = m === "forest" ? (.4 + .6 * Math.abs(Math.sin(t / 700 + p.a))) : (.25 + p.s * .5);
        const r = m === "forest" ? 2.2 : 1.2 + p.s * 1.6;
        const g = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 5); g.addColorStop(0, `rgba(${col},${f})`); g.addColorStop(1, `rgba(${col},0)`);
        x.fillStyle = g; x.beginPath(); x.arc(p.x, p.y, r * 5, 0, 6.28); x.fill();
        p.x += Math.cos(p.a) * .35 * p.v; p.y += (m === "forest" ? Math.sin(p.a) * .3 : -.25 * p.v); p.a += (Math.random() - .5) * .08;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10; if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
      }
    }
  }
}
const canvases = [];
function weatherOn(canvas, density) { const w = new Weather(canvas, density); w.setMode(resolved()); canvases.push(w); return w; }
onTheme(t => canvases.forEach(w => w.setMode(t)));

/* ═══════════════ TREK BAND — the walkers ═══════════════ */
function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function ridgePts(rand, w, baseY, amp, rough) {
  let pts = [[0, baseY + (rand() - .5) * amp * .4], [w, baseY + (rand() - .5) * amp * .4]];
  for (let it = 0; it < 5; it++) { const nx = []; for (let i = 0; i < pts.length - 1; i++) { nx.push(pts[i]); nx.push([(pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2 + (rand() - .5) * amp * Math.pow(rough, it)]); } nx.push(pts[pts.length - 1]); pts = nx; }
  pts[pts.length - 1][1] = pts[0][1]; return pts;
}
const f0 = n => n.toFixed(0);
function strip(pts, W, H) { let s = "M" + f0(pts[0][0]) + " " + f0(pts[0][1]); for (let i = 1; i < pts.length; i++) s += "L" + f0(pts[i][0]) + " " + f0(pts[i][1]); for (let i = 1; i < pts.length; i++) s += "L" + f0(pts[i][0] + W) + " " + f0(pts[i][1]); return s + "L" + 2 * W + " " + H + "L0 " + H + "Z"; }
function caps(pts, W) {
  let hi = Infinity, lo = -Infinity; pts.forEach(p => { hi = Math.min(hi, p[1]); lo = Math.max(lo, p[1]); });
  const lim = hi + (lo - hi) * .42; let s = "";
  for (let i = 2; i < pts.length - 2; i++) { const p = pts[i]; if (p[1] < lim && p[1] < pts[i - 1][1] && p[1] <= pts[i + 1][1]) { const w = 7 + (lim - p[1]) * .16;
    for (const o of [0, W]) s += `<path d="M${f0(p[0] - w + o)} ${f0(p[1] + w * .78)}L${f0(p[0] + o)} ${f0(p[1])}L${f0(p[0] + w + o)} ${f0(p[1] + w * .72)}q-${f0(w)} -${f0(w * .42)} -${f0(w * 2)} .06Z" fill="#eef3f5" opacity=".5"/>`; } }
  return s;
}
function hiker(x, y, sc, delay, kind, umbrella) {
  const dd = `style="animation-delay:${delay}s"`, shoot = kind === "camera";
  const body = '<path d="M3.8 -32c5.3 0 7.8 3.4 7.8 8v7.8c0 3.5-2.5 5.4-5.9 5.4H3.8z" opacity=".92"/><path d="M4.2 -28h6.6M4.2 -23h6.6" stroke-width=".8" opacity=".28" fill="none"/><path d="M6.2 -34.4l1 2.2" stroke-width="1.4" fill="none" opacity=".6"/>' +
    '<path d="M0 -33.2V-17.4" stroke-width="6.4" fill="none"/><path d="M-2.2 -31l4.4 1.3" stroke-width="1.3" fill="none" opacity=".3"/><path d="M-1 -36.6v1.6" stroke-width="2.6" fill="none"/>' +
    '<circle cx="-1.3" cy="-40.2" r="4.1"/><path d="M-5.6 -41a4.5 4.5 0 0 1 8.8 0z" opacity=".8"/><path d="M-5.7 -40.8h9" stroke-width="1.4" fill="none" opacity=".55"/>';
  const arms = shoot ? '<path d="M-1 -30l-5.2 -3.2" stroke-width="2.8" fill="none"/><rect x="-11" y="-38.4" width="6.4" height="4.8" rx="1"/><circle cx="-7.8" cy="-36" r="1.4" fill="#000" opacity=".4"/>'
    : umbrella ? '<path d="M-1 -30l-3 -6" stroke-width="2.6" fill="none"/>' : `<path class="arm" ${dd} d="M-1 -30l-4 10.4" stroke-width="2.8" fill="none"/>`;
  const umb = umbrella ? `<g class="tx tx-rain"><g class="umb" ${dd}><path d="M-4 -36V-60" stroke-width="1.2" fill="none"/><path d="M-21 -58a17 11 0 0 1 34 0c-3-2.4-6-2.4-8.5 0-2.7-2.4-5.8-2.4-8.5 0-2.7-2.4-5.8-2.4-8.5 0-2.9-2.4-5.8-2.4-8.5 0z"/></g></g>` : "";
  const lamp = '<g class="tx tx-night"><path class="lamp" d="M-4 -41L-70 -58L-70 -22Z" fill="url(#tkLamp)" stroke="none"/><circle cx="-5" cy="-41.5" r="1.4" fill="#fff" stroke="none"/></g>';
  const dA = `style="animation-delay:${(delay + .66).toFixed(2)}s"`;
  const limb = '<path d="M-1.4 -17.4V-9.2" stroke-width="3.5" fill="none"/><g class="shin" DL><path d="M-1.4 -9.2V-.6" stroke-width="3.1" fill="none"/><path d="M-.4 -.4h-4.9" stroke-width="2.5" fill="none"/></g>';
  const legs = `<g class="leg leg--a" ${dd}>${limb.replace("DL", dA)}</g><g class="leg leg--b" ${dd}>${limb.replace("DL", dd)}</g>`;
  const pole = kind === "pole" ? `<g class="pole" ${dd}><path d="M-5.6 -28.5L-8.6 1.5" stroke-width="1.2" fill="none" opacity=".75"/></g>` : "";
  return `<g transform="translate(${x} ${y}) scale(${-sc},${sc})" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><ellipse class="puff" ${dd} cx="-2" cy="0" rx="3.4" ry="2" opacity="0"/>` +
    `<g class="lean"><g transform="rotate(${shoot ? -2 : -3.5})"><g class="bob" ${dd}>${lamp}${umb}${body}${arms}${pole}</g>${legs}</g></g></g>`;
}
const TREK_CAP = {
  dusk: "Dusk — last light on the ridge", sun: "Golden hour — worth every switchback", rain: "Rain — the coast doing what it does best",
  wind: "Wind — lean into it", forest: "Forest — old growth and mist", night: "Night — headlamps on, aurora overhead"
};
function trekBand() {
  const W = 1200, H = 340, rand = mulberry(hashStr("trek-band-v2"));
  const far = ridgePts(rand, W, H * .40, H * .115, .54), mid = ridgePts(rand, W, H * .585, H * .075, .56), walk = H * .775;
  let clouds = "", heavy = "", trees = "", big = "", fore = "", grass = "";
  for (let i = 0; i < 7; i++) { const x = rand() * W, y = H * (.10 + rand() * .26), w = 60 + rand() * 150, h = 7 + rand() * 13, o = (.05 + rand() * .09).toFixed(2);
    for (const off of [0, W]) clouds += `<ellipse cx="${f0(x + off)}" cy="${f0(y)}" rx="${f0(w)}" ry="${f0(h)}" fill="currentColor" opacity="${o}"/>`; }
  for (let i = 0; i < 14; i++) { const x = rand() * W, y = H * (.02 + rand() * .2), w = 90 + rand() * 170, h = 16 + rand() * 20;
    for (const off of [0, W]) heavy += `<ellipse cx="${f0(x + off)}" cy="${f0(y)}" rx="${f0(w)}" ry="${f0(h)}" fill="var(--tk-mid)" opacity=".85"/>`; }
  for (let i = 0; i < 34; i++) { const p = mid[Math.floor(rand() * (mid.length - 2)) + 1], t = 9 + rand() * 15, w = t * .34;
    for (const o of [0, W]) trees += `<path d="M${f0(p[0] + o)} ${f0(p[1] - t)}l${(w / 2).toFixed(1)} ${f0(t)}l${(-w / 2).toFixed(1)} ${(-t * .26).toFixed(1)}l${(-w / 2).toFixed(1)} ${(t * .26).toFixed(1)}Z"/>`; }
  for (let i = 0; i < 26; i++) { const x = rand() * W, base = walk + 4, t = 60 + rand() * 90, w = t * .3;
    for (const o of [0, W]) big += `<path d="M${f0(x + o)} ${f0(base - t)}l${f0(w * .5)} ${f0(t * .35)}h${f0(-w * .2)}l${f0(w * .45)} ${f0(t * .35)}h${f0(-w * .2)}l${f0(w * .45)} ${f0(t * .3)}h${f0(-w * 2)}l${f0(w * .45)} ${f0(-t * .3)}h${f0(-w * .2)}l${f0(w * .45)} ${f0(-t * .35)}h${f0(-w * .2)}Z"/>`; }
  for (let i = 0; i < 26; i++) { const x = rand() * W, y = walk + 16 + rand() * (H - walk - 18), r = 5 + rand() * 22;
    for (const o of [0, W]) fore += `<path d="M${f0(x + o - r)} ${f0(y + r * .5)}q${f0(r * .5)} -${f0(r)} ${f0(r)} -${f0(r * .25)}q${f0(r * .45)} -${f0(r * .55)} ${f0(r)} ${f0(r * .75)}Z"/>`; }
  for (let i = 0; i < 44; i++) { const x = rand() * W, y = walk + 6 + rand() * 20, h = 5 + rand() * 9, dx = (2 + rand() * 3).toFixed(0);
    for (const o of [0, W]) grass += `<path d="M${f0(x + o)} ${f0(y)}q1.5 -${f0(h * .6)} ${dx} -${f0(h)}" stroke="currentColor" stroke-width="1.1" fill="none" opacity=".55"/>`; }
  const trail = ridgePts(rand, W, walk + 9, H * .014, .5);
  let edge = "M" + f0(trail[0][0]) + " " + f0(trail[0][1]); for (let i = 1; i < trail.length; i++) edge += "L" + f0(trail[i][0]) + " " + f0(trail[i][1]); for (let i = 1; i < trail.length; i++) edge += "L" + f0(trail[i][0] + W) + " " + f0(trail[i][1]);
  const party = hiker(180, walk, .94, 0, "pole") + hiker(322, walk - 2, 1, .17, "plain", true) + hiker(478, walk - 3, .91, .35, "pole") + hiker(652, walk - 1, .96, .08, "plain", true) + hiker(828, walk + 1, .88, .26, "camera");
  const sx = W * .74, sy = H * .3;
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs>
    <linearGradient id="tkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--sky-a)"/><stop offset=".75" stop-color="var(--sky-b)"/><stop offset="1" stop-color="var(--sky-b)"/></linearGradient>
    <radialGradient id="tkSun"><stop offset="0" stop-color="var(--sun)" stop-opacity=".7"/><stop offset=".55" stop-color="var(--sun)" stop-opacity=".14"/><stop offset="1" stop-color="var(--sun)" stop-opacity="0"/></radialGradient>
    <linearGradient id="tkHaze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--sky-b)" stop-opacity="0"/><stop offset="1" stop-color="var(--sky-b)" stop-opacity=".8"/></linearGradient>
    <linearGradient id="tkLamp" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#fff6d8" stop-opacity=".75"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#tkSky)"/>
  <g style="opacity:var(--sun-op);transition:opacity 1s">
    <circle cx="${sx}" cy="${sy}" r="150" fill="url(#tkSun)"/>
    <circle cx="${sx}" cy="${sy}" r="${18}" fill="var(--sun)"/>
    <circle class="tx tx-night" cx="${sx + 9}" cy="${sy - 6}" r="15" fill="var(--sky-a)"/>
  </g>
  <g class="tk tk--cloud" style="--dur:150s" color="var(--fog)">${clouds}</g>
  <g class="tx tx-rain"><g class="tk" style="--dur:90s">${heavy}</g></g>
  <g class="tk" style="--dur:230s"><path d="${strip(far, W, H)}" fill="var(--tk-far)"/>${caps(far, W)}</g>
  <rect y="${f0(H * .26)}" width="${W}" height="${f0(H * .4)}" fill="url(#tkHaze)" opacity=".55"/>
  <g class="tk" style="--dur:120s" fill="var(--tk-mid)"><path d="${strip(mid, W, H)}"/>${trees}</g>
  <g class="tx tx-forest"><g class="tk" style="--dur:80s" fill="var(--tk-trail)" opacity=".95">${big}</g></g>
  <g class="tx tx-sun tx-dusk tx-wind"><g stroke="var(--fog-2)" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".7">
    <path class="bird" d="M168 74l10-8 10 8"/><path class="bird" d="M222 54l8-6.5 8 6.5" style="animation-delay:1.6s"/><path class="bird" d="M262 82l7-5.5 7 5.5" style="animation-delay:3s"/></g></g>
  <g class="tk" style="--dur:64s"><path d="${strip(trail, W, H)}" fill="var(--tk-trail)"/><path d="${edge}" stroke="var(--fog)" stroke-width="1" fill="none" opacity=".16"/></g>
  <g class="trek__party" color="var(--walker)">${party}</g>
  <g class="tk" style="--dur:30s" fill="var(--tk-ground)" opacity=".92">${fore}</g>
  <g class="tk tk--grass" style="--dur:22s" color="var(--walker)">${grass}</g>
</svg>`;
}
function mountTrek(slot) {
  slot.classList.add("trek");
  slot.innerHTML = `<div class="trek__aurora"></div>${trekBand()}<canvas class="wx"></canvas>`;
  const cap = d.createElement("div"); cap.className = "trek__cap mono";
  cap.innerHTML = `<span><b>●</b>&nbsp; Eleven hours of walking to be somewhere for twenty minutes</span><span data-trek-cap></span>`;
  slot.after(cap);
  weatherOn($("canvas", slot), 1);
  const upd = t => $$("[data-trek-cap]").forEach(el => el.textContent = TREK_CAP[t] || "");
  upd(resolved()); onTheme(upd);
}

/* ═══════════════ LIGHTBOX ═══════════════ */
const lb = d.createElement("div");
lb.className = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "Photograph viewer");
lb.innerHTML = `<div class="lb__top mono"><span class="lb__n"></span><button class="lb__x" aria-label="Close">✕</button></div>
  <div class="lb__stage"><button class="lb__nav lb__nav--p" aria-label="Previous">←</button><div class="lb__img"><img alt=""><span class="wm">© ${esc(SITE.creator)}</span></div><button class="lb__nav lb__nav--n" aria-label="Next">→</button></div>
  <div class="lb__cap"><div><h3></h3><p></p></div><div class="cr mono"></div></div>`;
d.body.append(lb);
const LB = { list: [], i: 0, last: null };
function lbShow() {
  const p = LB.list[LB.i], im = $(".lb__img img", lb);
  im.classList.add("load");
  const n = new Image(); n.src = IMG(p.img, 2000);
  const go = () => { im.src = n.src; im.alt = p.alt || p.title; im.classList.remove("load"); };
  n.complete ? go() : (n.onload = go, n.onerror = go);
  $("h3", lb).textContent = p.title;
  $(".lb__cap p", lb).textContent = [p.location, p.date && fmtDate(p.date), p.exif].filter(Boolean).join("  ·  ");
  $(".cr", lb).innerHTML = `© ${YEAR} ${esc(SITE.creator)}<br>All rights reserved`;
  $(".lb__n", lb).textContent = `${String(LB.i + 1).padStart(2, "0")} / ${String(LB.list.length).padStart(2, "0")}`;
  [LB.i - 1, LB.i + 1].forEach(j => { const q = LB.list[(j + LB.list.length) % LB.list.length]; if (q) new Image().src = IMG(q.img, 2000); });
}
function lbOpen(list, i) { LB.list = list; LB.i = i; LB.last = d.activeElement; lbShow(); lb.classList.add("open"); lock(true); $(".lb__x", lb).focus(); }
function lbClose() { if (!lb.classList.contains("open")) return; lb.classList.remove("open"); lock(false); if (LB.last) LB.last.focus(); }
const lbStep = s => { LB.i = (LB.i + s + LB.list.length) % LB.list.length; lbShow(); };
$(".lb__x", lb).onclick = lbClose; $(".lb__nav--p", lb).onclick = () => lbStep(-1); $(".lb__nav--n", lb).onclick = () => lbStep(1);
lb.addEventListener("click", e => { if (e.target === lb || e.target.classList.contains("lb__stage")) lbClose(); });
addEventListener("keydown", e => { if (!lb.classList.contains("open")) return; if (e.key === "Escape") lbClose(); if (e.key === "ArrowRight") lbStep(1); if (e.key === "ArrowLeft") lbStep(-1); });
let sx0 = null; const stage = $(".lb__stage", lb);
let sy0 = null;
stage.addEventListener("pointerdown", e => { sx0 = e.clientX; sy0 = e.clientY; });
stage.addEventListener("pointerup", e => { if (sx0 == null) return; const dx = e.clientX - sx0, dy = e.clientY - sy0;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) lbStep(dx < 0 ? 1 : -1); else if (dy > 90) lbClose(); sx0 = sy0 = null; });
d.addEventListener("click", e => {
  const t = e.target.closest("[data-photo]"); if (!t) return;
  e.preventDefault();
  const group = t.dataset.group || "all";
  const els = $$(`[data-photo][data-group="${group}"]`).filter(el => el.offsetParent !== null || el === t);
  const list = els.map(el => photo(el.dataset.photo)).filter(Boolean);
  const i = Math.max(0, els.indexOf(t));
  if (list.length) lbOpen(list, i);
});
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function fmtDate(s) { const [y, m] = String(s).split("-"); return m ? `${MONTHS[+m - 1]} ${y}` : y; }

/* ═══════════════ VIDEO MODAL ═══════════════ */
const vm = d.createElement("div");
vm.className = "vm"; vm.setAttribute("role", "dialog"); vm.setAttribute("aria-modal", "true"); vm.setAttribute("aria-label", "Video player");
vm.innerHTML = `<span class="vm__t mono"></span><button class="lb__x" aria-label="Close video">✕</button><div class="vm__box"></div>`;
d.body.append(vm);
const vmClose = () => { if (!vm.classList.contains("open")) return; vm.classList.remove("open"); $(".vm__box", vm).innerHTML = ""; lock(false); };
$(".lb__x", vm).onclick = vmClose;
vm.addEventListener("click", e => { if (e.target === vm) vmClose(); });
addEventListener("keydown", e => { if (e.key === "Escape" && vm.classList.contains("open")) vmClose(); });
d.addEventListener("click", e => {
  const a = e.target.closest("[data-video]"); if (!a) return;
  if (isFile) return; // opened from a folder: YouTube refuses to embed, so the link opens YouTube
  e.preventDefault();
  const id = ytId(a.dataset.video), v = a.dataset.vertical === "1";
  const box = $(".vm__box", vm); box.classList.toggle("v", v);
  box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1" title="${esc(a.dataset.title || "Video")}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
  $(".vm__t", vm).textContent = a.dataset.title || "";
  vm.classList.add("open"); lock(true); $(".lb__x", vm).focus();
});
const videoAttrs = (url, title, vertical) => `href="${esc(url)}" target="_blank" rel="noopener" data-video="${esc(url)}" data-title="${esc(title)}"${vertical ? ' data-vertical="1"' : ""}`;

/* ═══════════════ SHARED RENDERERS ═══════════════ */
const shortCard = s => { const id = ytId(s.url); return `<a class="short rv" ${videoAttrs(s.url, s.title, true)} aria-label="Play short: ${esc(s.title)}"><img src="${ytThumb(id, true)}" alt="" loading="lazy"><span class="short__b mono">${icon("youtube")} Short</span><span class="short__p">${playSvg}</span><span class="short__t">${esc(s.title)}</span></a>`; };
const moreCard = () => `<div class="more-card rv"><span class="mono" style="color:var(--glow)">New every few weeks</span><h4>More trails.<br><em>More fails.</em></h4><p>Shorts land on YouTube first — straight from the trail, before the long edit is done.</p><a class="btn btn--light" href="${esc((SOCIAL.find(s => s.key === "youtube") || {}).url || "#")}/shorts" target="_blank" rel="noopener">${icon("youtube")} All shorts</a></div>`;
const tile = (p, group, w = 900) => `<button class="ph tile rv" style="--ar:${p.ratio}" data-photo="${p.id}" data-group="${group}" data-cat="${esc(p.cat)}" aria-label="Open photograph: ${esc(p.title)}"><img src="${IMG(p.img, w, p.ratio)}" alt="${esc(p.alt)}" loading="lazy"><span class="wm">© ${esc(SITE.creator)}</span><span class="cap"><b>${esc(p.title)}</b><span>${esc(p.location)} · ${esc(p.cat)}</span></span></button>`;

function renderCollage(el) {
  if (!el) return;
  const prints = COLLAGE.map(c => { const p = photo(c.id); if (!p) return ""; const ar = p.ratio === "4/5" ? "4/5" : p.ratio === "16/9" ? "16/9" : "4/3";
    return `<button class="collage__p" data-photo="${p.id}" data-group="collage" data-depth="${c.d}" style="left:${c.l}%;top:${c.t}%;width:${c.w}%;--rot:${c.rot}deg;--ar:${ar}" aria-label="Open photograph: ${esc(p.title)}">
      <span class="ph" style="display:block"><img src="${IMG(p.img, 900, ar === "4/3" ? "4/3" : ar)}" alt="${esc(p.alt)}" loading="lazy"></span><span class="collage__cap"><span>${esc(p.title)}</span><span>${esc(p.location.split(",")[0])}</span></span></button>`; }).join("");
  el.innerHTML = `<div class="collage__bg"><img src="${IMG("u:clouds", 1600)}" alt="" loading="lazy"></div>
    <div class="collage__stage">
      <div class="collage__tl rv"><span class="mono" style="color:var(--glow)">The keepers</span><h2>The frames I'd <em style="color:var(--glow-2)">hang on a wall.</em></h2></div>
      <div class="collage__word" aria-hidden="true">Keepers</div>
      ${prints}
      <span class="collage__note" aria-hidden="true">worth the 4 a.m. alarm</span>
    </div>
    <div class="collage__br rv"><p>Out of thousands of frames each season, these are the ones that made it. Click any print to see it properly.</p><span class="mono" style="color:var(--fog-3)">${esc(SITE.coords)} — ${COLLAGE.length} prints</span></div>`;
  if (reduce) return;
  const ps = $$(".collage__p", el);
  const par = () => { if (innerWidth <= 900) return; const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    const k = (r.top + r.height / 2 - innerHeight / 2); ps.forEach(p => p.style.setProperty("--py", (k * -+p.dataset.depth * .35).toFixed(1) + "px")); };
  addEventListener("scroll", par, { passive: true }); par();
}

/* page hero: slides + timecode + canvas */
function mountHero(hero, slidesFor) {
  if (!hero) return;
  const wrap = $(".hero__slides", hero), dots = $$("#dots button", hero), cap = $("#cap", hero);
  let cur = 0, timer;
  const slides = () => $$(".slide:not(.old)", wrap);
  const go = n => {
    const s = slides(); if (!s.length) return;
    s[cur] && s[cur].classList.remove("is-on"); dots[cur] && dots[cur].classList.remove("is-on");
    cur = (n + s.length) % s.length;
    s[cur].classList.add("is-on");
    if (dots[cur]) { void dots[cur].offsetWidth; dots[cur].classList.add("is-on"); }
    if (cap) cap.textContent = `Scene 0${cur + 1} — ${s[cur].dataset.cap || ""}`;
    clearTimeout(timer); if (!reduce && s.length > 1) timer = setTimeout(() => go(cur + 1), 7000);
  };
  dots.forEach((b, i) => b.addEventListener("click", () => go(i)));
  const build = t => {
    const list = slidesFor(t); if (!list) return;
    const html = list.map(([src, c], i) => `<div class="slide ph" data-cap="${esc(c)}"><img src="${IMG(src, 2400)}" alt="" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></div>`).join("");
    const old = slides();
    wrap.insertAdjacentHTML("beforeend", html);
    const fresh = slides().slice(old.length);
    const first = $("img", fresh[0]);
    let done = false;
    const swap = () => { if (done) return; done = true; old.forEach(o => { o.classList.add("old"); o.classList.remove("is-on"); }); dots.forEach(x => x.classList.remove("is-on")); cur = 0; setTimeout(() => old.forEach(o => o.remove()), 1900); go(0); };
    first.complete ? swap() : (first.onload = swap, first.onerror = swap, setTimeout(swap, 1500));
  };
  wrap.innerHTML = ""; build(resolved());
  onTheme(build);
  const tc = $("#tc", hero);
  if (tc && !reduce) { const t0 = performance.now(), p = n => String(n).padStart(2, "0");
    let tcOn = true; new IntersectionObserver(es => { tcOn = es[0].isIntersecting; if (tcOn) tick(); }).observe(hero);
    const tick = () => { if (!tcOn) return; const s = (performance.now() - t0) / 1000; tc.textContent = `${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(Math.floor(s) % 60)}:${p(Math.floor((s % 1) * 24))}`; requestAnimationFrame(tick); }; tick(); }
  const cv = $("canvas.wx", hero); if (cv) weatherOn(cv, .6);
}

/* ═══════════════ HOME ═══════════════ */
function home() {
  mountHero($(".hero"), t => THEME_HERO[t] || THEME_HERO.dusk);

  // films
  const feat = FILMS.find(f => f.featured) || FILMS[0], rest = FILMS.filter(f => f !== feat);
  const fEl = $("#featured");
  if (fEl && feat) { const id = ytId(feat.url);
    fEl.outerHTML = `<a class="feature rv" id="featured" ${videoAttrs(feat.url, feat.title)} aria-label="Play: ${esc(feat.title)}"><img src="${ytThumb(id)}" alt="" loading="lazy"><span class="bigplay">${playSvg}</span><span class="feature__meta"><span class="badge mono"><span class="rec"></span>Latest film</span><h3>${esc(feat.title)}</h3></span></a>`; }
  const up = $("#upnext");
  if (up) up.innerHTML = `<h4 class="mono">Up next</h4>` + rest.map(f => `<a class="row rv" ${videoAttrs(f.url, f.title)}><span class="ph"><img src="${ytThumb(ytId(f.url))}" alt="" loading="lazy"></span><span><h5>${esc(f.title)}</h5><p class="mono">${esc(f.location || f.category || "")}</p></span></a>`).join("") +
    `<div class="side__note rv"><b>${FILMS.length} films · ${SHORTS.length} shorts</b> so far — and ${IN_THE_EDIT.length} more in the edit. <a class="link" href="films.html" style="margin-top:12px">Browse every film <span>→</span></a></div>`;
  const sh = $("#shelf"); if (sh) sh.innerHTML = SHORTS.map(shortCard).join("") + moreCard();

  // wildlife arrows
  const strip = $("#strip");
  if (strip) { const step = () => ($(".card", strip) || { offsetWidth: 300 }).offsetWidth + 18;
    $("#prev").onclick = () => strip.scrollBy({ left: -step(), behavior: "smooth" }); $("#next").onclick = () => strip.scrollBy({ left: step(), behavior: "smooth" }); }

  // journal hover preview
  const peek = $("#peek"), rows = $$(".jrow");
  if (peek && rows.length) {
    rows.forEach(r => { const im = new Image(); im.src = IMG(r.dataset.img, 700); im.alt = ""; peek.append(im); r._im = im; });
    let mx = 0, my = 0, px = 0, py = 0, raf;
    const follow = () => { px += (mx - px) * .15; py += (my - py) * .15; peek.style.left = px + "px"; peek.style.top = py + "px"; raf = requestAnimationFrame(follow); };
    rows.forEach(r => {
      r.addEventListener("mouseenter", e => { px = mx = e.clientX + 170; py = my = e.clientY; peek.classList.add("on"); r._im.classList.add("on"); cancelAnimationFrame(raf); follow(); });
      r.addEventListener("mouseleave", () => { peek.classList.remove("on"); r._im.classList.remove("on"); cancelAnimationFrame(raf); });
      r.addEventListener("mousemove", e => { mx = e.clientX + 170; my = e.clientY; });
    });
  }

  // statement lighting
  const st = $("#statement");
  if (st) {
    const wrapW = node => [...node.childNodes].forEach(n => { if (n.nodeType === 3) { const f = d.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(w => { if (!w) return; if (/^\s+$/.test(w)) f.append(w); else { const s = d.createElement("span"); s.className = "w"; s.textContent = w; f.append(s); } }); n.replaceWith(f); } else wrapW(n); });
    wrapW(st); const words = $$(".w", st);
    const light = () => { const r = st.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .35))); const n = Math.round(p * words.length); words.forEach((w, i) => w.classList.toggle("lit", i < n)); };
    if (reduce) words.forEach(w => w.classList.add("lit")); else { light(); addEventListener("scroll", light, { passive: true }); }
  }

  renderCollage($("#collage"));

  // instagram
  const ig = $("#ig");
  if (ig) {
    const I = INSTAGRAM;
    ig.innerHTML = `
      <div class="ig__top rv">
        <div class="ig__me"><span class="ig__av"><span class="ph" style="display:block"><img src="${IMG("u:filmer", 200, "1/1")}" alt=""></span></span><div><b>${esc(I.handle)}</b><span>${esc(SITE.creator)} · Solo traveller · BC</span></div></div>
        <a class="btn btn--light" href="${esc(I.url)}" target="_blank" rel="noopener">${icon("instagram")} Follow on Instagram</a>
      </div>
      <div class="rings rv" aria-label="Story highlights">${I.highlights.map(h => `<a class="ring" href="${esc(h.url || I.url)}" target="_blank" rel="noopener"><span class="o"><span class="ph" style="display:block"><img src="${IMG(h.img, 200, "1/1")}" alt="" loading="lazy"></span></span>${esc(h.label)}</a>`).join("")}</div>
      <div class="shorts__head" style="margin-top:0"><div><span class="mono" style="color:var(--fog-3)">Reels</span></div><div class="arrows"><button id="rprev" aria-label="Previous reels"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 3L5 8l5 5"/></svg></button><button id="rnext" aria-label="More reels"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 3l5 5-5 5"/></svg></button></div></div>
      <div class="reels" id="reels">${I.reels.map(r => `<a class="reel ph rv" href="${esc(r.url)}" target="_blank" rel="noopener" aria-label="Watch reel on Instagram${r.title ? ": " + esc(r.title) : ""}"><img src="${IMG(r.poster, 520, "9/16")}" alt="" loading="lazy">${r.file ? `<video src="${esc(r.file)}" muted loop playsinline preload="none"></video>` : ""}<span class="reel__i">${icon("reel")}</span><span class="reel__t">${esc(r.title || "Reel")}<span>Watch on Instagram ↗</span></span></a>`).join("")}</div>
      <div class="posts">${I.posts.map(p => `<a class="post ph rv" href="${esc(I.url)}" target="_blank" rel="noopener" aria-label="View on Instagram"><img src="${IMG(p, 400, "1/1")}" alt="" loading="lazy">${icon("heart")}</a>`).join("")}</div>`;
    const reels = $("#reels"), stepR = () => ($(".reel", reels) || { offsetWidth: 240 }).offsetWidth + 16;
    $("#rprev").onclick = () => reels.scrollBy({ left: -stepR() * 2, behavior: "smooth" }); $("#rnext").onclick = () => reels.scrollBy({ left: stepR() * 2, behavior: "smooth" });
    $$(".reel", reels).forEach(r => { const v = $("video", r); if (!v) return; r.addEventListener("mouseenter", () => { v.play().then(() => r.classList.add("playing")).catch(() => {}); }); r.addEventListener("mouseleave", () => { v.pause(); r.classList.remove("playing"); }); });
  }

  // social hub
  const hub = $("#bento");
  if (hub) {
    const yt = SOCIAL.find(s => s.key === "youtube"), igS = SOCIAL.find(s => s.key === "instagram");
    const card = s => { const [bc, bc2] = BRAND[s.key] || []; const soon = !s.url;
      return `<a class="sc rv${soon ? " sc--soon" : ""}" ${socialHref(s)} style="--bc:${bc};--bc2:${bc2}"><div class="sc__top"><span class="sc__ico">${icon(s.key)}</span>${soon ? '<span class="soon">Soon</span>' : `<span class="sc__arrow">${icon("arrow")}</span>`}</div><div><h3>${s.label}</h3><span class="h">${esc(s.handle)}</span><p>${esc(s.note)}</p></div></a>`; };
    hub.innerHTML =
      `<a class="sc sc--yt rv" ${socialHref(yt)} style="--bc2:#ff2d2d"><span class="ph"><img src="${ytThumb(ytId((FILMS.find(f => f.featured) || FILMS[0]).url))}" alt="" loading="lazy"></span>
        <div class="sc__body"><span class="sc__ico" style="background:#ff2d2d">${icon("youtube")}</span><h3>YouTube</h3><span class="h">${esc(yt.handle)}</span>
        <div class="row2"><span style="color:rgba(255,255,255,.75)">${FILMS.length} films · ${SHORTS.length} shorts · ${esc(yt.note)}</span><span class="btn btn--light">Open channel ↗</span></div></div></a>` +
      `<a class="sc sc--ig rv" ${socialHref(igS)} style="--bc:${BRAND.instagram[0]};--bc2:${BRAND.instagram[1]}"><div class="sc__top"><span class="sc__ico" style="background:${BRAND.instagram[1]}">${icon("instagram")}</span><span class="sc__arrow">${icon("arrow")}</span></div>
        <div class="thumbs">${INSTAGRAM.posts.slice(0, 4).map(p => `<span class="ph"><img src="${IMG(p, 300, "1/1")}" alt="" loading="lazy"></span>`).join("")}</div>
        <div><h3>Instagram</h3><span class="h">${esc(igS.handle)}</span><p>${esc(igS.note)}</p></div></a>` +
      SOCIAL.filter(s => s.key !== "youtube" && s.key !== "instagram").map(card).join("") +
      `<a class="sc sc--mail rv" href="mailto:${esc(SITE.email)}"><div class="sc__top"><span class="sc__ico">${icon("mail")}</span><span class="sc__arrow">${icon("arrow")}</span></div><div><h3>Email</h3><span class="h">${esc(SITE.email)}</span><p>Collaborations, licensing & press</p></div></a>`;
  }
}

/* ═══════════════ FILMS PAGE ═══════════════ */
function films() {
  mountHero($(".hero"), () => [["u:camfog", "Camera on the ridge, in the cloud"], ["u:filmer", "Filming the last light"]]);
  const feat = FILMS.find(f => f.featured) || FILMS[0];
  const pl = $("#player");
  if (pl && feat) { const id = ytId(feat.url);
    pl.innerHTML = `<a class="feature rv" ${videoAttrs(feat.url, feat.title)} aria-label="Play: ${esc(feat.title)}"><img src="${ytThumb(id)}" alt="" loading="lazy"><span class="bigplay">${playSvg}</span><span class="feature__meta"><span class="badge mono"><span class="rec"></span>Now showing</span></span></a>
      <div class="player__txt rv"><span class="mono" style="color:var(--glow)">Featured film</span><h2>${esc(feat.title)}</h2><p>${esc(feat.blurb || "")}</p>
      <dl class="meta"><div><dt>Category</dt><dd>${esc(feat.category || "Film")}</dd></div><div><dt>Location</dt><dd>${esc(feat.location || "British Columbia")}</dd></div><div><dt>Shot by</dt><dd>${esc(SITE.creator)}, solo</dd></div><div><dt>Watch</dt><dd>YouTube · free</dd></div></dl>
      <div class="cta-row"><a class="btn btn--light" ${videoAttrs(feat.url, feat.title)}><span class="play">${playSvg}</span>Play film</a><a class="btn btn--ghost" href="${esc(feat.url)}" target="_blank" rel="noopener">${icon("youtube")} On YouTube</a></div></div>`; }
  const cats = ["All", ...new Set(FILMS.map(f => f.category).filter(Boolean))];
  const chips = $("#fchips"), grid = $("#fgrid");
  if (grid) {
    grid.innerHTML = FILMS.map((f, i) => `<a class="fcard rv" data-cat="${esc(f.category || "")}" ${videoAttrs(f.url, f.title)}><span class="ph" style="display:block"><img src="${ytThumb(ytId(f.url))}" alt="" loading="lazy"><span class="bigplay">${playSvg}</span></span><div class="fcard__meta mono"><span>No. ${String(i + 1).padStart(2, "0")} · ${esc(f.category || "Film")}</span><span>${esc(f.location || "")}</span></div><h3>${esc(f.title)}</h3><p>${esc(f.blurb || "")}</p></a>`).join("");
    chips.innerHTML = cats.map((c, i) => `<button class="chip" aria-pressed="${!i}" data-c="${esc(c)}">${esc(c)} <small>${c === "All" ? FILMS.length : FILMS.filter(f => f.category === c).length}</small></button>`).join("");
    chips.addEventListener("click", e => { const b = e.target.closest(".chip"); if (!b) return; $$(".chip", chips).forEach(x => x.setAttribute("aria-pressed", x === b)); const c = b.dataset.c; $$(".fcard", grid).forEach(el => el.style.display = c === "All" || el.dataset.cat === c ? "" : "none"); });
  }
  const ed = $("#edit");
  if (ed) ed.innerHTML = IN_THE_EDIT.map(f => `<div class="fcard soon-card rv"><span class="ph" style="display:block" data-eta="In the edit · ${esc(f.eta)}"><img src="${IMG(f.img, 900, "16/9")}" alt="" loading="lazy"><span class="lock mono">● Coming soon</span></span><div class="fcard__meta mono"><span>Coming ${esc(f.eta)}</span><span>${esc(f.location)}</span></div><h3>${esc(f.title)}</h3></div>`).join("");
  const sh = $("#shelf"); if (sh) sh.innerHTML = SHORTS.map(shortCard).join("") + moreCard();
  const n = $("#fstats"); if (n) n.innerHTML = `<div><b>${FILMS.length}</b><span class="mono">Films</span></div><div><b>${SHORTS.length}</b><span class="mono">Shorts</span></div><div><b>${IN_THE_EDIT.length}</b><span class="mono">In the edit</span></div>`;
}

/* ═══════════════ PHOTOGRAPHY PAGE ═══════════════ */
function photography() {
  mountHero($(".hero"), () => [["u:clouds", "Above the inversion"], ["u:bear", "Salmon run"], ["u:tent", "Camp, 2100 m"]]);
  renderCollage($("#collage"));
  const g = $("#gallery"), chips = $("#pchips"), count = $("#pcount");
  if (!g) return;
  g.innerHTML = PHOTOS.map(p => tile(p, "gallery")).join("");
  const cats = ["All", ...new Set(PHOTOS.map(p => p.cat))];
  chips.innerHTML = cats.map((c, i) => `<button class="chip" aria-pressed="${!i}" data-c="${esc(c)}">${esc(c)} <small>${c === "All" ? PHOTOS.length : PHOTOS.filter(p => p.cat === c).length}</small></button>`).join("");
  const setC = c => { let n = 0; $$(".tile", g).forEach(t => { const on = c === "All" || t.dataset.cat === c; t.classList.toggle("hide", !on); if (on) { n++; t.classList.add("in"); } }); count.textContent = `${n} photograph${n === 1 ? "" : "s"}`; };
  chips.addEventListener("click", e => { const b = e.target.closest(".chip"); if (!b) return; $$(".chip", chips).forEach(x => x.setAttribute("aria-pressed", x === b)); setC(b.dataset.c); });
  setC("All");
  const n = $("#pstats"); if (n) n.innerHTML = `<div><b>${PHOTOS.length}</b><span class="mono">Photographs</span></div><div><b>${cats.length - 1}</b><span class="mono">Collections</span></div><div><b>${PHOTOS.filter(p => p.cat === "Wildlife").length}</b><span class="mono">Wildlife frames</span></div>`;
}

d.addEventListener("click", e => { const b = e.target.closest("[data-theme-opt]"); if (!b) return; setTheme(b.dataset.themeOpt); const tp = $("#tpop"); if (tp) tp.classList.remove("open"); });
window.ST = { IMG, ytId, ytThumb, icon, ICONS, TICONS, SWATCH, BRAND, esc, toast, setTheme, onTheme, resolved, applyTheme, lock,
  lbOpen, weatherOn, mountTrek, mountHero, videoAttrs, photo, socialHref, shortCard, tile, renderCollage, playSvg, fmtDate, TREK_CAP,
  get live() { return live; } };
/* ═══════════════ BOOT ═══════════════ */
applyTheme();
// fill static photo slots (<… data-photo="p04" data-fill>) from PHOTOS
$$("[data-photo][data-fill]").forEach(el => { const p = photo(el.dataset.photo); if (!p) return;
  el.insertAdjacentHTML("afterbegin", `<img src="${IMG(p.img, +el.dataset.fill || 1200, el.dataset.ratio)}" alt="${esc(p.alt)}" loading="lazy">`);
  if (el.classList.contains("fr")) el.insertAdjacentHTML("beforeend", `<span class="cap mono"><span>${esc(p.title)}</span><span>${esc(p.location.split(",")[0])}</span></span>`);
  if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "Open photograph: " + p.title); });
$$("[data-photo] [data-photo-img]").forEach(el => { const p = photo(el.closest("[data-photo]").dataset.photo); if (p) el.insertAdjacentHTML("afterbegin", `<img src="${IMG(p.img, 700, "3/4")}" alt="${esc(p.alt)}" loading="lazy">`); });
$$("[data-mail]").forEach(a => a.href = "mailto:" + SITE.email);
if (PAGE === "home") home(); else if (PAGE === "films") films(); else if (PAGE === "photography") photography();
$$(".trek-slot").forEach(mountTrek);
fetchLive();

// reveal on scroll, with a safety net so nothing can stay hidden
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px", threshold: .04 });
const watch = () => $$(".rv:not(.in),.rv-img:not(.in)").forEach(el => io.observe(el));
window.ST.watch = watch;
watch();
setTimeout(() => $$(".rv:not(.in),.rv-img:not(.in)").forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add("in"); }), 2500);
addEventListener("load", () => setTimeout(watch, 100));
})();
