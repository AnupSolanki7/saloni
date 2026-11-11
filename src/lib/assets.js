// Builds public asset URLs that keep working when the site is deployed under a
// sub-path (e.g. GitHub Pages), because Vite sets BASE_URL from `base`.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export const assetUrl = (path) => `${BASE}/${path.replace(/^\//, "")}`;

export const photoAssets = (id) => ({
  src: assetUrl(`memories/photos/${id}.webp`),
  thumb: assetUrl(`memories/thumbnails/${id}.webp`),
});

export const videoAssets = (id) => ({
  src: assetUrl(`memories/videos/${id}.mp4`),
  poster: assetUrl(`memories/thumbnails/${id}-poster.webp`),
});
