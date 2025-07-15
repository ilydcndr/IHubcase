import { LitElement, html, css } from 'lit';
import trFlame from '../assets/img/tr-flame.png';
import engFlame from '../assets/img/eng-flame.png';
import { store } from '../redux/store';
import { setLanguage } from '../redux/store';

export class LangButton extends LitElement {
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

  static properties = {
    lang: { type: String },
  };

  constructor() {
    super();
    this.lang = document.documentElement.lang || 'en';
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(() => {
      const stateLang = store.getState().language?.lang;;
      if (stateLang !== this.lang) {
        this.lang = stateLang;
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe?.();
  }

  changeLanguage(lang) {
    this.lang = lang;
    store.dispatch(setLanguage(lang))
  }

  render() {
    return html`
       
      <div class="flame-select">
        <div>
           <img src="${this.lang === 'tr' ? trFlame : engFlame}" class="flame" alt="Flame" />
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

customElements.define('lang-button', LangButton);
