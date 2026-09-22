/* ════════════════════════════════════════════════════════════════════
   SELFISH TRAVELLER — CINEMA LAYER  (loads after data.js, site.js, mobile.js)
   Altimeter · viewfinder cursor · Roll 01 contact sheet ·
   hero depth pull · scrambled chapter titles · magnetic buttons · ambient sound.
   Everything is additive: delete this file + cinema.css to go back.
   ════════════════════════════════════════════════════════════════════ */
(() => {
"use strict";
const d = document, root = d.documentElement, S = window.ST || {};
const $ = (s, c = d) => c.querySelector(s), $$ = (s, c = d) => [...c.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
const isMob = () => (S.mobile ? S.mobile() : innerWidth <= 760);
const PAGE = d.body.dataset.page || "home";
const esc = S.esc || (x => String(x));
const IMG = S.IMG || (x => x);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const fmt = n => Math.round(n).toLocaleString("en-CA");

/* Mount Waddington, the highest peak entirely in BC. The page is the climb. */
const SUMMIT = { m: 4019, name: "Mt Waddington" };

/* ═══════════════ 2. ALTIMETER — scrolling is climbing ═══════════════ */
const CAMPS = [
  ["#top", "Trailhead"], ["#about", "Base camp"], ["#films", "Camp I · Films"], ["#wild", "Camp II · Wildlife"],
  ["#journal", "Camp III · Journal"], ["#roll", "High camp · Roll 01"], ["#instagram", "The col · Reels"], ["#collab", "Summit · Work with me"]
];
function altimeter() {
  const bar = d.createElement("div"); bar.className = "ascent"; d.body.append(bar);
  const a = d.createElement("nav");
  a.className = "alti"; a.setAttribute("aria-label", "Page altitude");
  a.innerHTML = `<div class="alti__scale"><i class="alti__fill" id="altF"></i><i class="alti__mark" id="altM"></i>
      <span class="alti__end alti__end--t">${fmt(SUMMIT.m)} m · ${SUMMIT.name}</span>
      <span class="alti__tag" id="altT"><b><span id="altN">0</span><small>m</small></b><span class="dir" id="altD">▲ ascending</span><span id="altO">Air 100%</span></span></div>`;
  d.body.append(a);
  const scale = $(".alti__scale", a);
  let camps = [];
  const place = () => {
    $$(".alti__camp", a).forEach(c => c.remove());
    const max = Math.max(1, d.documentElement.scrollHeight - innerHeight);
    camps = CAMPS.map(([sel, label]) => { const t = $(sel); if (!t || !t.offsetParent && t.id !== "top") return null;
      const p = clamp((t.getBoundingClientRect().top + scrollY) / max);
      const b = d.createElement("button"); b.className = "alti__camp"; b.dataset.label = `${label} · ${fmt(p * SUMMIT.m)} m`;
      b.setAttribute("aria-label", label); b.style.bottom = (p * 100) + "%";
      b.addEventListener("click", () => t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }));
      scale.append(b); return { b, p }; }).filter(Boolean);
  };
  let last = scrollY, dir = 1;
  const upd = () => {
    const max = Math.max(1, d.documentElement.scrollHeight - innerHeight), p = clamp(scrollY / max);
    if (Math.abs(scrollY - last) > 2) { dir = scrollY > last ? 1 : -1; last = scrollY; }
    const m = p * SUMMIT.m;
    $("#altN").textContent = fmt(m);
    $("#altD").textContent = dir > 0 ? "▲ ascending" : "▼ descending";
    $("#altO").textContent = `Air ${Math.round(100 * Math.exp(-m / 7900))}%`;
    $("#altF").style.height = (p * 100) + "%";
    $("#altM").style.bottom = (p * 100) + "%"; $("#altT").style.bottom = (p * 100) + "%";
    const rl = $("#roll"); if (rl && !rl.classList.contains("roll--swipe")) { const r = rl.getBoundingClientRect(); a.classList.toggle("dim", r.top < innerHeight * .5 && r.bottom > innerHeight * .5); }
    const sb = $(".snd"); if (sb) sb.classList.toggle("show", scrollY > innerHeight * .6);
    camps.forEach(c => c.b.classList.toggle("passed", p >= c.p - .002));
    a.classList.toggle("on", scrollY > innerHeight * .35); a.classList.toggle("near-top", p > .9);
    bar.style.transform = `scaleX(${p})`;
  };
  place(); upd();
  addEventListener("scroll", upd, { passive: true });
  addEventListener("resize", () => { place(); upd(); });
  addEventListener("load", () => setTimeout(() => { place(); upd(); }, 300));
  S.cinePlace = () => { place(); upd(); };
}

/* ═══════════════ 3. VIEWFINDER CURSOR ═══════════════ */
function cursor() {
  if (!fine || reduce) return;
  const vf = d.createElement("div"); vf.className = "vf is-hidden"; vf.setAttribute("aria-hidden", "true");
  vf.innerHTML = `<div class="vf__dot"></div><div class="vf__box"><i></i><i></i><i></i><i></i><span class="vf__lab"></span></div>`;
  d.body.append(vf); root.classList.add("cine-cursor");
  const dot = $(".vf__dot", vf), box = $(".vf__box", vf), lab = $(".vf__lab", vf);
  let x = -100, y = -100, bx = x, by = y;
  addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; vf.classList.remove("is-hidden"); }, { passive: true });
  d.addEventListener("mouseleave", () => vf.classList.add("is-hidden"));
  addEventListener("mousedown", () => vf.classList.add("is-down")); addEventListener("mouseup", () => vf.classList.remove("is-down"));
  d.addEventListener("mouseover", e => {
    const t = e.target;
    const media = t.closest("[data-video],.feature,.short,.reel,[data-photo],.frame,.jrow,.collage__p");
    const link = t.closest("a,button,[role=button],label,select");
    const typing = t.closest("input,textarea,iframe");
    vf.classList.toggle("is-hidden", !!typing);
    vf.classList.toggle("is-media", !!media);
    vf.classList.toggle("is-link", !media && !!link);
    if (media) lab.textContent = media.matches("[data-video],.feature,.short") ? "▶ Play" : media.matches(".reel") ? "▶ Reel" : media.matches(".jrow") ? "Read" : "View";
  });
  const loop = () => { bx += (x - bx) * .2; by += (y - by) * .2;
    dot.style.transform = `translate(${x}px,${y}px)`; box.style.transform = `translate(${bx}px,${by}px)`; requestAnimationFrame(loop); };
  loop();
}

