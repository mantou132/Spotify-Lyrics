import { Lyric } from './lyrics';

// simple word segmentation rules
export function getWords(str: string) {
  const result: string[] = [];
  const words = str.split(
    /(\p{sc=Han}|\p{sc=Katakana}|\p{sc=Hiragana}|\p{sc=Hang}|\p{gc=Punctuation})|\s+/gu,
  );
  let tempWord = '';
  words.forEach((word = ' ') => {
    if (word) {
      if (tempWord && /(“|')$/.test(tempWord)) {
        // End of line not allowed
        tempWord += word;
      } else if (/(,|\.|\?|:|;|'|，|。|？|：|；|”)/.test(word)) {
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
    if (mea.width > maxWidth && tempLine && !isSpace) {
      actualWidth = Math.max(actualWidth, textMeasures.width);
      lines.push(tempLine);
      measures.push(textMeasures);
      tempLine = word;
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

let offscreenCanvas: HTMLCanvasElement;
let offscreenCtx: CanvasRenderingContext2D;
let gradient: CanvasGradient;
function initOffscreenCtx(ctx: CanvasRenderingContext2D) {
  if (!offscreenCtx) {
    offscreenCanvas = document.createElement('canvas');
    offscreenCtx = offscreenCanvas.getContext('2d') as CanvasRenderingContext2D;
    gradient = offscreenCtx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradient.addColorStop(0.08, 'transparent');
    gradient.addColorStop(0.35, 'white');
    gradient.addColorStop(0.65, 'white');
    gradient.addColorStop(0.92, 'transparent');
  }
  offscreenCtx.canvas.width = ctx.canvas.width;
  offscreenCtx.canvas.height = ctx.canvas.height;
  return { offscreenCtx, gradient };
}

export function renderLyricsWithCanvas(
  ctx: CanvasRenderingContext2D,
  lyrics: Lyric,
  currentTime: number, // s
  options: { focusLineFontSize: number },
) {
  const focusLineFontSize = options.focusLineFontSize;
  const focusLineHeight = focusLineFontSize * 1.2;
  const focusLineMargin = focusLineFontSize * 1;
  const otherLineFontSize = focusLineFontSize * 1;
  const otherLineHeight = otherLineFontSize * 1.2;
  const otherLineMargin = otherLineFontSize * 1;
  const otherLineOpacity = 0.35;
  const marginWidth = focusLineFontSize * 1;
  const animateDuration = 0.3;
  const backgroundColor = '#000000b0';

  ctx.save();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  if (!lyrics) {
    const fontSize = 32;
    ctx.fillStyle = 'white';
    ctx.font = `bold ${fontSize}px sans-serif`;
    drawParagraph(ctx, 'No lyrics', {
      vCenter: true,
      hCenter: true,
      left: 0,
      right: 0,
      lineHeight: fontSize,
    });
    return;
  }

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

  const { offscreenCtx, gradient } = initOffscreenCtx(ctx);
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
  offscreenCtx.font = `bold ${fFontSize}px sans-serif`;
  const prevLineFocusHeight = drawParagraph(offscreenCtx, lyrics[currentIndex - 1]?.text, {
    vCenter: true,
    left: marginWidth,
    right: marginWidth,
    lineHeight: focusLineFontSize,
    measure: true,
  }).height;
  const pos = drawParagraph(offscreenCtx, lyrics[currentIndex]?.text, {
    vCenter: true,
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
      offscreenCtx.font = `bold ${prevProgressLineFontSize}px sans-serif`;
    } else {
      offscreenCtx.fillStyle = `rgba(255, 255, 255, ${otherLineOpacity})`;
      offscreenCtx.font = `bold ${otherLineFontSize}px sans-serif`;
    }
    lastBeforePos = drawParagraph(offscreenCtx, lyrics[currentIndex - 1 - i].text, {
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
  offscreenCtx.font = `bold ${otherLineFontSize}px sans-serif`;
  let lastAfterPos = pos;
  for (let i = currentIndex + 1; i < lyrics.length; i++) {
    lastAfterPos = drawParagraph(offscreenCtx, lyrics[i].text, {
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
  offscreenCtx.fillStyle = gradient;
  offscreenCtx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.drawImage(offscreenCtx.canvas, 0, 0);

  ctx.restore();
  offscreenCtx.restore();
}
