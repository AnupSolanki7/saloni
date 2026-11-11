import { chapters, memories } from "../data/memories";
import { Blossom, Flourish, Heart, HeartOutline, Rose, Sparkle, Sprig } from "./Decor";
import PhotoMemory, { Photo } from "./PhotoMemory";
import VideoMemory from "./VideoMemory";
import { FinalMessagePage, FinalPhotoPage } from "./FinalPage";

const chapterById = Object.fromEntries(chapters.map((c) => [c.id, c]));
const TAPES = ["rose", "cream", "sage", "gold"];
const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

function Note({ children, style, className = "", size = "5cqw" }) {
  return (
    <p className={`hand absolute ${className}`} style={{ fontSize: `max(14px, ${size})`, ...style }}>
      {children}
    </p>
  );
}

function DateLine({ memory, style }) {
  if (!memory?.date) return null;
  return (
    <span className="eyebrow absolute" style={{ fontSize: "max(9px, 2.4cqw)", ...style }}>
      {memory.date}
    </span>
  );
}

/* ── Title / contents ─────────────────────────────────────────────────── */
function TitlePage({ chapterStarts, onJump }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center px-[9cqw] pt-[11cqw] text-center">
      <Sprig className="absolute left-[4cqw] top-[4cqw] w-[9cqw] -rotate-[30deg] opacity-70" />
      <Blossom className="absolute right-[6cqw] top-[6cqw] w-[8cqw] opacity-90" />
      <p className="eyebrow" style={{ fontSize: "max(9px, 2.7cqw)" }}>a scrapbook for Saloni</p>
      <h2 className="mt-[3cqw] font-serif text-[max(20px,8cqw)] leading-none text-wine">Our Little</h2>
      <p className="font-script text-[max(38px,15cqw)] leading-[1.05] text-burgundy">Love Story</p>
      <Flourish className="mt-[2cqw] w-[48cqw] text-rose" />

      <nav className="mt-[7cqw] w-full text-left" aria-label="Chapters">
        <p className="eyebrow mb-[2.5cqw] text-center" style={{ fontSize: "max(9px, 2.5cqw)" }}>Contents</p>
        <ol className="space-y-[1.2cqw]">
          {chapters.map((c, i) =>
            chapterStarts[c.id] == null ? null : (
              <li key={c.id}>
                <button
                  type="button"
                  data-no-flip
                  onClick={() => onJump?.(chapterStarts[c.id])}
                  className="group flex w-full items-baseline gap-[2cqw] rounded py-[1cqw] text-left font-serif text-[max(14px,4.5cqw)] text-ink transition hover:text-burgundy"
                >
                  <span className="w-[7cqw] shrink-0 italic text-rose-deep">{ROMAN[i]}.</span>
                  <span className="shrink-0">{c.title}</span>
                  <span className="mx-[1cqw] flex-1 translate-y-[-0.25em] border-b border-dotted border-rose/60" />
                  <span className="shrink-0 italic text-rose-deep">{chapterStarts[c.id] + 1}</span>
                </button>
              </li>
            ),
          )}
        </ol>
      </nav>

      <p className="hand absolute bottom-[10cqw] left-0 right-0 text-center text-rose-deep" style={{ fontSize: "max(14px, 4.6cqw)" }}>
        swipe, or tap the edge, to turn the page <span className="nudge inline-block">→</span>
      </p>
    </div>
  );
}

