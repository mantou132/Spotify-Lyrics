import { GemElement, customElement, html } from '@mantou/gem';

@customElement('ele-form')
export class Form extends GemElement {
  get elements() {
    return [...this.querySelectorAll('[name]')] as HTMLInputElement[];
  }

  get value() {
    const formData = new FormData();
    this.elements.forEach((ele) => {
      if ('value' in ele && 'name' in ele) {
        formData.append(ele.name, ele.value);
      }
    });
    return formData;
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          font-size: 1.3rem;
        }
      </style>
      <slot></slot>
    `;
  }
}
