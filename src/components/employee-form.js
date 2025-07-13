import { html, css } from 'lit';
import { BaseView } from '../components/base-view';
import { isValidDate, isValidName, isValidEmail, isEmpty, isValidPhone } from '../helper.js';
import { store } from '../redux/store.js';
import '@vaadin/text-field';
import '@vaadin/date-picker';
import '@vaadin/combo-box';
import '@vaadin/button';

export class EmployeeFormContent extends BaseView {
  static styles = css`
    .employee-form {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px 80px;
      align-items: start;
      padding: 0 40px;
    }
    .form-buttons {
      gap: 50px;
      justify-content: center;
      align-items: center;
      display: flex;
      margin: 50px;
    }
    vaadin-text-field::part(input-field),
    vaadin-date-picker::part(input-field),
    vaadin-combo-box::part(input-field) {
      border: 1px solid black;
      background: white;
    }
    vaadin-date-picker::part(toggle-button) {
      color: var(--theme-color);;
    }
    vaadin-button {
      width: 25%;
    }
    .button-type-one {
      background:var(--theme-color);;
      color:white;
      font-size:bold;
    }
    .button-type-two {
      background: white;
      font-size:bold;
      border: 2px solid purple;
      color: purple;
    }
  `;

  static properties = {
    formData: { type: Object },
  };

  constructor() {
    super();
    this.errors = {};
    this.formData = {
      first_name: '',
      last_name: '',
      birth_date: '',
      employment_date: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };
    this.departments = ['Analytics', ', Tech' ];
    this.positions = ['Junior', 'Medior', 'Senior' ];
  }

  handleInput(e) {
    const name = e.target.name;
    const value = e.detail?.value ?? e.target.value;

    this.formData = {
      ...this.formData,
      [name]: value,
    };
  }

  validateForm() {
    this.errors = {};

    if (isEmpty(this.formData.first_name)) {
      this.errors.first_name = 'İsim zorunlu';
    } else if (!isValidName(this.formData.first_name)) {
      this.errors.first_name = 'İsim alanı hatalı';
    }

    if (isEmpty(this.formData.last_name)) {
      this.errors.last_name = 'Soyisim zorunlu';
    } else if (!isValidName(this.formData.last_name)) {
      this.errors.last_name = 'Soyisim alanı hatalı';
    }

    if (isEmpty(this.formData.birth_date)) {
      this.errors.birth_date = 'Doğum tarihi zorunlu';
    } else if (!isValidDate(this.formData.birth_date)) {
      this.errors.birth_date = 'Tarih bugünden ileri olamaz';
    }

    if (isEmpty(this.formData.employment_date)) {
      this.errors.employment_date = 'İşe başlama tarihi zorunlu';
    } else if (!isValidDate(this.formData.employment_date)) {
      this.errors.employment_date = 'Tarih bugünden ileri olamaz';
    }

    if (isEmpty(this.formData.phone)) {
      this.errors.phone = 'Telefon numarası zorunlu';
    } else if (!isValidPhone(this.formData.phone)) {
      this.errors.phone = 'Telefon formatını kontrol et';
    }

    if (isEmpty(this.formData.email)) {
      this.errors.email = 'Email zorunlu';
    } else if (!isValidEmail(this.formData.email)) {
      this.errors.email = 'Email formatını kontrol et';
    }

    if (isEmpty(this.formData.department)) {
      this.errors.department = 'Departman seçilmeli';
    }

    if (isEmpty(this.formData.position)) {
      this.errors.position = 'Pozisyon seçilmeli';
    }

    this.requestUpdate();
    return Object.keys(this.errors).length === 0;
  }

  handleSubmit() {
    if (this.validateForm()) {
      const newEmployee = {
        id: Date.now(),
        ...this.formData,
      };

      console.log("add")
      //store.dispatch(addEmployee(newEmployee));
      this.resetForm();
    }
  }

  handleCancel() {
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      first_name: '',
      last_name: '',
      birth_date: '',
      employment_date: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };
    this.errors = {};
  }

  render() {
    return html`
      <base-view>
        <div class="employee-form">
          <vaadin-text-field
            label="İsim"
            name="first_name"
            .value=${this.formData.first_name}
            @input=${this.handleInput}
            .errorMessage=${this.errors?.first_name || ''}
            ?invalid=${!!this.errors?.first_name}
            required
          ></vaadin-text-field>

          <vaadin-text-field
            label="Soyisim"
            name="last_name"
            .value=${this.formData.last_name}
            @input=${this.handleInput}
            .errorMessage=${this.errors?.last_name || ''}
            ?invalid=${!!this.errors?.last_name}
            required
          ></vaadin-text-field>

          <vaadin-date-picker
            label="Doğum Tarihi"
            name="birth_date"
            .value=${this.formData.birth_date}
            @value-changed=${this.handleInput}
            .errorMessage=${this.errors?.birth_date || ''}
            ?invalid=${!!this.errors?.birth_date}
            required
          ></vaadin-date-picker>

          <vaadin-date-picker
            label="İşe Başlama Tarihi"
            name="employment_date"
            .value=${this.formData.employment_date}
            @value-changed=${this.handleInput}
            .errorMessage=${this.errors?.employment_date || ''}
            ?invalid=${!!this.errors?.employment_date}
            required
          ></vaadin-date-picker>

          <vaadin-text-field
            label="Telefon"
            name="phone"
            .value=${this.formData.phone}
            @input=${this.handleInput}
            .errorMessage=${this.errors?.phone || ''}
            ?invalid=${!!this.errors?.phone}
            required
          ></vaadin-text-field>

          <vaadin-text-field
            label="Email"
            name="email"
            type="email"
            .value=${this.formData.email}
            @input=${this.handleInput}
            .errorMessage=${this.errors?.email || ''}
            ?invalid=${!!this.errors?.email}
            required
          ></vaadin-text-field>

          <vaadin-combo-box
            label="Departman"
            name="department"
            .items=${this.departments}
            .value=${this.formData.department}
            @value-changed=${this.handleInput}
            .errorMessage=${this.errors?.department || ''}
            ?invalid=${!!this.errors?.department}
            required
          ></vaadin-combo-box>

          <vaadin-combo-box
            label="Pozisyon"
            name="position"
            .items=${this.positions}
            .value=${this.formData.position}
            @value-changed=${this.handleInput}
            .errorMessage=${this.errors?.position || ''}
            ?invalid=${!!this.errors?.position}
            required
          ></vaadin-combo-box>
        </div>
        <div class="form-buttons">
          <vaadin-button theme="primary" class="button-type-one" @click=${this.handleSubmit}>
            Kaydet
          </vaadin-button>

          <vaadin-button theme="tertiary" class="button-type-two" @click=${this.handleCancel}>
            İptal
          </vaadin-button>
        </div>

      </base-view>
    `;
  }
}

customElements.define('employee-form', EmployeeFormContent);
