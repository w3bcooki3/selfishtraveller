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
  email: "hello@example.com",            // ← [REPLACE with the real email]
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
  dusk:   [["u:ridge","Ridge walk, Coast Mountains"],["u:clouds","Above the inversion, first light"],["u:peak","North face, blue hour"]],
  sun:    [["u:sunsethiker","Last light, alone on the ridge"],["u:inversion","Sea of cloud, 6:12 a.m."],["u:turquoise","Glacier lake, midday"]],
  rain:   [["u:forestfog","Rain, holding — Great Bear Rainforest"],["u:mist","Cloud in the cedars"],["u:fog","Weather coming in"]],
  wind:   [["u:jagged","Spindrift on the Coast Range"],["u:valley","Cloud pouring through the pass"],["u:range","Exposed ridge, 40 km/h"]],
  forest: [["u:lake2","Lake in the pines"],["u:pines","Old growth, Interior BC"],["u:river","Meltwater through the forest"]],
  night:  [["u:tent","Camp under star trails"],["u:tent2","Lights out, 2100 m"],["u:peak","Moonlit north face"]]
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
  { title:"Above the inversion", location:"Coast Mountains, BC", img:"u:inversion", eta:"Autumn" },
  { title:"Grizzly season", location:"Central Coast, BC", img:"u:bear", eta:"Winter" },
  { title:"Silt & ice", location:"Canadian Rockies", img:"u:moraine", eta:"2027" }
];

/* ── SHORTS ──────────────────────────────────────────────────────────  */
const SHORTS = [
  { url:"https://www.youtube.com/shorts/ngIcTyVwhVc", title:"A different kind of addiction" },
  { url:"https://www.youtube.com/shorts/sdFvyma9eNw", title:"Why everyone is talking about September 4" }
];

/* ── PHOTOGRAPHS ─────────────────────────────────────────────────────
   ratio: "3/2" landscape · "4/5" portrait · "1/1" square · "16/9" wide  */
const PHOTOS = [
  { id:"p01", img:"u:ridge",       title:"Ridge walk",             location:"Coast Mountains, BC",   date:"2025-10", cat:"Adventure", ratio:"4/5", exif:"35mm · f/8 · 1/500 · ISO 100", alt:"A lone hiker walking a rocky ridge above a valley" },
  { id:"p02", img:"u:clouds",      title:"Above the inversion",    location:"Coast Mountains, BC",   date:"2025-02", cat:"Mountains", ratio:"3/2", exif:"70mm · f/11 · 1/800 · ISO 64", alt:"Snowy peaks rising above a sea of cloud at sunrise" },
  { id:"p03", img:"u:bear",        title:"Salmon run",             location:"Central Coast, BC",     date:"2025-09", cat:"Wildlife",  ratio:"3/2", exif:"400mm · f/5.6 · 1/1000 · ISO 800", alt:"A grizzly bear wading across a river" },
  { id:"p04", img:"u:lake",        title:"Standing water",         location:"Canadian Rockies",      date:"2025-06", cat:"Water",     ratio:"4/5", exif:"24mm · f/9 · 1/250 · ISO 100", alt:"A turquoise lake below forested peaks" },
  { id:"p05", img:"u:tent",        title:"Camp, 2100 m",           location:"Coast Mountains, BC",   date:"2024-07", cat:"Night",     ratio:"3/2", exif:"20mm · f/2.8 · 20s × 180 · ISO 1600", alt:"A glowing tent beneath circular star trails" },
  { id:"p06", img:"u:goat",        title:"First snow",             location:"Coast Range, BC",       date:"2024-10", cat:"Wildlife",  ratio:"4/5", exif:"300mm · f/5.6 · 1/1250 · ISO 400", alt:"A mountain goat standing on a snowy ridge" },
  { id:"p07", img:"u:forestfog",   title:"Rain, holding",          location:"Great Bear Rainforest", date:"2024-11", cat:"Forest",    ratio:"4/5", exif:"35mm · f/4 · 1/125 · ISO 400", alt:"Fog drifting through dark conifers" },
  { id:"p08", img:"u:jagged",      title:"Second light",           location:"Coast Range, BC",       date:"2025-01", cat:"Mountains", ratio:"3/2", exif:"105mm · f/8 · 1/400 · ISO 100", alt:"Jagged snowy peaks under heavy cloud" },
  { id:"p09", img:"u:eagle",       title:"Low tide",               location:"Vancouver Island, BC",  date:"2024-12", cat:"Wildlife",  ratio:"3/2", exif:"500mm · f/6.3 · 1/2000 · ISO 640", alt:"A bald eagle banking in flight" },
  { id:"p10", img:"u:river",       title:"Meltwater",              location:"Interior BC",           date:"2025-05", cat:"Forest",    ratio:"4/5", exif:"24mm · f/11 · 1/4 · ISO 50", alt:"A river running through misty forest" },
  { id:"p11", img:"u:turquoise",   title:"Glacier blue",           location:"Canadian Rockies",      date:"2025-07", cat:"Water",     ratio:"3/2", exif:"28mm · f/8 · 1/320 · ISO 100", alt:"A vivid turquoise lake beneath limestone peaks" },
  { id:"p12", img:"u:wolf",        title:"The one that looked back",location:"Interior BC",          date:"2024-02", cat:"Wildlife",  ratio:"4/5", exif:"400mm · f/4 · 1/800 · ISO 1250", alt:"A grey wolf looking straight at the camera" },
  { id:"p13", img:"u:valley",      title:"Weather coming in",      location:"Pacific Northwest",     date:"2024-10", cat:"Mountains", ratio:"16/9", exif:"50mm · f/8 · 1/500 · ISO 100", alt:"Cloud filling a snowy valley" },
  { id:"p14", img:"u:tent2",       title:"Lights out",             location:"Chilcotin, BC",         date:"2024-08", cat:"Night",     ratio:"4/5", exif:"16mm · f/2.8 · 15s · ISO 3200", alt:"A tent glowing orange under the stars" },
  { id:"p15", img:"u:sunsethiker", title:"Last light, alone",      location:"Coast Mountains, BC",   date:"2025-08", cat:"Adventure", ratio:"4/5", exif:"85mm · f/4 · 1/1000 · ISO 100", alt:"A silhouetted hiker on a summit at sunset" },
  { id:"p16", img:"u:pines",       title:"Pines in cloud",         location:"Interior BC",           date:"2024-09", cat:"Forest",    ratio:"3/2", exif:"70mm · f/5.6 · 1/250 · ISO 200", alt:"Pine-covered hills disappearing into fog" },
  { id:"p17", img:"u:moraine",     title:"Silt & ice",             location:"Canadian Rockies",      date:"2024-06", cat:"Water",     ratio:"3/2", exif:"24mm · f/11 · 1/160 · ISO 100", alt:"Snowy peaks above a rocky glacial lake" },
  { id:"p18", img:"u:goat2",       title:"On the ledge",           location:"Coast Range, BC",       date:"2025-08", cat:"Wildlife",  ratio:"3/2", exif:"200mm · f/5 · 1/1600 · ISO 250", alt:"A mountain goat on a grassy mountain ledge" },
  { id:"p19", img:"u:mist",        title:"Cloud in the cedars",    location:"Sea to Sky, BC",        date:"2025-03", cat:"Forest",    ratio:"4/5", exif:"50mm · f/5.6 · 1/200 · ISO 200", alt:"Mist rolling over a steep forested slope" },
  { id:"p20", img:"u:inversion",   title:"Blue layers",            location:"Coast Mountains, BC",   date:"2025-02", cat:"Mountains", ratio:"3/2", exif:"135mm · f/8 · 1/640 · ISO 100", alt:"Layered blue ridges above a valley of cloud" },
  { id:"p21", img:"u:hikerback",   title:"The long approach",      location:"Canadian Rockies",      date:"2024-07", cat:"Adventure", ratio:"4/5", exif:"35mm · f/5.6 · 1/400 · ISO 200", alt:"A hiker with a large pack walking through forest" },
  { id:"p23", img:"u:bearface",    title:"Berry season",           location:"Northern BC",           date:"2025-08", cat:"Wildlife",  ratio:"4/5", exif:"500mm · f/5.6 · 1/640 · ISO 1000", alt:"Close portrait of a brown bear in the forest" },
  { id:"p22", img:"u:peak",        title:"North face, blue hour",  location:"Coast Mountains, BC",   date:"2025-01", cat:"Night",     ratio:"3/2", exif:"50mm · f/4 · 1/15 · ISO 800", alt:"A dark snowy peak under a deep blue sky" }
];
/* The "best of" print wall. l/t/w are % of the stage, rot in degrees, d = parallax depth */
const COLLAGE = [
  { id:"p03", l:3,  t:14, w:26, rot:-4, d:.18 },
  { id:"p02", l:31, t:2,  w:24, rot:3,  d:.34 },
  { id:"p11", l:60, t:10, w:25, rot:-2, d:.12 },
  { id:"p06", l:10, t:55, w:18, rot:5,  d:.28 },
  { id:"p05", l:36, t:50, w:25, rot:-3, d:.42 },
  { id:"p15", l:67, t:50, w:17, rot:4,  d:.22 },
  { id:"p12", l:84, t:22, w:14, rot:-7, d:.50 }
];

