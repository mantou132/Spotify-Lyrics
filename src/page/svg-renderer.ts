import { Lyric } from './lyrics';
import { RenderOptions } from './canvas-renderer';
import { svg, css, captureException, getSVGDataUrl } from './utils';

function generateSVG(lyric: Exclude<Lyric, null>, currentTime = 0, options: RenderOptions) {
  const style = css`
    :root {
      background: #000000b0;
      color: white;
      text-align: ${options.align};
      font-family: sans-serif;
      font-weight: bold;
      font-size: ${options.focusLineFontSize}px;
    }
    body {
      /* https://bugs.chromium.org/p/chromium/issues/detail?id=432153 */
      -webkit-mask-image: linear-gradient(
        to bottom,
        transparent 8%,
        black 15%,
        black 85%,
        transparent 92%
      );
      mask-image: linear-gradient(to bottom, transparent 8%, black 15%, black 85%, transparent 92%);
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0;
      box-sizing: border-box;
      padding: 1em;
    }
    .container {
      position: relative;
      width: 100%;
    }
    p {
      margin: 0.5em 0;
    }
    .before,
    .after {
      opacity: 0.35;
      position: absolute;
      width: 100%;
    }
    .before {
      bottom: 100%;
    }
    .after {
      top: 100%;
    }
  `;

  let currentIndex = -1;
  let current = '';
  let before = '';
  let after = '';

  lyric.forEach(({ startTime }, index) => {
    if (startTime && currentTime > startTime) {
      currentIndex = index;
    }
  });
  lyric.forEach(({ text }, index) => {
    const safeHTML = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (index < currentIndex) {
      before += `<p>${safeHTML}</p>`;
    } else if (index > currentIndex) {
      after += `<p>${safeHTML}</p>`;
    } else {
      current = `<p>${safeHTML}</p>`;
    }
  });
  return svg`
    <svg width="640" height="640" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <foreignObject width="640" height="640">
        <style>${style}</style>
        <body xmlns="http://www.w3.org/1999/xhtml">
          <div class="container">
            <div class="before">
              ${before}
            </div>
            ${current}
            <div class="after">
              ${after}
            </div>
          </div>
        </body>
      </foreignObject>
    </svg>
  `;
}

const errorReport: Record<string, number> = {};

export async function renderLyricsWithSVG(
  ctx: CanvasRenderingContext2D,
  lyrics: Exclude<Lyric, null>,
  currentTime: number, // s
  options: RenderOptions,
): Promise<HTMLImageElement | undefined> {
  const url = getSVGDataUrl(generateSVG(lyrics, currentTime, options));
  const img = new Image(ctx.canvas.width, ctx.canvas.height);
  return new Promise((res) => {
    img.onload = () => res(img);
    img.onerror = () => {
      const lyricsStr = JSON.stringify(lyrics);
      // Page refresh may cause loading errors
      if (errorReport[lyricsStr] === 2) {
        captureException(new Error('dataURL load error'), lyrics);
        errorReport[lyricsStr] = (errorReport[lyricsStr] || 0) + 1;
      }
      res();
    };
    img.src = url;
  });
}