/* ── Chapter opener ───────────────────────────────────────────────────── */
function ChapterPage({ page, variant }) {
  const ch = chapterById[page.chapter];
  const m = memories[page.memory];
  const idx = chapters.findIndex((c) => c.id === page.chapter);
  return (
    <div className="absolute inset-0">
      <span className="absolute font-serif italic text-blush-deep" style={{ fontSize: "26cqw", right: "4cqw", bottom: "3cqw", lineHeight: 1 }} aria-hidden="true">
        {ROMAN[idx]}
      </span>
      <div className="absolute left-0 right-0 top-[9cqw] flex flex-col items-center px-[8cqw] text-center">
        <p className="eyebrow" style={{ fontSize: "max(9px, 2.6cqw)" }}>Chapter {ch.number}</p>
        <h2 className="mt-[1.5cqw] font-serif text-[max(24px,8.4cqw)] italic leading-[1.02] text-burgundy">{ch.title}</h2>
        <Flourish className="mt-[1.8cqw] w-[38cqw] text-rose" />
        <p className="hand mt-[1.5cqw] text-rose-deep" style={{ fontSize: "max(14px, 4.6cqw)" }}>{ch.subtitle}</p>
      </div>
      <PhotoMemory
        memory={m}
        aspect="1 / 1"
        rotate={variant % 2 ? 2.5 : -2.5}
        tape={TAPES[idx % TAPES.length]}
        sizes="(max-width: 640px) 70vw, 380px"
        style={{ width: "60%", left: "20%", top: "55cqw" }}
      />
      <Sprig className="absolute bottom-[10cqw] left-[5cqw] w-[10cqw] rotate-[-20deg] opacity-80" />
    </div>
  );
}

/* ── Two photos, scrapbook style ──────────────────────────────────────── */
function DuoPage({ page, variant }) {
  const [a, b] = page.memories.map((id) => memories[id]);
  const mirror = variant % 2 === 1;
  const tapeA = TAPES[variant % 4];
  const tapeB = TAPES[(variant + 2) % 4];
  const sideA = mirror ? { right: "5%" } : { left: "5%" };
  const sideB = mirror ? { left: "5%" } : { right: "5%" };
  const noteA = mirror ? { left: "6cqw", right: "57cqw" } : { left: "57cqw", right: "6cqw" };
  const noteB = mirror ? { left: "57cqw", right: "6cqw" } : { left: "6cqw", right: "57cqw" };
  const Deco = [Blossom, Sparkle, HeartOutline, Rose][variant % 4];

  return (
    <div className="absolute inset-0">
      <PhotoMemory memory={b} rotate={mirror ? -3 : 3} tape={tapeB} style={{ width: "50%", bottom: "5cqw", ...sideB, zIndex: 1 }} sizes="(max-width: 640px) 50vw, 280px" />
      <PhotoMemory memory={a} rotate={mirror ? 4 : -4} tape={tapeA} style={{ width: "50%", top: "5cqw", ...sideA, zIndex: 2 }} sizes="(max-width: 640px) 50vw, 280px" />

      <Note style={{ top: "12cqw", ...noteA }} className={mirror ? "text-left" : "text-right"}>{a.caption}</Note>
      <DateLine memory={a} style={{ top: "6cqw", ...noteA }} />
      <Note style={{ bottom: "26cqw", ...noteB }} className={mirror ? "text-right" : "text-left"}>{b.caption}</Note>
      <DateLine memory={b} style={{ bottom: "20cqw", ...noteB }} />

      <Deco
        className="absolute text-rose"
        style={{ width: "9cqw", top: "52cqw", ...(mirror ? { left: "18cqw" } : { right: "18cqw" }), opacity: 0.85 }}
      />
      <Heart className="absolute text-blush-deep" style={{ width: "5cqw", bottom: "12cqw", ...(mirror ? { right: "40cqw" } : { left: "40cqw" }) }} />
    </div>
  );
}

/* ── One big polaroid ─────────────────────────────────────────────────── */
function PolaroidPage({ page, variant }) {
  const m = memories[page.memory];
  return (
    <div className="absolute inset-0">
      <PhotoMemory
        memory={m}
        rotate={variant % 2 ? 2 : -2}
        tape={TAPES[(variant + 1) % 4]}
        sizes="(max-width: 640px) 85vw, 420px"
        style={{ width: "76%", left: "12%", top: "8cqw" }}
        titleSize="5.4cqw"
      />
      <Note className="text-center" style={{ left: "10cqw", right: "10cqw", bottom: "15cqw" }} size="5.6cqw">
        {m.caption}
      </Note>
      <DateLine memory={m} style={{ left: 0, right: 0, textAlign: "center", bottom: "10cqw" }} />
      <Blossom className="absolute bottom-[8cqw] left-[6cqw] w-[8cqw]" />
      <Sparkle className="absolute right-[7cqw] top-[5cqw] w-[5cqw] text-rosegold" />
    </div>
  );
}

