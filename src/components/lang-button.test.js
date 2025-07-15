import { fixture, html, expect } from '@open-wc/testing';
import { vi } from 'vitest';
import { store } from '../redux/store.js';
import '../components/lang-button.js';
import { expect } from 'vitest'

describe('LangButton', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<lang-button></lang-button>`);
  });

  it('renders flame image based on current lang', async () => {
    element.lang = 'tr';
    await element.updateComplete;
    const img = element.shadowRoot.querySelector('img.flame');
    expect(img.src).toContain('tr-flame.png');

    element.lang = 'en';
    await element.updateComplete;
    const img2 = element.shadowRoot.querySelector('img.flame');
    expect(img2.src).toContain('eng-flame.png');
  });

  it('dispatches setLanguage action on flame click', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    element.changeLanguage('tr');
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'language/setLanguage', payload: 'tr' });

    element.changeLanguage('en');
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'language/setLanguage', payload: 'en' });

    dispatchSpy.mockRestore();
  });
});
