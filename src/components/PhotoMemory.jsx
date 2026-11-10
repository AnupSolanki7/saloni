import { useState } from "react";
import { Heart } from "./Decor";

export function MediaFallback({ label = "This memory is taking a moment to load" }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-blush p-3 text-center">
      <Heart className="h-6 w-6 text-rose" />
      <span className="font-hand text-[max(13px,3.6cqw)] leading-tight text-rose-deep">{label}</span>
    </div>
  );
}

/** A photo, optimised: small file for phones, large file for big/retina screens. */
export function Photo({ memory, sizes = "(max-width: 640px) 80vw, 480px", className = "fill-media" }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (failed) return <MediaFallback />;
  return (
    <img
      src={memory.thumb}
      srcSet={`${memory.thumb} 640w, ${memory.src} 1600w`}
      sizes={sizes}
      alt={`${memory.title} — ${memory.caption}`}
      className={className}
      style={{ objectPosition: memory.focus, opacity: loaded ? 1 : 0, transition: "opacity .5s ease" }}
      decoding="async"
      draggable={false}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  );
}

/**
 * A Polaroid frame with optional washi tape. Position it with `style`
 * (it is absolutely positioned inside a page).
 */
export default function PhotoMemory({ memory, aspect = "4 / 5", style, rotate = 0, tape, title = true, sizes, titleSize = "4.6cqw" }) {
  return (
    <figure className="polaroid" style={{ ...style, transform: `rotate(${rotate}deg)` }}>
      {tape && <span className={`tape tape-${tape}`} aria-hidden="true" />}
      <div className="polaroid-photo" style={{ aspectRatio: aspect }}>
        <Photo memory={memory} sizes={sizes} />
      </div>
      {title ? (
        <figcaption className="polaroid-title" style={{ fontSize: `max(13px, ${titleSize})` }}>
          {memory.title}
          {memory.date && <span className="mt-0.5 block font-serif text-[0.62em] italic text-rose-deep">{memory.date}</span>}
        </figcaption>
      ) : (
        <div style={{ height: "9cqw" }} />
      )}
    </figure>
  );
}
