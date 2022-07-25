import { html, GemElement } from '@mantou/gem/lib/element';
import { customElement, emitter, Emitter, refobject, RefObject } from '@mantou/gem/lib/decorators';

import { theme } from '../../common/theme';
import { events, sendEvent } from '../../common/ga';
import { audioPromise, lyricVideoIsOpen } from '../element';
import { sharedData } from '../share-data';
import { parseLyrics, Lyric } from '../lyrics';
import { setSong } from '../store';
import { OptionsAndI18n, optionsPromise } from '../options';

import { Button } from './elements/button';

function removeEmptyLine(text: string) {
  return text.replace(/(\r?\n)\s*\1+/g, '$1');
}

async function initLyrics(text: string) {
  return (
    (await parseLyrics(removeEmptyLine(text), {
      cleanLyrics: true,
      keepPlainText: true,
    })) || []
  );
}

function formatLRCTime(s: number) {
  const minStr = Math.floor(s / 60)
    .toString()
    .padStart(2, '0');
  const secStr = (s % 60).toFixed(2).padStart(5, '0');
  return `${minStr}:${secStr}`;
}

function serializedLyrics(lyric: Exclude<Lyric, null>) {
  let last = 0;
  return lyric
    .map(({ startTime, text }) => {
      last = startTime || last || 0;
      return `[${formatLRCTime(last)}] ${text}\n`;
    })
    .join('');
}

type State = {
  currentIndex: number;
  lyrics: Exclude<Lyric, null>;
};

@customElement('sl-ext-editor-app')
export class EditorApp extends GemElement<State> {
  @emitter close: Emitter;
  @refobject tbody: RefObject<HTMLTableSectionElement>;
  @refobject lyricsInput: RefObject<HTMLInputElement>;
  @refobject playbackRateInput: RefObject<HTMLInputElement>;

  originLyrics = sharedData.lyrics;
  originLoop = false;
  originPlaybackRate = 1;

  state: State = {
    currentIndex: -1,
    lyrics: this.originLyrics
      ? JSON.parse(JSON.stringify(this.originLyrics))
      : initLyrics(sharedData.text),
  };

  options: OptionsAndI18n;

  constructor(options: OptionsAndI18n) {
    super();
    this.options = options;
    this.addEventListener('keydown', (e: KeyboardEvent) => {
      e.stopPropagation();
    });
  }

  pasteHandler = async (e: ClipboardEvent) => {
    const lyrics = await initLyrics(e.clipboardData?.getData('text') || '');
    this.resetLocal({ lyrics });
    sharedData.setLyrics(lyrics);
  };

  async mounted() {
    if (!lyricVideoIsOpen) return;
    this.resetLocal();

    const options = await optionsPromise;
    sendEvent(options.cid, events.openEditor);

    const audio = await audioPromise;
    this.originLoop = audio.loop;
    audio.loop = true;
    this.originPlaybackRate = audio.playbackRate;

    document.addEventListener('paste', this.pasteHandler);
  }

  async unmounted() {
    const audio = await audioPromise;
    audio.loop = this.originLoop;
    audio.playbackRate = this.originPlaybackRate;
    document.removeEventListener('paste', this.pasteHandler);
    sharedData.setLyrics(this.originLyrics);
  }

  changePlaybackRate = async () => {
    const { element } = this.playbackRateInput;
    if (!element) return;
    const audio = await audioPromise;
    audio.playbackRate = Number(element.value);
  };

