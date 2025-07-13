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
      <h1>Welcome to Home Page</h1>
      <p>This is the main landing page.</p>
    `;
  }
}

customElements.define('home-page', HomePage);
