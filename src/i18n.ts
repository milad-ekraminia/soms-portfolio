import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/language/en.json";
import tr from "@/language/tr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en?.translation },
    tr: { translation: tr?.translation },
  },
  lng: "tr", 
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
