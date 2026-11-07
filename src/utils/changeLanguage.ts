import i18n from "../i18n";

export const changeLanguage = (lang: "en" | "fa") => {
  i18n.changeLanguage(lang);

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";

  localStorage.setItem("language", lang);
};
