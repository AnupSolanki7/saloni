import { photoAssets, videoAssets } from "../lib/assets";

/*
 * ─── HOW TO EDIT ───────────────────────────────────────────────────────────
 * • Captions: change `title` (short, shown on the photo frame) and `caption`
 *   (the handwritten note next to it) on any memory below.
 * • Dates: every `date` is null because no photo dates could be verified.
 *   Add one like  date: "14 Feb 2026"  and it will be written on the page.
 * • Order / layout: edit `albumPages` at the bottom of this file.
 * • Photo crop: `focus` is a CSS object-position, e.g. "center 20%" shows
 *   more of the top of the photo.
 * Assets live in public/memories/{photos,thumbnails,videos}. Originals are
 * kept untouched in /media-originals (not deployed).
 */

export const chapters = [
  {
    id: "two-of-us",
    number: "One",
    title: "The Two of Us",
    subtitle: "Every favourite picture starts with you and me.",
  },
  {
    id: "favourite-person",
    number: "Two",
    title: "My Favourite Person",
    subtitle: "Dressed up, sleepy-eyed, mid-laugh — every version of you.",
  },
  {
    id: "adventures",
    number: "Three",
    title: "Little Adventures",
    subtitle: "Hilltops, lakesides, and every road in between.",
  },
  {
    id: "little-things",
    number: "Four",
    title: "All the Little Things",
    subtitle: "The calls, the colours, the in-betweens.",
  },
  {
    id: "forever",
    number: "Five",
    title: "Us, Forever",
    subtitle: "Your hand in mine — for always.",
  },
];

const photo = (id, width, height, chapter, title, caption, extra = {}) => ({
  id,
  type: "image",
  ...photoAssets(id),
  width,
  height,
  chapter,
  title,
  caption,
  date: null,
  focus: "center 30%",
  ...extra,
});

const video = (id, width, height, duration, hasAudio, chapter, title, caption) => ({
  id,
  type: "video",
  ...videoAssets(id),
  width,
  height,
  duration,
  hasAudio,
  chapter,
  title,
  caption,
  date: null,
});

