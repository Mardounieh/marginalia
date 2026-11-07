import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("language") as "en" | "fa" | null;

// English
import enCommon from "./locales/en/common.json";

// Persian
import faCommon from "./locales/fa/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
    },
    fa: {
      common: faCommon,
    },
  },
  lng: savedLanguage || "en", // default language
  fallbackLng: "en",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.lang = i18n.language;
document.documentElement.dir = i18n.language === "fa" ? "rtl" : "ltr";

export default i18n;
