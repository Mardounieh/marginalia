import { changeLanguage } from "../../../utils/changeLanguage";

const LanguageSwitcher = () => {
  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>

      <button onClick={() => changeLanguage("fa")}>فارسی</button>
    </div>
  );
};

export default LanguageSwitcher;