/* ═══════════════ 4. ROLL 01 — a contact sheet of every frame ═══════════════ */
const KEEP = [
  "M8 58 C 6 26, 40 6, 70 10 C 96 14, 99 52, 88 76 C 74 99, 24 98, 10 78 C 2 66, 12 40, 30 30",
  "M12 30 C 30 6, 82 4, 94 34 C 104 62, 80 96, 46 94 C 14 92, 0 66, 8 42 C 12 30, 22 22, 36 18"
];
function roll() {
  if (PAGE !== "home" || typeof PHOTOS === "undefined") return;
  const keepers = new Set((typeof COLLAGE !== "undefined" ? COLLAGE : []).map(c => c.id));
  const list = [...PHOTOS].sort((a, b) => String(a.date).localeCompare(String(b.date)));
  const swipe = !fine || innerWidth < 900 || reduce;
  const sec = d.createElement("section");
  sec.className = "roll" + (swipe ? " roll--swipe" : "");
  sec.id = "roll"; sec.setAttribute("aria-label", "Roll 01 — contact sheet");
  sec.innerHTML = `<div class="roll__pin">
      <div class="wrap roll__head">
        <div><div class="chapter mono"><b>05</b> Contact sheet</div><h2 class="h2">Roll 01 — <em>every frame kept</em></h2></div>
        <div class="roll__count">Frame<b><span id="rN">01</span> / ${String(list.length).padStart(2, "0")}</b>${keepers.size} keepers marked</div>
      </div>
      <div class="film-scroll"><div class="film" id="film">${list.map((p, i) => {
        const n = i + 1, k = keepers.has(p.id);
        return `<button class="frame${k ? " keeper" : ""}" data-photo="${p.id}" data-group="roll" data-ar="${p.ratio === "4/5" ? "4/5" : p.ratio === "16/9" ? "16/9" : "3/2"}" aria-label="Open photograph: ${esc(p.title)}">
          <span class="frame__no">▸ ${n}${n % 2 ? "" : "A"}</span>
          <img src="${IMG(p.img, 900, p.ratio)}" alt="${esc(p.alt)}" loading="lazy" draggable="false">
          <span class="frame__cap"><b>${esc(p.title)}</b><span>${esc(p.location)} · ${esc(p.exif || p.cat)}</span></span>
          <span class="frame__edge">SELFISH 400 · ${String(n).padStart(2, "0")}</span>
          ${k ? `<svg class="keep" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" vector-effect="non-scaling-stroke" d="${KEEP[i % 2]}"/></svg><span class="keep-tag">keeper!</span>` : ""}
        </button>`; }).join("")}</div></div>
      <div class="wrap"><div class="roll__bar"><i id="rB"></i></div>
        <div class="roll__hint" style="margin-top:12px"><span>${swipe ? "Swipe the strip" : "Keep scrolling — the roll winds on"}</span><span>Red pencil = my picks</span></div></div>
    </div>`;

  // where it goes: after the Frames grid on desktop, after the photo grid in the phone layout
  const mobHost = isMob() && $("#mob #photos");
  if (mobHost) mobHost.after(sec);
  else { const f = $("#frames"); if (!f) return; sec.classList.add("dsk"); f.after(sec); }

  const film = $("#film", sec), frames = $$(".frame", sec), rN = $("#rN", sec), rB = $("#rB", sec);
  const focus = () => { const cx = innerWidth / 2; let best = 0, bd = 1e9;
    frames.forEach((f, i) => { const r = f.getBoundingClientRect(), dd = Math.abs(r.left + r.width / 2 - cx); if (dd < bd) { bd = dd; best = i; } });
    frames.forEach((f, i) => { const on = i === best; f.classList.toggle("lit", on); if (on && f.classList.contains("keeper")) f.classList.add("drawn"); });
    if (rN.textContent !== String(best + 1).padStart(2, "0") && swipe && navigator.vibrate && S.touched) navigator.vibrate(6);
    rN.textContent = String(best + 1).padStart(2, "0"); };

  if (swipe) {
    const sc = $(".film-scroll", sec);
    const upd = () => { const max = Math.max(1, sc.scrollWidth - sc.clientWidth); rB.style.width = (sc.scrollLeft / max * 100) + "%"; focus(); };
    sc.addEventListener("scroll", upd, { passive: true });
    new IntersectionObserver(es => { if (es[0].isIntersecting) upd(); }, { threshold: .4 }).observe(sec);
    if (reduce) frames.forEach(f => f.classList.add("drawn"));
    return;
  }
  // desktop: pin the section and wind the strip sideways as you scroll down
  let travel = 0;
  const size = () => { travel = Math.max(0, film.scrollWidth - innerWidth); sec.style.height = (travel + innerHeight) + "px"; S.cinePlace && S.cinePlace(); };
  const upd = () => { const r = sec.getBoundingClientRect(), p = clamp(-r.top / Math.max(1, travel));
    film.style.transform = `translate3d(${-p * travel}px,0,0)`; rB.style.width = (p * 100) + "%";
    if (r.top < innerHeight && r.bottom > 0) focus(); };
  size(); upd();
  addEventListener("scroll", upd, { passive: true });
  addEventListener("resize", () => { size(); upd(); });
  $$("img", film).forEach(im => im.complete || im.addEventListener("load", () => { size(); upd(); }, { once: true }));
}

