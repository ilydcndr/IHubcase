import { LitElement, html, css } from 'lit';

export class NotFoundPage extends LitElement {
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
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you requested does not exist.</p>
    `;
  }
}

customElements.define('not-found-page', NotFoundPage);
