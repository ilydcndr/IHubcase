import { html, css } from 'lit';
import listImg from '../assets/icons/list-solid.svg';
import gridImg from '../assets/icons/grid.svg';
import { LanguageListener } from './listen-language';
import { t } from '../i18n/i18n'

export class BaseView extends LanguageListener {
  static styles = css`
    .base-frame {
      background-color: #f2f2f2;
      width: 100%;
      padding: 20px 0;
      box-sizing: border-box;
    }
    .logo {
      width: 24px;
      height: 24px;
    }
    .base-content {
      overflow-x: auto;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background-color: unset;
      box-sizing: border-box;
    }
    .theme {
      color:var(--theme-color);;
    }
    .table-banner {
      display:flex;
      justify-content:space-between;
      align-items:center;
      max-width: 1200px;
      margin: 0px auto;
      padding: 10px;

    }
    .table-view {
      display: flex;
      gap: 25px;
    }
    .table-view img {
      cursor:pointer;
    }
  `;

  selectView(view) {
    this.dispatchEvent(new CustomEvent('view-type-change', {
      detail: { view },
      bubbles: true,
      composed: true
    }))
  }

  render() {
    const title = this.isEmployeeList
      ? t('employees_page_title')
      : window.location.pathname.startsWith('/employees/edit/')
        ? t('edit_employee_title')
        : t('create_employee_btn');
    return html`
      <div class="base-frame" @add-employee=${this.handleAddEmployee}>
        <div class="table-banner theme">
            <h1>${title}</h1>
            ${this.isEmployeeList ? html`
              <div class="table-view" view-type="list">
                <div>
                  <img class="logo" src="${listImg}" @click=${() => this.selectView('list')} alt="List Img" />
                </div>
                <div>
                  <img class="logo" src="${gridImg}" @click=${() => this.selectView('grid')} alt="Grid Img"  />
                </div>
            </div> `: null}
        </div>
        <div class="base-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('base-view', BaseView);
