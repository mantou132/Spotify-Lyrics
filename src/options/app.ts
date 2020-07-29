import { browser } from 'webextension-polyfill-ts';
import { customElement, GemElement, html, refobject, RefObject } from '@mantou/gem';

import { Message, Event, Options, LyricsPositions, LyricsAlign } from '../common/consts';

import { theme } from '../common/theme';

import { i18n } from '../i18n';

import type { Form } from './elements/form';

import './elements/form';
import './elements/form-item';
import './elements/select';
import './elements/switch';

import { getOptions, updateOptions } from './store';

export const isSupportSmoothScroll =
  (() => {
    try {
      /xx/su;
      return true;
    } catch {
      return false;
    }
  })() && 'actualBoundingBoxAscent' in TextMetrics.prototype;

type State = { options: Options | null };
@customElement('options-app')
export class Test extends GemElement<State> {
  @refobject formRef: RefObject<Form>;

  state: State = {
    options: null,
  };

  async mounted() {
    this.setState({ options: await getOptions() });
  }

  inputHandler = async () => {
    if (!this.formRef.element) return;
    updateOptions(Object.fromEntries(this.formRef.element.value));

    const manifest = browser.runtime.getManifest() as typeof import('../../public/manifest.json');
    const tabs = await browser.tabs.query({ url: manifest.content_scripts[0].matches });
    tabs.forEach(async (tab) => {
      if (tab.id) {
        browser.tabs.sendMessage(tab.id, {
          type: Event.SEND_OPTIONS,
          data: await getOptions(),
        } as Message);
      }
    });
  };
  render() {
    const { options } = this.state;
    if (!options) return null;

    return html`
      <style>
        :host {
          display: block;
        }
        ele-form {
          margin-bottom: 1em;
        }
        ele-form-item {
          border-bottom: 1px solid rgba(${theme.blackRGB}, 0.1);
        }
        .tip {
          font-size: 1.2rem;
          font-style: italic;
          color: rgba(${theme.blackRGB}, 0.5);
          margin: 1em 0;
        }
      </style>
      <ele-form @input=${this.inputHandler} ref=${this.formRef.ref}>
        <ele-form-item label=${i18n.optionsFontSize()} description=${i18n.optionsFontSizeDetail()}>
          <ele-select
            name=${'font-size' as keyof Options}
            default-value=${options['font-size']}
            .options=${new Array(9).fill(null).map((_, index) => ({
              label: String(index * 2 + 32) + 'px',
              value: String(index * 2 + 32),
            }))}
          ></ele-select>
        </ele-form-item>
        <ele-form-item label=${i18n.optionsLyricsAlign()}>
          <ele-select
            name=${'lyrics-align' as keyof Options}
            default-value=${options['lyrics-align']}
            .options=${LyricsAlign.map((e) => ({ label: e, value: e }))}
          ></ele-select>
        </ele-form-item>
        <ele-form-item
          ?hidden=${!isSupportSmoothScroll}
          label=${i18n.optionsSmoothScroll()}
          description=${i18n.optionsSmoothScrollDetail()}
        >
          <ele-switch
            name=${'lyrics-smooth-scroll' as keyof Options}
            default-value=${options['lyrics-smooth-scroll']}
          ></ele-switch>
        </ele-form-item>
        <ele-form-item
          label=${i18n.optionsShowCleanLyrics()}
          description=${i18n.optionsShowCleanLyricsDetail()}
        >
          <ele-switch
            name=${'clean-lyrics' as keyof Options}
            default-value=${options['clean-lyrics']}
          ></ele-switch>
        </ele-form-item>
        <ele-form-item
          ?hidden=${!document.pictureInPictureEnabled}
          label="${i18n.optionsLyricsPosition()}"
        >
          <ele-select
            name=${'show-on' as keyof Options}
            default-value=${options['show-on']}
            .options=${LyricsPositions.map((e) => ({ label: e, value: e }))}
          ></ele-select>
        </ele-form-item>
        <ele-form-item
          label="${i18n.optionsToggleShortcut()}"
          description=${i18n.optionsToggleShortcutDetail()}
        >
          <ele-select
            name=${'toggle-shortcut' as keyof Options}
            default-value=${options['toggle-shortcut']}
            .options=${new Array(26).fill(null).map((_, index) => ({
              label: String.fromCharCode(index + 97),
              value: String.fromCharCode(index + 97),
            }))}
          ></ele-select>
        </ele-form-item>
        <ele-form-item label=${i18n.optionsShowLyrics()}>
          <ele-switch
            name=${'only-cover' as keyof Options}
            default-value=${options['only-cover']}
          ></ele-switch>
        </ele-form-item>
      </ele-form>
      <p class="tip">${i18n.optionsSaveTip()}</p>
    `;
  }
}
