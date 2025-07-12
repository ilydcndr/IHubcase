import { LitElement, html, css } from 'lit';

export class EmployeesListItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 4px 0;
      font-family: Arial, sans-serif;
    }
  `;

  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
    this.name = '';
  }

  render() {
    return html`<li>${this.name}</li>`;
  }
}

customElements.define('employees-list-item', EmployeesListItem);
