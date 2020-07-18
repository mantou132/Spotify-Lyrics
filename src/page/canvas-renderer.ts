import { Lyric } from './lyrics';

// simple word segmentation rules
function getWords(str: string) {
  return str.split(/(\p{sc=Han}|\p{sc=Katakana}|\p{sc=Hiragana}|\p{sc=Hang}|\p{gc=Punctuation})|\s+/gu);
}

interface Options {
  // only one of center/top/bottom works
  center?: boolean;
  top?: number;
  bottom?: number;
  left: number;
  right: number;
  lineHeight: number; // px
  translateX?: number | ((width: number) => number);
  translateY?: number | ((width: number) => number);
}

interface Position {
  left: number;
  right: number;
  width: number;
  height: number;
  top: number;
  bottom: number;
}

function drawParagraph(ctx: CanvasRenderingContext2D, str = '', options: Options): Position {
  const maxWidth = ctx.canvas.width - options.left - options.right;
  const words = getWords(str);
  const lines: string[] = [];
  const measures: TextMetrics[] = [];
  let tempLine = '';
  for (let i = 0; i < words.length; i++) {
    if (words[i] !== '') {
      const word = words[i] || ' ';
      const line = tempLine + word;
      const textMeasures = ctx.measureText(line);
      if (textMeasures.width > maxWidth && tempLine && word !== ' ') {
        lines.push(tempLine);
        measures.push(textMeasures);
        tempLine = word;
      } else {
        tempLine = line;
      }
      if (i === words.length - 1) {
        lines.push(tempLine);
        measures.push(textMeasures);
      }
    }
  }

  const ascent = measures.length ? measures[0].actualBoundingBoxAscent : 0;
  const body = measures.length ? options.lineHeight * (measures.length - 1) : 0;
  const descent = measures.length ? measures[measures.length - 1].actualBoundingBoxDescent : 0;
  const actualHeight = ascent + body + descent;

  let startY = 0;
  if (options.center) {
    startY = (ctx.canvas.height - actualHeight) / 2 + ascent;
  } else if (options.top) {
    startY = options.top + ascent;
  } else if (options.bottom) {
    startY = options.bottom - descent - body;
  }
  let translateX = 0;
  let translateY = 0;
  if (typeof options.translateX === 'function') {
    translateX = options.translateX(maxWidth);
  }
  if (typeof options.translateX === 'number') {
    translateX = options.translateX;
  }
  if (typeof options.translateY === 'function') {
    translateY = options.translateY(actualHeight);
  }
  if (typeof options.translateY === 'number') {
    translateY = options.translateY;
  }
  lines.forEach((str, index) => {
    ctx.fillText(str, options.left + translateX, startY + index * options.lineHeight + translateY);
  });
  return {
    width: maxWidth,
    height: actualHeight,
    left: options.left + translateX,
    right: options.right + translateX,
    top: startY - ascent + translateY,
    bottom: startY + body + descent + translateY,
  };
}

const focusLineFontSize = 48;
const focusLineHeight = focusLineFontSize * 1.2;
const focusLineMargin = focusLineFontSize * 1;
const otherLineFontSize = focusLineFontSize * 1;
const otherLineHeight = otherLineFontSize * 1.2;
const otherLineMargin = otherLineFontSize * 1;
const otherLineOpacity = 0.35;
const marginWidth = focusLineFontSize * 1;
const animateDuration = 0.3;
const backgroundColor = '#000000b0';

let offscreenCanvas: HTMLCanvasElement;
let offscreenCtx: CanvasRenderingContext2D;
let gradient: CanvasGradient;
function initOffscreenCtx(ctx: CanvasRenderingContext2D) {
  if (!offscreenCtx) {
    offscreenCanvas = document.createElement('canvas');
    offscreenCtx = offscreenCanvas.getContext('2d') as CanvasRenderingContext2D;
    offscreenCtx.canvas.width = ctx.canvas.width;
    offscreenCtx.canvas.height = ctx.canvas.height;
    gradient = offscreenCtx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradient.addColorStop(0.08, 'transparent');
    gradient.addColorStop(0.35, 'white');
    gradient.addColorStop(0.65, 'white');
    gradient.addColorStop(0.92, 'transparent');
  }
  return { offscreenCtx, gradient };
}

