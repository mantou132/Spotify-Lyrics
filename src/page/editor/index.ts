// Firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1656732
import { html } from '@mantou/gem/lib/element';
import { customElement } from '@mantou/gem/lib/decorators';

import { Modal } from '../../common/elements/modal-base';

import './app';

@customElement('sl-ext-editor-modal')
class EditorModal extends Modal {}

export function openEditor() {
  EditorModal.open(html`<sl-ext-editor-app></sl-ext-editor-app>`);
}
