import { Lyric } from './lyrics';
import { svg, css } from './utils';

const style = css`
  :root {
    background: #000000a0;
    color: white;
    font-family: sans-serif;
    font-size: 36px;
    text-align: center;
  }
  body {
    /* https://bugs.chromium.org/p/chromium/issues/detail?id=432153 */
    -webkit-mask-image: linear-gradient(to bottom, transparent 8%, black 35%, black 65%, transparent 92%);
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
    font-size: 0.8em;
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

export default function generateSVG(lyric: Lyric = [], currentTime = 0) {
  let currentIndex = 0;
  let current = '';
  let before = '';
  let after = '';
  lyric.forEach(({ startTime }, index) => {
    if (startTime && currentTime > startTime) {
      currentIndex = index;
    }
  });
  lyric.forEach(({ text }, index) => {
    const safeHTML = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
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
