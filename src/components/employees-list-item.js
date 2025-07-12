import { LitElement, html, css } from 'lit';

export class EmployeesListItem extends LitElement {
  static styles = css`
    :host {
      display:contents;
    }
        th,td {
      font-weight:400;;
      font-size:14px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    .employee-list {
      background:#f2f2f2;
    }
    .table-wrapper {
      overflow-x: auto;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background:white;
    }
    .table-banner {
      display:flex;
      justify-content:space-between;
      align-items:center;
    }
    .table-view {
      display: flex;
      gap: 10px;
    }
    .theme {
      color:orange;
    }
    th,td {
      font-weight:400;;
      font-size:14px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    td {
      padding: 18px 0;
      border-bottom: 1px solid #e0e0e0;
    }
  `;

  static properties = {
    employee: { type: Array },
    keyMap: { type: Object }
  };

  constructor() {
    super();
    this.keyMap= '';
  }

  render() {
    return html`          
    <tr>
      ${Object.keys(this.keyMap).map(
        key => html`<td>${this.employee[key]}</td>`
      )}
    </tr>`
  }
}

customElements.define('employees-list-item', EmployeesListItem);
