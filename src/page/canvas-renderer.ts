import { LyricsAlign, RomanjiIdentifier } from '../common/consts';

import { Lyric } from './lyrics';

// simple word segmentation rules
export function getWords(str: string) {
  let result: string[] = [];
  const words = str.split(
    /(\p{sc=Han}|\p{sc=Katakana}|\p{sc=Hiragana}|\p{sc=Hang}|\p{gc=Punctuation})|\s+/gu,
  );
  let tempWord = '';
  words.forEach((word = ' ') => {
    if (word) {
      const romanji = word.match(/^\$RMJ\$|\w*\S/g);
      if (romanji && romanji.length > 1) {
        result = result.concat(romanji);
      } else if (tempWord && /(“|')$/.test(tempWord) && word !== ' ') {
        // End of line not allowed
        tempWord += word;
      } else if (/(,|\.|\?|:|;|'|，|。|？|：|；|”)/.test(word) && tempWord !== ' ') {
        // Start of line not allowed
        tempWord += word;
      } else {
        if (tempWord) result.push(tempWord);
        tempWord = word;
      }
    }
  });
  if (tempWord) result.push(tempWord);
  return result;
}

interface Options {
  left: number;
  right: number;
  lineHeight: number; // px
  // only one of vCenter/top/bottom works
  vCenter?: boolean;
  top?: number;
  bottom?: number;

  hCenter?: boolean;
  translateX?: number | ((width: number) => number);
  translateY?: number | ((width: number) => number);

  measure?: boolean;
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
  let actualWidth = 0;
  const maxWidth = ctx.canvas.width - options.left - options.right;
  const words = getWords(str);
  const lines: string[] = [];
  const measures: TextMetrics[] = [];
  let tempLine = '';
  let textMeasures = ctx.measureText('');
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const line = tempLine + word;
    const mea = ctx.measureText(line);
    const isSpace = /\s/.test(word);
    const isNewLine = word == RomanjiIdentifier;
    if ((mea.width > maxWidth && tempLine && !isSpace) || isNewLine) {
      actualWidth = Math.max(actualWidth, textMeasures.width);
      lines.push(tempLine);
      measures.push(textMeasures);
      tempLine = isNewLine ? '' : word;
    } else {
      tempLine = line;
      if (!isSpace) {
        textMeasures = mea;
      }
    }
  }
  if (tempLine !== '') {
    actualWidth = Math.max(actualWidth, textMeasures.width);
    lines.push(tempLine);
    measures.push(ctx.measureText(tempLine));
  }

  const ascent = measures.length ? measures[0].actualBoundingBoxAscent : 0;
  const body = measures.length ? options.lineHeight * (measures.length - 1) : 0;
  const descent = measures.length ? measures[measures.length - 1].actualBoundingBoxDescent : 0;
  const actualHeight = ascent + body + descent;

  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;
  if (options.hCenter) {
    startX = (ctx.canvas.width - actualWidth) / 2;
  } else {
    startX = options.left + translateX;
  }

  if (options.vCenter) {
    startY = (ctx.canvas.height - actualHeight) / 2 + ascent;
  } else if (options.top) {
    startY = options.top + ascent;
  } else if (options.bottom) {
    startY = options.bottom - descent - body;
  }

  if (typeof options.translateX === 'function') {
    translateX = options.translateX(actualWidth);
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
  if (!options.measure) {
    lines.forEach((str, index) => {
      const x = options.hCenter ? (ctx.canvas.width - measures[index].width) / 2 : startX;
      ctx.fillText(str, x, startY + index * options.lineHeight + translateY);
    });
  }
  return {
    width: actualWidth,
    height: actualHeight,
    left: startX + translateX,
    right: ctx.canvas.width - options.left - actualWidth + translateX,
    top: startY - ascent + translateY,
    bottom: startY + body + descent + translateY,
  };
}

function drawMask(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.fillStyle = '#000000b0';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}

export function drawBackground(ctx: CanvasRenderingContext2D, image: CanvasImageSource) {
  ctx.canvas.width = ctx.canvas.width;
  ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
}

export interface RenderTextOptions {
  backgroundImage: CanvasImageSource;
  fontFamily: string;
  color?: string;
}
export function drawText(ctx: CanvasRenderingContext2D, text: string, options: RenderTextOptions) {
  const { color = 'white', backgroundImage } = options;
  drawBackground(ctx, backgroundImage);
  drawMask(ctx);
  ctx.save();
  const fontSize = 32;
  ctx.fillStyle = color;
  ctx.font = `bold ${fontSize}px ${options.fontFamily}, sans-serif`;
  drawParagraph(ctx, text, {
    vCenter: true,
    hCenter: true,
    left: 0,
    right: 0,
    lineHeight: fontSize,
  });
  ctx.restore();
}

let offscreenCanvas: HTMLCanvasElement;
let offscreenCtx: CanvasRenderingContext2D;
let gradient1: CanvasGradient;
let gradient2: CanvasGradient;
function initOffscreenCtx(ctx: CanvasRenderingContext2D) {
  if (!offscreenCtx) {
    offscreenCanvas = document.createElement('canvas');
    offscreenCtx = offscreenCanvas.getContext('2d') as CanvasRenderingContext2D;
    gradient1 = offscreenCtx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradient1.addColorStop(0.08, 'transparent');
    gradient1.addColorStop(0.15, 'white');
    gradient1.addColorStop(0.85, 'white');
    gradient1.addColorStop(0.92, 'transparent');
    gradient2 = offscreenCtx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradient2.addColorStop(0.0, 'white');
    gradient2.addColorStop(0.7, 'white');
    gradient2.addColorStop(0.925, 'transparent');
  }
  offscreenCtx.canvas.width = ctx.canvas.width;
  offscreenCtx.canvas.height = ctx.canvas.height;
  return { offscreenCtx, gradient1, gradient2 };
}

export interface RenderLyricsOptions {
  backgroundImage: CanvasImageSource;
  focusLineFontSize: number;
  align: typeof LyricsAlign[number];
  smooth: boolean;
  fontFamily: string;
}

type RenderState =
  | ({
      lyrics: Exclude<Lyric, null> | string[];
      currentIndex: number;
      progress: number;
    } & RenderLyricsOptions)
  | undefined;

// Avoid drawing again when the same
// Do not operate canvas again in other functions
let renderState: RenderState;

function isEqualState(state1: RenderState, state2: RenderState) {
  if (!state1 || !state2) return false;
  return Object.keys(state1).reduce((p, c: keyof RenderState) => {
    return p && state1[c] === state2[c];
  }, true);
}

export function renderLyrics(
  ctx: CanvasRenderingContext2D,
  lyrics: Exclude<Lyric, null>,
  currentTime: number, // s
  options: RenderLyricsOptions,
) {
  const focusLineFontSize = options.focusLineFontSize;
  const focusLineHeight = focusLineFontSize * 1.2;
  const focusLineMargin = focusLineFontSize * 1;
  const otherLineFontSize = focusLineFontSize * 1;
  const otherLineHeight = otherLineFontSize * 1.2;
  const otherLineMargin = otherLineFontSize * 1;
  const otherLineOpacity = 0.35;
  const marginWidth = ctx.canvas.width * 0.075;
  const animateDuration = options.smooth ? 0.3 : 0;
  const hCenter = options.align === 'center' ? true : false;
  const fontFamily = `${options.fontFamily}, sans-serif`;

  let currentIndex = -1;
  let progress = 1;
  lyrics.forEach(({ startTime }, index) => {
    if (startTime && currentTime > startTime - animateDuration) {
      currentIndex = index;
      if (currentTime < startTime) {
        progress = (currentTime - startTime + animateDuration) / animateDuration;
      }
    }
  });

  const nextState: RenderState = { ...options, currentIndex, lyrics, progress };
  if (isEqualState(nextState, renderState)) return;
  renderState = nextState;

  drawBackground(ctx, options.backgroundImage);
  drawMask(ctx);
  ctx.save();

  const { offscreenCtx, gradient1 } = initOffscreenCtx(ctx);
  offscreenCtx.save();

  // focus line
  const fFontSize = otherLineFontSize + progress * (focusLineFontSize - otherLineFontSize);
  const fLineHeight = otherLineHeight + progress * (focusLineHeight - otherLineHeight);
  const fLineOpacity = otherLineOpacity + progress * (1 - otherLineOpacity);
  const otherRight =
    ctx.canvas.width -
    marginWidth -
    (otherLineFontSize / focusLineFontSize) * (ctx.canvas.width - 2 * marginWidth);
  const progressRight = marginWidth + (1 - progress) * (otherRight - marginWidth);
  offscreenCtx.fillStyle = `rgba(255, 255, 255, ${fLineOpacity})`;
  offscreenCtx.font = `bold ${fFontSize}px ${fontFamily}`;
  const prevLineFocusHeight = drawParagraph(offscreenCtx, lyrics[currentIndex - 1]?.text, {
    vCenter: true,
    hCenter,
    left: marginWidth,
    right: marginWidth,
    lineHeight: focusLineFontSize,
    measure: true,
  }).height;
  const pos = drawParagraph(offscreenCtx, lyrics[currentIndex]?.text, {
    vCenter: true,
    hCenter,
    left: marginWidth,
    right: progressRight,
    lineHeight: fLineHeight,
    translateY: (selfHeight: number) =>
      ((prevLineFocusHeight + selfHeight) / 2 + focusLineMargin) * (1 - progress),
  });
  // offscreenCtx.strokeRect(pos.left, pos.top, pos.width, pos.height);

  // prev line
  let lastBeforePos = pos;
  for (let i = 0; i < currentIndex; i++) {
    if (i === 0) {
      const prevProgressLineFontSize =
        otherLineFontSize + (1 - progress) * (focusLineFontSize - otherLineFontSize);
      const prevProgressLineOpacity = otherLineOpacity + (1 - progress) * (1 - otherLineOpacity);
      offscreenCtx.fillStyle = `rgba(255, 255, 255, ${prevProgressLineOpacity})`;
      offscreenCtx.font = `bold ${prevProgressLineFontSize}px ${fontFamily}`;
    } else {
      offscreenCtx.fillStyle = `rgba(255, 255, 255, ${otherLineOpacity})`;
      offscreenCtx.font = `bold ${otherLineFontSize}px ${fontFamily}`;
    }
    lastBeforePos = drawParagraph(offscreenCtx, lyrics[currentIndex - 1 - i].text, {
      hCenter,
      bottom: i === 0 ? lastBeforePos.top - focusLineMargin : lastBeforePos.top - otherLineMargin,
      left: marginWidth,
      right: i === 0 ? marginWidth + progress * (otherRight - marginWidth) : otherRight,
      lineHeight:
        i === 0
          ? otherLineHeight + (1 - progress) * (focusLineHeight - otherLineHeight)
          : otherLineHeight,
    });
    if (lastBeforePos.top < 0) break;
  }
  // next line
  offscreenCtx.fillStyle = `rgba(255, 255, 255, ${otherLineOpacity})`;
  offscreenCtx.font = `bold ${otherLineFontSize}px ${fontFamily}`;
  let lastAfterPos = pos;
  for (let i = currentIndex + 1; i < lyrics.length; i++) {
    lastAfterPos = drawParagraph(offscreenCtx, lyrics[i].text, {
      hCenter,
      top:
        i === currentIndex + 1
          ? lastAfterPos.bottom + focusLineMargin
          : lastAfterPos.bottom + otherLineMargin,
      left: marginWidth,
      right: otherRight,
      lineHeight: otherLineHeight,
    });
    if (lastAfterPos.bottom > ctx.canvas.height) break;
  }

  offscreenCtx.globalCompositeOperation = 'source-in';
  offscreenCtx.fillStyle = gradient1;
  offscreenCtx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  offscreenCtx.restore();
  ctx.drawImage(offscreenCtx.canvas, 0, 0);

  ctx.restore();
}

const weakLyricsTime = new WeakMap<string[], number>();
export function renderHighlight(
  ctx: CanvasRenderingContext2D,
  lyrics: string[],
  options: RenderLyricsOptions,
) {
  const DURATION = 20_000;
  const animateDuration = options.smooth ? 500 : 0;
  const marginWidth = ctx.canvas.width * 0.075;
  const fontFamily = `${options.fontFamily}, sans-serif`;

  if (!weakLyricsTime.has(lyrics)) {
    weakLyricsTime.set(lyrics, performance.now());
  }
  const time = performance.now() - weakLyricsTime.get(lyrics)!; // ms
  const currentIndex = Math.floor(time / DURATION) % lyrics.length;
  const diff = time % DURATION;
  const progress = Math.min((diff < DURATION / 2 ? diff : DURATION - diff) / animateDuration, 1);
  const opacity = progress;

  const nextState: RenderState = { ...options, currentIndex, lyrics, progress };
  if (isEqualState(nextState, renderState)) return;
  renderState = nextState;

  drawBackground(ctx, options.backgroundImage);
  drawMask(ctx);
  ctx.save();

  const { offscreenCtx, gradient2 } = initOffscreenCtx(ctx);
  offscreenCtx.save();
  offscreenCtx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  offscreenCtx.font = `bold ${options.focusLineFontSize}px ${fontFamily}`;
  drawParagraph(offscreenCtx, lyrics[currentIndex], {
    hCenter: options.align === 'center' ? true : false,
    lineHeight: options.focusLineFontSize * 1.3,
    top: marginWidth,
    left: marginWidth,
    right: marginWidth,
  });
  offscreenCtx.globalCompositeOperation = 'source-in';
  offscreenCtx.fillStyle = gradient2;
  offscreenCtx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  offscreenCtx.restore();
  ctx.drawImage(offscreenCtx.canvas, 0, 0);

  const fontSize = ctx.canvas.width * 0.05;
  ctx.fillStyle = 'yellow';
  ctx.font = `bold ${fontSize}px sans-serif`;
  const text = 'HIGHLIGHT';
  const pos = drawParagraph(ctx, text, {
    hCenter: true,
    left: marginWidth,
    right: marginWidth,
    bottom: ctx.canvas.height - marginWidth,
    lineHeight: fontSize,
  });
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 3;
  const y = ctx.canvas.height - pos.height / 2 - marginWidth;
  ctx.beginPath();
  ctx.moveTo(marginWidth, y);
  ctx.lineTo((ctx.canvas.width - pos.width) / 2 - fontSize / 2, y);
  ctx.moveTo((ctx.canvas.width + pos.width) / 2 + fontSize / 2, y);
  ctx.lineTo(ctx.canvas.width - marginWidth, y);
  ctx.stroke();

  ctx.restore();
}
