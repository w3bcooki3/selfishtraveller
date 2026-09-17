/**
 * data.js
 * ---------------------------------------------------------------
 * Every piece of replaceable content lives here. Swap names, copy,
 * numbers, and image/video URLs in this one file — the templates
 * in main.js render everything from these arrays automatically.
 *
 * IMAGE NOTE: every image URL below was verified by fetching the
 * actual Unsplash photo page (not guessed) — so nothing is broken
 * or mismatched. There are only 7 unique source photos reused
 * across sections as placeholders; replace them with your own
 * photography whenever you're ready (see /images/README.md).
 * ---------------------------------------------------------------
 */

/* Verified base images — see comment above. Add ?w=&q=80&auto=format&fit=crop as needed. */
const IMG = {
  peakSnow:     "https://images.unsplash.com/photo-1773001899177-7f642f65fd4c",  // snow peak, dawn light
  hikersRocky:  "https://images.unsplash.com/photo-1766946162224-412e5c76a299",  // hikers on rocky path toward snowy mountains
  dolomitesPink:"https://images.unsplash.com/photo-1769631417306-a1da09f42b20",  // pastel-sky alpine peaks
  tentNight:    "https://images.unsplash.com/photo-1649519605812-400ba1767985",  // tent glowing at night, stars
  forestPath:   "https://images.unsplash.com/photo-1720760585814-5c5280ea72d5",  // sunlit forest trail
  sunriseHiker: "https://images.unsplash.com/photo-1666037381203-4b07d8c1162d",  // hiker on trail at sunrise
  silhouette:   "https://images.unsplash.com/photo-1543169564-be8896b30cdb",     // minimal silhouette on ridge
};
function img(key, w) { return `${IMG[key]}?w=${w || 1200}&q=80&auto=format&fit=crop`; }

const SITE = {
  name: "Arjun Mehta",
  role: "Adventure filmmaker. Trekker. Storyteller.",
  tagline: "Stories from the wild.",
  base: "Manali, Himachal Pradesh",
  email: "hello@arjunmehta.com",
  logoMark: "AM",
  copyrightName: "Arjun Mehta",
};

const STATS = [
  { number: "12+", label: "Countries explored" },
  { number: "48", label: "Major treks completed" },
  { number: "7", label: "Years on the trail" },
  { number: "150+", label: "Stories &amp; films" },
];

