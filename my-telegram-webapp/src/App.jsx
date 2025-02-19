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
            <p>📩 تلگرام: <a href="https://t.me/ariansho">@ariansho</a></p>
            <p>📢 کانال تلگرام: <a href="https://t.me/rozgarmanarian">@rozgarmanarian</a></p>
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
            <div className="reading-list">
              <div className="reading-item">
                <h3>🧠 تاثیرات اضطراب بر عملکرد روزمره</h3>
                <p>چگونه اضطراب می‌تواند بر تصمیم‌گیری و عملکرد کلی ما تأثیر بگذارد؟</p>
              </div>
              <div className="reading-item">
                <h3>📚 نقش خودآگاهی در رشد فردی</h3>
                <p>چگونه شناخت بهتر از خود می‌تواند زندگی ما را بهبود بخشد؟</p>
              </div>
              <div className="reading-item">
                <h3>🧐 تفاوت بین افسردگی و ناراحتی موقتی</h3>
                <p>نشانه‌های افسردگی بالینی در مقایسه با احساس ناراحتی طبیعی چیست؟</p>
              </div>
              <div className="reading-item">
                <h3>💡 مبانی روانشناسی مثبت‌گرا</h3>
                <p>رویکردهای مختلف روانشناسی مثبت‌گرا و چگونگی تأثیر آن بر زندگی ما.</p>
              </div>
              <div className="reading-item">
                <h3>⚖️ چگونه تصمیمات بهتری بگیریم؟</h3>
                <p>راهکارهای علمی برای بهبود فرآیند تصمیم‌گیری و کاهش اشتباهات شناختی.</p>
              </div>
            </div>
          </div>
        );
      case "tests":
        return (
          <div className="tests-content">
            <h2>📝 تست‌های روانشناسی</h2>
            <div className="tests-list">
              <div className="test-item">
                <h3><FaBrain /> تست اضطراب</h3>
                <p><a href="./tests/anxietyTest.js">شروع تست</a></p>
              </div>
              <div className="test-item">
                <h3><FaSadTear /> تست افسردگی</h3>
                <p><a href="./tests/depressionTest.js">شروع تست</a></p>
              </div>
              <div className="test-item">
                <h3><FaBalanceScale /> تست وسواس فکری-عملی (OCD)</h3>
                <p><a href="./tests/ocdTest.js">شروع تست</a></p>
              </div>
              <div className="test-item">
                <h3><FaSmile /> تست اختلال دو قطبی MDQ</h3>
                <p><a href="./tests/bipolarTest.js">شروع تست</a></p>
              </div>
              <div className="test-item">
                <h3><FaHeartbeat /> تست اعتیاد</h3>
                <p><a href="./tests/addictionTest.js">شروع تست</a></p>
              </div>
              <div className="test-item">
                <h3><FaUser /> تست آمادگی رابطه عاطفی</h3>
                <p><a href="./tests/relationshipTest.js">شروع تست</a></p>
              </div>
              <div className="test-item">
                <h3>📊 تست شخصیت</h3>
                <p><a href="./tests/personalityTest.js">شروع تست</a></p>
              </div>
            </div>
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