/* ═══════════════ 5. HERO DEPTH PULL — the lens racks focus as you leave ═══════════════ */
function heroPull() {
  const hero = $(".hero"); if (!hero || reduce) return;
  const slides = $(".hero__slides", hero), body = $(".hero__body", hero), foot = $(".hero__foot", hero);
  let ticking = false;
  const upd = () => { ticking = false;
    const p = clamp(scrollY / hero.offsetHeight);
    const t = S.tilt || { x: 0, y: 0 }, base = isMob() ? 1.08 : 1;
    if (slides) slides.style.transform = `translate3d(${t.x}px,calc(${p * 18}% + ${t.y}px),0) scale(${base + p * .12})`;
    if (body) { body.style.transform = `translate3d(0,${-p * 90}px,0)`; body.style.opacity = 1 - p * 1.3; if (!isMob()) body.style.filter = p > .01 ? `blur(${p * 7}px)` : ""; }
    if (foot) foot.style.opacity = 1 - p * 2.2; };
  const kick = () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } };
  addEventListener("scroll", kick, { passive: true });
  S.heroKick = kick;
  upd();
}

/* ═══════════════ 6. SCRAMBLED CHAPTER TITLES ═══════════════ */
function scramble() {
  if (reduce) return;
  const CH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·—";
  const run = el => {
    const node = [...el.childNodes].reverse().find(n => n.nodeType === 3 && n.textContent.trim());
    if (!node) return;
    const final = node.textContent, t0 = performance.now(), dur = 900;
    const step = t => { const p = clamp((t - t0) / dur), n = Math.floor(final.length * p);
      node.textContent = final.slice(0, n) + final.slice(n).replace(/\S/g, () => CH[Math.random() * CH.length | 0]);
      if (p < 1) requestAnimationFrame(step); else node.textContent = final; };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: 1 });
  $$(".chapter,.mhead .k").forEach(c => { c.classList.add("scr"); io.observe(c); });
}

