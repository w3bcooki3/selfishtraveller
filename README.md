# Arjun Mehta — Personal Brand Website

A static, dependency-free site (HTML + CSS + vanilla JS). No build step —
open `index.html` in a browser or deploy the folder as-is.

## Project structure

```
index.html         Page structure + SEO/Open Graph/Twitter meta
css/style.css       Design system (colors, type, layout, components, motion)
js/data.js          ALL editable content lives here
js/main.js          Renders data.js into the page + interactions (nav, filters,
                    lightboxes, video modal, reveal-on-scroll)
images/             Local image folder (optional — see below)
```

## 1. Replacing content (the important part)

Everything you'll want to change lives in **`js/data.js`**:

| What | Variable |
|---|---|
| Name, tagline, role, email, base | `SITE` |
| Homepage stats (countries, treks, years, films) | `STATS` |
| Nav labels | `NAV_LINKS` |
| Instagram/YouTube/TikTok/X/Facebook/LinkedIn links | `SOCIAL_LINKS` |
| Featured Journeys cards | `JOURNEYS` |
| Trail Log entries + filter categories | `TRAIL_LOG`, `TREK_CATEGORIES` |
| Featured film + video grid | `FEATURED_VIDEO`, `VIDEOS` |
| Photography gallery + categories | `PHOTOS`, `PHOTO_CATEGORIES` |
| "Above the Clouds" editorial story | `FEATURED_STORY` |
| Field kit / gear list | `GEAR` |
| Instagram-style image strip | `INSTAGRAM_STRIP` |

You do not need to touch `index.html` or `main.js` to update any of the above —
just edit the arrays/objects in `data.js` and the page re-renders automatically.

## 2. Images

Every image URL in `data.js` currently points to Unsplash as a **placeholder**.
To use your own photography:

1. Add your images to `/images` (suggested subfolders: `journeys/`, `trail-log/`,
   `photography/`, `videos/`, `portrait/`).
2. Replace the matching `image:` / `thumbnail:` / `heroImage:` URL in `data.js`
   with the local path, e.g. `"images/journeys/annapurna.jpg"`.
3. Recommended sizes: hero/journey images ~1600–1900px wide; gallery/trail
   thumbnails ~900px wide. Keep files under ~400KB (export at 75–85% JPEG
   quality) for fast loading.
4. Update the `og:image` / `twitter:image` URLs in `index.html`'s `<head>` to
   a real hosted image once the site is live — this is what shows when the
   link is shared on social media or iMessage.

## 3. Videos

Each video entry has a `youtubeId` field. Replace `"REPLACE_WITH_YOUTUBE_ID"`
with the actual YouTube video ID (the part after `v=` in a YouTube URL).
Clicking a video card opens it in a lightbox and embeds it directly — nothing
else needs to change.

## 4. Connecting the contact form

The form in the Contact section is fully built but not wired to send email yet
(this is a static site, by design — no backend). Two easy options:

**Option A — Formspree (fastest)**
1. Create a form at [formspree.io](https://formspree.io) and copy your endpoint.
2. In `index.html`, replace the form's `action` attribute:
   `action="https://formspree.io/f/REPLACE_ME"` → your real endpoint.
3. In `js/main.js`, delete the `wireForm()` function (and its call in the
   `DOMContentLoaded` listener at the bottom) so the form submits normally
   instead of being intercepted.

**Option B — Netlify Forms**
1. Add `data-netlify="true"` and `name="contact"` to the `<form>` tag in
   `index.html`.
2. Same as above — remove `wireForm()` so submission isn't intercepted.
3. Deploy to Netlify; forms are detected automatically at build time.

## 5. Deployment

This is a plain static site — drag-and-drop or connect the repo to any of:

- **Netlify** — drag the folder onto the Netlify dashboard, or connect the repo.
- **Vercel** — `vercel deploy` from inside this folder, no config needed.
- **GitHub Pages** — push to a repo, enable Pages on the `main` branch (root).
- **Cloudflare Pages** — connect the repo, no build command, output dir `/`.

No environment variables, no build command, no server required.

## 6. Before going live — checklist

- [ ] Replace all Unsplash placeholder images with real photography
- [ ] Replace all `REPLACE_ME` social URLs in `data.js`
- [ ] Replace all `REPLACE_WITH_YOUTUBE_ID` video IDs in `data.js`
- [ ] Update `SITE.email` in `data.js`
- [ ] Connect the contact form (see §4)
- [ ] Update `og:image` and the canonical URL in `index.html`'s `<head>`
- [ ] Add a real `sitemap.xml` entry once the domain is live (a stub is included)

## Accessibility & performance notes

- Respects `prefers-reduced-motion` (disables scroll reveals, hero drift, and
  smooth-scroll for users who request it).
- All interactive elements are keyboard-reachable with visible focus states.
- Images are lazy-loaded (except the hero) with explicit width/height to
  prevent layout shift.
- No external JS dependencies — only two Google Fonts and vanilla JS.
