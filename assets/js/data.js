"use strict";
/* ════════════════════════════════════════════════════════════════════
   SELFISH TRAVELLER — CONTENT FILE
   This is the only file you need to edit to change what the site shows.
   Every list below renders automatically on the pages.

   IMAGES
   An image can be:
     • a file in your site:   "assets/img/my-photo.jpg"
     • any full web address:  "https://…/photo.jpg"
     • an Unsplash stand-in:  "u:ridge"  (see STOCK at the bottom)
   The stand-ins are only there until Aman's own photos go in.
   ════════════════════════════════════════════════════════════════════ */

const SITE = {
  name: "Selfish Traveller",
  creator: "Aman Saini",
  base: "British Columbia, Canada",
  coords: "49.2827° N · 123.1207° W",
  // ⚠ THIS IS THE ONE THING STILL TO FILL IN. Every "ask about a photo",
  //   "ask about a clip" and licensing button on the site sends mail here.
  email: "hello@example.com",            // ← REPLACE with the real address
  mediaKit: "",                           // ← link to a PDF media kit (optional)
  copyrightStart: 2024,
  // Weather used by the "Live BC" theme (Vancouver by default)
  weather: { lat: 49.2827, lon: -123.1207, place: "Vancouver" }
};

/* ── SOCIAL ──────────────────────────────────────────────────────────
   One list drives the header, the left rail, the "Follow the journey"
   section and the footer. Leave url "" and the card shows "Coming soon". */
const SOCIAL = [
  { key:"youtube",   label:"YouTube",   handle:"@Selfishtraveller", url:"https://www.youtube.com/@Selfishtraveller", note:"Films & long-form trip stories", rail:true },
  { key:"instagram", label:"Instagram", handle:"@selfishtraveller", url:"https://www.instagram.com/selfishtraveller/", note:"Reels, stills & stories from the road", rail:true },
  { key:"tiktok",    label:"TikTok",    handle:"@selfishtraveller", url:"", note:"Short cuts from the trail", rail:true },
  { key:"facebook",  label:"Facebook",  handle:"Selfish Traveller", url:"", note:"Community & longer posts" },
  { key:"x",         label:"X",         handle:"@selfishtraveller", url:"", note:"Plans, conditions, notes" },
  { key:"threads",   label:"Threads",   handle:"@selfishtraveller", url:"", note:"Conversations & process" },
  { key:"pinterest", label:"Pinterest", handle:"selfishtraveller",  url:"", note:"Boards by region & season" }
];

/* ── THEMES ──────────────────────────────────────────────────────────
   Each theme recolours the site, swaps the hero footage and changes the
   weather in the walking animation. "live" follows the real weather. */
const THEMES = [
  { key:"dusk",   name:"Dusk",    note:"Alpenglow, default" },
  { key:"sun",    name:"Sun",     note:"Golden hour" },
  { key:"rain",   name:"Rain",    note:"Coastal storm" },
  { key:"wind",   name:"Wind",    note:"Alpine gusts" },
  { key:"forest", name:"Forest",  note:"Old growth & mist" },
  { key:"night",  name:"Night",   note:"Stars & aurora" },
  { key:"live",   name:"Live BC", note:"Matches the sky in BC right now" }
];
const THEME_HERO = {
  dusk:   [["l:aspen-aerial","Gold from above, Monkman"],["l:tundra-peak","Above the treeline, Stone Mountain"],["l:snow-face","The cold side"]],
  sun:    [["l:autumn-road","The road through it"],["l:wildflowers","Six weeks of this, Hart Ranges"],["l:blue-tarn","Meltwater blue"]],
  rain:   [["l:waterfall","Kinuseo, full volume"],["l:alpine-basin","Last of the snow"],["l:green-river","Glacier run-off"]],
  wind:   [["l:snow-face","The cold side"],["l:tundra-peak","Open ground, Stone Mountain"],["l:alpine-basin","Last of the snow"]],
  forest: [["l:green-river","Glacier run-off"],["l:autumn-road","The road through it"],["l:wildflowers","Six weeks of this"]],
  night:  [["l:aurora-treeline","Green over the spruce"],["l:tents-night","Two tents, no one else"],["l:aurora-pointing","Look up"]]
};

/* ── FILMS (long YouTube uploads) ────────────────────────────────────
   Paste a YouTube link in `url`. Everything else is optional.        */