  lyricsChange = () => {
    const file = this.lyricsInput.element?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', async (event) => {
      const lyrics = await initLyrics(event.target!.result as string);
      this.resetLocal({ lyrics });
      sharedData.setLyrics(lyrics);
    });
    reader.readAsText(file);
  };

  scrollInto = () => {
    if (!this.tbody.element) return;
    const tr = [...this.tbody.element.querySelectorAll('tr.marked')].pop();
    tr?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  mark = async () => {
    const audio = await audioPromise;
    const { lyrics, currentIndex } = this.state;
    this.scrollInto();
    lyrics[currentIndex + 1].startTime = audio.currentTime;
    this.setState({ lyrics, currentIndex: currentIndex + 1 });
    sharedData.setLyrics(lyrics);
  };

  insertLine = async () => {
    const audio = await audioPromise;
    const { lyrics, currentIndex } = this.state;
    this.scrollInto();
    lyrics.splice(currentIndex + 1, 0, { startTime: audio.currentTime, text: '' });
    this.setState({ lyrics, currentIndex: currentIndex + 1 });
    sharedData.setLyrics(lyrics);
  };

  removeLine = (index: number) => {
    const { lyrics } = this.state;
    lyrics.splice(index, 1);
    this.setState({ lyrics });
    sharedData.setLyrics(lyrics);
  };

  clearAll = () => {
    this.setState({ lyrics: [] });
    sharedData.setLyrics([]);
  };

  offsetLine = (step: number, index?: number) => {
    let { lyrics } = this.state;
    const addOffset = (n: number | null, step: number) => (n === null ? null : n + step);
    if (typeof index === 'number') {
      lyrics[index].startTime = addOffset(lyrics[index].startTime, step);
    } else {
      lyrics = lyrics.map(({ text, startTime }) => ({
        text,
        startTime: addOffset(startTime, step),
      }));
    }
    this.setState({ lyrics });
    sharedData.setLyrics(lyrics);
  };

  resetLocal = async (state?: Partial<State>) => {
    const audio = await audioPromise;
    audio.currentTime = 0;
    this.setState({ ...state, currentIndex: -1 });
    setTimeout(this.scrollInto);
  };

  resetRemote = async () => {
    await setSong({
      name: sharedData.name,
      artists: sharedData.artists,
      lyric: '',
    });
    const lyrics = await initLyrics(sharedData.text);
    this.resetLocal({ lyrics });
    sharedData.setLyrics(lyrics);
  };

  saveRemote = async () => {
    const { lyrics } = this.state;
    const { i18nMap } = this.options;
    if (lyrics.some(({ startTime, text }) => text && startTime === null)) {
      return alert(i18nMap.pageEditorSaveValid);
    }
    await setSong({
      name: sharedData.name,
      artists: sharedData.artists,
      lyric: serializedLyrics(lyrics),
    });
    this.originLyrics = lyrics;
    this.close(null, { bubbles: true, composed: true });
  };

  download = () => {
    const link = document.createElement('a');
    const text = serializedLyrics(this.state.lyrics);
    const blob = new Blob([text], { type: 'text/plain' });
    link.href = URL.createObjectURL(blob);
    link.download = `${sharedData.name} - ${sharedData.artists}.lrc`;
    link.click();
  };

  jump = async (t: number | null, index: number) => {
    if (typeof t !== 'number') return;
    const audio = await audioPromise;
    audio.currentTime = t;
    this.setState({ currentIndex: index });
  };

  dragOver = (e: DragEvent) => {
    if (e.dataTransfer) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'none';
    }
  };

  pasteText = (e: ClipboardEvent) => {
    if (e.clipboardData) {
      e.stopPropagation();
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertHTML', false, text);
    }
  };

  modifyLine = (e: InputEvent, index: number) => {
    const { lyrics } = this.state;
    lyrics[index].text = (e.target as HTMLTableCellElement).innerText;
    sharedData.setLyrics(lyrics);
  };

  render() {
    const { currentIndex, lyrics } = this.state;
    const { i18nMap } = this.options;
    if (!lyricVideoIsOpen) {
      return html`
        <style>
          :host {
            font-size: 1.5em;
            text-align: center;
            display: block;
            padding: 2em 1em 0;
            margin-bottom: 2em;
            color: rgb(${theme.blackRGB});
          }
        </style>
        ${i18nMap.pageEditorOpenValid}
      `;
    }
    return html`
      <style>
        :host {
          font-size: 1.3em;
          display: block;
          padding: 0.8em 1.6em 1.6em;
          color: rgb(${theme.blackRGB});
        }
        a,
        a:visited {
          color: inherit;
          text-decoration: none;
        }
        .title {
          font-size: 1.3em;
          margin: 0.5em 0;
        }
        .body {
          height: 70vh;
          overflow: auto;
          margin-bottom: 1em;
          scrollbar-width: none;
        }
        .body::-webkit-scrollbar {
          width: 0px;
        }
        .body:focus {
          outline: rgba(${theme.blackRGB}, 0.075) auto 1px;
        }
        .tip {
          margin: 2em;
          text-align: center;
          opacity: 0.5;
        }
        .tools {
          display: flex;
          gap: 1em;
          margin: 0.5em 0;
        }
        .button {
          display: inline-flex;
          place-content: center;
          border: 1px solid;
          line-height: 1;
          width: 1em;
          opacity: 0.75;
        }
        .button:hover,
        .text-button:hover {
          cursor: pointer;
        }
        .button:hover {
          opacity: 1;
        }
        .text-button:hover {
          border-bottom: 1px solid;
        }
        table {
          width: 100%;
          line-height: 1.5;
        }
        tr {
          opacity: 0.6;
        }
        tr:hover {
          background: rgba(${theme.blackRGB}, 0.075);
        }
        td {
          width: 1px;
          padding: 0;
          vertical-align: baseline;
        }
        td:focus {
          outline: none;
        }
        .marked {
          opacity: 1;
        }
        .timestamp,
        .timechange {
          font-feature-settings: 'tnum';
          user-select: none;
          white-space: nowrap;
        }
        .timechange {
          padding: 0 0.5em;
        }
        .lyrics-line {
          width: 100%;
        }
        .remove {
          cursor: pointer;
          padding-left: 1em;
          opacity: 0.5;
        }
        .remove:hover {
          opacity: 1;
        }
        .placeholder {
          opacity: 0.5;
        }
        .timestamp:not(.placeholder) {
          cursor: pointer;
        }
        .btns {
          display: flex;
          justify-content: space-between;
        }
      </style>
      <p class="title">
        ${i18nMap.pageEditorTitle}:
        <a
          target="_blank"
          title=${i18nMap.pageEditorSearch}
          href="https://www.google.com/search?q=${encodeURIComponent(
            `${sharedData.name} ${sharedData.artists} lrc lyrics`,
          )}"
        >
          ${sharedData.name} - ${sharedData.artists}
        </a>
      </p>
      <div class="tools">
        <div>
          ${i18nMap.pageEditorPlaybackRate}:
          <select ref=${this.playbackRateInput.ref} @change=${this.changePlaybackRate}>
            ${[0.5, 0.75, 1, 1.25, 1.5].map(
              (v) =>
                html`<option value=${v} ?selected=${this.originPlaybackRate === v}>${v}</option>`,
            )}
          </select>
        </div>
        <div>
          ${i18nMap.pageEditorOffset}:
          <span
            title=${i18nMap.pageEditorOffsetDetail}
            class="button"
            @click=${() => this.offsetLine(0.1)}
            >+</span
          >
          <span
            title=${i18nMap.pageEditorOffsetDetail}
            class="button"
            @click=${() => this.offsetLine(-0.1)}
            >-</span
          >
        </div>
        <div style="flex-grow: 1;"></div>
        <div>
          <span class="text-button" @click=${this.clearAll}>${i18nMap.pageEditorClearAll}</span>
        </div>
      </div>
      <div class="body" tabindex="-1">
        <table>
          <tbody ref=${this.tbody.ref}>
            ${lyrics.map(
              ({ startTime, text }, index) => html`
                <tr class="${currentIndex >= index ? 'marked' : ''}">
                  <td
                    @click=${() => this.jump(startTime, index)}
                    title=${startTime === null ? '' : i18nMap.pageEditorSeek}
                    class="timestamp ${startTime === null ? 'placeholder' : ''}"
                  >
                    ${startTime === null ? '' : formatLRCTime(startTime)}
                  </td>
                  <td class="timechange">
                    <span
                      title=${i18nMap.pageEditorOffsetDetail}
                      class="button"
                      @click=${() => this.offsetLine(0.1, index)}
                      >+</span
                    >
                    <span
                      title=${i18nMap.pageEditorOffsetDetail}
                      class="button"
                      @click=${() => this.offsetLine(-0.1, index)}
                      >-</span
                    >
                  </td>
                  ${
                    // The following contenteditable element wrapping will cause the TextNode to be modified during editing
                    // eslint-disable-next-line prettier/prettier
                    html`<td class="lyrics-line" contenteditable @dragover=${this.dragOver} @paste=${this.pasteText} @input=${(e: InputEvent) => this.modifyLine(e, index)}>${text}</td>`}
                  <td class="remove" @click=${() => this.removeLine(index)}>✕</td>
                </tr>
              `,
            )}
          </tbody>
        </table>
        ${lyrics.length === 0
          ? html`
              <p class="tip">
                ${i18nMap.pageEditorAddLyrics1}
                <label for="lyrics" class="text-button">${i18nMap.pageEditorAddLyrics2}</label>
                ${i18nMap.pageEditorAddLyrics3}
              </p>
            `
          : ''}
      </div>
      <input
        ref=${this.lyricsInput.ref}
        id="lyrics"
        @change=${this.lyricsChange}
        type="file"
        accept="text/plain, .lrc"
        hidden
      />
      <div class="btns">
        ${new Button({ clickHandle: this.mark, content: i18nMap.pageEditorMarkLine })}
        ${new Button({ clickHandle: this.insertLine, content: i18nMap.pageEditorInsetLine })}
        ${new Button({ clickHandle: this.resetRemote, content: i18nMap.pageEditorReset })}
        ${new Button({ clickHandle: this.download, content: i18nMap.pageEditorDownload })}
        ${new Button({ clickHandle: this.saveRemote, content: i18nMap.pageEditorSave })}
      </div>
    `;
  }
}
