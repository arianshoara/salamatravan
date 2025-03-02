import React from "react";
import "./SettingsSection.css"; // استایل‌ها رو جدا می‌کنیم

function SettingsSection({ darkMode, setDarkMode, fontSize, setFontSize }) {
  // تابع برای ریست کردن تنظیمات به حالت پیش‌فرض
  const resetSettings = () => {
    setDarkMode(false);
    setFontSize(16);
    alert("تنظیمات به حالت پیش‌فرض برگشت! 😊");
  };

  return (
    <div className="settings-container">
      <h2>⚙️ تنظیمات گوگولی</h2>

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
        <p>🌙 حالت تیره: {darkMode ? "روشن" : "خاموش"}</p>
      </div>

      {/* تنظیم سایز فونت */}
      <div className="setting-item font-size-setting">
        <label htmlFor="font-size-slider">✍️ سایز فونت:</label>
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
      <div className="setting-item">
        <label htmlFor="theme-select">🎨 تم رنگی:</label>
        <select id="theme-select" onChange={(e) => alert("این فقط نمایشه! 😜")}>
          <option value="default">پیش‌فرض</option>
          <option value="blue">آبی آرامش‌بخش</option>
          <option value="pink">صورتی گوگولی</option>
          <option value="green">سبز طبیعت</option>
        </select>
      </div>

      {/* آیتم جدید: حالت سرگرمی */}
      <div className="setting-item">
        <label className="switch">
          <input type="checkbox" onChange={() => alert("حالت سرگرمی فعال شد! 😂")} />
          <span className="slider"></span>
        </label>
        <p>🎉 حالت سرگرمی (انیمیشن و جوک)</p>
      </div>

      {/* دکمه ریست تنظیمات */}
      <div className="setting-item">
        <button className="reset-button" onClick={resetSettings}>
          🔄 ریست تنظیمات
        </button>
      </div>
    </div>
  );
}

export default SettingsSection;