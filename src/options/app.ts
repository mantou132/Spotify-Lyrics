import { html, customElement, GemElement, refobject, RefObject } from '@mantou/gem';

import { browser } from 'webextension-polyfill-ts';

import { LocalStorageKeys, Message, Event as MessageEvent, I18nMsgKeys } from '../common/consts';

import { Options, lyricsPositions } from './store';

const options = Options.init();

// https://developer.mozilla.org/en-US/docs/Web/API/SubmitEvent
type SubmitEvent = Event;

@customElement('options-app')
export class OptionsApp extends GemElement<{ changed: boolean }> {
  @refobject formRef: RefObject<HTMLFormElement>;

  state = { changed: false };

  inputHandler = () => {
    this.setState({ changed: true });
  };

  submitHandler = (e: SubmitEvent) => {
    e.preventDefault();

    const map = [...new FormData(this.formRef.element || undefined)];
    const value: Partial<Options> = {};
    map.forEach(([k, v]) => {
      value[k as keyof Options] = v as any;
    });

    localStorage.setItem(LocalStorageKeys.CONFIG, JSON.stringify(new Options(value)));

    this.setState({ changed: false });

    browser.tabs.query({ url: '*://open.spotify.com/*' }).then(tabs => {
      tabs.forEach(tab => {
        if (tab.id) browser.tabs.sendMessage(tab.id, { type: MessageEvent.RELOAD_SPOTIFY } as Message);
      });
    });
  };

  render() {
    return html`
      <style>
        .form-item {
          display: block;
          margin-block-end: 0.5em;
        }
        [type=checkbox] {
          margin-inline-end: .5em;
        }
        select {
          margin-inline-start: .5em;
        }
        [type='submit'] {
          margin-block-start: 2em;
        }
      </style>
      <form ref=${this.formRef.ref} @input=${this.inputHandler} @submit=${this.submitHandler}>

      <label class="form-item">
          <input
            type="checkbox"
            name="${'strict-mode' as keyof Options}"
            ?checked="${options['strict-mode'] === 'on'}">
          </input>
          ${browser.i18n.getMessage(I18nMsgKeys.optionsStrictMatchMode)}
        </label>

        <label class="form-item">
          <input
            type="checkbox"
            name="${'only-cover' as keyof Options}"
            ?checked="${options['only-cover'] === 'on'}">
          </input>
          ${browser.i18n.getMessage(I18nMsgKeys.optionsShowLyrics)}
        </label>

        <label class="form-item">
          <input
            type="checkbox"
            name="${'clean-lyrics' as keyof Options}"
            ?checked="${options['clean-lyrics'] === 'on'}">
          </input>
          ${browser.i18n.getMessage(I18nMsgKeys.optionsShowCleanLyrics)}
        </label>

        <div class="form-item">
          <label>${browser.i18n.getMessage(I18nMsgKeys.optionsLyricsPosition)}</label>
          <select name="${'show-on' as keyof Options}">
            ${lyricsPositions.map(
              v => html`
                <option ?selected=${options['show-on'] === v} value=${v}>${v}</option>
              `,
            )}
          </select>
        </div>

        <button
          ?disabled=${!this.state.changed}
          type="submit">
          ${browser.i18n.getMessage(I18nMsgKeys.optionsSave)}
        </button>

      </form>
    `;
  }
}
