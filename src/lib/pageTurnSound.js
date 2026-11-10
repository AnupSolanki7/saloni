// A soft paper "swish", synthesised with the Web Audio API — no audio file needed.
let ctx = null;

export function playPageTurn() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx ??= new AC();
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;
    const dur = 0.5;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / data.length;
      // quick rise, slow papery decay, with a little flutter
      const env = Math.min(1, t * 9) * Math.pow(1 - t, 2.2) * (0.75 + 0.25 * Math.sin(t * 60));
      data[i] = (Math.random() * 2 - 1) * env;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.Q.value = 0.7;
    band.frequency.setValueAtTime(2600, now);
    band.frequency.exponentialRampToValueAtTime(900, now + dur);
    const high = ctx.createBiquadFilter();
    high.type = "highpass";
    high.frequency.value = 350;
    const gain = ctx.createGain();
    gain.gain.value = 0.32;

    source.connect(band).connect(high).connect(gain).connect(ctx.destination);
    source.start(now);
  } catch {
    // Sound is a nice-to-have; ignore any audio errors.
  }
}
