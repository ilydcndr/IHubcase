import { LitElement, html, css } from 'lit';
import ingLogo from '../assets/img/ing-logo.png';
import userIcon from '../assets/img/employee.png';
import plusIcon from '../assets/img/plus.png';
import { ChangeLanguage } from './change-language';
import '@vaadin/select';

export class AppNav extends LitElement {
  static styles = css`
    nav {
      margin: 15px 5px;
      display:flex;
      justify-content: space-between;
    }
    .centered {
      display: flex;
      align-items: center;
    }
    a{
      text-decoration:none;
      color:black;            
    }
    .logo {
      width: 25px;
      height: 25px;
      color:var(--theme-color);
      margin-right:15px;
    }
    .home-logo {
      border-radius: 5px;
    }
    .nav-left span {
      font-weight: bolder;
      justify-content: center;
      align-items: center;
    }
    .user-icon {
      color: $theme-color;
    }
    .nav-right {
      display:flex;
      gap:15px;
      align-items:center;
    }
    .add-employee {
      cursor:pointer;
    }
  `;

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
              <span>Çalışanlar</span>
            </a>
          </div>
          <div class="centered add-employee">
            <img src="${plusIcon}" class="logo" alt="logo" />
            <span>Ekle</span>
          </div>
          <change-language></change-language>
        </div>
      </nav>
    `;
  }
}

customElements.define('app-nav', AppNav);