const FILMS = [
  { url:"https://www.youtube.com/watch?v=Oh64VC_se48", title:"Who I Am — Writing My Own Story",
    category:"Story", location:"British Columbia", featured:true,
    blurb:"The film behind the name: why I travel alone, what I'm looking for out there, and how a camera became the way I make sense of it." },
  { url:"https://www.youtube.com/watch?v=EqsHkBFU_Sw", title:"Everything went wrong in the woods — Monkman Lake",
    category:"Adventure", location:"Monkman Provincial Park, BC",
    blurb:"A solo trip to Monkman Lake where almost nothing went to plan — and the film that came out of it." }
];
/* Films being edited. Shown as "Coming soon" cards. [SAMPLE — replace] */
const IN_THE_EDIT = [
  { title:"Above the inversion", location:"Coast Mountains, BC", img:"l:tundra-peak", eta:"Autumn" },
  { title:"Grizzly season", location:"Central Coast, BC", img:"l:two-bears", eta:"Winter" },
  { title:"Silt & ice", location:"Canadian Rockies", img:"l:blue-tarn", eta:"2027" }
];

/* ── SHORTS ──────────────────────────────────────────────────────────  */
const SHORTS = [
  { url:"https://www.youtube.com/shorts/ngIcTyVwhVc", title:"A different kind of addiction" },
  { url:"https://www.youtube.com/shorts/sdFvyma9eNw", title:"Why everyone is talking about September 4" }
];

/* ── PHOTOGRAPHS ─────────────────────────────────────────────────────
   These are Aman's own frames, in assets/photos/.

   img:"l:slug" means a local photo. The site picks the right file size
   for the screen automatically — see assets/photos/ for the widths.

   WHERE THE DETAIL CAME FROM
   Locations are the GPS written into the originals by the camera, matched
   to the nearest named place. EXIF (focal length is 35mm-equivalent,
   aperture, shutter, ISO) is read straight off the files.
   Six frames arrived with their metadata stripped (they'd been sent
   through a messaging app), so they carry a region only — fill those in
   if you want them precise.

   ratio: how the frame is CROPPED in the grid. The lightbox always shows
   the whole photo, so a crop here never loses anything permanently.
   "3/2" landscape · "4/5" portrait · "3/4" tall · "16/9" wide            */
