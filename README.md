# Bhitarkanika Eco Cottage — Website

**Where the Mangroves Whisper** · Riverside eco cottages at Kasturikona Ghat, Chandbali, Odisha —
the gateway to Bhitarkanika National Park.

Static website (HTML + CSS + vanilla JS, no build step) for **bhitarkanikaecocottage.com**,
designed for free hosting on Cloudflare Pages, Netlify or GitHub Pages.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Cottages | `cottages.html` |
| Experiences | `experiences.html` |
| Book a Boat Safari (per-ghat fares → WhatsApp) | `boat-safari.html` |
| Packages & itineraries | `packages.html` |
| Bhitarkanika park guide (seasons, rules, wildlife) | `bhitarkanika.html` |
| Gallery (filters + lightbox) | `gallery.html` |
| Contact & how to reach | `contact.html` |

The header, footer, WhatsApp button and mobile bottom bar are shared — they are written by
`js/main.js`, so a change there updates every page.

## Editing common things

All in the top of **`js/main.js`**:

- **WhatsApp / phone numbers, Instagram, Facebook** → the `SITE` object.
- **Boat fare per ghat** → the `GHATS` list. Set `price: 2500` (₹ per boat) or leave `null` for "On request".

Text on each page is plain HTML — edit it directly.
Photos: see [`images/README.md`](images/README.md) for the file names to use.

## Design

- Palette: mangrove green `#1F3B2D`, sand `#F4EDE1`, gold `#C9A45C` (tokens at the top of `css/style.css`).
- Type: Cormorant Garamond (headings) + Jost (body), from Google Fonts.
- Motion: leaf-mark page-transition veil, headline reveals, Ken Burns hero, drifting mist, flying birds,
  fireflies (canvas), scroll reveals, parallax, animated counters, split-screen story, season calendar.
  All motion is switched off for visitors who set "reduce motion" on their device.
- Until real photos are added, hand-made SVG illustrations (`assets/scenes/`) fill every image slot.

## Preview locally

```bash
python3 -m http.server 8000
```
then open http://localhost:8000

## Free hosting (Cloudflare Pages — recommended)

1. Buy `bhitarkanikaecocottage.com` (e.g. on Cloudflare Registrar, ~₹800–1,200/yr).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → connect this GitHub repo.
   Build command: *none*. Output directory: `/`.
3. Custom domains → add `bhitarkanikaecocottage.com`. SSL is automatic.

GitHub Pages also works: Settings → Pages → Deploy from branch `main` / root.

## Before going live — please verify

- Boat fares for each ghat, cottage types and rates, package prices.
- Which phone number(s) to show (99370 76645 / 94370 76645).
- Instagram / Facebook handles (currently assumed `bhitarkanikaecocottage`).
- Park timings and fees each season. Research notes: [`docs/research-brief.md`](docs/research-brief.md).
