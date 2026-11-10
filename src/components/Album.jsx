import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { albumPages, chapters } from "../data/memories";
import { playPageTurn } from "../lib/pageTurnSound";
import AlbumPage, { PaperBack } from "./AlbumPage";
import { CornerFloral } from "./Decor";

const RATIO = 0.7; // page width / height
const TALL_RATIO = 0.6; // tallest page allowed on phones
const WINDOW = 2; // leaves kept mounted on each side of the current one

/** On wide screens pages pair into spreads; keep the finale on a left page. */
function buildPages(spread) {
  if (!spread) return albumPages;
  const pages = [...albumPages];
  const finale = pages.findIndex((p) => p.layout === "final-photo");
  if (finale % 2 === 1) pages.splice(finale, 0, { layout: "blank" });
  if (pages.length % 2 === 1) pages.push({ layout: "blank" });
  return pages;
}

/**
 * A "leaf" is one physical sheet hinged on its left edge.
 *  - single (phone): leaf i = page i on the front, plain paper on the back
 *  - spread (desktop): leaf k = page 2k+1 on the front, page 2k+2 on the back;
 *    page 0 lies flat on the left underneath everything.
 * `cur` = number of leaves turned so far.
 */
function buildLeaves(pages, spread) {
  if (!spread) return pages.map((_, i) => ({ front: i, back: null }));
  const count = Math.ceil((pages.length - 1) / 2);
  return Array.from({ length: count }, (_, k) => ({
    front: 2 * k + 1,
    back: 2 * k + 2 < pages.length ? 2 * k + 2 : null,
  }));
}

