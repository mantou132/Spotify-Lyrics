import { customElement, refobject, RefObject } from '@mantou/gem/lib/decorators';
import { GemElement, html } from '@mantou/gem/lib/element';

import { Options, LyricsPositions, LyricsAlign, LyricsFontFamily } from '../common/consts';
import { sendEvent, events } from '../common/ga';
import { theme } from '../common/theme';

import { i18n } from '../i18n';

import type { Form } from './elements/form';

import './elements/form';
import './elements/form-item';
import './elements/select';
import './elements/switch';

import { getOptions, updateOptions } from './store';

type State = { options: Options | null };
@customElement('options-app')
export class OptionsApp extends GemElement<State> {
  @refobject formRef: RefObject<Form>;

  state: State = {
    options: null,
  };

  async mounted() {
    const options = await getOptions();
    sendEvent(options.cid, events.openOptionsPage);
    this.setState({ options });
  }

  inputHandler = async () => {
    if (!this.formRef.element) return;
    const options = await updateOptions(Object.fromEntries(this.formRef.element.value));
    this.setState({ options });
  };
  render() {
    const { options } = this.state;
    if (!options) return null;

    return html`
      <style>
        :host {
          display: block;
          padding: 0.8em 1.6em 1.6em;
          color: rgb(${theme.blackRGB});
        }
        ele-form {
          margin-bottom: 1em;
        }
        ele-form-item {
          border-bottom: 1px solid rgba(${theme.blackRGB}, 0.1);
        }
        .tip {
          font-size: 1.2em;
          font-style: italic;
          opacity: 0.5;
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
        <ele-form-item label=${i18n.optionsFontFamily()}>
          <ele-select
            name=${'font-family' as keyof Options}
            default-value=${options['font-family']}
            .options=${LyricsFontFamily.map((e) => ({ label: e, value: e }))}
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
          label=${i18n.optionsShowCleanLyrics()}
          description=${i18n.optionsShowCleanLyricsDetail()}
        >
          <ele-switch
            name=${'clean-lyrics' as keyof Options}
            default-value=${options['clean-lyrics']}
          ></ele-switch>
        </ele-form-item>
        <ele-form-item label=${i18n.optionsTraditionalChineseLyrics()}>
          <ele-switch
            name=${'traditional-chinese-lyrics' as keyof Options}
            default-value=${options['traditional-chinese-lyrics']}
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
        <ele-form-item
          ?hidden=${!('filter' in CanvasRenderingContext2D.prototype)}
          ?disabled=${options['only-cover'] === 'on'}
          label=${i18n.optionsHDCover()}
          description=${i18n.optionsHDCoverDetail()}
        >
          <ele-switch
            name=${'hd-cover' as keyof Options}
            default-value=${options['hd-cover']}
          ></ele-switch>
        </ele-form-item>
        <ele-form-item
          label=${i18n.optionsUseUnreviewedLyrics()}
          description=${i18n.optionsUseUnreviewedLyricsDetail()}
        >
          <ele-switch
            name=${'use-unreviewed-lyrics' as keyof Options}
            default-value=${options['use-unreviewed-lyrics']}
          ></ele-switch>
        </ele-form-item>
      </ele-form>
      <p class="tip">${i18n.optionsSaveTip()}</p>
    `;
  }
}
