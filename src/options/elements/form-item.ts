import { GemElement, customElement, html, attribute } from '@mantou/gem';

@customElement('ele-form-item')
export class FormItem extends GemElement {
  @attribute label: string;
  @attribute description: string;

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
        .text {
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
