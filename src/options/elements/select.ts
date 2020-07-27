import {
  GemElement,
  customElement,
  html,
  attribute,
  property,
  refobject,
  RefObject,
} from '@mantou/gem';

import { theme } from '../../common/theme';

export interface Option {
  label: string;
  value: string;
}

@customElement('ele-select')
export class Select extends GemElement {
  @attribute name: string;
  @attribute defaultValue: string;

  @property options: Option[] = [];

  @refobject selectRef: RefObject<HTMLSelectElement>;

  get control() {
    return this.selectRef.element!;
  }

  get value() {
    return this.control.value;
  }
  render() {
    return html`
      <style>
        :host {
          position: relative;
        }
        select {
          appearance: none;
          cursor: pointer;
          border-radius: 2px;
          border: 1px solid;
          background: transparent;
          line-height: 1.3;
          padding: 0.2em 1em 0.2em 0.2em;
          min-width: 5em;
        }
        select:focus {
          outline: none;
        }
        select:focus-visible {
          outline-offset: 1px;
          outline: rgba(${theme.primaryRGB}, 0.2) auto 1px;
        }
        .mark {
          content: '';
          position: absolute;
          border-style: solid;
          border-color: rgba(${theme.blackRGB}, 0.7) transparent transparent;
          border-width: 6px 4px 0;
          right: 0.3em;
          top: 0;
          bottom: 0;
          width: 0;
          height: 0;
          margin: auto;
        }
      </style>
      <select ref=${this.selectRef.ref}>
        ${this.options.map(
          (option) =>
            html`
              <option ?selected=${this.defaultValue === option.value} value=${option.value}>
                ${option.label}
              </option>
            `,
        )}
      </select>
      <div class="mark"></div>
    `;
  }
}
