import { LitElement, html, css } from 'lit';
import listImg from '../assets/icons/list-solid.svg';
import gridImg from '../assets/icons/grid.svg';
import searchImg from '../assets/icons/search.svg';
import { LanguageListener  } from './listen-language';

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
      background-color: white;
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

  static properties = {
    isEmployeeList: { type: Boolean },
   // edit mode eklenecek editMode: { type: Boolean}
  };

  constructor() {
    super();
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
            ${this.isEmployeeList ? html `
              <div class="table-view">
                <div>
                  <img class="logo" src="${listImg}" alt="List Img" />
                </div>
                <div>
                  <img class="logo" src="${gridImg}" alt="Grid Img" />
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
