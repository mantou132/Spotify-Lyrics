import { isSafari } from './utils';

const fnList: (() => void)[] = [];
export let raf = (fn: () => void) => {
  requestAnimationFrame(fn);
};
export let delay = (fn: () => void, n: number) => {
  setTimeout(fn, n);
};

// https://bugs.webkit.org/show_bug.cgi?id=215161
if (isSafari) {
  const main = () => {
    requestAnimationFrame(function tick() {
      self.postMessage(1);
      requestAnimationFrame(tick);
    });
  };
  const worker = new Worker(URL.createObjectURL(new Blob([`(${main.toString()})();`])));
  worker.addEventListener('message', () => {
    fnList.splice(0).forEach((fn) => fn());
  });
  raf = (fn) => fnList.push(fn);
  delay = raf;
}
