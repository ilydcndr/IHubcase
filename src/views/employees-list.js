import { LitElement, html, css } from 'lit';
import '../components/employees-list-item.js'; // küçük component importu
import { store } from '../redux/store.js';

export class EmployeesList extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: Arial, sans-serif;
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

    this.keys = this.employees ? Object.keys(this.employees[0]) : null;

    this.keyMap = {
    "first_name": "isim",
    "last_name": "Soyisim",
    "birth_date": "Doğum Tarihi",
    "employment_date": "Başlama Tarihi",
    "phone": "Telefon",
    "email": "E-mail",
    "department": "Departman",
    "position": "Pozisyon"
    }
  }

  render() {
    return html`
    <div>
      <h1>Employees List</h1>
      <div>
        <div>Liste Görünümü</div>
        <div>Grid Görünümü</div>
      </div>
    </div>
    <div>
      ${Object.values(this.keyMap).map(value => html`<ol>${value}</ol>`)}
    </div>
    <div>
      ${this.employees?.map(employee => html`
        <ol>
          ${this.keys?.map(key => html`
            <li>${employee[key]}</li>
          `)}
        </ol>
      `)}
    </div>
    `;
  }
}

customElements.define('employees-list', EmployeesList);
