// Frame drawn in the last 1s
let frames: number[] = [];

const tick = (now: DOMHighResTimeStamp) => {
  frames.push(now);
  frames = frames.filter((e) => e > now - 1000);
  requestAnimationFrame(tick);
};
tick(performance.now());

export function getFPS() {
  const firstFrame = frames[0] || 0;
  const lastFrame = frames[frames.length - 1] || 0;
  return frames.length + Math.round((1000 - lastFrame + firstFrame) / (1000 / 60));
}
