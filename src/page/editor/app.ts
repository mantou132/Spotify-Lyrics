import { html, GemElement } from '@mantou/gem/lib/element';
import { customElement, emitter, Emitter, refobject, RefObject } from '@mantou/gem/lib/decorators';

import { theme } from '../../common/theme';
import { audioPromise } from '../element';
import { sharedData } from '../share-data';
import { Lyric } from '../lyrics';
import { setSong } from '../store';

import './elements/button';

function initLyrics(text: string) {
  return text
    .split('\n')
    .map((s) => ({ startTime: null, text: s.trim() }))
    .filter(({ text }) => !!text && !text.startsWith('['));
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

interface State {
  currentIndex: number;
  lyrics: Exclude<Lyric, null>;
}

@customElement('sl-ext-editor-app')
export class EditorApp extends GemElement<State> {
  @emitter close: Emitter;
  @refobject tbody: RefObject<HTMLTableSectionElement>;

  originLyrics = sharedData.lyrics;
  initialLyrics = sharedData.lyrics || initLyrics(sharedData.text);

  state: State = {
    currentIndex: -1,
    lyrics: this.initialLyrics,
  };

  mounted() {
    let resetTimer = 0;
    const timeUpdateHandler = async () => {
      const audio = await audioPromise;
      if (audio.duration - audio.currentTime < 0.5 && !resetTimer) {
        resetTimer = window.setTimeout(() => {
          resetTimer = 0;
          audio.currentTime = 0;
          this.setState({ currentIndex: -1 });
          setTimeout(this.scrollInto);
        }, (audio.duration - audio.currentTime - 0.01) * 1000);
      }
    };

    audioPromise.then((audio) => {
      audio.currentTime = 0;
      this.setState({ currentIndex: -1 });
      audio.addEventListener('timeupdate', timeUpdateHandler);
    });

    const pasteHandler = async (e: ClipboardEvent) => {
      const audio = await audioPromise;
      const lyrics = initLyrics(e.clipboardData?.getData('text') || '');
      audio.currentTime = 0;
      this.setState({ lyrics, currentIndex: -1 });
    };
    document.addEventListener('paste', pasteHandler);
    return async () => {
      const audio = await audioPromise;
      audio.removeEventListener('timeupdate', timeUpdateHandler);
      document.removeEventListener('paste', pasteHandler);
      sharedData.lyrics = this.originLyrics;
    };
  }

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
    sharedData.lyrics = lyrics;
  };

  insertLine = async () => {
    const audio = await audioPromise;
    const { lyrics, currentIndex } = this.state;
    this.scrollInto();
    lyrics.splice(currentIndex + 1, 0, { startTime: audio.currentTime, text: '' });
    this.setState({ lyrics, currentIndex: currentIndex + 1 });
    sharedData.lyrics = lyrics;
  };

  resetRemote = async () => {
    await setSong({
      name: sharedData.name,
      artists: sharedData.artists,
      lyric: '',
    });
    const audio = await audioPromise;
    audio.currentTime = 0;
    const lyrics = initLyrics(sharedData.text);
    this.setState({ lyrics, currentIndex: -1 });
    sharedData.lyrics = lyrics;
  };

  saveRemote = async () => {
    await setSong({
      name: sharedData.name,
      artists: sharedData.artists,
      lyric: serializedLyrics(this.state.lyrics),
    });
    this.originLyrics = this.state.lyrics;
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
    this.state.lyrics[index].text = (e.target as HTMLTableCellElement).innerText;
  };

  render() {
    const { currentIndex, lyrics } = this.state;
    return html`
      <style>
        :host {
          font-size: 1.3em;
          display: block;
          padding: 0.8em 1.6em 1.6em;
          color: rgb(${theme.blackRGB});
        }
        .title {
          font-size: 1.3em;
          margin: 0.5em 0;
        }
        .body {
          height: 70vh;
          overflow: auto;
          margin-bottom: 1em;
        }
        .body:focus {
          outline: rgba(${theme.blackRGB}, 0.075) auto 1px;
        }
        .tip {
          margin: 2em;
          text-align: center;
          opacity: 0.5;
        }
        table {
          width: 100%;
          line-height: 1.5;
        }
        tr {
          opacity: 0.6;
        }
        td {
          padding: 0;
          vertical-align: baseline;
        }
        td:focus {
          outline: none;
        }
        .marked {
          opacity: 1;
        }
        .timestamp {
          font-family: sans-serif;
          user-select: none;
          width: 1px;
          padding-right: 1em;
          white-space: nowrap;
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
      <p class="title">LRC Editor: ${sharedData.name} - ${sharedData.artists}</p>
      <div class="body" tabindex="-1">
        <table>
          <tbody ref=${this.tbody.ref}>
            ${lyrics.map(
              ({ startTime, text }, index) => html`
                <tr class="${currentIndex >= index ? 'marked' : ''}">
                  <td
                    @click=${() => this.jump(startTime, index)}
                    class="timestamp ${startTime === null ? 'placeholder' : ''}"
                  >
                    ${startTime === null ? '00:00.00' : formatLRCTime(startTime)}
                  </td>
                  <td
                    contenteditable
                    @dragover=${this.dragOver}
                    @paste=${this.pasteText}
                    @input=${(e: InputEvent) => this.modifyLine(e, index)}
                  >
                    ${text}
                  </td>
                </tr>
              `,
            )}
          </tbody>
        </table>
        ${lyrics.length === 0 ? html`<p class="tip">Paste lyrics plain text</p>` : ''}
      </div>
      <div class="btns">
        <sl-ext-ele-button @click=${this.mark}>Mark Line</sl-ext-ele-button>
        <sl-ext-ele-button @click=${this.insertLine}>Inset Line</sl-ext-ele-button>
        <sl-ext-ele-button @click=${this.resetRemote}>Reset</sl-ext-ele-button>
        <sl-ext-ele-button @click=${this.download}>Download</sl-ext-ele-button>
        <sl-ext-ele-button @click=${this.saveRemote}>Save</sl-ext-ele-button>
      </div>
    `;
  }
}
