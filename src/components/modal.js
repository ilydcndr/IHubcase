import { LitElement, html, css } from 'lit';
import { t } from '../i18n/i18n';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class ConfirmModal extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    title: { type: String },
    message: { type: String },
  };

  constructor() {
    super();
    this.open = false;
    this.message = '';
    this.title = 'Are you Sure?';
  }

  openModal(message) {
    this.message = message;
    this.open = true;
  }

  closeModal() {
    this.open = false;
  }

  confirmModal() {
    this.dispatchEvent(new CustomEvent('confirmModal', {
      bubbles: true,
      composed: true,
    }));
    this.closeModal();
  }

    render() {
    if (!this.open) return html``;
    return html`
        <div class="modal-backdrop" @click=${this.closeModal}></div>
        <div class="confirm-modal" @click=${e => e.stopPropagation()}>
        <div class="modal-header">
            <h3>${this.title}</h3>
            <svg
                class="close-modal"
                @click=${this.closeModal}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 352 512"
                width="20"
                height="20"
                fill="currentColor"
                style="cursor:pointer"
                aria-hidden="true"
            >
                <path
                    d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48
                    0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48
                    0L9.21 111.45c-12.28 12.28-12.28 32.19
                    0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28
                    32.19 0 44.48l22.24 22.24c12.28 12.28 32.19 12.28
                    44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.19
                    12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19
                    0-44.48L242.72 256z"
                />
            </svg>
        </div>
        <p>${unsafeHTML(this.message)}</p>
        <div class="actions">
            <button class="confirm-btn" @click=${this.confirmModal}>${t('proceed')}</button>
            <button class="cancel-btn" @click=${this.closeModal}>${t('cancel')}</button>
        </div>
        </div>
    `;
    }

    static styles = css`
        .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 999;
        }

        .confirm-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        width: 500px;
        z-index: 1000;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
        display: flex;
        justify-content: space-between;
        color: #ff6303;
        }
            
        .modal-header h3 {
        margin: 0 0 0.5rem;
        text-align: left;
        }

        .actions {
        display: flex;
        flex-direction: column;
        margin-top: 1.5rem;
        gap: 10px;
        }

        button {
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        }

        .confirm-btn {
        background: #ff6303;
        color: white;
        }

        .cancel-btn {
        background: #eee;
        }

        .confirm-btn:hover {
        background: #e55a00;
        }

        .cancel-btn:hover {
        background: #ddd;
        }
        
        .close-modal {
        cursor: pointer;
        }

        .close-modal:hover {
        color:  #e55a00;
        }
    `;
}

customElements.define('confirm-modal', ConfirmModal);