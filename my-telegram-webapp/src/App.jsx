import { useState } from "react";
import "./App.css";
import { FaHome, FaBook, FaCog, FaQuestionCircle, FaBars, FaBrain, FaSadTear, FaSmile, FaBalanceScale, FaHeartbeat, FaUser } from "react-icons/fa";

function App() {
  const [activeTab, setActiveTab] = useState("guide");
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "guide":
        return (
          <div className="guide-content">
            <h2>سلام، خوش آمدید!🙋🏻‍♂️🙋🏻</h2>
            <p>من آرین شعرا هستم.</p>
            <ul>
              <li>👨🏻‍🏫 مدرس زبان آلمانی</li>
              <li>🎓 دانش‌آموخته کارشناسی روانشناسی</li>
              <li>💻 در حال پیشرفت در زمینه برنامه‌نویسی</li>
            </ul>
            <h3>🔗 راه‌های ارتباطی:</h3>
            <p>
              <a href="https://arianshoara.github.io/arian/">🌍 سایتم</a>
            </p>
            <p>📩 تلگرام: @ariansho</p>
            <p>📢 کانال تلگرام: @rozgarmanarian</p>
            <p>
              📷 اینستاگرام: <a href="https://www.instagram.com/arian__sho2">arian__sho2</a>
            </p>
            <p>
              📺 یوتیوب: <a href="https://www.youtube.com/@unipsydeu">unipsydeu</a>
            </p>
          </div>
        );
      case "reading":
        return (
          <div className="reading-content">
            <h2>📖 خواندنی‌های روانشناسی و فلسفه</h2>
            <ul>
              <li>🧠 تاثیرات اضطراب بر عملکرد روزمره</li>
              <li>📚 نقش خودآگاهی در رشد فردی</li>
              <li>🧐 تفاوت بین افسردگی و ناراحتی موقتی</li>
              <li>💡 مبانی روانشناسی مثبت‌گرا</li>
              <li>⚖️ چگونه تصمیمات بهتری بگیریم؟</li>
            </ul>
          </div>
        );
      case "tests":
        return (
          <div className="tests-content">
            <h2>📝 تست‌های روانشناسی</h2>
            <ul>
              <li><FaBrain /> تست اضطراب</li>
              <li><FaSadTear /> تست افسردگی</li>
              <li><FaBalanceScale /> تست وسواس فکری-عملی (OCD)</li>
              <li><FaSmile /> تست اختلال دو قطبی MDQ</li>
              <li><FaHeartbeat /> تست اعتیاد</li>
              <li><FaUser /> تست آمادگی رابطه عاطفی</li>
              <li>📊 تست شخصیت</li>
            </ul>
          </div>
        );
      case "settings":
        return (
          <div className="settings-container">
            <h2>⚙️ تنظیمات</h2>
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
      <header className="top-bar">
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </button>
      </header>
      <main className="content">{renderContent()}</main>
      <nav className="bottom-nav">
        <button className={activeTab === "guide" ? "active" : ""} onClick={() => setActiveTab("guide")}>
          <FaQuestionCircle />
        </button>
        <button className={activeTab === "reading" ? "active" : ""} onClick={() => setActiveTab("reading")}>
          <FaBook />
        </button>
        <button className={activeTab === "tests" ? "active" : ""} onClick={() => setActiveTab("tests")}>
          📊
        </button>
        <button className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveTab("settings")}>
          <FaCog />
        </button>
      </nav>
    </div>
  );
}

export default App;
