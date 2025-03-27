import React from "react";
import "./SettingsSection.css"; // استایل‌ها رو جدا می‌کنیم
import { useLanguage } from "../i18n/LanguageContext";

function SettingsSection({ darkMode, setDarkMode, fontSize, setFontSize }) {
  // Get language context
  const { translations, language, changeLanguage } = useLanguage();
  
  // تابع برای ریست کردن تنظیمات به حالت پیش‌فرض
  const resetSettings = () => {
    setDarkMode(false);
    setFontSize(16);
    changeLanguage("fa"); // Reset to Persian
    alert(translations.settingsReset);
  };

  return (
    <div className="settings-container">
      <h2>⚙️ {translations.settings}</h2>

      {/* سوئیچ حالت تیره */}
      <div className="setting-item">
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
        </label>
        <p>🌙 {translations.darkMode}: {darkMode ? translations.on : translations.off}</p>
      </div>

      {/* تنظیم سایز فونت */}
      <div className="setting-item font-size-setting">
        <label htmlFor="font-size-slider">✍️ {translations.fontSize}:</label>
        <input
          type="range"
          min="12"
          max="24"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          id="font-size-slider"
        />
        <span>{fontSize}px 📏</span>
      </div>

      {/* آیتم جدید: انتخاب تم رنگی */}
      <div className="setting-item language-setting">
        <label htmlFor="language-select">🌐 {translations.language}:</label>
        <select 
          id="language-select"
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="language-select"
        >
          <option value="fa">{translations.persian}</option>
          <option value="en">{translations.english}</option>
          <option value="de">{translations.german}</option>
        </select>
      </div>

      {/* دکمه ریست تنظیمات */}
      <div className="setting-item">
        <button className="reset-button" onClick={resetSettings}>
          🔄 {translations.resetSettings}
        </button>
      </div>
    </div>
  );
}

export default SettingsSection;