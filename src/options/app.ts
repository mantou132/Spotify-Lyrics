import { html, customElement, GemElement, refobject, RefObject } from '@mantou/gem';

import { browser } from 'webextension-polyfill-ts';

import {
  Message,
  Event as MessageEvent,
  I18nMsgKeys,
  Options,
  LyricsPositions,
  isSupportES2018RegExp,
} from '../common/consts';

import { getOptions, updateOptions } from './store';

const options = getOptions();

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
    if (!this.formRef.element) return;

    const value: any = {};
    [...this.formRef.element.elements].forEach((e: HTMLInputElement | HTMLSelectElement) => {
      const name = e.name as keyof Options;
      if (name) {
        if (e instanceof HTMLInputElement) {
          value[name] = e.checked ? 'on' : 'off';
        } else {
          value[name] = e.value;
        }
      }
    });
    updateOptions(value);

    this.setState({ changed: false });

    const manifest = browser.runtime.getManifest() as typeof import('../../public/manifest.json');
    browser.tabs.query({ url: manifest.content_scripts[0].matches }).then((tabs) => {
      tabs.forEach((tab) => {
        if (tab.id)
          browser.tabs.sendMessage(tab.id, { type: MessageEvent.RELOAD_SPOTIFY } as Message);
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

        <label class="form-item" ?hidden="${!isSupportES2018RegExp}">
          <input
            type="checkbox"
            name="${'lyrics-smooth-scroll' as keyof Options}"
            ?checked="${options['lyrics-smooth-scroll'] === 'on'}">
          </input>
          ${browser.i18n.getMessage(I18nMsgKeys.optionsSmoothScroll)}
        </label>

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
            ${LyricsPositions.map(
              (v) => html`<option ?selected=${options['show-on'] === v} value=${v}>${v}</option>`,
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