function useElementSize(ref) {
  const [size, setSize] = useState(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

function Leaf({ k, leaf, cur, flip, angle, shades, spread, w, h, renderPage }) {
  const isActive = flip?.leaf === k;
  const turned = k < cur;
  const zIndex = isActive ? 300 : turned ? 100 + k : 250 - k;
  const hidden = !spread && turned && !isActive; // turned phone pages are off to the left
  return (
    <motion.div
      className="leaf"
      style={{
        left: spread ? w : 0,
        width: w,
        height: h,
        zIndex,
        rotateY: isActive ? angle : turned ? -180 : 0,
        visibility: hidden ? "hidden" : "visible",
      }}
    >
      <div className="leaf-face front">
        {renderPage(leaf.front, spread ? "right" : "single")}
        {isActive && <motion.div className="shade shade-front" style={{ opacity: shades.front }} />}
      </div>
      <div className="leaf-face back">
        {leaf.back != null ? renderPage(leaf.back, "left") : <PaperBack />}
        {isActive && <motion.div className="shade shade-back" style={{ opacity: shades.back }} />}
      </div>
    </motion.div>
  );
}

function IconButton({ label, onClick, disabled, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-rose/40 bg-cream/80 text-burgundy shadow-sm backdrop-blur transition hover:bg-cream disabled:opacity-35"
    >
      {children}
    </button>
  );
}

export default function Album({ onReplay }) {
  const reduce = useReducedMotion();
  const stageRef = useRef(null);
  const stage = useElementSize(stageRef);

  // ── geometry ──
  const spread = Boolean(stage && stage.w >= 860 && stage.w / stage.h >= 1.2);
  const w = stage
    ? Math.floor(Math.max(150, Math.min(spread ? (stage.w - 64) / 2 : stage.w - 36, (stage.h - 28) * RATIO, spread ? 560 : 520)))
    : 0;
  // On tall phones let the page grow a little taller (up to 0.6) to fill the screen.
  const h = stage && !spread ? Math.floor(Math.min(stage.h - 28, w / TALL_RATIO)) : Math.floor(w / RATIO);

  const pages = useMemo(() => buildPages(spread), [spread]);
  const leaves = useMemo(() => buildLeaves(pages, spread), [pages, spread]);
  const maxCur = leaves.length - 1;

  // ── position (kept stable when switching between phone and spread layouts) ──
  const [pos, setPos] = useState({ cur: 0, spread });
  let cur = pos.cur;
  if (pos.spread !== spread) {
    const oldPages = buildPages(pos.spread);
    const anchor = oldPages[pos.spread ? pos.cur * 2 : pos.cur];
    const idx = Math.max(0, pages.indexOf(anchor));
    cur = Math.min(spread ? Math.floor(idx / 2) : idx, maxCur);
    setPos({ cur, spread });
  }
  const curRef = useRef(cur);
  useLayoutEffect(() => {
    curRef.current = cur;
  }, [cur]);

  const visible = useMemo(() => (spread ? [2 * cur, 2 * cur + 1] : [cur]), [spread, cur]);

  // ── flip animation ──
  const angle = useMotionValue(0);
  const shades = {
    front: useTransform(angle, [0, -90], [0, 0.9]),
    back: useTransform(angle, [-90, -180], [0.9, 0]),
  };
  const lift = useTransform(angle, [0, -90, -180], [0, 1, 0]);
  const [flip, setFlip] = useState(null);
  const busy = useRef(false);
  const [soundOn, setSoundOn] = useState(false);
  const [touched, setTouched] = useState(false);

  const begin = useCallback(
    (dir) => {
      if (busy.current) return false;
      const c = curRef.current;
      if (dir > 0 ? c >= maxCur : c <= 0) return false;
      busy.current = true;
      angle.set(dir > 0 ? 0 : -180);
      setFlip({ leaf: dir > 0 ? c : c - 1, dir });
      setTouched(true);
      if (soundOn) playPageTurn();
      return true;
    },
    [angle, maxCur, soundOn],
  );

  const finish = useCallback(
    (dir, complete) => {
      // forward turns end flat on the left (-180°); backward turns end on the right (0°)
      const endAngle = dir > 0 ? -180 : 0;
      const startAngle = dir > 0 ? 0 : -180;
      const target = complete ? endAngle : startAngle;
      const remaining = Math.abs(target - angle.get()) / 180;
      animate(angle, target, {
        duration: reduce ? 0.001 : Math.max(0.2, 0.8 * remaining),
        ease: [0.3, 0.1, 0.25, 1],
        onComplete: () => {
          if (complete) setPos((p) => ({ ...p, cur: p.cur + dir }));
          setFlip(null);
          busy.current = false;
        },
      });
    },
    [angle, reduce],
  );

  const go = useCallback((dir) => begin(dir) && finish(dir, true), [begin, finish]);

  const jumpToPage = useCallback(
    (pageIndex) => {
      if (busy.current) return;
      setTouched(true);
      setPos((p) => ({ ...p, cur: Math.min(spread ? Math.floor(pageIndex / 2) : pageIndex, maxCur) }));
    },
    [spread, maxCur],
  );

  // ── keyboard ──
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (["ArrowRight", "PageDown"].includes(e.key)) go(1);
      else if (["ArrowLeft", "PageUp"].includes(e.key)) go(-1);
      else if (e.key === "Home") jumpToPage(0);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, jumpToPage]);

  // ── touch / mouse: drag to turn, tap the edges to turn ──
  const drag = useRef(null);
  const bookRef = useRef(null);

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, lastX: e.clientX, lastT: e.timeStamp, vx: 0, started: false, dir: 0, p: 0 };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.started) {
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      const dir = dx < 0 ? 1 : -1;
      if (!begin(dir)) {
        drag.current = null;
        return;
      }
      d.started = true;
      d.dir = dir;
      bookRef.current?.setPointerCapture?.(e.pointerId);
    }
    const span = w * (spread ? 1.5 : 1.05);
    d.p = Math.min(1, Math.max(0, (d.dir > 0 ? -dx : dx) / span));
    angle.set(d.dir > 0 ? -180 * d.p : -180 * (1 - d.p));
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.vx = (e.clientX - d.lastX) / dt;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
  };

  const onPointerUp = (e) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (d.started) {
      const towards = d.dir > 0 ? -d.vx : d.vx; // px/ms in the turning direction
      finish(d.dir, (d.p > 0.33 || towards > 0.45) && towards > -0.3);
      return;
    }
    // A tap: ignore buttons/videos, otherwise the outer edges turn the page.
    if (Math.abs(e.clientX - d.x) > 10 || Math.abs(e.clientY - d.y) > 10) return;
    if (e.target.closest?.("button, a, video, [data-no-flip]")) return;
    const rect = bookRef.current.getBoundingClientRect();
    const rx = (e.clientX - rect.left) / rect.width;
    const edge = spread ? 0.25 : 0.32;
    if (rx > 1 - edge) go(1);
    else if (rx < edge) go(-1);
  };

  const onPointerCancel = () => {
    const d = drag.current;
    drag.current = null;
    if (d?.started) finish(d.dir, false);
  };

  // ── labels ──
  const chapterAt = useMemo(() => {
    const out = [];
    for (const p of pages) {
      const prev = out.length ? out[out.length - 1] : null;
      out.push(p.layout === "chapter" ? p.chapter : p.layout === "final-photo" ? "finale" : prev);
    }
    return out;
  }, [pages]);
  const chapterStarts = useMemo(
    () => Object.fromEntries(pages.map((p, i) => [p.chapter, i]).filter(([id, i]) => id && pages[i].layout === "chapter")),
    [pages],
  );
  const chapterId = chapterAt[visible[0]];
  const chapterLabel =
    chapterId === "finale" ? "Our Forever" : (chapters.find((c) => c.id === chapterId)?.title ?? "For Saloni, with love");
  const counter = spread
    ? `Pages ${visible[0] + 1}–${Math.min(visible[1], pages.length - 1) + 1} of ${pages.length}`
    : `Page ${cur + 1} of ${pages.length}`;

  const renderPage = (i, side) => (
    <AlbumPage
      page={pages[i]}
      index={i}
      side={side}
      active={visible.includes(i)}
      chapterStarts={chapterStarts}
      onJump={jumpToPage}
      onReplay={onReplay}
    />
  );

  const lo = Math.max(0, cur - WINDOW);
  const hi = Math.min(leaves.length - 1, cur + WINDOW);
  const bookW = spread ? w * 2 : w;
  const shadowLeft = spread ? (flip?.dir < 0 ? 0 : w) : 0;

  return (
    <main className="blush-backdrop fixed inset-0 flex flex-col overflow-hidden">
      <CornerFloral className="absolute -left-10 -top-10 h-40 w-40 opacity-50 sm:h-60 sm:w-60" />
      <CornerFloral flip className="absolute -bottom-10 -right-10 h-40 w-40 opacity-50 sm:h-60 sm:w-60" />

      <header className="relative z-10 flex shrink-0 flex-col items-center justify-end px-16 pb-1 pt-[calc(0.6rem+var(--safe-top))] text-center">
        <p className="eyebrow text-[0.6rem]">Our Little Love Story</p>
        <p className="font-serif text-[1.15rem] italic leading-tight text-burgundy">{chapterLabel}</p>
      </header>

      <div ref={stageRef} className="relative z-10 flex min-h-0 flex-1 items-center justify-center">
        {w > 0 && (
          <div
            ref={bookRef}
            className={`book ${spread ? "spread" : "single"}`}
            style={{ width: bookW, height: h }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            role="region"
            aria-roledescription="photo album"
            aria-label={`${chapterLabel}. ${counter}. Use the arrow keys or swipe to turn pages.`}
          >
            <div className="book-cover" aria-hidden="true" />
            <div className="page-stack" style={{ right: -6 }} aria-hidden="true" />
            {spread && <div className="page-stack" style={{ left: -6, transform: "scaleX(-1)" }} aria-hidden="true" />}

            {spread && (
              <div className="absolute left-0 top-0" style={{ width: w, height: h, zIndex: 1 }}>
                {renderPage(0, "left")}
              </div>
            )}

            {leaves.map((leaf, k) =>
              k < lo || k > hi ? null : (
                <Leaf
                  key={`${spread ? "s" : "p"}${k}`}
                  k={k}
                  leaf={leaf}
                  cur={cur}
                  flip={flip}
                  angle={angle}
                  shades={shades}
                  spread={spread}
                  w={w}
                  h={h}
                  renderPage={renderPage}
                />
              ),
            )}

            {flip && !reduce && (
              <motion.div
                className="turn-shadow"
                style={{
                  left: shadowLeft,
                  width: w,
                  height: h,
                  zIndex: 290,
                  opacity: lift,
                  transform: flip.dir < 0 && spread ? "scaleX(-1)" : undefined,
                  transformOrigin: "center",
                }}
                aria-hidden="true"
              />
            )}

            {spread && <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[400] w-8 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(60,25,30,0.12)_45%,rgba(60,25,30,0.2)_50%,rgba(60,25,30,0.12)_55%,transparent)]" aria-hidden="true" />}
          </div>
        )}
      </div>

      <footer className="relative z-10 flex shrink-0 items-center justify-center gap-4 px-4 pb-[calc(0.7rem+var(--safe-bottom))] pt-2 sm:gap-6">
        <IconButton label="Previous page" onClick={() => go(-1)} disabled={cur <= 0}>
          <ChevronLeft className="h-5 w-5" />
        </IconButton>
        <div className="min-w-[8.5rem] text-center">
          <p className="font-serif text-[0.95rem] italic text-ink/80" aria-live="polite">{counter}</p>
          {!touched && <p className="font-hand text-[0.95rem] leading-none text-rose-deep">swipe to turn the page</p>}
        </div>
        <IconButton label="Next page" onClick={() => go(1)} disabled={cur >= maxCur}>
          <ChevronRight className="h-5 w-5" />
        </IconButton>
        <button
          type="button"
          onClick={() => setSoundOn((s) => !s)}
          aria-pressed={soundOn}
          aria-label={soundOn ? "Turn page sound off" : "Turn page sound on"}
          className="absolute right-[max(0.9rem,env(safe-area-inset-right))] flex h-9 w-9 items-center justify-center rounded-full text-rose-deep transition hover:bg-cream/70"
        >
          {soundOn ? <Volume2 className="h-4.5 w-4.5" /> : <VolumeX className="h-4.5 w-4.5 opacity-70" />}
        </button>
      </footer>
    </main>
  );
}