/* ── INSTAGRAM ───────────────────────────────────────────────────────
   Instagram can't be pulled in live without a Meta token, so these are
   curated by hand. Reels: set `file` to an exported .mp4 to make it play
   on the page; `poster` is the still shown before it plays.            */
const INSTAGRAM = {
  handle:"@selfishtraveller",
  url:"https://www.instagram.com/selfishtraveller/",
  highlights:[
    { label:"Coast Range", img:"u:jagged", url:"" },
    { label:"Rockies",     img:"u:turquoise", url:"" },
    { label:"Wildlife",    img:"u:bear", url:"" },
    { label:"Camp",        img:"u:tent2", url:"" },
    { label:"Road trips",  img:"u:sunsethiker", url:"" },
    { label:"Behind it",   img:"u:filmer", url:"" }
  ],
  reels:[
    { url:"https://www.instagram.com/reel/Dc6dCkQOWi_/", poster:"u:lake2",     file:"", title:"Monkman Lake" },
    { url:"https://www.instagram.com/reel/DcZPz5CB0pa/", poster:"u:mist",      file:"", title:"Cloud in the cedars" },
    { url:"https://www.instagram.com/reel/DcTbnobuMZ5/", poster:"u:ridge",     file:"", title:"Ridge walk" },
    { url:"https://www.instagram.com/reel/Db54PG5Ojs8/", poster:"u:river",     file:"", title:"Meltwater" },
    { url:"https://www.instagram.com/reel/DNfCX71O18K/", poster:"u:tent",      file:"", title:"Night camp" },
    { url:"https://www.instagram.com/reel/DLCKxa2ObUH/", poster:"u:goat",      file:"", title:"Goat on the ridge" },
    { url:"https://www.instagram.com/reel/C-JjEYgR6Er/", poster:"u:inversion", file:"", title:"Above the clouds" }
  ],
  posts:["u:clouds","u:bearface","u:turquoise","u:forestfog","u:goat2","u:tent2","u:jagged","u:eagle"]
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
