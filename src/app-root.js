import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

import './views/index.js';

export class AppRoot extends LitElement {
  firstUpdated() {
    const routerOutlet = this.renderRoot.querySelector('#outlet');
    const router = new Router(routerOutlet);
    router.setRoutes([
      { path: '/', component: 'home-page' },
      { path: '/employees', component: 'employee-form' },
      //{ path: '/employees', component: 'employees-list' },
      { path: '(.*)', component: 'not-found-page'},
      
    ]);
  }

  render() {
    return html`<main>
      <app-nav></app-nav>
      <section id="outlet"></section>
    </main>`;
  }

  static styles = css`
    nav {
      padding: 10px;
      background-color: #f0f0f0;
      margin-bottom: 10px;
    }
    nav a {
      text-decoration: none;
      color: #007acc;
      margin-right: 10px;
    }
    nav a:hover {
      text-decoration: underline;
    }
  `;
}

customElements.define('app-root', AppRoot);
