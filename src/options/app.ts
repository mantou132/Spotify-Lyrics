import { browser } from 'webextension-polyfill-ts';
import { customElement, GemElement, html, refobject, RefObject } from '@mantou/gem';

import {
  Message,
  Event,
  I18nMsgKeys,
  Options,
  LyricsPositions,
  isSupportES2018RegExp,
} from '../common/consts';

import { theme } from '../common/theme';

import type { Form } from './elements/form';

import './elements/form';
import './elements/form-item';
import './elements/select';
import './elements/switch';
import './elements/button';

import { getOptions, updateOptions } from './store';
const options = getOptions();

@customElement('options-app')
export class Test extends GemElement<{ changed: boolean }> {
  @refobject formRef: RefObject<Form>;

  state = { changed: false };

  inputHandler = () => {
    this.setState({ changed: true });
  };

  submitHandler = () => {
    if (!this.formRef.element) return;
    updateOptions(Object.fromEntries(this.formRef.element.value));

    this.setState({ changed: false });

    const manifest = browser.runtime.getManifest() as typeof import('../../public/manifest.json');
    browser.tabs.query({ url: manifest.content_scripts[0].matches }).then((tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) browser.tabs.sendMessage(tab.id, { type: Event.RELOAD_SPOTIFY } as Message);
      });
    });
  };
  render() {
    return html`
      <style>
        :host {
          display: block;
        }
        ele-form {
          margin-bottom: 2em;
        }
        ele-form-item {
          border-bottom: 1px solid rgba(${theme.blackRGB}, 0.1);
        }
      </style>
      <ele-form @input=${this.inputHandler} ref=${this.formRef.ref}>
        <ele-form-item
          ?hidden=${!isSupportES2018RegExp}
          label=${browser.i18n.getMessage(I18nMsgKeys.optionsSmoothScroll)}
          description=${browser.i18n.getMessage(I18nMsgKeys.optionsSmoothScrollDetail)}
        >
          <ele-switch
            name=${'lyrics-smooth-scroll' as keyof Options}
            default-value=${options['lyrics-smooth-scroll']}
          ></ele-switch>
        </ele-form-item>
        <ele-form-item
          label=${browser.i18n.getMessage(I18nMsgKeys.optionsShowCleanLyrics)}
          description=${browser.i18n.getMessage(I18nMsgKeys.optionsShowCleanLyricsDetail)}
        >
          <ele-switch
            name=${'clean-lyrics' as keyof Options}
            default-value=${options['clean-lyrics']}
          ></ele-switch>
        </ele-form-item>
        <ele-form-item
          label=${browser.i18n.getMessage(I18nMsgKeys.optionsLyricsPosition)}
          description=${browser.i18n.getMessage(I18nMsgKeys.optionsLyricsPositionDetail)}
        >
          <ele-select
            name=${'show-on' as keyof Options}
            default-value=${options['show-on']}
            .options=${LyricsPositions.map((e) => ({ label: e, value: e }))}
          ></ele-select>
        </ele-form-item>
        <ele-form-item label=${browser.i18n.getMessage(I18nMsgKeys.optionsShowLyrics)}>
          <ele-switch
            name=${'only-cover' as keyof Options}
            default-value=${options['only-cover']}
          ></ele-switch>
        </ele-form-item>
      </ele-form>
      <ele-button ?disabled=${!this.state.changed} @click=${this.submitHandler}>
        ${browser.i18n.getMessage(I18nMsgKeys.optionsSave)}
      </ele-button>
    `;
  }
}
