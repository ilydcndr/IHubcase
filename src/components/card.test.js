import { fixture, html, expect } from '@open-wc/testing';
import '../components/card';

describe('CardComponent', () => {
  let element;

  beforeEach(async () => {
    const employee = {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane@example.com',
      department: 'HR',
      position: 'Manager',
      phone: '123456789'
    };

    const keyMap = {
      key: '',
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'Email',
      department: 'Department',
      position: 'Position',
      phone: 'Phone',
      actions: 'Actions'
    };

    element = await fixture(html`
      <card-component
        .employee=${employee}
        .keyMap=${keyMap}>
      </card-component>
    `);
  });

  it('renders employee data correctly', () => {
    const keys = Object.keys(element.keyMap).slice(1, -1);
    keys.forEach(key => {
      const keyElems = element.shadowRoot.querySelectorAll('.key');
      const keyElem = Array.from(keyElems).find(el => el.textContent.trim() === element.keyMap[key]);
      expect(keyElem).to.exist;
      const valueElem = keyElem.nextElementSibling;
      expect(valueElem.textContent).to.equal(element.employee[key] || '-');
    });
  });

  it('dispatches go-employee-detail event on edit button click', () => {
    const editBtn = element.shadowRoot.querySelector('button.edit');
    let eventDetail;
    element.addEventListener('go-employee-detail', e => {
      eventDetail = e.detail;
    });
    editBtn.click();
    expect(eventDetail).to.deep.equal(element.employee);
  });

  it('dispatches request-delete-confirm event on delete button click', () => {
    const deleteBtn = element.shadowRoot.querySelectorAll('button')[1]; // second button
    let eventDetail;
    element.addEventListener('request-delete-confirm', e => {
      eventDetail = e.detail.employee;
    });
    deleteBtn.click();
    expect(eventDetail).to.deep.equal(element.employee);
  });
});