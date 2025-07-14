import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';

import './views/index.js';

export class AppRoot extends LitElement {
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
  }

  render() {
    return html`
      <confirm-modal></confirm-modal>
      <main>
        <app-nav></app-nav>
        <section id="outlet"></section>
      </main>
    `;
  }
}

customElements.define('app-root', AppRoot);