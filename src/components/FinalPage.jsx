import { RotateCcw } from "lucide-react";
import { memories } from "../data/memories";
import { finale } from "../data/words";
import { Blossom, Flourish, Heart, Ring, Rose, Sparkle, Sprig } from "./Decor";
import PhotoMemory from "./PhotoMemory";

const RISING = [
  { left: "74%", top: "18cqw", size: "4cqw", d: "3.4s", delay: "0s", color: "#c78a90" },
  { left: "80%", top: "26cqw", size: "3cqw", d: "4s", delay: "1.1s", color: "#a35d68" },
  { left: "70%", top: "30cqw", size: "2.6cqw", d: "3.6s", delay: "2s", color: "#e6c2b3" },
  { left: "20%", top: "70cqw", size: "3.2cqw", d: "4.2s", delay: "0.6s", color: "#c78a90" },
  { left: "14%", top: "80cqw", size: "2.4cqw", d: "3.8s", delay: "1.8s", color: "#a35d68" },
];

/** Left page of the finale: our photo, rising hearts and a ring. */
export function FinalPhotoPage({ page }) {
  const m = memories[page.memory];
  return (
    <div className="absolute inset-0">
      <Rose className="absolute -left-[3cqw] -top-[3cqw] w-[20cqw] opacity-90" />
      <Sprig className="absolute left-[11cqw] top-[1cqw] w-[9cqw] rotate-[70deg] opacity-80" />
      <PhotoMemory
        memory={m}
        rotate={-2}
        tape="gold"
        sizes="(max-width: 640px) 80vw, 400px"
        style={{ width: "68%", left: "16%", top: "8cqw" }}
        titleSize="5.4cqw"
      />
      {RISING.map((h, i) => (
        <span key={i} className="mini-heart" style={{ left: h.left, top: h.top, width: h.size, height: h.size, color: h.color, "--d": h.d, "--delay": h.delay }}>
          <Heart className="h-full w-full" />
        </span>
      ))}
      <div className="absolute left-0 right-0 top-[101cqw] flex items-center justify-center gap-[3cqw]">
        <Sparkle className="w-[3.5cqw] text-rosegold" />
        <Ring className="w-[13cqw]" />
        <span className="font-script text-[max(20px,7cqw)] text-burgundy">&amp; forever</span>
        <Sparkle className="w-[3cqw] text-rosegold" />
      </div>
      <p className="hand absolute bottom-[9cqw] left-[9cqw] right-[9cqw] text-center text-rose-deep" style={{ fontSize: "max(13px, 4.5cqw)" }}>
        {finale.wish}
      </p>
    </div>
  );
}

/** Right page of the finale: the closing letter and the replay button. */
export function FinalMessagePage({ onReplay }) {
  return (
    <div className="absolute inset-0 overflow-y-auto overscroll-contain bg-[radial-gradient(90%_60%_at_50%_0%,rgba(245,224,222,0.85),transparent_70%)]">
      <Blossom className="absolute right-[5cqw] top-[5cqw] w-[8cqw]" />
      <Blossom className="absolute bottom-[5cqw] left-[5cqw] w-[7cqw]" petal="#fbe6df" />
      <div className="flex min-h-full flex-col items-center justify-center px-[9cqw] py-[9cqw] text-center">
        <Heart className="heartbeat w-[7cqw] text-burgundy" />
        <h2 className="mt-[2cqw] font-serif text-[max(21px,7.6cqw)] italic leading-tight text-burgundy">{finale.headline}</h2>
        <Flourish className="my-[2.5cqw] w-[40cqw] text-rose" />
        <div className="space-y-[2.2cqw] font-serif text-[max(14px,4.25cqw)] leading-[1.42] text-ink">
          {finale.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="mt-[3cqw] font-script text-[max(26px,9cqw)] leading-tight text-burgundy">{finale.birthdayLine}</p>
        <p className="hand mt-[1cqw]" style={{ fontSize: "max(15px, 5cqw)" }}>{finale.toast}</p>
        <p className="hand mt-[1.5cqw] text-burgundy" style={{ fontSize: "max(15px, 5cqw)" }}>{finale.closing}</p>
        <button
          type="button"
          data-no-flip
          onClick={onReplay}
          className="mt-[5cqw] inline-flex min-h-11 items-center gap-2 rounded-full bg-burgundy px-[5.5cqw] py-[2.6cqw] font-sans text-[max(13px,3.7cqw)] tracking-wide text-cream shadow-[0_8px_20px_-8px_rgba(122,35,53,0.8)] transition hover:bg-wine"
        >
          <RotateCcw className="h-4 w-4" />
          Replay Our Love Story <span aria-hidden="true">❤️</span>
        </button>
      </div>
    </div>
  );
}
