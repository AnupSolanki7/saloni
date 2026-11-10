import { Music, Music2 } from "lucide-react";

/** Small corner button; only rendered when a music file is configured. */
export default function MusicToggle({ music }) {
  if (!music.available) return null;
  return (
    <button
      type="button"
      onClick={music.toggle}
      aria-pressed={music.playing}
      aria-label={music.playing ? "Pause music" : "Play music"}
      className="fixed right-[max(0.75rem,env(safe-area-inset-right))] top-[calc(0.75rem+var(--safe-top))] z-50 flex h-10 w-10 items-center justify-center rounded-full border border-rose/40 bg-cream/80 text-burgundy shadow-sm backdrop-blur transition hover:bg-cream"
    >
      {music.playing ? <Music2 className="heartbeat h-4.5 w-4.5" /> : <Music className="h-4.5 w-4.5 opacity-60" />}
    </button>
  );
}
