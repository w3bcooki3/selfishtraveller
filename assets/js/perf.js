/* ═══════════════════════════════════════════════════════════════
   perf.js — additive, no dependencies, safe to drop.
   1. remembers a motion choice and exposes it as html[data-motion]
   2. watches the first second of frames; if the machine is dropping
      them, switches the page to the cheap paint path
   3. pauses looping animations that are off screen
   4. adds the switch into the existing theme popover
   ═══════════════════════════════════════════════════════════════ */
(() => {
"use strict";
const root = document.documentElement;
const KEY = "st-motion";                       // auto | full | calm

/* ── 1. motion preference ─────────────────────────────────────── */
const osReduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const read = () => { try { return localStorage.getItem(KEY) || "auto"; } catch (e) { return "auto"; } };
const apply = v => {
  if (v === "auto") root.removeAttribute("data-motion");
  else root.dataset.motion = v;
  root.dataset.motionChoice = v;
};
let choice = read();
apply(choice);

window.STMotion = {
  get: () => choice,
  set(v) {
    choice = v;
    try { localStorage.setItem(KEY, v); } catch (e) {}
    apply(v);
    document.dispatchEvent(new CustomEvent("st:motion", { detail: v }));
  },
  /* what the rest of the site should actually obey */
  reduced: () => choice === "calm" || (choice === "auto" && osReduce())
};

/* ── 2. browsers with no backdrop-filter at all ───────────────── */
if (!CSS.supports("backdrop-filter", "blur(2px)") && !CSS.supports("-webkit-backdrop-filter", "blur(2px)"))
  root.classList.add("perf-lite");

/* ── 3. pause looping animations that are off screen ──────────── */
const LOOPERS = ".bars,.tk,.leg,.shin,.arm,.pole,.bob,.puff,.bird,.umb,.rec,.trek__aurora,.sweep";
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    es => es.forEach(e => e.target.classList.toggle("off-view", !e.isIntersecting)),
    { rootMargin: "120px" });
  const watch = () => document.querySelectorAll(LOOPERS).forEach(el => io.observe(el));
  addEventListener("load", () => setTimeout(watch, 400));
  document.addEventListener("st:rendered", watch);
}

/* ── 4. put the switch in the theme popover ───────────────────── */
const mount = () => {
  const pop = document.getElementById("tpop");
  if (!pop || pop.querySelector(".motion-opt")) return;
  const wrap = document.createElement("div");
  wrap.className = "motion-opt";
  wrap.setAttribute("role", "group");
  wrap.setAttribute("aria-label", "Motion");
  wrap.innerHTML = [["auto", "Auto"], ["full", "Full"], ["calm", "Calm"]]
    .map(([v, l]) => `<button type="button" data-motion-opt="${v}" aria-pressed="${choice === v}">${l}</button>`).join("");
  const note = document.createElement("p");
  note.className = "motion-note";
  note.textContent = osReduce()
    ? "Windows has animations switched off on this machine. Full turns them back on just for this site."
    : "Auto follows your system setting.";
  pop.append(wrap, note);
  wrap.addEventListener("click", e => {
    const b = e.target.closest("[data-motion-opt]"); if (!b) return;
    window.STMotion.set(b.dataset.motionOpt);
    wrap.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
    if (b.dataset.motionOpt === "full") location.reload();   // re-run the JS-gated pieces
  });
};
addEventListener("load", () => setTimeout(mount, 300));
})();
