import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import ingLogo from '../assets/img/ing-logo.png';
import userIcon from '../assets/img/employee.png';
import plusIcon from '../assets/img/plus.png';
import { t } from '../i18n/i18n';
import { LanguageListener } from '../base/listen-language';
import { LangButton } from './lang-button';

export class AppNav extends LanguageListener {
  static styles = css`
    nav {
      margin: 15px 5px;
      display: flex;
      justify-content: space-between;
    }
    .centered {
      display: flex;
      align-items: center;
    }
    a {
      text-decoration: none;
      color: black;
    }
    .logo {
      width: 25px;
      height: 25px;
      color: var(--theme-color);
      margin-right: 15px;
    }
    .home-logo {
      border-radius: 5px;
    }
    .nav-left span {
      font-weight: bolder;
      justify-content: center;
      align-items: center;
    }
    .nav-right {
      display: flex;
      gap: 15px;
      align-items: center;
    }
    .nav-title {
      font-weight: bolder;
      color: var(--theme-color);
    }
    .add-employee {
      cursor: pointer;
    }
    .passive {
      opacity: 0.5;
    }
  `;

  static get properties() {
    return {
      isEmployeePage: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.isEmployeePage = false;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this.checkActivePage);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.checkActivePage);
    super.disconnectedCallback();
  }

  checkActivePage = () => {
    const currentPath = window.location.pathname;
    const isEmployeePage = currentPath === '/employees';

    if (this.isEmployeePage !== isEmployeePage) {
      this.isEmployeePage = isEmployeePage;
      this.requestUpdate();
    }
  };

  addEmployee = () => {
    if (this.isEmployeePage) {
      Router.go('/employees/add');
    }
  };

  render() {
    return html`
      <nav>
        <div class="nav-left centered">
          <div>
            <a href="/">
              <img class="home-logo logo" src="${ingLogo}" alt="ING Home Logo" />
            </a>
          </div>
          <span> ING </span>
        </div>
        <div class="nav-right">
          <div>
            <a href="/employees" class="centered">
              <img class="user-icon logo" src="${userIcon}" alt="User Icon" />
              <span class="nav-title">${t('employees_menu')}</span>
            </a>
          </div>
          <div class="centered add-employee" @click=${this.addEmployee}>
            <img src="${plusIcon}" class="logo" alt="logo" />
            <span class="nav-title ${this.isEmployeePage ? '' : 'passive'}">${t('add_new')}</span>
          </div>
          <lang-button></lang-button>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-nav', AppNav);
