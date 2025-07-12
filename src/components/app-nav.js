import { LitElement, html, css } from 'lit';
import ingLogo from '../assets/img/ing-logo.png';
import ingFlame from '../assets/img/eng-flame.png';
import trFlame from '../assets/img/tr-flame.png';
import userIcon from '../assets/img/employee.png';
import plusIcon from '../assets/img/plus.png';
import '@vaadin/select';

export class AppNav extends LitElement {
  static styles = css`
    nav {
      margin-top: 15px;
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
      color:orange;
      margin-right:15px;
    }
    .home-logo {
      border-radius: 5px;
      margin-left: 10px;
    }
    .nav-left span {
      font-weight: bolder;
      justify-content: center;
      align-items: center;
    }
    .user-icon {
      color: orange;
    }
    .nav-right {
      display:flex;
      gap:15px;
      align-items:center;
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
              <span>Employees</span>
            </a>
          </div>
          <div class="centered">
            <img src="${plusIcon}" class="logo" alt="logo" />
            <span>Add New</span>
          </div>
          
          <!--
          <vaadin-select label="ING">
            <vaadin-list-box>
              <vaadin-item>
                <img src="${ingFlame}" alt="ING Flame" class="logo" />
              </vaadin-item>
              <vaadin-item>
                <img src="${trFlame}" alt="TR Flame" class="logo" />
              </vaadin-item>
            </vaadin-list-box>
          </vaadin-select>
          -->
        </div>
      </nav>
    `;
  }
}

customElements.define('app-nav', AppNav);