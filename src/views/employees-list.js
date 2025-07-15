import { html, css } from 'lit';
import '../components/employee.js';
import { store } from '../redux/store.js';
import { BaseView } from '../base/base-view.js';
import { t } from '../i18n/i18n';
import '../components/card.js';
import { Router } from '@vaadin/router';

export class EmployeesList extends BaseView {
  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    .table-wrapper {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .theme {
      color: var(--theme-color);
    }
    th {
      padding: 15px 0;
    }
    card-component {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      width:90%;
    }
    .card-list {
      justify-items: center;
      align-items: center; 
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
      @media (max-width: 600px) {
    .card-list {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  `;

  static properties = {
    employees: { type: Array },
    isEmployeeList: { type: Boolean },
    viewType: { type: String }
  };

  constructor() {
    super();
    this.employees = [];
    this.isEmployeeList = true;
    this.viewType = localStorage.getItem('viewType') || 'list';

    this.listenRequestDelete = e => {
      const employee = e.detail.employee;
      this.employeeToDelete = employee;
      this.modalOpen = true;
      this.requestUpdate();
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.employees = [...store.getState().employees.list];

    this.unsubscribe = store.subscribe(() => {
      this.employees = [...store.getState().employees.list];
      this.requestUpdate();
    });

    this.changeViewType = e => {
      const newView = e.detail.view;
      this.viewType = newView;
      localStorage.setItem('viewType', newView);
      this.requestUpdate();
    };

    this.addEventListener('request-delete-confirm', this.listenRequestDelete);
    this.addEventListener('view-type-change', this.changeViewType);
    this.addEventListener('go-employee-detail', this.handleEmployeeSelected);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe?.();
    this.removeEventListener('request-delete-confirm', this.listenRequestDelete);
    this.removeEventListener('view-type-change', this.changeViewType);
    this.removeEventListener('go-employee-detail', this.handleEmployeeSelected);
  }

  handleEmployeeSelected = (e) => {
    const emp = e.detail;
    Router.go(`/employees/edit/${emp.id}`);
  };

  openDeleteModal = (employee) => {
    this.employeeToDelete = employee;
    this.modalOpen = true;
    this.requestUpdate();
  };

  keyMap = {
    "key": "",
    "first_name": "isim",
    "last_name": "Soyisim",
    "birth_date": "Doğum Tarihi",
    "employment_date": "Başlama Tarihi",
    "phone": "Telefon",
    "email": "E-mail",
    "department": "Departman",
    "position": "Pozisyon",
    "actions": "Eylemler"
  };

  renderTableView() {
    return html`
    <div class="table-wrapper">
      <table>
        <thead>
          <tr class="theme">
            ${Object.keys(this.keyMap).map((key, index) => html`
              <th>${index === 0 ? '' : t(key)}</th>
            `)}
          </tr>
        </thead>
        <tbody>
          ${this.employees?.map(employee => html`
            <employees-list-item
              .employee=${employee}
              .keyMap=${this.keyMap}>
            </employees-list-item>
          `)}
        </tbody>
      </table>
    </div>
    `;
  }

  renderCardView() {
    return html`
        <div class="card-list">
          ${this.employees?.map(employee => html`
            <card-component
              .employee=${employee}
              .keyMap=${this.keyMap}>
            </card-component>
          `)}
      </div>
    `;
  }

  render() {
    return html`
    <base-view .isEmployeeList=${true}>
      ${this.viewType === 'list'
        ? this.renderTableView()
        : this.renderCardView()}
    </base-view>
  `;
  }
}

customElements.define('employees-list', EmployeesList);
