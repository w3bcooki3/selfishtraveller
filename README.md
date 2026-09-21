# Selfish Traveller — site v2

Plain HTML, CSS and JavaScript. No build step, no framework. It works on GitHub Pages, Netlify or any web host.

```
index.html          Home
films.html          Films & Shorts
photography.html    Photography (gallery, best-of print wall, licensing)
assets/css/site.css All styles, including the 6 themes
assets/js/data.js   ← THE CONTENT FILE: edit this one
assets/js/site.js   Behaviour (themes, walking band, lightbox, video player…)
assets/css/mobile.css  Phone layout + mobile fixes (desktop never uses it)
assets/js/mobile.js    Phone layout: tab bar, story viewer, theme sheet, Pocket homepage
```

## Editing content: `assets/js/data.js`

| What | Where in data.js |
|---|---|
| Email, name, location | `SITE` |
| Social links (header rail, "Follow the journey", footer) | `SOCIAL`. Paste a URL and the "Coming soon" badge disappears |
| Long YouTube films | `FILMS`. Paste the YouTube link; `featured:true` puts it on top |
| Shorts | `SHORTS` |
| Films still being edited | `IN_THE_EDIT` |
| Photographs (gallery + lightbox) | `PHOTOS` |
| Best-of print wall | `COLLAGE`. Picks photo ids and positions |
| Instagram highlights, reels, posts | `INSTAGRAM` |
| Hero pictures per theme | `THEME_HERO` |

### Using your own photos
Put files in `assets/img/` and use the path, e.g. `img:"assets/img/grizzly.jpg"`.
Anything starting with `u:` is a temporary Unsplash stand-in. Replace it, then delete `STOCK` at the bottom.
Export photos at about 2000px on the long edge (JPG, quality ~80) so they load fast and full-resolution files stay private.

### Making reels play on the page
Instagram won't let other sites play reels. Export the reel (.mp4, 720p, a few MB), put it in `assets/video/`
and set `file:"assets/video/monkman.mp4"` on that reel. It then plays silently on hover.

## Themes
Dusk, Sun, Rain, Wind, Forest, Night, plus **Live BC**, which reads the current weather in Vancouver (open-meteo.com, free, no key)
and picks the matching theme. Each theme recolours the site, swaps the hero pictures, and changes the weather in
the walking band: sun and birds, rain with umbrellas, wind with blowing leaves, dense forest with fireflies, or night with headlamps, stars and aurora.
The visitor's choice is remembered.

## Video
On a real domain, films and shorts play in a pop-up player on the page. If you open the files straight from a folder
(file://), YouTube refuses to embed, so the buttons open YouTube in a new tab. To preview the pop-up locally, run:
```
npx serve .
```

## Copyright
Every photo carries a "© Aman Saini" mark in the gallery and lightbox. Right-click and dragging are disabled on
images, and the footer and photography page state the usage terms. This is a deterrent, not a lock. Anything shown in a browser
can be screenshotted, which is why only reduced web copies should be uploaded.

## Placeholders to replace before launch
- `SITE.email` (currently hello@example.com)
- Social URLs for TikTok, Facebook, X, Threads, Pinterest
- A real portrait in the About section (index.html, search "stand-in")
- All `u:` stock images
- Sample copy: journal trips, species notes, "In the edit" list

## Phones (the "Pocket" layout)
On screens up to 760px wide (and phones turned sideways) the header and hero stay exactly as on
desktop. Below the hero the homepage switches to the Pocket layout: an at-a-glance card, Instagram
story rings (tap = full-screen story viewer), latest film + shorts, the walking band, a wildlife
swipe row, a filterable photo grid, About, Follow (with reels) and Work together. Every page gets a
bottom tab bar (it slides in once you scroll past the hero), a theme sheet and a compact footer.
Everything reads from the same data.js, so there is nothing extra to edit.
Desktop and tablet layouts are unchanged.
