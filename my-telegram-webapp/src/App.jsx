import { useState } from "react";
import "./App.css";
import { FaHome, FaBook, FaCog, FaQuestionCircle } from "react-icons/fa";
function App() {
  // state برای کنترل تب فعال (راهنما، خواندنی‌ها، تست‌ها، بخش چهارم، تنظیمات)
  const [activeTab, setActiveTab] = useState("guide");

  // state برای کنترل حالت تیره یا عادی
  const [darkMode, setDarkMode] = useState(false);

  // تابع برای رندر کردن محتوای هر تب
  const renderContent = () => {
    switch (activeTab) {
      case "guide":
        return <h2>اینجا صفحه راهنماست</h2>;
      case "reading":
        return <h2>اینجا صفحه خواندنی‌هاست</h2>;
      case "tests":
        return <h2>اینجا صفحه تست‌های روانشناسی هست</h2>;
      case "fourth":
        return <h2>اینجا بخش چهارمه (فعلاً ایده‌اش رو بعداً اضافه می‌کنیم)</h2>;
      case "settings":
        return (
          <div className="settings-container">
            <h2>تنظیمات</h2>
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider"></span>
            </label>
            <p>حالت تیره: {darkMode ? "روشن" : "خاموش"}</p>
          </div>
        );
      default:
        return <h2>اینجا صفحه راهنماست</h2>;
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      {/* محتوای اصلی */}
      <main className="content">{renderContent()}</main>

      {/* نوار منوی پایین */}
      <nav className="bottom-nav">
        <button
          className={activeTab === "guide" ? "active" : ""}
          onClick={() => setActiveTab("guide")}
        >
          <FaQuestionCircle />
            <FaHome />
            <FaBook />
            <FaCog />
        </button>
        <button
          className={activeTab === "reading" ? "active" : ""}
          onClick={() => setActiveTab("reading")}
        >
          خواندنی‌ها
        </button>
        <button
          className={activeTab === "tests" ? "active" : ""}
          onClick={() => setActiveTab("tests")}
        >
          تست‌های روانشناسی
        </button>
        <button
          className={activeTab === "fourth" ? "active" : ""}
          onClick={() => setActiveTab("fourth")}
        >
          بخش چهارم
        </button>
        <button
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          تنظیمات
        </button>
      </nav>
    </div>
  );
}

export default App;
