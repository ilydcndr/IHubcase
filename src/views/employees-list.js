import { LitElement, html, css } from 'lit';
import '../components/employees-list-item.js';
import { store } from '../redux/store.js';
import { BaseView } from '../components/base-view.js'

export class EmployeesList extends BaseView {
  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    .theme {
      color:orange;
    }
    th {
      padding: 15px 0;
    }
  `;

  static properties = {
    employees: { type: Array }
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
    "first_name": "isim",
    "last_name": "Soyisim",
    "birth_date": "Doğum Tarihi",
    "employment_date": "Başlama Tarihi",
    "phone": "Telefon",
    "email": "E-mail",
    "department": "Departman",
    "position": "Pozisyon",
    "action":"Eylem"
    }

  render() {
    return html`
    <base-view>
        <table>
          <thead>
            <tr class="theme">
              ${Object.values(this.keyMap).map(value => html`<th>${value}</th>`)}
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
