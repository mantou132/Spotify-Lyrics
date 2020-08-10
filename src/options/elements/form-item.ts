import { customElement, attribute, boolattribute } from '@mantou/gem/lib/decorators';
import { GemElement, html } from '@mantou/gem/lib/element';

@customElement('ele-form-item')
export class FormItem extends GemElement {
  @attribute label: string;
  @attribute description: string;

  @boolattribute disabled: boolean;

  render() {
    return html`
      <style>
        :host {
          display: flex;
          padding: 0.8em 0;
        }
        :host([hidden]) {
          display: none;
        }
        :host([disabled]) {
          pointer-events: none;
          opacity: 0.3;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          cursor: default;
          flex-grow: 1;
          line-height: 1.3;
          padding-right: 1em;
        }
        .desc {
          opacity: 0.4;
        }
        .control {
          display: flex;
          place-items: center;
        }
      </style>
      <div class="text">
        <div class="label">${this.label}</div>
        <div class="desc">${this.description}</div>
      </div>
      <div class="control">
        <slot></slot>
      </div>
    `;
  }
}
