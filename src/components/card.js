import { LitElement, html, css } from 'lit';
import { t } from '../i18n/i18n';

class CardComponent extends LitElement {
  static styles = css`
    .card {
      border: 1px solid #ddd;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      background-color: #fff;
      transition: box-shadow 0.3s ease;
      margin-bottom: 20px;
    }
    .card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    .row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
    }
    .key {
      font-weight: bold;
    }
    .actions {
      margin-top: 12px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      width:100%;
    }
    .actions {
      display: flex;
      justify-content: flex-start;
    }
    button {
      cursor: pointer;
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      background-color: var(--theme-color);
      color: white;
      font-weight: bold;
      width:15%;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    } 
    .item {
        display: flex;
        flex-direction: column;
        gap:0 20px;
      }
    .key {
      font-weight: 500;
      margin-bottom: 4px;
      color: gray
    }
    .value {
      font-weight: 500;
    }
    .edit {
      background-color:var(--theme-color-2);
    }
  `;

  static properties = {
    employee: { type: Object },
    keyMap: { type: Object },
  };

  constructor() {
    super();
    this.employee = {};
    this.keyMap = {};
  }


goEmployeeDetail(emp) {
  this.dispatchEvent(new CustomEvent('go-employee-detail', {
    detail: emp,
    bubbles: true,
    composed: true
  }));
}

deleteEmployee(employee) {
  this.dispatchEvent(new CustomEvent('request-delete-confirm', {
    detail: {
      employee,
      modalOpened: false
    },
    bubbles: true,
    composed: true
  }));
}

  render() {
    return html`
      <div class="card">    
        <div class="grid">
          ${Object.keys(this.keyMap).slice(1, -1).map(key => html`
            <div class="item">
              <div class="key">${this.keyMap[key] ?? key}</div>
              <div class="value">${this.employee[key] ?? '-'}</div>
            </div>
          `)}
        </div>
        <div class="actions">
              <button class="edit" @click=${() => this.goEmployeeDetail(this.employee)}>${t('edit')}</button>
              <button @click=${() => this.deleteEmployee(this.employee)}>${t('delete')}</button>
        </div>
      </div>
    `;
  }
}

customElements.define('card-component', CardComponent);
