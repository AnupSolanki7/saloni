import { useCallback, useEffect, useRef, useState } from "react";
import { assetUrl } from "./assets";

const KEY = "saloni-music";
const readPref = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};
const writePref = (value) => {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // storage unavailable (private mode) — preference just won't persist
  }
};

/**
 * Optional background music. Does nothing when `src` is null. Never plays on
 * its own: `start()` must be called from a tap/click.
 */
export function useMusic(src) {
  const audio = useRef(null);
  const [broken, setBroken] = useState(false);
  const [playing, setPlaying] = useState(false);
  const available = Boolean(src) && !broken;

  const ensure = useCallback(() => {
    if (!src || broken) return null;
    if (!audio.current) {
      const a = new Audio(assetUrl(src));
      a.loop = true;
      a.volume = 0.45;
      a.addEventListener("error", () => {
        setBroken(true);
        setPlaying(false);
      });
      audio.current = a;
    }
    return audio.current;
  }, [src, broken]);

  const play = useCallback(() => {
    const a = ensure();
    if (!a) return;
    a.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [ensure]);

  /** Call from the first user gesture. Respects a saved "off" choice. */
  const start = useCallback(() => {
    if (readPref() !== "off") play();
  }, [play]);

  const toggle = useCallback(() => {
    if (playing) {
      audio.current?.pause();
      setPlaying(false);
      writePref("off");
    } else {
      writePref("on");
      play();
    }
  }, [playing, play]);

  useEffect(() => () => audio.current?.pause(), []);

  return { available, playing, start, toggle };
}
