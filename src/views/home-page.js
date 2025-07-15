import { html, css } from 'lit';
import { LanguageListener } from '../base/listen-language';
import homeImg from '../assets/img/home-ing.png';
import { t } from '../i18n/i18n';

export class HomePage extends LanguageListener {

  static styles = css`
      .home-img {
        margin:50px;
        display:flex;
        justify-content:center;
        align-items:center;
      }
      .title {
        display:flex;
        justify-content:center;
        align-items:center;
      }
  `;

  render() {
    return html`
      <div class="home-img">
          <img src="${homeImg}" alt="Home Img" />
      </div>
      <h1 class="title">${t('welcome_title')}</h1>
    `;
  }
}

customElements.define('home-page', HomePage);