const NAV_LINKS = [
  { label: "Journeys", href: "#journeys" },
  { label: "Trail Log", href: "#trail-log" },
  { label: "Films", href: "#films" },
  { label: "Photography", href: "#photography" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { platform: "Instagram", handle: "@arjunmehta.trails", url: "https://instagram.com/REPLACE_ME", icon: "instagram" },
  { platform: "YouTube", handle: "Arjun Mehta", url: "https://youtube.com/REPLACE_ME", icon: "youtube" },
  { platform: "TikTok", handle: "@arjunmehta", url: "https://tiktok.com/@REPLACE_ME", icon: "tiktok" },
  { platform: "X", handle: "@arjunontrail", url: "https://x.com/REPLACE_ME", icon: "x" },
  { platform: "Facebook", handle: "Arjun Mehta Films", url: "https://facebook.com/REPLACE_ME", icon: "facebook" },
  { platform: "LinkedIn", handle: "Arjun Mehta", url: "https://linkedin.com/in/REPLACE_ME", icon: "linkedin" },
];

/* ------------------------- Featured Journeys ------------------------- */
const JOURNEYS = [
  {
    slug: "annapurna-nepal",
    title: "Annapurna Circuit",
    region: "Nepal",
    year: "2025",
    duration: "18 days",
    difficulty: "Strenuous",
    description:
      "A full circuit of the Annapurna massif — rice terraces to rhododendron forest to the wind-scoured Thorong La at 5,416 metres.",
    image: img("hikersRocky", 1600),
  },
  {
    slug: "patagonia-torres",
    title: "Torres del Paine",
    region: "Patagonia, Chile",
    year: "2024",
    duration: "9 days",
    difficulty: "Moderate",
    description:
      "Nine days chasing the W circuit's granite towers, glacial lakes, and weather that changes its mind four times a day.",
    image: img("peakSnow", 1600),
  },
  {
    slug: "swiss-alps-haute-route",
    title: "The Haute Route",
    region: "Switzerland",
    year: "2023",
    duration: "12 days",
    difficulty: "Strenuous",
    description:
      "From Chamonix to Zermatt on foot, sleeping in stone huts below the Matterhorn's long afternoon shadow.",
    image: img("dolomitesPink", 1600),
  },
  {
    slug: "dolomites-alta-via",
    title: "Alta Via 1",
    region: "Dolomites, Italy",
    year: "2023",
    duration: "10 days",
    difficulty: "Moderate",
    description:
      "Limestone spires, via ferrata cables, and rifugios that pour better coffee than most cities I've visited.",
    image: img("dolomitesPink", 1600),
  },
  {
    slug: "iceland-highlands",
    title: "The Interior Highlands",
    region: "Iceland",
    year: "2022",
    duration: "7 days",
    difficulty: "Moderate",
    description:
      "Laugavegur's volcanic ridgelines, river crossings in wetsuit boots, and a sun that never quite sets in July.",
    image: img("hikersRocky", 1600),
  },
  {
    slug: "ladakh-markha",
    title: "Markha Valley",
    region: "Ladakh, India",
    year: "2021",
    duration: "8 days",
    difficulty: "Moderate",
    description:
      "High-desert monasteries, prayer flags snapping in thin air, and the Kang Yatse basecamp at dawn.",
    image: img("sunriseHiker", 1600),
  },
  {
    slug: "canadian-rockies",
    title: "The Great Divide",
    region: "Canadian Rockies",
    year: "2020",
    duration: "6 days",
    difficulty: "Moderate",
    description:
      "Turquoise glacial lakes, grizzly country, and a ridge walk along the spine that splits two oceans.",
    image: img("peakSnow", 1600),
  },
  {
    slug: "japan-kumano-kodo",
    title: "Kumano Kodō",
    region: "Wakayama, Japan",
    year: "2019",
    duration: "5 days",
    difficulty: "Easy",
    description:
      "Cedar forests, moss-covered stone steps, and pilgrim routes walked by travellers for over a thousand years.",
    image: img("forestPath", 1600),
  },
  {
    slug: "new-zealand-routeburn",
    title: "The Routeburn Track",
    region: "New Zealand",
    year: "2019",
    duration: "4 days",
    difficulty: "Easy",
    description:
      "Beech forest, alpine tarns, and the kind of light that makes you understand why people never leave.",
    image: img("silhouette", 1600),
  },
];

/* ------------------------- Trail Log (filterable) ------------------------- */
const TREK_CATEGORIES = [
  "All",
  "High Altitude",
  "Multi-Day Treks",
  "Mountain Expeditions",
  "Forest Trails",
  "Solo Adventures",
  "Camping",
  "Remote Villages",
  "Wildlife &amp; Nature",
];

const TRAIL_LOG = [
  {
    title: "Above Thorong La",
    category: "High Altitude",
    location: "Manang, Nepal",
    date: "Oct 2025",
    excerpt: "Twelve hours above 5,000 metres, moving slow and breathing slower.",
    image: img("hikersRocky", 900),
  },
  {
    title: "Nine Days on the W",
    category: "Multi-Day Treks",
    location: "Torres del Paine, Chile",
    date: "Mar 2024",
    excerpt: "Four weather systems, one circuit, and towers that only showed themselves twice.",
    image: img("peakSnow", 900),
  },
  {
    title: "Solo to Kang Yatse Base",
    category: "Solo Adventures",
    location: "Ladakh, India",
    date: "Aug 2021",
    excerpt: "No fixed itinerary, no companions — just a tent, a stove, and a lot of quiet.",
    image: img("silhouette", 900),
  },
  {
    title: "Cedar Light",
    category: "Forest Trails",
    location: "Wakayama, Japan",
    date: "Nov 2019",
    excerpt: "Old-growth cedar and a thousand years of footsteps pressed into stone.",
    image: img("forestPath", 900),
  },
  {
    title: "Camp at 4,200m",
    category: "Camping",
    location: "Annapurna, Nepal",
    date: "Oct 2025",
    excerpt: "A three-tent camp, a shared thermos, and the loudest silence I know.",
    image: img("tentNight", 900),
  },
  {
    title: "The Village Below the Pass",
    category: "Remote Villages",
    location: "Markha Valley, Ladakh",
    date: "Sep 2021",
    excerpt: "Barley fields, a two-room homestay, and the best cup of butter tea I've had.",
    image: img("sunriseHiker", 900),
  },
  {
    title: "Grizzly Country",
    category: "Wildlife &amp; Nature",
    location: "Banff, Canada",
    date: "Jul 2020",
    excerpt: "A ridge walk shared with more marmots than people, and one very distant bear.",
    image: img("forestPath", 900),
  },
  {
    title: "The Long Traverse",
    category: "Mountain Expeditions",
    location: "Chamonix–Zermatt",
    date: "Aug 2023",
    excerpt: "Twelve days, six passes, and a growing respect for whoever named these huts.",
    image: img("dolomitesPink", 900),
  },
];

/* ------------------------- Films / Vlog ------------------------- */
const FEATURED_VIDEO = {
  title: "Above the Clouds — Annapurna, Full Film",
  location: "Annapurna Circuit, Nepal",
  duration: "24:10",
  description:
    "The complete eighteen-day circuit, from Besisahar's rice terraces to the Thorong La pass, cut down to twenty-four minutes.",
  youtubeId: "REPLACE_WITH_YOUTUBE_ID",
  thumbnail: img("hikersRocky", 1600),
};

const VIDEOS = [
  {
    title: "9 Days in Patagonia — The W Circuit",
    location: "Torres del Paine, Chile",
    duration: "18:42",
    youtubeId: "REPLACE_WITH_YOUTUBE_ID",
    thumbnail: img("peakSnow", 900),
  },
  {
    title: "Solo in Ladakh — Kang Yatse Basecamp",
    location: "Ladakh, India",
    duration: "14:05",
    youtubeId: "REPLACE_WITH_YOUTUBE_ID",
    thumbnail: img("silhouette", 900),
  },
  {
    title: "The Haute Route — Chamonix to Zermatt",
    location: "Switzerland",
    duration: "21:30",
    youtubeId: "REPLACE_WITH_YOUTUBE_ID",
    thumbnail: img("dolomitesPink", 900),
  },
  {
    title: "A Week on the Laugavegur Trail",
    location: "Iceland",
    duration: "16:52",
    youtubeId: "REPLACE_WITH_YOUTUBE_ID",
    thumbnail: img("sunriseHiker", 900),
  },
  {
    title: "Field Notes: Packing for High Altitude",
    location: "Manali, India",
    duration: "9:18",
    youtubeId: "REPLACE_WITH_YOUTUBE_ID",
    thumbnail: img("tentNight", 900),
  },
];

/* ------------------------- Photography ------------------------- */
const PHOTO_CATEGORIES = ["All", "Mountains", "Landscapes", "People", "Trails", "Wildlife", "Camps", "Sunrise & Sunset"];

const PHOTOS = [
  { category: "Mountains", caption: "First light on the high peaks, Himalaya", image: img("peakSnow", 1200) },
  { category: "Trails", caption: "Switchbacks below Thorong La, Nepal", image: img("hikersRocky", 900) },
  { category: "Sunrise & Sunset", caption: "Dawn on the trail, Rae Lakes-style light", image: img("sunriseHiker", 1200) },
  { category: "People", caption: "A trekker's silhouette on the ridge", image: img("silhouette", 900) },
  { category: "Camps", caption: "Basecamp glowing after dark, 4,200m", image: img("tentNight", 900) },
  { category: "Landscapes", caption: "Pastel light over the Dolomites", image: img("dolomitesPink", 1200) },
  { category: "Wildlife", caption: "Where the trail meets the tree line", image: img("forestPath", 900) },
  { category: "Mountains", caption: "Snow ridge at dawn, Himalaya", image: img("peakSnow", 1200) },
  { category: "Trails", caption: "Cedar-lined path, old pilgrim route", image: img("forestPath", 900) },
  { category: "Sunrise & Sunset", caption: "Last light over the alpine ridgeline", image: img("dolomitesPink", 1200) },
  { category: "Landscapes", caption: "A quiet basin above the tree line", image: img("silhouette", 900) },
  { category: "Camps", caption: "Storm rolling in over camp", image: img("tentNight", 1200) },
];

/* ------------------------- Featured Story ------------------------- */
const FEATURED_STORY = {
  title: "Above the Clouds",
  subtitle: "A full circuit of the Annapurna massif, on foot, in eighteen days.",
  location: "Manang District, Nepal",
  date: "October 2025",
  duration: "18 days · 160 km · 5,416m high point",
  quote: "Somewhere past 4,800 metres, conversation stops being useful. You just walk, and the mountain does the talking.",
  body: [
    "The circuit begins in rice terraces and ends in high desert, and for the first three days it's easy to forget you're heading anywhere near five thousand metres. The Marsyangdi river runs loud below the trail, and the forest is thick enough that the mountains stay hidden until they don't.",
    "Manang is where the trip actually starts — a rest day mandated by altitude, not choice. From there the trees thin out fast. By day nine, the landscape has gone from rhododendron to rock, and the only sound left is wind and the occasional prayer flag working itself loose.",
    "Thorong La, at 5,416 metres, is not a technical pass. It is simply long, cold, and thin on oxygen — four hours up in the dark, cresting as the sun comes over the ridge, then a brutal 1,600-metre descent into Muktinath that tests different muscles entirely. Nobody talks much on the way down either.",
  ],
  heroImage: img("hikersRocky", 1800),
  supportingImages: [img("tentNight", 900), img("silhouette", 900)],
};

/* ------------------------- Field Kit / Gear ------------------------- */
const GEAR = [
  { category: "Camera", name: "Sony A7 IV", note: "Main body for stills and interviews." },
  { category: "Cine Lens", name: "Sony 16–35mm f/2.8 GM", note: "Lives on the camera for 80% of a trek." },
  { category: "Drone", name: "DJI Mavic 3", note: "Ridgelines and reveal shots — packed only above treeline." },
  { category: "Audio", name: "Rode Wireless GO II", note: "For interviews with guides and porters." },
  { category: "Backpack", name: "Osprey Aether 65", note: "Everything for ten days, camera gear included." },
  { category: "Boots", name: "La Sportiva Nucleo High GTX", note: "Broken in over three seasons, still going." },
  { category: "Shelter", name: "MSR Hubba Hubba NX2", note: "Two-person, four-season, packed for anything above basecamp." },
  { category: "Sleep System", name: "Rab Neutrino 600", note: "Rated to –12°C — earns its weight above 4,000m." },
];

/* ------------------------- Instagram-style strip ------------------------- */
const INSTAGRAM_STRIP = [
  img("peakSnow", 500),
  img("hikersRocky", 500),
  img("tentNight", 500),
  img("forestPath", 500),
  img("dolomitesPink", 500),
  img("sunriseHiker", 500),
];
