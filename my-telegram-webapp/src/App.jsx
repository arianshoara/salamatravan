import { useState } from "react";
import "./App.css";
import {FaBook, FaCog, FaQuestionCircle, FaBars, FaBrain, FaSadTear, FaSmile, FaBalanceScale, FaHeartbeat, FaUser } from "react-icons/fa";
import DepressionTestPage from "./DepressionTestPage"; // ایمپورت کامپوننت تست افسردگی
import AnxietyTestPage from "./AnxietyTestPage"; // ایمپورت کامپوننت تست اضطراب

function App() {
    const [activeTab, setActiveTab] = useState("guide");
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isDepressionTestActive, setIsDepressionTestActive] = useState(false); // وضعیت برای نمایش تست افسردگی
    const [isAnxietyTestActive, setIsAnxietyTestActive] = useState(false); // وضعیت برای تست اضطراب


    const renderContent = () => {
        if (isDepressionTestActive) { // اگر تست افسردگی فعال است، کامپوننت تست را نمایش بده
            return <DepressionTestPage onTestComplete={() => setIsDepressionTestActive(false)} />; //پاس دادن prop برای غیرفعال کردن تست بعد از اتمام (اختیاری)
        }

        if (isAnxietyTestActive) {
            return <AnxietyTestPage onTestComplete={() => setIsAnxietyTestActive(false)} />;
        }

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
                                <h3 onClick={() => setIsAnxietyTestActive(true)} style={{ cursor: 'pointer' }} className="test-title">
                                    <FaBrain className="bottom-nav-icon" /> تست اضطراب
                                </h3>
                            </div>
                            <div className="test-item">
                                <h3 onClick={() => setIsDepressionTestActive(true)} style={{ cursor: 'pointer' }} className="test-title">
                                    <FaSadTear className="bottom-nav-icon" /> تست افسردگی
                                </h3>
                            </div>
                            <div className="test-item">
                                <h3 className="test-title"><FaBalanceScale className="bottom-nav-icon" /> تست وسواس فکری-عملی (OCD)</h3>
                            </div>
                            <div className="test-item">
                                <h3 className="test-title"><FaSmile className="bottom-nav-icon" /> تست اختلال دو قطبی MDQ</h3>
                            </div>
                            <div className="test-item">
                                <h3 className="test-title"><FaHeartbeat className="bottom-nav-icon" /> تست اعتیاد</h3>
                            </div>
                            <div className="test-item">
                                <h3 className="test-title"><FaUser className="bottom-nav-icon" /> تست آمادگی رابطه عاطفی</h3>
                            </div>
                            <div className="test-item">
                                <h3 className="test-title"><span className="bottom-nav-icon">📊</span> تست شخصیت</h3>
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
              <FaQuestionCircle className="bottom-nav-icon" />
            </button>
            <button className={activeTab === "reading" ? "active" : ""} onClick={() => setActiveTab("reading")}>
              <FaBook className="bottom-nav-icon" />
            </button>
            <button className={activeTab === "tests" ? "active" : ""} onClick={() => setActiveTab("tests")}>
              <span className="bottom-nav-icon">📊</span>
            </button>
            <button className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveTab("settings")}>
              <FaCog className="bottom-nav-icon" />
            </button>
          </nav>
        </div>
      );
    }

export default App;