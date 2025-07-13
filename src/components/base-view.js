import { LitElement, html, css } from 'lit';

export class BaseView extends LitElement {
  static styles = css`
    .base-frame {
      background-color: #f2f2f2;
      width: 100%;
      padding: 20px 0;
      box-sizing: border-box;
    }

    .base-content {
      overflow-x: auto;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background-color: white;
      box-sizing: border-box;
    }
    .theme {
      color:orange;
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
      gap: 10px;
    }
  `;

  static properties = {
    tableView: { type: Boolean },
   // edit mode eklenecek editMode: { type: Boolean}
  };

  constructor() {
    super();
    this.tableView = false;
   // this.editMode = false
  }

 /* handleAddEmployee(e) {
    this.editMode= !this.editMode;
    html ıcı
    <---<h1>${this.editMode ? 'Çalışan Düzenle' : 'Çalışan Ekle'}</h1>--->
  }*/

  render() {
    return html`
      <div class="base-frame" @add-employee=${this.handleAddEmployee}>
        <div class="table-banner theme">
            <h1>Çalışan Ekle</h1>
            ${this.tableView ? html `
              <div class="table-view">
              <div>Liste Görünümü</div>
              <div>Grid Görünümü</div>
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
