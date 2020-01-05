// @ts-nocheck

const WIDTH = 640;
const HEIGHT = 640;

const createElement = document.createElement.bind(document);

let video = null;
let audio = null;
document.createElement = function(tagName, options) {
  const element = createElement(tagName, options);
  if (tagName === 'video') {
    video = element;
  }
  if (tagName === 'audio') {
    audio = element;
  }
  return element;
};
// debug
// setInterval(() => {
//   audio = { currentTime: performance.now() / 1000 };
// }, 100);

let lyric = [];
function updateLyric() {
  const lyricStr = `
[ti:海阔天空]
[ar:Beyond]
[al:]
 
[00:00]Beyond：海阔天空
[01:40][00:07]今天我寒夜里看雪飘过
[01:48][00:24]怀着冷却了的心窝飘远方
[01:53][00:29]风雨里追赶
[01:57][00:33]雾里分不清影踪
[02:00][00:36]天空海阔你与我
[02:03][00:39]可会变(谁没在变)
[00:42]多少次迎着冷眼与嘲笑
[00:49]从没有放弃过心中的理想
[00:54]一刹那恍惚
[00:58]若有所失的感觉
[01:01]不知不觉已变淡
[01:04]心里爱(谁明白我)
[03:56][03:13][02:06][01:07]原谅我这一生不羁放纵爱自由
[04:01][03:24][02:12][01:13]也会怕有一天会跌倒
[04:06][03:44][03:29][02:19][01:20]被弃了理想谁人都可以
[04:14][03:49][03:37][02:26][01:26]那会怕有一天只你共我
[03:02]仍然自由自我
[03:10]永远高唱我歌
`;
  const lines = lyricStr.split('\n').map(line => line.trim());
  lyric = lines
    .map(line => {
      // ["[ar:Beyond]"]
      // ["[03:10]"]
      // ["[03:10]", "永远高唱我歌"]
      // ["永远高唱我歌"]
      // ["[03:10]", "[03:10]", "永远高唱我歌"]
      const matchResult = line.match(/(\[.*?\])|([^\[\]]+)/g) || [line];
      const textIndex = matchResult.findIndex(slice => !slice.endsWith(']'));
      let text = '';
      if (textIndex > -1) {
        text = matchResult.splice(textIndex, 1)[0];
      }
      return matchResult.map(slice => {
        const result = { startTime: null, text };
        const [key, value] = slice.match(/[^\[\]]+/g)[0].split(':');
        const [min, sec] = [parseInt(key), parseInt(value)];
        if (!isNaN(min)) {
          result.startTime = min * 60 + sec;
        } else {
          result.text = value;
        }
        return result;
      });
    })
    .flat()
    .sort((a, b) => {
      if (a.startTime === null) {
        return 0;
      }
      if (b.startTime === null) {
        return 1;
      }
      return a.startTime - b.startTime;
    });
}

function getSVGURL() {
  let currentIndex = 0;
  lyric.forEach(({ startTime }, index) => {
    if (audio?.currentTime > startTime) {
      currentIndex = index;
    }
  });
  let current = '';
  let before = '';
  let after = '';
  lyric.forEach(({ text }, index) => {
    if (index < currentIndex) {
      before += `<p>${text}</p>`;
    } else if (index > currentIndex) {
      after += `<p>${text}</p>`;
    } else {
      current = `<p>${text}</p>`;
    }
  });
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}">
      <foreignObject width="${WIDTH}" height="${HEIGHT}">
        <style>
          :root {
            background: #000000a0;
            color: white;
            font-family: sans-serif;
            font-size: 36px;
            text-align: center;
          }
          body {
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
            margin: .5em 0;
          }
          .before, .after {
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
        </style>
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
  `)}`;
}

let lyricTrack = null;
{
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');
  const update = () => {
    const url = getSVGURL();
    const img = new Image();
    img.src = url;
    img.onload = () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      if (video?.srcObject) {
        if (!video.srcObject.coverTrck) {
          const stream = new MediaStream([lyricTrack]);
          stream.coverTrck = video.srcObject.getTracks()[0];
          video.srcObject = stream;
        }
        const coverCanvas = video.srcObject.coverTrck.canvas;
        ctx.drawImage(coverCanvas, 0, 0, WIDTH, HEIGHT);
        if (lyric.length > 0) {
          ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
        }
      }
      requestAnimationFrame(update);
    };
    img.onerror = () => requestAnimationFrame(update);
  };
  update();
  lyricTrack = canvas.captureStream().getVideoTracks()[0];
  // debug
  // window.onload = () => {
  //   lyricTrack.canvas.style = 'width: 300px; height: 300px; position: absolute; z-index: 123123123123123;';
  //   document.body.append(lyricTrack.canvas);
  // };
}

let trackInfo = null;
const observer = new MutationObserver(() => {
  const element = document.querySelector('.track-info');
  if (!element) {
    trackInfo?.observer.disconnect();
  } else if (!element.observer) {
    updateLyric();
    element.observer = new MutationObserver(updateLyric);
    element.observer.observe(element, { childList: true, characterData: true, subtree: true, attributes: true });
  }
  trackInfo = element;
});
observer.observe(document.body, { childList: true });
