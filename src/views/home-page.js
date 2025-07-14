import { LitElement, html, css } from 'lit';
import { LanguageListener } from './../components/listen-language';

export class HomePage extends LanguageListener {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: Arial, sans-serif;
    }
  `;

  render() {
    return html`
      <h1>${t('welcome_title')}</h1>
    `;
  }
}

customElements.define('home-page', HomePage);
