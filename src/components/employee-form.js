// employee-form-content.js
import { html } from 'lit';
import { BaseView } from '../components/base-view';

export class EmployeeFormContent extends BaseView {
  render() {
      return html`
        <base-view .tableView=${false}>
          <div>abc</div>
        </base-view>
      `;
    }
}

customElements.define('employee-form', EmployeeFormContent);