/* ── Full-bleed cinematic photo ───────────────────────────────────────── */
function CinematicPage({ page }) {
  const m = memories[page.memory];
  return (
    <div className="absolute inset-0 bg-wine">
      <Photo memory={m} sizes="(max-width: 640px) 100vw, 540px" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(77,21,35,0)_45%,rgba(77,21,35,0.82)_100%)]" />
      <div className="absolute inset-[3.5cqw] border border-rosegold-light/60" />
      <div className="absolute bottom-[10cqw] left-[9cqw] right-[9cqw] text-cream">
        {m.date && <p className="eyebrow !text-rosegold-light" style={{ fontSize: "max(9px, 2.5cqw)" }}>{m.date}</p>}
        <h3 className="font-serif text-[max(22px,8cqw)] italic leading-tight">{m.title}</h3>
        <p className="mt-[1.5cqw] font-hand text-[max(15px,5.2cqw)] leading-snug text-cream/90">{m.caption}</p>
      </div>
    </div>
  );
}

/* ── Landscape photo with torn-paper note ─────────────────────────────── */
function LandscapePage({ page, variant }) {
  const m = memories[page.memory];
  return (
    <div className="absolute inset-0">
      <div className="torn absolute left-[8cqw] right-[14cqw] top-[10cqw] px-[6cqw] py-[5cqw]" style={{ transform: "rotate(-1.5deg)" }}>
        <p className="eyebrow" style={{ fontSize: "max(9px, 2.5cqw)" }}>{m.date ?? "a little moment"}</p>
        <h3 className="font-serif text-[max(20px,7.4cqw)] italic leading-tight text-burgundy">{m.title}</h3>
      </div>
      <figure
        className="absolute left-[6cqw] right-[6cqw] top-[40cqw] m-0 bg-[#fffdf9] p-[2.5cqw] shadow-[0_6px_16px_rgba(60,25,30,0.16)]"
        style={{ transform: `rotate(${variant % 2 ? -2 : 1.5}deg)` }}
      >
        <span className="tape tape-gold" style={{ left: "-4%", top: "-5%", width: "24%", transform: "rotate(-30deg)" }} aria-hidden="true" />
        <span className="tape tape-rose" style={{ left: "auto", right: "-4%", top: "-5%", width: "24%", transform: "rotate(30deg)" }} aria-hidden="true" />
        <div className="polaroid-photo" style={{ aspectRatio: "4 / 3" }}>
          <Photo memory={m} sizes="(max-width: 640px) 90vw, 500px" />
        </div>
      </figure>
      <Note className="text-center" style={{ left: "10cqw", right: "10cqw", top: "113cqw" }} size="5.6cqw">
        {m.caption}
      </Note>
      <Sprig className="absolute bottom-[4cqw] right-[5cqw] w-[9cqw] rotate-[25deg] opacity-80" />
      <Heart className="absolute bottom-[12cqw] left-[9cqw] w-[5cqw] text-rose" />
    </div>
  );
}

/* ── A video in a vintage frame ───────────────────────────────────────── */
function VideoPage({ page, active, variant }) {
  const m = memories[page.memory];
  const landscape = m.width > m.height;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-[7cqw] pb-[6cqw] text-center">
      <p className="eyebrow flex items-center gap-[1.5cqw]" style={{ fontSize: "max(9px, 2.5cqw)" }}>
        <span className="inline-block h-[1.6cqw] w-[1.6cqw] rounded-full bg-burgundy" /> a little film
      </p>
      <h3 className="mt-[1cqw] font-serif text-[max(20px,7.4cqw)] italic leading-tight text-burgundy">{m.title}</h3>

      <div
        className="relative mt-[4cqw] rounded-[1.2cqw] bg-wine p-[2.4cqw] shadow-[0_10px_24px_-6px_rgba(60,25,30,0.45)]"
        style={{ width: landscape ? "92%" : "56%", transform: `rotate(${variant % 2 ? 1.2 : -1.2}deg)` }}
      >
        <div className="pointer-events-none absolute inset-[1cqw] rounded-[0.8cqw] border border-rosegold/60" />
        <div className="relative overflow-hidden rounded-[0.5cqw]" style={{ aspectRatio: `${m.width} / ${m.height}` }}>
          <VideoMemory memory={m} active={active} />
        </div>
        <span className="tape tape-cream" style={{ top: "-3.5%", left: "30%", width: "40%" }} aria-hidden="true" />
      </div>

      <p className="hand mt-[5cqw] px-[3cqw]" style={{ fontSize: "max(15px, 5.4cqw)" }}>{m.caption}</p>
      {landscape && (
        <>
          <Rose className="absolute left-[6cqw] top-[7cqw] w-[13cqw] opacity-90" />
          <Sprig className="absolute left-[16cqw] top-[2cqw] w-[8cqw] rotate-[60deg] opacity-80" />
          <HeartOutline className="absolute bottom-[12cqw] right-[10cqw] w-[9cqw] text-rose" />
          <Blossom className="absolute bottom-[10cqw] left-[9cqw] w-[8cqw]" />
        </>
      )}
    </div>
  );
}

