// Firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1656732
import { customElement } from '@mantou/gem/lib/decorators';

import { Modal } from '../../common/elements/modal-base';

import { optionsPromise } from '../options';

import { EditorApp } from './app';

@customElement('sl-ext-editor-modal')
class EditorModal extends Modal {}

export async function openEditor() {
  EditorModal.open(new EditorApp(await optionsPromise));
}
