import { html, css } from 'lit';
import { LanguageListener } from '../base/listen-language';
import { t } from '../i18n/i18n';

export class NotFoundPage extends LanguageListener {
  static styles = css`
      .not-found {
       display:flex;
       justify-content:center;
       align-items:center;
      }
  `;

  render() {
    return html`
      <h1 class="not-found">${t('not_found')}</h1>
    `;
  }
}

customElements.define('not-found-page', NotFoundPage);