export function renderLyricsWithCanvas(
  ctx: CanvasRenderingContext2D,
  lyrics: Lyric,
  currentTime: number, // s
) {
  let currentIndex = 0;
  let progress = 1;
  lyrics.forEach(({ startTime }, index) => {
    if (startTime && currentTime > startTime - animateDuration) {
      currentIndex = index;
      if (currentTime < startTime) {
        progress = (currentTime - startTime + animateDuration) / animateDuration;
      }
    }
  });

  ctx.save();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const { offscreenCtx, gradient } = initOffscreenCtx(ctx);
  offscreenCtx.save();
  offscreenCtx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // focus line
  const fFontSize = otherLineFontSize + progress * (focusLineFontSize - otherLineFontSize);
  const fLineHeight = otherLineHeight + progress * (focusLineHeight - otherLineHeight);
  const fLineOpacity = otherLineOpacity + progress * (1 - otherLineOpacity);
  const otherRight =
    ctx.canvas.width - marginWidth - (otherLineFontSize / focusLineFontSize) * (ctx.canvas.width - 2 * marginWidth);
  const progressRight = marginWidth + (1 - progress) * (otherRight - marginWidth);
  offscreenCtx.filter = `opacity(${fLineOpacity})`;
  offscreenCtx.fillStyle = 'white';
  offscreenCtx.font = `bold ${fFontSize}px sans-serif`;
  const pos = drawParagraph(offscreenCtx, lyrics[currentIndex]?.text, {
    center: true,
    left: marginWidth,
    right: progressRight,
    lineHeight: fLineHeight,
    // just approximate location
    translateY: (selfHeight: number) => selfHeight * (1 - progress),
  });

  // prev line
  let lastBeforePos = pos;
  for (let i = 0; i < currentIndex; i++) {
    if (i === 0) {
      const prevProgressLineFontSize = otherLineFontSize + (1 - progress) * (focusLineFontSize - otherLineFontSize);
      offscreenCtx.filter = `opacity(${otherLineOpacity + (1 - progress) * (1 - otherLineOpacity)})`;
      offscreenCtx.font = `bold ${prevProgressLineFontSize}px sans-serif`;
    } else {
      offscreenCtx.filter = `opacity(${otherLineOpacity})`;
      offscreenCtx.font = `bold ${otherLineFontSize}px sans-serif`;
    }
    lastBeforePos = drawParagraph(offscreenCtx, lyrics[currentIndex - 1 - i].text, {
      bottom: i === 0 ? lastBeforePos.top - focusLineMargin : lastBeforePos.top - otherLineMargin,
      left: marginWidth,
      right: i === 0 ? marginWidth + progress * (otherRight - marginWidth) : otherRight,
      lineHeight: i === 0 ? otherLineHeight + (1 - progress) * (focusLineHeight - otherLineHeight) : otherLineHeight,
    });
    if (lastBeforePos.top < 0) break;
  }
  // next line
  offscreenCtx.filter = `opacity(${otherLineOpacity})`;
  offscreenCtx.font = `bold ${otherLineFontSize}px sans-serif`;
  let lastAfterPos = pos;
  for (let i = currentIndex + 1; i < lyrics.length; i++) {
    lastAfterPos = drawParagraph(offscreenCtx, lyrics[i].text, {
      top: i === currentIndex + 1 ? lastAfterPos.bottom + focusLineMargin : lastAfterPos.bottom + otherLineMargin,
      left: marginWidth,
      right: otherRight,
      lineHeight: otherLineHeight,
    });
    if (lastAfterPos.bottom > ctx.canvas.height) break;
  }

  offscreenCtx.globalCompositeOperation = 'source-in';
  offscreenCtx.filter = 'none';
  offscreenCtx.fillStyle = gradient;
  offscreenCtx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.drawImage(offscreenCtx.canvas, 0, 0);

  ctx.restore();
  offscreenCtx.restore();
}
