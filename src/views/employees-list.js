import { LitElement, html, css } from 'lit';
import '../components/employee.js';
import { store } from '../redux/store.js';
import { BaseView } from '../base/base-view.js';
import { t } from '../i18n/i18n';

export class EmployeesList extends BaseView {
  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    .theme {
      color:var(--theme-color);;
    }
    th {
      padding: 15px 0;
    }
  `;

  static properties = {
    employees: { type: Array },
    isEmployeeList: { type: Boolean }
  };

  constructor() {
    super();
    this.employees = [];

    this.employees = store.getState().employees.list;

    store.subscribe(() => {
      const state = store.getState();
      this.employees = state.employees.list;
    });
  }

    keyMap = {
    "": "",
    "first_name": "isim",
    "last_name": "Soyisim",
    "birth_date": "Doğum Tarihi",
    "employment_date": "Başlama Tarihi",
    "phone": "Telefon",
    "email": "E-mail",
    "department": "Departman",
    "position": "Pozisyon",
    "actions":"Eylemler"
    }

  render() {
    return html`
    <base-view .isEmployeeList=${true}>
        <table>
          <thead>
            <tr class="theme">
              ${Object.keys(this.keyMap).map(
                key => html`<th>${t(key)}</th>`
              )}
            </tr>
          </thead>
          <tbody>
              ${this.employees.map(
                employee => html`
                  <employees-list-item
                    .employee=${employee}
                    .keyMap=${this.keyMap}>
                  </employees-list-item>
                `
              )}
          </tbody>
        </table>
  </base-view>
    `;
  }
}

customElements.define('employees-list', EmployeesList);