export const memoryList = [
  // ── Chapter One · The Two of Us ──
  photo("p01", 896, 1195, "two-of-us", "Pink on Pink", "Same colours, same smile, same heart."),
  photo("p02", 896, 1195, "two-of-us", "This Smile", "You lean in, and the whole world gets softer."),
  photo("p03", 900, 1600, "two-of-us", "Cheek to Cheek", "My favourite kind of photo — the one where you're right next to me.", { focus: "center 25%" }),
  photo("p04", 900, 1600, "two-of-us", "Golden Light", "The light was pretty. You were prettier."),
  photo("p05", 900, 1600, "two-of-us", "Right Here", "Your hand on my heart — right where it belongs.", { focus: "center 45%" }),
  photo("p06", 2316, 3088, "two-of-us", "Close Enough", "I'd take a hundred of these if it means standing this close to you."),
  photo("p07", 3024, 4032, "two-of-us", "Sun & Water", "Sunglasses on, wind in your hair, and me — the luckiest one in the frame."),
  photo("p08", 4032, 3024, "two-of-us", "Just Sitting With You", "Even the most ordinary afternoon turns into a memory when it's with you.", { focus: "center 45%" }),

  // ── Chapter Two · My Favourite Person ──
  photo("p09", 2610, 3480, "favourite-person", "Pretty in Pink", "I still don't know how you make everything look this effortless.", { focus: "center 20%" }),
  photo("p10", 960, 1280, "favourite-person", "Henna & Happiness", "Those mehndi hands and that shy little smile.", { focus: "center 35%" }),
  photo("p11", 1200, 1600, "favourite-person", "A Burst of Colour", "You in colours like these? Unfair to everyone else in the room.", { focus: "center 40%" }),
  photo("p12", 1200, 1600, "favourite-person", "Twirl-Worthy", "Every outfit gets a little prettier the moment you wear it.", { focus: "center 35%" }),
  photo("p13", 1117, 1408, "favourite-person", "Midnight Blue", "The night was dark; you were the brightest thing in it.", { focus: "center 40%" }),
  photo("p14", 2610, 3480, "favourite-person", "Glowing", "Stars, streetlights, and you.", { focus: "center 25%" }),
  photo("p15", 1200, 1600, "favourite-person", "Simply Stunning", "No filter, no backdrop, no need. Just you.", { focus: "center 50%" }),
  photo("p16", 1021, 1600, "favourite-person", "Timeless", "Old carved stone, and the most beautiful thing standing in front of it.", { focus: "center 30%" }),
  photo("p17", 4284, 5712, "favourite-person", "Caught Mid-Turn", "That look over your shoulder — I'm done for.", { focus: "65% 40%" }),
  photo("p18", 3024, 4032, "favourite-person", "Lakeside Glow", "City lights behind you, and still I only see you.", { focus: "60% 40%" }),
  photo("p19", 3024, 4032, "favourite-person", "Blurry & Perfect", "Not every favourite photo is sharp. Some are just full of you laughing.", { focus: "center 55%" }),
  photo("p20", 720, 1280, "favourite-person", "Rec ●", "If I could press record on life, I'd keep this one on loop.", { focus: "center 35%" }),

  // ── Chapter Three · Little Adventures ──
  photo("p21", 3120, 4160, "adventures", "On Top of the World", "Wherever we go, the view is better with you in it.", { focus: "center 55%" }),
  photo("p22", 3120, 4160, "adventures", "Up Here With You", "A city below, the clouds above, and you beside me.", { focus: "center 50%" }),
  photo("p23", 768, 1365, "adventures", "Looking Ahead", "Side by side, looking at whatever comes next.", { focus: "center 45%" }),
  photo("p24", 1195, 896, "adventures", "Blessings, Together", "Hands full of flowers, hearts full of prayers.", { focus: "center 40%" }),
  photo("p25", 1086, 1448, "adventures", "By the Water", "Palaces in the background, my whole world in the front.", { focus: "center 55%" }),
  photo("p26", 3120, 4160, "adventures", "Our Little Photobomber", "Us, the lake, and one very relaxed little friend.", { focus: "center 60%" }),
  photo("p27", 4284, 5712, "adventures", "City of Lights", "Every light on that water, and I was looking at you.", { focus: "center 55%" }),
  photo("p28", 941, 1672, "adventures", "Udaipur Nights", "Candlelight, the palace glowing behind us, and you leaning into me.", { focus: "center 45%" }),
  photo("p29", 1200, 1600, "adventures", "Follow Me", "Lead the way. I'll follow you anywhere.", { focus: "center 50%" }),

  // ── Chapter Four · All the Little Things ──
  photo("p30", 1179, 2556, "little-things", "Even Through a Screen", "Miles apart, and you still make me grin like this.", { focus: "center 40%" }),
  photo("p31", 1179, 2556, "little-things", "My Favourite Call", "The best part of any day: your face lighting up my screen.", { focus: "center 35%" }),
  photo("p32", 1024, 1536, "little-things", "Picture-Postcard Us", "Matching denim, matching hearts.", { focus: "center 35%" }),
  photo("p33", 941, 1672, "little-things", "Forehead Kisses", "Some things are easier to say without words.", { focus: "center 40%" }),
  photo("p34", 1024, 1536, "little-things", "In Every Colour", "Mirrors, colours, music — and you, outshining all of it.", { focus: "center 40%" }),

  // ── Chapter Five · Us, Forever ──
  photo("p35", 1200, 1600, "forever", "Garlands & Smiles", "Side by side, flowers around our necks and happiness all over our faces.", { focus: "center 45%" }),
  photo("p36", 960, 1280, "forever", "Sweet Moments", "Sweets in hand, and so much love in the room.", { focus: "center 45%" }),
  photo("p37", 900, 1600, "forever", "Hand in Hand", "Your hand in mine — my favourite place to be.", { focus: "center 55%" }),
  photo("p38", 768, 1364, "forever", "Holding On", "And I'm never letting go.", { focus: "center 40%" }),
  photo("p39", 941, 1672, "forever", "This Hand", "The hand I want to hold through every sunrise, and every night like this one.", { focus: "center 65%" }),
  photo("p40", 1086, 1448, "forever", "My Favourite View", "You, me, and a sky on fire.", { focus: "center 55%" }),

  // ── Videos ──
  video("v1", 480, 854, 1.9, false, "favourite-person", "Hair Flip", "That hair flip."),
  video("v2", 480, 854, 1.8, false, "favourite-person", "That Look", "That look."),
  video("v3", 480, 854, 2.8, false, "favourite-person", "Just Because", "Just because."),
  video("v4", 540, 960, 3.4, false, "favourite-person", "Moving Pictures", "Some moments are too pretty to stay still."),
  video("v5", 540, 960, 4.0, true, "favourite-person", "All Dressed Up", "I could watch this on repeat."),
  video("v6", 480, 854, 8.4, true, "favourite-person", "Wind in Your Hair", "Blue skies, and your hair dancing in the wind."),
  video("v7", 960, 540, 9.1, false, "adventures", "Fresh Air", "Green fields, open skies, and you — the best view of all."),
];

