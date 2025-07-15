import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import { store, deleteEmployee } from './redux/store.js';

import './views/index.js';

export class AppRoot extends LitElement {
  static properties = {
    employeeToDelete: { type: Object },
    modalOpen: { type: Boolean },
  };

  constructor() {
    super();
    this.employeeToDelete = null;
    this.modalOpen = false;
  }

    firstUpdated() {
    const routerOutlet = this.shadowRoot.querySelector('#outlet');
    const router = new Router(routerOutlet);
    router.setRoutes([
      { path: '/', component: 'home-page' },
      { path: '/employees/add', component: 'employee-form' },
      { path: '/employees/edit/:id', component: 'employee-form' },
      { path: '/employees', component: 'employees-list' },
      { path: '(.*)', component: 'not-found-page' }
    ]);

    this.listenRequestDelete()

    const modal = this.shadowRoot.querySelector('confirm-modal');

      modal.addEventListener('modal-closed', () => {
        this.modalOpen = false;
        this.employeeToDelete = null;
    });

      modal.addEventListener('modal-confirmed', () => {
        if (this.employeeToDelete) {
          store.dispatch(deleteEmployee(this.employeeToDelete));
        }
        this.modalOpen = false;
        this.employeeToDelete = null;
    });
  }
    
  listenRequestDelete = () => {
    this.addEventListener('request-delete-confirm', (e) => {
    const employee = e.detail.employee;
    this.employeeToDelete = employee;
    this.modalOpen = true; 
    });
  }

  render() {
    return html`
    <confirm-modal 
      .employee=${this.employeeToDelete}
      .open=${this.modalOpen}>
    </confirm-modal>
      <main>
        <app-nav></app-nav>
        <section id="outlet"></section>
      </main>
    `;
  }
}

customElements.define('app-root', AppRoot);