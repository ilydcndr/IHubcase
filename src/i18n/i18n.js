import i18next from 'i18next';
import { store } from '../redux/store';
import en from './en.json';
import tr from './tr.json';

async function initI18n() {
  await i18next.init({
    resources: {
      en: { translation: en },
      tr: { translation: tr },
    },
    lng: store.getState().language.lang || 'en',
    fallbackLng: 'en',
  });
}

initI18n().catch(console.error);

store.subscribe(() => {
  const lang = store.getState().language.lang;
  if (i18next.language !== lang) {
    i18next.changeLanguage(lang)
      .then(() => console.log('i18next language changed to', lang))
      .catch(console.error);
  }
});

export function translate(key) {
  return i18next.t(key) || key;
}

export const t = (...args) => i18next.t(...args);
export default i18next;
