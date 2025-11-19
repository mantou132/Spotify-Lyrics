import { GemElement, html } from '@mantou/gem/lib/element';
import { customElement } from '@mantou/gem/lib/decorators';

import { theme } from '../../common/theme';
import { i18n } from '../../i18n';

@customElement('ele-sponsor')
export class Sponsor extends GemElement {
  render() {
    return html`
      <style>
        :host {
          display: flex;
          gap: 1em;
          color: rgb(${theme.blackRGB});
          font-size: 1.2em;
          margin-block: 0.5em;
        }
        a {
          color: rgb(${theme.primaryRGB});
        }
      </style>
      ${i18n.sponsorsText()}
      <a href="https://github.com/sponsors/mantou132" target="_blank" rel="noopener noreferrer">
        GitHub Sponsors
      </a>
      <a href="https://www.buymeacoffee.com/mantou132" target="_blank" rel="noopener noreferrer">
        Buy Me a Coffee
      </a>
    `;
  }
}
