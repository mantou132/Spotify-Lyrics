import { GemElement, html } from '@mantou/gem/lib/element';
import { customElement, boolattribute } from '@mantou/gem/lib/decorators';

import { theme } from '../../../common/theme';

interface Props {
  clickHandle?: () => any;
  content?: Element | string;
  disabled?: boolean;
}

@customElement('sl-ext-ele-button')
export class Button extends GemElement {
  @boolattribute disabled: boolean;

  constructor(props: Props = {}) {
    super();
    if (props.clickHandle) {
      this.addEventListener('click', props.clickHandle);
    }
    if (props.content) {
      this.append(props.content);
    }
    if (props.disabled) {
      this.disabled = true;
    }
  }

  clickHandler = (e: Event) => {
    if (this.disabled) e.stopPropagation();
  };

  render() {
    return html`
      <style>
        :host {
          display: contents;
        }
        :host([disabled]) button {
          cursor: not-allowed;
          background: rgba(${theme.blackRGB}, 0.1);
          color: rgba(${theme.blackRGB}, 0.5);
        }
        button {
          cursor: pointer;
          border-radius: 2px;
          border: 1px solid;
          background: transparent;
          line-height: 1.3;
          padding: 0.5em 1em;
          font-weight: 500;
        }
        button:hover {
          background: rgba(${theme.blackRGB}, 0.05);
        }
        button:active {
          background: rgba(${theme.blackRGB}, 0.1);
        }
        button:focus {
          outline: none;
        }
        button:focus-visible {
          outline-offset: 1px;
          outline: rgba(${theme.primaryRGB}, 0.2) auto 1px;
        }
      </style>
      <button @click=${this.clickHandler}><slot></slot></button>
    `;
  }
}
