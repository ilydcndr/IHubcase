import { LitElement, html, css } from 'lit';
import editIcon from '../assets/icons/edit.svg';
import trashIcon from '../assets/icons/trash-solid.svg';
import '@vaadin/checkbox';
import { Router } from '@vaadin/router';
import { store, deleteEmployee } from '../redux/store';

export class EmployeesListItem extends LitElement {
  static styles = css`
    :host {
      display:contents;
    }
    th,td {
      font-weight:400;;
      font-size:14px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    .employee-list {
      background:#f2f2f2;
    }
    .table-wrapper {
      overflow-x: auto;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background:white;
    }
    .table-banner {
      display:flex;
      justify-content:space-between;
      align-items:center;
    }
    .table-view {
      display: flex;
      gap: 10px;
    }
    .theme {
      color:var(--theme-color);;
    }
    th,td {
      font-weight:400;;
      font-size:14px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    td {
      padding: 18px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    .action-list {
      display:flex;
      gap: 15px;
      justify-content: center;
    }
    .action-list img {
      width:15px;
      height:15px;
      cursor: pointer;
    }
    .employee-checkbox {
      text-align: center;
      vertical-align: middle;
    }
    vaadin-checkbox[checked]::part(checkbox) {
      background-color: var(--theme-color);
      border-color: var(--theme-color);
    }
  `;

  static properties = {
    employee: { type: Object },
  };

editEmployee = (emp) => {
  Router.go(`/employees/edit/${emp.id}`);
}

deleteEmployee = (emp) => {
  store.dispatch(deleteEmployee(emp));
}

actionArea = (employee) => html`
  <div class="action-list">
    <div @click=${(e) => this.editEmployee(employee)}>
      <img src="${editIcon}" class="logo" alt="Edit" />
    </div>
    <div @click=${(e) => this.deleteEmployee(employee)}>
      <img src="${trashIcon}" class="logo" alt="Trash" />
    </div>
  </div>
`

  checkboxArea = () => html `
    <vaadin-checkbox
      ?checked=${this.checked}
      @checked-changed=${e => this.checked = e.detail.value}
    >
    </vaadin-checkbox>
  `
  render() {
    return html`     
    <tr>
      ${Object.keys(this.keyMap).map(
        (key, index, arr) => {
          const isLast = index === arr.length - 1;
          return html`
        <td>
          ${isLast
              ? this.actionArea(this.employee)
              : !this.employee[key]
              ? this.checkboxArea()
              : this.employee[key]}
        </td>`
        })}
    </tr>`;
  }
}

customElements.define('employees-list-item', EmployeesListItem);



