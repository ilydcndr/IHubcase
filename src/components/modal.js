import { LitElement, html, css } from 'lit';
import { t } from '../i18n/i18n';

export class ConfirmModal extends LitElement {

  static styles = css`
  h3 {
    color: var(--theme-color);
  }
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.3);
    z-index: 999;
  }
  .confirm-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 6px;
    padding: 1.5rem;
    width: 400px;
    box-shadow: 0 0 15px rgba(0,0,0,0.25);
    z-index: 1000;
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .close-modal {
    font-size: 1.5rem;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--theme-color)
  }
  p {
    margin: 0 0 1.5rem 0;
    font-size: 1rem;
    color: #333;
  }
  .actions {
    gap: 10px;
    display:flex;
    flex-direction:column;
    width:100%
  }
  button {
    padding: 0.5rem 1.2rem;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
  }
  .confirm-btn {
    background-color: var(--theme-color);
    color: white;
    border:none;
  }
  .confirm-btn:hover {
    background-color: var(--theme-color);
  }
  .cancel-btn {
    background-color: white;
    border: 2px solid var(--theme-color-2);
    color:var(--theme-color-2);
  }
  .cancel-btn:hover {
    background-color: white;
  }
`;

  static properties = {
    open: { type: Boolean, reflect: true },
    employee: { type: Object },
  };

  confirmModal() {
    this.dispatchEvent(new CustomEvent('modal-confirmed', {
      bubbles: true,
      composed: true,
    }));
    this.closeModal();
  }

  closeModal() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('modal-closed', {
      bubbles: true,
      composed: true,
    }));
  }


  render() {
    if (!this.open) return html``;
    const fullname = `${this.employee?.first_name ?? ''} ${this.employee?.last_name ?? ''}`;
    const message = t('delete_confirm_message').replace('{fullname}', fullname);
    return html`
    <div class="modal-backdrop" @click=${this._handleClose}></div>
    <div class="confirm-modal" @click=${e => e.stopPropagation()}>
      <div class="modal-header">
        <h3>${t('confirm_modal_title')}</h3>
        <div @click=${this.closeModal}>
        <svg
          class="close-modal"
          @click=${this._handleClose}
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
      </div>
      <p .innerHTML=${message}></p>
      <div class="actions">
        <button class="confirm-btn" @click=${this.confirmModal}>${t('proceed')}</button>
        <button class="cancel-btn" @click=${this.closeModal}>${t('cancel')}</button>
      </div>
    </div>
  `;
  }
}

customElements.define('confirm-modal', ConfirmModal);
