import { html, css } from 'lit';
import { BaseView } from '../base/base-view';
import { isValidDate, isValidName, isValidEmail, isEmpty, isValidPhone } from '../helper.js';
import { t } from '../i18n/i18n';
import '@vaadin/text-field';
import '@vaadin/date-picker';
import '@vaadin/combo-box';
import '@vaadin/button';
import { Router } from '@vaadin/router';
import { saveEmployee, editEmployee, store } from '../redux/store.js';

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
      border: 2px solid var(--theme-color-2);
      color: var(--theme-color-2);
    }
  `;

  static properties = {
    formData: { type: Object },
    isEditMode: { type: Boolean },
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
    this.departments = ['Analytics', 'Tech'];
    this.positions = ['Junior', 'Medior', 'Senior'];
    this.isEditMode = null
  }

  connectedCallback() {
    super.connectedCallback();
    const pathname = window.location.pathname;

    if (pathname.startsWith('/employees/edit/')) {
      this.isEditMode = true;
      const id = pathname.split('/').pop();
      this.employeeId = Number(id);
      this.loadEmployeeData();
    }

    store.subscribe(() => {
      const lang = store.getState().language.lang;
      if (lang !== this.lastLang) {
        this.lastLang = lang;
        this.validateForm();
      }
    });
  }

  loadEmployeeData() {
    const employee = store.getState().employees.list.find(emp => emp.id === this.employeeId);
    if (employee) {
      this.formData = { ...employee };
      this.requestUpdate();
    }
  }

  handleSubmit() {
    if (this.validateForm()) {
      let newEmployee = { ...this.formData };

      if (!this.isEditMode || !newEmployee.id) {
        newEmployee.id = Date.now();
      }
      if (this.isEditMode) {
        store.dispatch(editEmployee(newEmployee));
      } else {
        store.dispatch(saveEmployee(newEmployee));
      }
      this.resetForm();
      Router.go('/employees');
    }
  }

  handleInput(e) {
    const name = e.target.name;
    const value = e.detail?.value ?? e.target.value;

    this.formData = {
      ...this.formData,
      [name]: value,
    };
  }

  handleCancel() {
    this.resetForm();
    Router.go('/employees');
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

  validateForm() {
    let isValid = true;

    const validations = [
      { key: 'first_name', error: t('required_name'), validate: isValidName },
      { key: 'last_name', error: t('required_surname'), validate: isValidName },
      { key: 'birth_date', error: t('required_birth'), validate: isValidDate },
      { key: 'employment_date', error: t('required_emp_date'), validate: isValidDate },
      { key: 'phone', error: t('required_phone'), validate: isValidPhone },
      { key: 'email', error: t('required_email'), validate: isValidEmail },
      { key: 'department', error: t('required_departman'), validate: null },
      { key: 'position', error: t('required_position'), validate: null }
    ];

    validations.forEach(({ key, error, validate }) => {
      const inputElement = this.shadowRoot.querySelector(`[name="${key}"]`);

      if (isEmpty(this.formData[key])) {
        inputElement.invalid = true;
        inputElement.errorMessage = error;
        isValid = false;
      } else if (validate && !validate(this.formData[key])) {
        inputElement.invalid = true;
        inputElement.errorMessage = error +','+ t('missing_format');
        isValid = false;
      }
    });

    return isValid;
  }

  render() {
    return html`
      <base-view>
        <div class="employee-form">
          <vaadin-text-field
            label=${t('first_name')}
            name="first_name"
            .value=${this.formData.first_name}
            @input=${this.handleInput}
            .errorMessage=${this.errors?.first_name || ''}
            ?invalid=${!!this.errors?.first_name}
            required
          ></vaadin-text-field>

          <vaadin-text-field
            label=${t('last_name')}
            name="last_name"
            .value=${this.formData.last_name}
            @input=${this.handleInput}
            .errorMessage=${this.errors?.last_name || ''}
            ?invalid=${!!this.errors?.last_name}
            required
          ></vaadin-text-field>

          <vaadin-date-picker
            label=${t('birth_date')}
            name="birth_date"
            .value=${this.formData.birth_date}
            @value-changed=${this.handleInput}
            .errorMessage=${this.errors?.birth_date || ''}
            ?invalid=${!!this.errors?.birth_date}
            required
          ></vaadin-date-picker>

          <vaadin-date-picker
            label=${t('employment_date')}
            name="employment_date"
            .value=${this.formData.employment_date}
            @value-changed=${this.handleInput}
            .errorMessage=${this.errors?.employment_date || ''}
            ?invalid=${!!this.errors?.employment_date}
            required
          ></vaadin-date-picker>

          <vaadin-text-field
            label=${t('phone')}
            name="phone"
            .value=${this.formData.phone}
            @input=${this.handleInput}
            .errorMessage=${this.errors?.phone || ''}
            ?invalid=${!!this.errors?.phone}
            required
          ></vaadin-text-field>

          <vaadin-text-field
            label=${t('email')}
            name="email"
            type="email"
            .value=${this.formData.email}
            @input=${this.handleInput}
            .errorMessage=${this.errors?.email || ''}
            ?invalid=${!!this.errors?.email}
            required
          ></vaadin-text-field>

          <vaadin-combo-box
            label=${t('department')}
            name="department"
            .items=${this.departments}
            .value=${this.formData.department}
            @value-changed=${this.handleInput}
            .errorMessage=${this.errors?.department || ''}
            ?invalid=${!!this.errors?.department}
            required
          > abc</vaadin-combo-box>

          <vaadin-combo-box
            label=${t('position')}
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
            ${t('edit_employee_btn')}
          </vaadin-button>

          <vaadin-button theme="tertiary" class="button-type-two" @click=${this.handleCancel}>
            ${t('cancel')}
          </vaadin-button>
        </div>

      </base-view>
    `;
  }
}

customElements.define('employee-form', EmployeeFormContent);
