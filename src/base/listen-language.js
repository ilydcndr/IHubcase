// src/components/LanguageListener.js
import { LitElement } from 'lit';
import { store } from '../redux/store';

export class LanguageListener extends LitElement {
  static properties = {
    lang: { type: String },
  };

  connectedCallback() {
    super.connectedCallback();
    this.lang = store.getState().language.lang;
    this._unsubscribe = store.subscribe(() => {
      const state = store.getState();
      if (this.lang !== state.language.lang) {
        this.lang = state.language.lang;
        this.requestUpdate();
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsubscribe) this._unsubscribe();
  }
}