export const memories = Object.fromEntries(memoryList.map((m) => [m.id, m]));

/*
 * The album, page by page. On phones one page shows at a time; on wide
 * screens pages pair up into spreads (0+1, 2+3, …), so keep `final-photo` on
 * an even index — the album adds a blank page automatically if it isn't.
 * Layouts: title · chapter · polaroid · duo · cinematic · landscape · video ·
 *          filmstrip · final-photo · final-message
 */
export const albumPages = [
  { layout: "title" },

  { layout: "chapter", chapter: "two-of-us", memory: "p01" },
  { layout: "duo", memories: ["p02", "p03"] },
  { layout: "duo", memories: ["p04", "p05"] },
  { layout: "cinematic", memory: "p06" },
  { layout: "polaroid", memory: "p07" },
  { layout: "landscape", memory: "p08" },

  { layout: "chapter", chapter: "favourite-person", memory: "p09" },
  { layout: "duo", memories: ["p10", "p11"] },
  { layout: "video", memory: "v4" },
  { layout: "duo", memories: ["p13", "p14"] },
  { layout: "polaroid", memory: "p12" },
  { layout: "filmstrip", memories: ["v1", "v2", "v3"], title: "Little Clips of You", note: "Tiny moments I keep coming back to." },
  { layout: "duo", memories: ["p15", "p16"] },
  { layout: "video", memory: "v5" },
  { layout: "duo", memories: ["p17", "p18"] },
  { layout: "duo", memories: ["p19", "p20"] },
  { layout: "video", memory: "v6" },

  { layout: "chapter", chapter: "adventures", memory: "p21" },
  { layout: "duo", memories: ["p22", "p23"] },
  { layout: "landscape", memory: "p24" },
  { layout: "video", memory: "v7" },
  { layout: "duo", memories: ["p25", "p26"] },
  { layout: "cinematic", memory: "p27" },
  { layout: "duo", memories: ["p28", "p29"] },

  { layout: "chapter", chapter: "little-things", memory: "p31" },
  { layout: "polaroid", memory: "p30" },
  { layout: "duo", memories: ["p32", "p33"] },
  { layout: "cinematic", memory: "p34" },

  { layout: "chapter", chapter: "forever", memory: "p37" },
  { layout: "duo", memories: ["p35", "p36"] },
  { layout: "duo", memories: ["p38", "p39"] },

  { layout: "final-photo", memory: "p40" },
  { layout: "final-message" },
];