const PHOTOS = [
  { id:"p01", img:"l:aspen-aerial",    title:"Gold, from above",        location:"Monkman Provincial Park, BC", date:"2026-09", cat:"Aerial",    ratio:"3/2",  exif:"24mm · f/1.7 · 1/350 · ISO 200",   alt:"Aerial view over a hillside of golden aspen in full autumn colour" },
  { id:"p02", img:"l:autumn-road",     title:"The road through it",     location:"Monkman Provincial Park, BC", date:"2026-09", cat:"Aerial",    ratio:"4/5",  exif:"24mm · f/1.7 · 1/320 · ISO 200",   alt:"A road seen from the air, cutting through autumn forest" },
  { id:"p03", img:"l:tundra-peak",     title:"Above the treeline",      location:"Stone Mountain Provincial Park, BC", date:"2026-09", cat:"Mountains", ratio:"16/9", exif:"14mm · f/2.2 · 1/720 · ISO 16", alt:"A snow-streaked peak rising over open alpine tundra" },
  { id:"p04", img:"l:blue-tarn",       title:"Meltwater blue",          location:"Stone Mountain Provincial Park, BC", date:"2026-09", cat:"Water",     ratio:"3/2",  exif:"35mm · f/1.8 · 1/210 · ISO 50", alt:"A bright blue alpine tarn held in a bowl of rock and tundra" },
  { id:"p05", img:"l:waterfall",       title:"Kinuseo",                 location:"Kinuseo Falls, Monkman Provincial Park, BC", date:"2026-08", cat:"Water", ratio:"4/5", exif:"35mm · f/1.8 · 1/100 · ISO 100", alt:"A wide waterfall dropping over a dark rock shelf into white water" },
  { id:"p06", img:"l:alpine-basin",    title:"Last of the snow",        location:"British Columbia",            date:"2026-08", cat:"Mountains", ratio:"3/2",  exif:"",  alt:"An alpine basin with patches of snow lingering between rock and scree" },
  { id:"p07", img:"l:snow-face",       title:"The cold side",           location:"British Columbia",            date:"2026-09", cat:"Mountains", ratio:"3/2",  exif:"",  alt:"A steep snow-covered mountain face under flat cloud" },
  { id:"p08", img:"l:green-river",     title:"Glacier run-off",         location:"British Columbia",            date:"2026-08", cat:"Water",     ratio:"4/5",  exif:"",  alt:"A turquoise river winding through dense green forest" },
  { id:"p09", img:"l:ridge-rest",      title:"Sitting with it",         location:"British Columbia",            date:"2026-08", cat:"Adventure", ratio:"4/5",  exif:"",  alt:"A hiker sitting on a rock outcrop looking out at mountains" },
  { id:"p10", img:"l:the-filmer",      title:"Working",                 location:"British Columbia",            date:"2026-10", cat:"Adventure", ratio:"3/2",  exif:"",  alt:"A hiker in a cap on an autumn alpine trail, camera in hand" },
  { id:"p11", img:"l:deer",            title:"Held still",              location:"Fort St. John, BC",           date:"2026-10", cat:"Wildlife",  ratio:"3/4",  exif:"229mm · f/2.8 · 1/120 · ISO 50", alt:"A deer standing among bare trees, looking toward the camera" },
  { id:"p12", img:"l:two-bears",       title:"Two on the shoulder",     location:"British Columbia",            date:"2026-08", cat:"Wildlife",  ratio:"16/9", exif:"",  alt:"Two black bears on the grassy shoulder of a road" },
  { id:"p13", img:"l:aurora-treeline", title:"Green over the spruce",   location:"Peace Region, BC",            date:"2026-10", cat:"Night",     ratio:"3/2",  exif:"48mm · f/1.8 · 1s · ISO 16000",  alt:"Green aurora stretching above a dark spruce treeline" },
  { id:"p14", img:"l:aurora-pointing", title:"Look up",                 location:"Peace Region, BC",            date:"2026-08", cat:"Night",     ratio:"3/2",  exif:"35mm · f/1.8 · 1/2 · ISO 25000", alt:"A person pointing up at the northern lights" },
  { id:"p15", img:"l:tents-night",     title:"Two tents, no one else",  location:"Tumbler Ridge, BC",           date:"2026-08", cat:"Night",     ratio:"4/5",  exif:"24mm · f/1.8 · 1/2 · ISO 1600",  alt:"Two lit tents under a night sky" },
  { id:"p16", img:"l:wildflowers",     title:"Six weeks of this",       location:"Hart Ranges, BC",             date:"2026-07", cat:"Detail",    ratio:"3/2",  exif:"48mm · f/1.8 · 1/2100 · ISO 64", alt:"Alpine wildflowers in close focus against a blurred mountain slope" }
];

/* The "best of" print wall. l/t/w are % of the stage, rot in degrees, d = parallax depth */
const COLLAGE = [
  { id:"p05", l:3,  t:14, w:26, rot:-4, d:.18 },
  { id:"p01", l:31, t:2,  w:24, rot:3,  d:.34 },
  { id:"p03", l:60, t:10, w:25, rot:-2, d:.12 },
  { id:"p11", l:10, t:55, w:18, rot:5,  d:.28 },
  { id:"p13", l:36, t:50, w:25, rot:-3, d:.42 },
  { id:"p09", l:67, t:50, w:17, rot:4,  d:.22 },
  { id:"p16", l:84, t:22, w:14, rot:-7, d:.50 }
];

/* ── CLIPS (Aman's own footage, in assets/video/) ────────────────────
   Short pieces of B-roll, not full films. Each one is an .mp4 with a
   still (`poster`) shown until someone presses play — nothing downloads
   until they do, so the page stays light.
   vertical:true lays the clip out phone-shaped instead of widescreen.  */
const CLIPS = [
  { id:"c1", file:"assets/video/falls-aerial.mp4",  poster:"assets/video/falls-aerial-poster.webp",
    title:"Straight down",      location:"Northern Rockies, BC", date:"2026-10", vertical:true,
    alt:"Looking straight down from the air at water rushing over dark rock" },
  { id:"c2", file:"assets/video/forest-drive.mp4",  poster:"assets/video/forest-drive-poster.webp",
    title:"Nobody coming",      location:"Tumbler Ridge, BC",    date:"2026-09",
    alt:"Driving a curving empty road through autumn forest" },
  { id:"c3", file:"assets/video/valley-drive.mp4",  poster:"assets/video/valley-drive-poster.webp",
    title:"Flat, then not",     location:"Fraser Valley, BC",    date:"2026-06",
    alt:"Farmland running past a car window with mountains behind it" },
  { id:"c4", file:"assets/video/aurora-drift.mp4",  poster:"assets/video/aurora-drift-poster.webp",
    title:"It moves",           location:"Peace Region, BC",     date:"2026-04",
    alt:"Northern lights drifting across the sky above a treeline" }
];

