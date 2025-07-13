import { LitElement, html, css } from 'lit';
import trFlame from '../assets/img/tr-flame.png';
import engFlame from '../assets/img/eng-flame.png';

export class ChangeLanguage extends LitElement {
  static properties = {
    lang: { type: String },
  };

  constructor() {
    super();
    this.lang = 'tr';
  }

  static styles = css`
    .flame {
        width:30px;
        height:20px;
        vertical-align: middle;
    }
    .flame-list {
        display: none;
    }
    .flame-select:hover {
        .flame-list {
            display: block;
            position:absolute;
        }
    }
    .logo {
      width: 25px;
      height: 25px;
    }
  `;

  changeLanguage(lang) {
    this.lang = lang;
  }

  render() {
    return html`
      <div class="flame-select">
        <div>
           <img src="${trFlame}" class="flame" alt="TR Flame" />
        </div>
        <div class="flame-list">
            <div @click=${() => this.changeLanguage('tr')}>
                <img src="${trFlame}" class="flame" alt="TR Flame" />
            </div>
            <div @click=${() => this.changeLanguage('en')}>
                <img src="${engFlame}" class="flame" alt="ENG Flame" />
            </div>
        </div>
      </div>
    `;
  }
}

customElements.define('change-language', ChangeLanguage);
