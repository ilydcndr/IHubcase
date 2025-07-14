import { LitElement, html, css } from 'lit';

export class ModalComponent extends LitElement {
    static styles = css`
    :host {
        display: block;
        font-family: Arial, sans-serif;
    }

    vaadin-dialog {
        font-size: 16px;
        padding: 20px;
    }
    `;

    constructor() {
    super();
    this.modalOpen = false;
    }

    render() {
    return html`
        <button @click="${this.toggleModal}">Open Modal</button>
    `;
    }

    toggleModal() {
    const modal = this.shadowRoot.querySelector('#modalDialog');
    const closeBtn = modal.querySelector('#closeBtn');
    if (!modal.opened) {
        modal.open();
    }

    closeBtn.addEventListener('click', () => {
        modal.close();
    });
    }
}

customElements.define('modal-component', ModalComponent);
