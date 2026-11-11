# Happy Birthday Saloni ❤️ — Our Little Love Story

A birthday surprise: an envelope opening, a love letter, and a 34-page scrapbook
album with real 3D page turns (swipe on phones, two-page spreads on desktop).

Built with Vite + React + Tailwind CSS v4 + framer-motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173  (add --host to open it on your phone over Wi-Fi)
npm run build      # production build into dist/
npm run preview    # serve the production build
```

## Where things live

| What | File |
| --- | --- |
| Photo/video captions, chapters, page order | `src/data/memories.js` |
| Birthday letter and final page text | `src/data/words.js` |
| Background music + signature | `src/data/config.js` |
| Web-ready media (what the site loads) | `public/memories/{photos,thumbnails,videos}` |
| Untouched originals (not deployed) | `media-originals/` |

**Edit a caption:** in `src/data/memories.js`, find the memory (e.g. `p07`) and change
its `title` (on the Polaroid) or `caption` (the handwritten note). Add a `date` there if you
want one shown. Change `focus` (e.g. `"center 20%"`) to adjust how a photo is cropped.

**Add music:** put an mp3 at `public/music/our-song.mp3` and set
`MUSIC_SRC = "music/our-song.mp3"` in `src/data/config.js`. It starts when she taps
"Open Your Birthday Letter" and can be toggled from the corner button.

The old wedding announcement page is kept in `src/WeddingApp.jsx` (not used).
