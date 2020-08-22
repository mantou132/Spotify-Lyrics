import { html, GemElement } from '@mantou/gem/lib/element';
import { customElement, emitter, Emitter, refobject, RefObject } from '@mantou/gem/lib/decorators';

import { theme } from '../../common/theme';
import { audioPromise } from '../element';
import { sharedData } from '../share-data';
import { parseLyrics, Lyric } from '../lyrics';
import { setSong } from '../store';

import { Button } from './elements/button';

function initLyrics(text: string) {
  return (
    parseLyrics(text.replace(/^\s*$(?:\r\n?|\n)/gm, ''), {
      cleanLyrics: true,
      keepPlainText: true,
    }) || []
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

interface State {
  currentIndex: number;
  lyrics: Exclude<Lyric, null>;
}

@customElement('sl-ext-editor-app')
export class EditorApp extends GemElement<State> {
  @emitter close: Emitter;
  @refobject tbody: RefObject<HTMLTableSectionElement>;
  @refobject lyricsInput: RefObject<HTMLInputElement>;

  originLyrics = sharedData.lyrics;

  state: State = {
    currentIndex: -1,
    lyrics: this.originLyrics
      ? JSON.parse(JSON.stringify(this.originLyrics))
      : initLyrics(sharedData.text),
  };

  constructor() {
    super();
    this.addEventListener('keydown', (e: KeyboardEvent) => {
      e.stopPropagation();
    });
  }

  mounted() {
    if (!document.pictureInPictureElement) return;
    this.resetLocal();

    let originLoop = false;
    audioPromise.then((audio) => {
      originLoop = audio.loop;
      audio.loop = true;
    });

    const pasteHandler = async (e: ClipboardEvent) => {
      const lyrics = initLyrics(e.clipboardData?.getData('text') || '');
      this.resetLocal({ lyrics });
    };
    document.addEventListener('paste', pasteHandler);
    return async () => {
      (await audioPromise).loop = originLoop;
      document.removeEventListener('paste', pasteHandler);
      sharedData.lyrics = this.originLyrics;
    };
  }

  lyricsChange = () => {
    const file = this.lyricsInput.element?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', async (event) => {
      const lyrics = initLyrics(event.target!.result as string);
      this.resetLocal({ lyrics });
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
    const lyrics = initLyrics(sharedData.text);
    this.resetLocal({ lyrics });
    sharedData.lyrics = lyrics;
  };

  saveRemote = async () => {
    const { lyrics } = this.state;
    if (lyrics.some(({ startTime }) => startTime === null)) {
      return alert('Please add a timestamp to each line of text');
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
    this.state.lyrics[index].text = (e.target as HTMLTableCellElement).innerText;
  };

  render() {
    if (!document.pictureInPictureElement) {
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
        Please open the lyrics first
      `;
    }
    const { currentIndex, lyrics } = this.state;
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
        }
        .body:focus {
          outline: rgba(${theme.blackRGB}, 0.075) auto 1px;
        }
        .tip {
          margin: 2em;
          text-align: center;
          opacity: 0.5;
        }
        .button:hover {
          cursor: pointer;
          border-bottom: 1px solid;
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
      <p class="title">
        LRC Editor:
        <a
          target="_blank"
          title="Google search lyrics"
          href="https://www.google.com/search?q=${sharedData.name} ${sharedData.artists} lyrics"
          >${sharedData.name} - ${sharedData.artists}</a
        >
      </p>
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
        ${lyrics.length === 0
          ? html`
              <p class="tip">Paste or <label for="lyrics" class="button">upload</label> lyrics</p>
            `
          : ''}
      </div>
      <input
        ref=${this.lyricsInput.ref}
        id="lyrics"
        @change=${this.lyricsChange}
        type="file"
        accept="text/plain"
        hidden
      />
      <div class="btns">
        ${new Button({ clickHandle: this.mark, content: 'Mark Line' })}
        ${new Button({ clickHandle: this.insertLine, content: 'Inset Line' })}
        ${new Button({ clickHandle: this.resetRemote, content: 'Reset' })}
        ${new Button({ clickHandle: this.download, content: 'Download' })}
        ${new Button({ clickHandle: this.saveRemote, content: 'Save' })}
      </div>
    `;
  }
}
