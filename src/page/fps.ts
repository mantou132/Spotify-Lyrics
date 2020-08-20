// Frame drawn in the last 1s
let frames: number[] = [];

const second = 3;
const tick = (now: DOMHighResTimeStamp) => {
  frames.push(now);
  frames = frames.filter((e) => e > now - second * 1000);
  requestAnimationFrame(tick);
};
tick(performance.now());

export function getFPS() {
  const firstFrame = frames[0] || 0;
  const lastFrame = frames[frames.length - 1] || 0;
  const t = frames.length >= 2 ? (lastFrame - firstFrame) / frames.length : 1000 / 60;
  return Math.round((frames.length + (second * 1000 - (lastFrame - firstFrame)) / t) / second);
}