/* ═══════════════ 7. MAGNETIC BUTTONS ═══════════════ */
function magnetic() {
  if (!fine || reduce) return;
  $$(".btn,.tbtn,.arrows button").forEach(b => {
    b.classList.add("mag");
    b.addEventListener("mousemove", e => { const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .28}px,${(e.clientY - r.top - r.height / 2) * .38}px)`; });
    b.addEventListener("mouseleave", () => { b.style.transform = ""; });
  });
}

/* ═══════════════ 8. AMBIENT SOUND — generated live, follows the theme ═══════════════ */
function sound() {
  const btn = d.createElement("button");
  btn.className = "snd"; btn.type = "button"; btn.setAttribute("aria-pressed", "false");
  btn.innerHTML = `<span class="snd__bars"><i></i><i></i><i></i><i></i></span><span id="sndL">Sound off</span>`;
  if (!isMob()) d.body.append(btn);
  let ctx, master, layers = {}, timers = [];
  const noise = (type) => { const len = ctx.sampleRate * 4, buf = ctx.createBuffer(1, len, ctx.sampleRate), o = buf.getChannelData(0);
    let last = 0; for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; if (type === "brown") { last = (last + .02 * w) / 1.02; o[i] = last * 3.5; } else o[i] = w; }
    const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; return s; };
  const build = () => {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    // wind: brown noise through a moving low-pass, with slow gusts
    const w = noise("brown"), lp = ctx.createBiquadFilter(), wg = ctx.createGain();
    lp.type = "lowpass"; lp.frequency.value = 500; w.connect(lp).connect(wg).connect(master); w.start();
    // rain: white noise, band-passed high
    const r = noise("white"), bp = ctx.createBiquadFilter(), rg = ctx.createGain();
    bp.type = "bandpass"; bp.frequency.value = 2600; bp.Q.value = .5; rg.gain.value = 0; r.connect(bp).connect(rg).connect(master); r.start();
    layers = { lp, wg, rg };
    const gust = () => { const t = ctx.currentTime, k = resolvedTheme() === "wind" ? 1.8 : 1;
      lp.frequency.setTargetAtTime(300 + Math.random() * 700 * k, t, 1.5); wg.gain.setTargetAtTime(.25 + Math.random() * .45 * k, t, 1.8);
      timers.push(setTimeout(gust, 2500 + Math.random() * 3000)); };
    const chirp = () => { const th = resolvedTheme();
      if (th === "forest" || th === "sun" || th === "dusk") bird(); if (th === "night") cricket();
      timers.push(setTimeout(chirp, 1400 + Math.random() * 4200)); };
    gust(); chirp();
  };
  const bird = () => { const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain(), f = 2600 + Math.random() * 1800, notes = 2 + (Math.random() * 3 | 0);
    o.type = "sine"; o.connect(g).connect(master); g.gain.value = 0;
    for (let i = 0; i < notes; i++) { const s = t + i * .13; o.frequency.setValueAtTime(f, s); o.frequency.exponentialRampToValueAtTime(f * (1.25 + Math.random() * .3), s + .08);
      g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(.045, s + .02); g.gain.linearRampToValueAtTime(0, s + .1); }
    o.start(t); o.stop(t + notes * .13 + .1); };
  const cricket = () => { const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.value = 4400 + Math.random() * 300; o.connect(g).connect(master); g.gain.value = 0;
    for (let i = 0; i < 9; i++) { const s = t + i * .045; g.gain.setValueAtTime(.018, s); g.gain.setValueAtTime(0, s + .025); }
    o.start(t); o.stop(t + .5); };
  const resolvedTheme = () => (S.resolved ? S.resolved() : root.dataset.theme);
  const mood = () => { if (!ctx) return; const th = resolvedTheme(), t = ctx.currentTime;
    layers.rg.gain.setTargetAtTime(th === "rain" ? .22 : 0, t, 1); };
  if (S.onTheme) S.onTheme(mood);
  let on = false;
  const label = () => on ? `Sound · ${resolvedTheme()}` : "Sound off";
  const paint = () => { btn.classList.toggle("on", on); btn.setAttribute("aria-pressed", on); $("#sndL", btn).textContent = label();
    $$("[data-snd]").forEach(x => { x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); const l = $(".lbl", x); if (l) l.textContent = on ? `On · ${resolvedTheme()}` : "Off"; }); };
  const toggle = () => { if (!ctx) build(); on = !on; ctx.resume();
    master.gain.setTargetAtTime(on ? .55 : 0, ctx.currentTime, .6); mood(); paint(); };
  btn.addEventListener("click", toggle);
  if (S.onTheme) S.onTheme(paint);
  S.sound = { toggle, paint, isOn: () => on };
}


/* ═══════════════ 9. PHONES — built for the thumb ═══════════════ */
const MCAMPS = [
  ["#top", "Trailhead", "Start"], ["#instagram", "Base camp", "Stories"], ["#films", "Camp I", "Films"], ["#wild", "Camp II", "Wildlife"],
  ["#photos", "Camp III", "Photographs"], ["#roll", "High camp", "Roll 01"], ["#about", "The col", "About Aman"],
  ["#follow", "The ridge", "Follow"], ["#collab", "Summit", "Work together"]
];
function phone() {
  if (!isMob()) return;
  d.addEventListener("touchstart", () => { S.touched = true; }, { once: true, passive: true });

  /* ── tilt: the hero shifts as you tilt the phone, like looking through a window ── */
  if (!reduce) {
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, base = null;
    const onTilt = e => { if (e.gamma == null) return;
      if (!base) base = { g: e.gamma, b: e.beta };
      tx = clamp((e.gamma - base.g) / 25, -1, 1) * -16; ty = clamp((e.beta - base.b) / 25, -1, 1) * -12;
      if (!raf) raf = requestAnimationFrame(step); };
    const step = () => { raf = 0; cx += (tx - cx) * .12; cy += (ty - cy) * .12; S.tilt = { x: cx, y: cy }; S.heroKick && S.heroKick();
      if (Math.abs(tx - cx) > .1 || Math.abs(ty - cy) > .1) raf = requestAnimationFrame(step); };
    const start = () => addEventListener("deviceorientation", onTilt, { passive: true });
    const DOE = window.DeviceOrientationEvent;
    if (DOE && typeof DOE.requestPermission === "function") {
      // iPhone asks once, on the first tap anywhere
      d.addEventListener("touchend", () => DOE.requestPermission().then(r => r === "granted" && start()).catch(() => {}), { once: true });
    } else if (DOE) start();
  }

  /* ── tap to focus: a camera focus square wherever a photo or film is tapped ── */
  const af = d.createElement("div"); af.className = "af"; af.setAttribute("aria-hidden", "true"); af.innerHTML = "<i></i><span>AF·L</span>"; d.body.append(af);
  d.addEventListener("pointerdown", e => {
    if (e.pointerType === "mouse") return;
    const m = e.target.closest("[data-video],.feature,.short,.reel,[data-photo],.frame,.pt,.m-ring,.latest,.arow");
    if (!m) return;
    af.style.left = e.clientX + "px"; af.style.top = e.clientY + "px";
    af.classList.remove("go"); void af.offsetWidth; af.classList.add("go");
    if (navigator.vibrate) navigator.vibrate(8);
  }, { passive: true });

  if (PAGE !== "home") return;

  /* ── altitude chip over the tab bar + a "route" sheet to jump between camps ── */
  const chip = d.createElement("button");
  chip.className = "achip"; chip.type = "button"; chip.setAttribute("aria-haspopup", "dialog");
  chip.innerHTML = `<i class="achip__ring"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5" pathLength="100"/><circle class="p" cx="18" cy="18" r="15.5" pathLength="100"/></svg><b>▲</b></i>
    <span><b id="acM">0 m</b><small id="acC">Trailhead</small></span>`;
  d.body.append(chip);

  const scrim = d.createElement("div"); scrim.className = "scrim fx route-scrim"; d.body.append(scrim);
  const sheet = d.createElement("div");
  sheet.className = "bsheet fx route"; sheet.setAttribute("role", "dialog"); sheet.setAttribute("aria-modal", "true"); sheet.setAttribute("aria-label", "The route");
  d.body.append(sheet);

  let camps = [];
  const W = 320, H = 120;
  const prof = p => { const n = Math.sin(p * 23) * .05 + Math.sin(p * 51 + 1) * .025; return H - 10 - (p * .82 + n + .04) * (H - 22); };
  const measure = () => { const max = Math.max(1, d.documentElement.scrollHeight - innerHeight);
    camps = MCAMPS.map(([sel, name, what]) => { const t = $(sel); if (!t || (!t.offsetParent && sel !== "#top")) return null;
      return { t, name, what, p: clamp((t.getBoundingClientRect().top + scrollY) / max) }; }).filter(Boolean); };
  const draw = () => {
    let path = "";
    for (let i = 0; i <= 80; i++) { const p = i / 80; path += (i ? "L" : "M") + (p * W).toFixed(1) + " " + prof(p).toFixed(1); }
    sheet.innerHTML = `<div class="grab"></div>
      <div class="route__head"><div><span class="mono">The route</span><h3>${fmt(SUMMIT.m)} m to <em>the summit</em></h3></div><button class="route__x" aria-label="Close">✕</button></div>
      <svg class="route__svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--glow)" stop-opacity=".35"/><stop offset="1" stop-color="var(--glow)" stop-opacity="0"/></linearGradient>
        <clipPath id="rc"><rect id="rcr" x="0" y="0" width="0" height="${H}"/></clipPath></defs>
        <path d="${path}L${W} ${H}L0 ${H}Z" fill="var(--ink-3)"/>
        <path d="${path}L${W} ${H}L0 ${H}Z" fill="url(#rg)" clip-path="url(#rc)"/>
        <path d="${path}" fill="none" stroke="var(--line-2)" stroke-width="1.2" vector-effect="non-scaling-stroke"/>
        <path d="${path}" fill="none" stroke="var(--glow)" stroke-width="2" vector-effect="non-scaling-stroke" clip-path="url(#rc)"/>
      </svg>
      <div class="route__pins">${camps.map((c, i) => `<i style="left:${c.p * 100}%;top:${prof(c.p) / H * 100}%" data-i="${i}"></i>`).join("")}<b class="route__me" id="rMe"></b></div>
      <ol class="route__list">${camps.map((c, i) => `<li><button data-i="${i}"><span class="n mono">${String(i).padStart(2, "0")}</span><span><b>${c.name}</b><small>${c.what}</small></span><span class="m mono">${fmt(c.p * SUMMIT.m)} m</span></button></li>`).join("")}</ol>
      <button class="route__snd" data-snd aria-pressed="false"><span class="snd__bars"><i></i><i></i><i></i><i></i></span><span><b>Sound of the trail</b><small>Wind, rain, birds or crickets, matching the site's weather</small></span><span class="lbl mono">Off</span></button>`;
    $(".route__x", sheet).onclick = close;
    $$(".route__list button", sheet).forEach(b => b.onclick = () => { const c = camps[+b.dataset.i]; close(); setTimeout(() => c.t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }), 280); });
    $(".route__snd", sheet).onclick = () => S.sound && S.sound.toggle();
    S.sound && S.sound.paint();
  };
  const open = () => { measure(); upd(); draw(); sheet.classList.add("open"); upd(); S.lock && S.lock(true); scrim.classList.add("open"); if (navigator.vibrate) navigator.vibrate(10); };
  function close() { sheet.classList.remove("open"); scrim.classList.remove("open"); S.lock && S.lock(false); }
  chip.addEventListener("click", open); scrim.addEventListener("click", close);
  let sy = null; sheet.addEventListener("touchstart", e => { sy = sheet.scrollTop <= 0 ? e.touches[0].clientY : null; }, { passive: true });
  sheet.addEventListener("touchend", e => { if (sy != null && e.changedTouches[0].clientY - sy > 70) close(); sy = null; });

  const hero = $(".hero");
  let lastCamp = -1, curP = 0, ci = 0;
  const upd = () => {
    const isOpen = sheet.classList.contains("open");   // the scroll lock resets scrollY while the sheet is up
    if (!isOpen) { const max = Math.max(1, d.documentElement.scrollHeight - innerHeight); curP = clamp(scrollY / max);
      ci = 0; camps.forEach((c, i) => { if (c.t.getBoundingClientRect().top < innerHeight * .45) ci = i; }); }
    const p = curP;
    $("#acM").textContent = fmt(p * SUMMIT.m) + " m";
    if (camps[ci]) $("#acC").textContent = `${camps[ci].name} · ${camps[ci].what}`;
    if (ci !== lastCamp && lastCamp !== -1) { chip.classList.remove("bump"); void chip.offsetWidth; chip.classList.add("bump"); if (navigator.vibrate && S.touched) navigator.vibrate([4, 40, 4]); }
    lastCamp = ci;
    $(".achip__ring .p", chip).style.strokeDashoffset = 100 - p * 100;
    chip.classList.toggle("show", !hero || hero.getBoundingClientRect().bottom < innerHeight * .6);
    const me = $("#rMe", sheet); if (me) { me.style.left = p * 100 + "%"; me.style.top = prof(p) / H * 100 + "%"; $("#rcr", sheet).setAttribute("width", p * W);
      $$(".route__list li", sheet).forEach((li, i) => { li.classList.toggle("here", i === ci); li.classList.toggle("past", i < ci); });
      $$(".route__pins i", sheet).forEach((pin, i) => pin.classList.toggle("past", i <= ci)); }
  };
  measure(); upd();
  addEventListener("scroll", upd, { passive: true });
  addEventListener("load", () => setTimeout(() => { measure(); upd(); }, 400));
  addEventListener("resize", () => { measure(); upd(); });
}

/* ═══════════════ BOOT ═══════════════ */
roll();          // before the altimeter, so its camp is placed
if (PAGE === "home") altimeter();
cursor();
heroPull();
scramble();
magnetic();
sound();
phone();
if (S.watch) S.watch();
})();
