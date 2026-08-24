# Claude Code Prompt — Saloni & Anup Wedding Announcement Website

Copy everything below into Claude Code as your initial prompt.

---

Build a highly animated, single-page wedding announcement website for a traditional Indian wedding. Use React + Vite + Tailwind CSS + Framer Motion (add GSAP + ScrollTrigger if needed for scroll-driven sequences). This should feel like a premium digital version of a hand-illustrated Indian wedding card — warm, ornate, and alive with motion, not a generic template.

## Content

- Headline: "Together with their families,"
- Couple: **Saloni & Anup** (elegant script font, large, center stage)
- Saloni — Daughter of Meena & Ashok Devda
- Anup — Son of Babita & KrishnaGopal Solanki
- Date: **24 FEB 2027**, Wednesday, Evening — Venues to be announced
- Closing line: "We solicit your presence & blessings"
- Include a simple RSVP button/section (mailto or form placeholder) and a "Save the Date" (add to calendar / .ics download) button

## Visual & Design System

Palette: warm ivory/cream background (#F5EDE0-ish), deep maroon/red (#7A1F2B), mustard gold (#C9962C), teal accent (#1F6E6E), with small pops of coral/orange (marigold tones).

Typography:
- Display/script font for "Saloni & Anup" — something like "Great Vibes" or "Alex Brush" (Google Fonts)
- Serif headline font for names/section titles — "Cormorant Garamond" or "Playfair Display"
- Clean serif body font — "EB Garamond" or "Cormorant"

Use the provided PNG illustration assets (transparent background) instead of hand-coding SVGs. They live in `/src/assets/` — copy them in from the project's `assets/` folder before starting:

- `couple_illustration.png` — the bride & groom hero illustration
- `corner_floral_ornament.png` — jewel-toned floral corner ornament (use top-left and mirror/rotate for other corners)
- `kalamkari_arch.png` — the ornate arch frame (place behind/around the couple illustration in the hero)
- `nandi_cows.png` — set of 5 cow illustrations (can be split further or used as a decorative cluster near the arch)
- `garland_bunches.png` — hanging marigold garland strands + a swagged garland bunting, great for the top corner and as a hanging element above the date card
- `toran_banner_1.png` / `toran_banner_2.png` — two variants of a toran-style bunting with "24 FEB 2027" already lettered in; pick whichever fits, or use the graphic bunting art only (crop out the date text in code and overlay your own live date text on top so it stays editable/animatable)
- `heading_together_families.png`, `script_saloni_anup.png`, `date_day_venue_text.png`, `blessing_text.png` — the reference text as styled art. **Recreate these as real HTML text** (using the fonts specified below) rather than using these images directly, so they stay crisp, accessible, and animatable letter-by-letter. Keep the PNGs only as visual/style reference for the designer.
- `vertical_border_pattern.png` — tall decorative border strip (good for framing a section edge)
- `marigold_flower_single.png` — single marigold bloom, useful as a small accent or repeated particle
- `pattern_strip_horizontal.png` — repeatable horizontal border pattern (good as a top/bottom section divider, can be tiled with `background-repeat`)
- `kalash_pots.png` — terracotta kalash pot cluster (bottom corner motif)
- `wedding_items_potli.png` — wrapped potli/gift bundle cluster (opposite bottom corner motif)
- `marigold_swag_1.png` / `marigold_swag_2.png` — thin gold scroll-flourish dividers with marigold accents, use as section dividers

A few of these (`garland_bunches`, `vertical_border_pattern`) have slight bleed from neighboring artwork at the edges — if it's noticeable at the size you're displaying it, crop a few px further or mask it with `object-fit`/overflow hidden on the container.

Since these are raster PNGs, adapt the animation approach accordingly (see Animation Requirements below) — use CSS/Framer Motion transforms (fade, scale, translate, clip-path reveal, mask-based wipes) rather than SVG stroke-draw animations, except where noted.

Card background should have a subtle deckle/scalloped edge and soft paper texture (recreate this with CSS — a repeating scallop border shape or a subtle background texture image — since it wasn't cleanly extractable as a standalone asset).

## Animation Requirements (this is the core ask — make it feel alive)

1. **Hero entrance sequence**: On load, reveal `kalamkari_arch.png` with a clip-path/mask wipe (bottom-to-top or center-out reveal, since it's a raster image and can't stroke-draw), then the `couple_illustration.png` fades/scales up on top of it, then "Together with their families" (real text) fades in, then the "Saloni & Anup" script text animates in with a soft scale+fade, staggered word by word.
2. **Floating ambient motion**: `corner_floral_ornament.png`, `garland_bunches.png`, and `marigold_flower_single.png` accents should have a subtle continuous float/sway (like they're gently moving in a breeze) using Framer Motion's `animate` with `repeat: Infinity`.
3. **Scroll-triggered reveals**: As the user scrolls to the names/parents section, date section, and RSVP section, each should reveal with staggered fade-up + slight scale, using GSAP ScrollTrigger or Framer Motion's `whileInView`.
4. **Date block**: Give the date card a special reveal — like a wax-seal/stamp effect (scale from 0 with a slight overshoot/bounce). Use the bunting/garland art from `toran_banner_1.png` or `toran_banner_2.png` (with the baked-in date text cropped out or masked off) hanging above it and swinging into place first, then overlay live, animatable "24 FEB 2027" text underneath it.
5. **Decorative dividers**: Use `marigold_swag_1.png` / `marigold_swag_2.png` or `pattern_strip_horizontal.png` as section dividers, revealed with a fade + horizontal scale-in (scaleX from 0 to 1, transform-origin center) as they scroll into view, mimicking a "drawing in" effect even though it's a raster asset.
6. **Micro-interactions**: Buttons (RSVP, Save the Date) should have a warm hover glow/scale, and a gentle pulsing invitation to click.
7. **Background texture**: Subtle parallax on background texture — `marigold_flower_single.png` duplicated small and low-opacity as a few drifting petal particles, moving slowly, non-distracting.
8. **Optional but nice**: A gentle looping shimmer/gold-foil sheen effect (CSS gradient mask animation) that sweeps across the script names every several seconds.

## Structure

1. Hero: arch + couple illustration + "Together with their families" + Saloni & Anup script title
2. Names/parents section: Saloni's and Anup's names with parents, separated by an ornamental "&"
3. Date & day section with garland reveal and Save-the-Date button
4. Closing blessing line with bottom corner motifs (pots + potli bundles)
5. RSVP section/footer

## Technical Notes

- Fully responsive — this must look great on mobile (most guests will open it on WhatsApp-shared links), so design mobile-first, then scale up for desktop with a wider layout
- Keep animations performant: use `transform`/`opacity` for animated properties, avoid layout-thrashing properties, lazy-mount below-the-fold animations
- Respect `prefers-reduced-motion` — provide a reduced-motion fallback (simple fades, no continuous loops)
- All illustrations should be coded as inline SVG components so colors/animations are fully controllable — don't rely on static image files for the ornamental elements
- Add a loading screen with a simple animated motif (e.g., `marigold_flower_single.png` gently pulsing) while fonts/assets load
- Optimize the PNG assets on import (they're cropped from a larger sheet, so trim any excess transparent padding and compress) — consider `<img loading="eager">` for hero assets and `loading="lazy"` for below-the-fold ones
- Structure code into clean components: `Hero.jsx`, `FloralArch.jsx`, `CoupleIllustration.jsx`, `Garland.jsx`, `DateCard.jsx`, `NamesSection.jsx`, `RSVPSection.jsx`, `FlourishDivider.jsx`

## Assets

All image assets referenced above are provided in the `assets/` folder alongside this prompt — copy them into `src/assets/` at project start.

Start by scaffolding the project, copying in the assets, and building the hero section with the arch reveal animation first, then iterate section by section.