/* ── Three little clips on a film strip ───────────────────────────────── */
function FilmstripPage({ page, active }) {
  const clips = page.memories.map((id) => memories[id]);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-[6cqw] pb-[22cqw] text-center">
      <p className="eyebrow" style={{ fontSize: "max(9px, 2.5cqw)" }}>press play</p>
      <h3 className="mt-[1cqw] font-serif text-[max(20px,7.4cqw)] italic leading-tight text-burgundy">{page.title}</h3>
      <div className="relative mt-[6cqw] w-full -rotate-2 bg-[#2b1318] px-[2.5cqw] py-[6cqw] shadow-[0_10px_22px_-8px_rgba(40,10,15,0.6)]">
        <div className="absolute inset-x-0 top-[1.6cqw] h-[2.6cqw] bg-[repeating-linear-gradient(90deg,transparent_0_2.2cqw,#f6ece0_2.2cqw_4.6cqw)] opacity-80" />
        <div className="absolute inset-x-0 bottom-[1.6cqw] h-[2.6cqw] bg-[repeating-linear-gradient(90deg,transparent_0_2.2cqw,#f6ece0_2.2cqw_4.6cqw)] opacity-80" />
        <div className="flex justify-between gap-[2.5cqw]">
          {clips.map((c) => (
            <div key={c.id} className="relative flex-1 overflow-hidden" style={{ aspectRatio: `${c.width} / ${c.height}` }}>
              <VideoMemory memory={c} active={active} compact />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[3cqw] flex w-full justify-between gap-[2.5cqw] px-[2.5cqw]">
        {clips.map((c) => (
          <span key={c.id} className="hand flex-1" style={{ fontSize: "max(13px, 4.4cqw)" }}>{c.caption}</span>
        ))}
      </div>
      <p className="hand absolute bottom-[10cqw] left-[8cqw] right-[8cqw] text-rose-deep" style={{ fontSize: "max(14px, 5cqw)" }}>{page.note}</p>
    </div>
  );
}

function BlankPage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <HeartOutline className="w-[10cqw] text-blush-deep" />
    </div>
  );
}

const LAYOUTS = {
  title: TitlePage,
  chapter: ChapterPage,
  duo: DuoPage,
  polaroid: PolaroidPage,
  cinematic: CinematicPage,
  landscape: LandscapePage,
  video: VideoPage,
  filmstrip: FilmstripPage,
  "final-photo": FinalPhotoPage,
  "final-message": FinalMessagePage,
  blank: BlankPage,
};

/** One physical page of the album. */
export default function AlbumPage({ page, index, side, active, chapterStarts, onJump, onReplay }) {
  const Layout = LAYOUTS[page.layout] ?? BlankPage;
  const showNumber = !["cinematic", "title", "blank"].includes(page.layout);
  return (
    <div className={`page paper side-${side}`} aria-hidden={!active}>
      <Layout page={page} variant={index} active={active} chapterStarts={chapterStarts} onJump={onJump} onReplay={onReplay} />
      {showNumber && <span className="page-number">— {index + 1} —</span>}
    </div>
  );
}

export function PaperBack() {
  return (
    <div className="page paper side-left" aria-hidden="true">
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <Heart className="w-[8cqw] text-blush-deep" />
      </div>
    </div>
  );
}