/* ── INSTAGRAM ───────────────────────────────────────────────────────
   Instagram can't be pulled in live without a Meta token, so these are
   curated by hand. Reels: set `file` to an exported .mp4 to make it play
   on the page; `poster` is the still shown before it plays.            */
const INSTAGRAM = {
  handle:"@selfishtraveller",
  url:"https://www.instagram.com/selfishtraveller/",
  highlights:[
    { label:"Monkman",    img:"l:waterfall", url:"" },
    { label:"Stone Mtn",  img:"l:tundra-peak", url:"" },
    { label:"Wildlife",   img:"l:deer", url:"" },
    { label:"Camp",       img:"l:tents-night", url:"" },
    { label:"Road trips", img:"l:autumn-road", url:"" },
    { label:"Behind it",  img:"l:the-filmer", url:"" }
  ],
  reels:[
    { url:"https://www.instagram.com/reel/Dc6dCkQOWi_/", poster:"l:green-river",    file:"", title:"Monkman Lake" },
    { url:"https://www.instagram.com/reel/DcZPz5CB0pa/", poster:"l:snow-face",      file:"", title:"Cloud in the cedars" },
    { url:"https://www.instagram.com/reel/DcTbnobuMZ5/", poster:"l:ridge-rest",     file:"", title:"Ridge walk" },
    { url:"https://www.instagram.com/reel/Db54PG5Ojs8/", poster:"l:waterfall",      file:"", title:"Meltwater" },
    { url:"https://www.instagram.com/reel/DNfCX71O18K/", poster:"l:tents-night",    file:"", title:"Night camp" },
    { url:"https://www.instagram.com/reel/DLCKxa2ObUH/", poster:"l:deer",           file:"", title:"Goat on the ridge" },
    { url:"https://www.instagram.com/reel/C-JjEYgR6Er/", poster:"l:aspen-aerial",   file:"", title:"Above the clouds" }
  ],
  posts:["l:aspen-aerial","l:deer","l:blue-tarn","l:green-river","l:two-bears","l:tents-night","l:snow-face","l:wildflowers"]
};

/* ── STOCK STAND-INS (Unsplash) — delete once real photos are in ───── */
const STOCK = {
  ridge:"photo-1599689623641-285bac600d41", peak:"photo-1676057868280-d6b982d82859",
  clouds:"photo-1506905925346-21bda4d32df4", fog:"photo-1718061474357-1511b1934a17",
  mist:"photo-1709651078293-611fa7aff71b", valley:"photo-1519757580922-4dbcdf77605b",
  range:"photo-1637254019271-1efb74a1009a", jagged:"photo-1534237113884-365fdeebf809",
  lake:"photo-1531764411937-45495415d84d", lake2:"photo-1607895522490-3772dd8810a6",
  moraine:"photo-1519773626447-a286cd6e54f8", sunsethiker:"photo-1700138341544-37abd07aa14d",
  hikerback:"photo-1765912679289-075fcaff5b2f", tent:"photo-1734279102122-b0063665db15",
  tent2:"photo-1666974993470-d1116c9667e4", forestfog:"photo-1506452305024-9d3f02d1c9b5",
  river:"photo-1511884642898-4c92249e20b6", pines:"photo-1542273917363-3b1817f69a2d",
  bear:"photo-1696785561770-324a5bd4cc9a", bearface:"photo-1568162603664-fcd658421851",
  goat:"photo-1665597422911-ecb570fc950b", goat2:"photo-1562193965-801a55de0998",
  eagle:"photo-1611689342806-0863700ce1e4", wolf:"photo-1588167056547-c183313da47c",
  filmer:"photo-1611925939562-3483c4095d13", camfog:"photo-1553166272-e69910ab5ae1",
  turquoise:"photo-1650493359585-f394207e8460", inversion:"photo-1723293314207-0baf945b1d8d"
};
