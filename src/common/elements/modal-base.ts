import { GemElement, html } from '@mantou/gem/lib/element';

export class Modal extends GemElement {
  static instance: GemElement | null = null;

  static open(content: Element | string) {
    if (this.instance) return;
    this.instance = new this(content);
    document.body.append(this.instance);
  }

  static close() {
    this.instance?.remove();
    this.instance = null;
  }

  content: Element | string;

  constructor(content: Element | string) {
    super();
    this.content = content;
    this.addEventListener('close', this.close);
    this.tabIndex = 0;
  }

  close = () => {
    (this.constructor as typeof Modal).close();
  };

  keydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopImmediatePropagation();
      e.stopPropagation();
      this.close();
    }
  };

  mounted() {
    this.focus();
    window.addEventListener('keydown', this.keydownHandler, true);
    return () => {
      window.removeEventListener('keydown', this.keydownHandler, true);
    };
  }

  render() {
    return html`
      <style>
        .root {
          font-size: 10px;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 2147483647;
        }
        .body {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 4px;
        }
        .close-btn {
          cursor: pointer;
          position: absolute;
          top: -2em;
          right: -2em;
          height: 2em;
          width: 2em;
        }
        .close-btn::before,
        .close-btn::after {
          position: absolute;
          content: '';
          background: white;
          transform-origin: center;
          width: 1.5em;
          height: 0.2em;
          top: 0.9em;
          left: 0.25em;
        }
        .close-btn::before {
          transform: rotate(-45deg);
        }
        .close-btn::after {
          transform: rotate(45deg);
        }
        .body > :first-child {
          width: 45em;
          max-height: 90vh;
          overflow: auto;
        }
      </style>
      <div class="root">
        <div class="body">
          ${this.content}
          <div class="close-btn" @click=${this.close}></div>
        </div>
      </div>
    `;
  }
}
