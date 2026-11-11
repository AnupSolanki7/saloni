import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { MediaFallback } from "./PhotoMemory";

/**
 * A video that only downloads once it's tapped. It starts muted (never with
 * sound on its own); clips that have audio get a small "sound" button.
 * `active` is false when its page is turned away, which pauses it.
 */
export default function VideoMemory({ memory, active = true, compact = false }) {
  const ref = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | loading | playing | paused | error
  const [muted, setMuted] = useState(true);
  const [posterFailed, setPosterFailed] = useState(false);

  useEffect(() => {
    if (!active) ref.current?.pause();
  }, [active]);

  useEffect(() => {
    const v = ref.current;
    if (status !== "loading" || !v) return;
    v.muted = true;
    v.play().catch(() => setStatus("paused"));
  }, [status]);

  const toggle = () => {
    const v = ref.current;
    if (status === "error") return;
    if (status === "idle") return setStatus("loading");
    if (!v) return;
    if (v.paused) v.play().catch(() => setStatus("paused"));
    else v.pause();
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  };

  const started = status !== "idle";
  const showPlay = status === "idle" || status === "paused";
  const iconSize = compact ? "max(30px, 9cqw)" : "max(46px, 14cqw)";

  return (
    <div className="absolute inset-0 overflow-hidden bg-wine" data-no-flip>
      {status === "error" ? (
        <MediaFallback label="This little clip is being shy — but trust me, it's adorable." />
      ) : (
        <>
          {!posterFailed && (status === "idle" || status === "loading") && (
            <img
              src={memory.poster}
              alt=""
              className="fill-media"
              draggable={false}
              decoding="async"
              onError={() => setPosterFailed(true)}
            />
          )}
          {started && (
            <video
              ref={ref}
              className="fill-media"
              src={memory.src}
              poster={memory.poster}
              playsInline
              loop
              muted
              preload="auto"
              onPlaying={() => setStatus("playing")}
              onPause={() => setStatus("paused")}
              onError={() => setStatus("error")}
            />
          )}
          <button
            type="button"
            onClick={toggle}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={status === "playing" ? `Pause video: ${memory.title}` : `Play video: ${memory.title}`}
          >
            {showPlay && (
              <span
                className="play-badge flex items-center justify-center rounded-full bg-cream/85 text-burgundy backdrop-blur-sm"
                style={{ width: iconSize, height: iconSize }}
              >
                <Play className="ml-[8%] h-[42%] w-[42%] fill-current" strokeWidth={1.5} />
              </span>
            )}
            {status === "loading" && (
              <span className="absolute bottom-[6%] font-hand text-[max(12px,3.4cqw)] text-cream/90">loading…</span>
            )}
            {status === "playing" && (
              <Pause className="absolute left-[5%] top-[4%] h-[max(16px,4.5cqw)] w-[max(16px,4.5cqw)] text-cream/70" aria-hidden="true" />
            )}
          </button>
          {memory.hasAudio && started && (
            <button
              type="button"
              onClick={toggleSound}
              className="absolute bottom-[4%] right-[5%] flex items-center gap-1 rounded-full bg-wine/70 px-2.5 py-1.5 font-sans text-[max(10px,2.6cqw)] text-cream backdrop-blur-sm"
              aria-label={muted ? "Turn sound on" : "Turn sound off"}
              aria-pressed={!muted}
            >
              {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              {muted && !compact && <span>tap for sound</span>}
            </button>
          )}
        </>
      )}
    </div>
  );
}
