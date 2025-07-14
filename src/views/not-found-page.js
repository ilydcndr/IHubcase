import { LitElement, html, css } from 'lit';
import { LanguageListener } from '../base/listen-language';

export class NotFoundPage extends LanguageListener {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      font-family: Arial, sans-serif;
      color: red;
    }
  `;

  render() {
    return html`
      <h1>${t('not_found')}</h1>
    `;
  }
}

customElements.define('not-found-page', NotFoundPage);
