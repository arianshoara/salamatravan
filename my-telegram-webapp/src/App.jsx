import { useState, useRef } from "react";
import "./App.css";
import { FaBars, FaQuestionCircle, FaBook, FaCog, FaBrain, FaSadTear, FaBalanceScale, FaSmile, FaHeartbeat, FaUser } from "react-icons/fa";
import TestContainer from './components/tests/TestContainer'; // ایمپورت TestContainer
import TestContainerAnxiety from "./components/tests/TestContainerAnxiety";
import OCDTestContainer from "./components/tests/OCDTestContainer";
// ایمپورت مقالات از پوشه articles
import AnxietyImpactArticlePage from "./components/articles/AnxietyImpactArticlePage";
import SelfAwarenessArticlePage from "./components/articles/SelfAwarenessArticlePage";
import DepressionVsSadnessArticlePage from "./components/articles/DepressionVsSadnessArticlePage";
import PositivePsychologyArticlePage from "./components/articles/PositivePsychologyArticlePage";
import BetterDecisionMakingArticlePage from "./components/articles/BetterDecisionMakingArticlePage";
// ادامه مقالات 
import StressAnxietyManagementArticlePage from "./components/articles/StressAnxietyManagementArticlePage";
import MindfulnessImportanceArticlePage from "./components/articles/MindfulnessImportanceArticlePage";
import CognitiveBiasesArticlePage from "./components/articles/CognitiveBiasesArticlePage";
import EmotionalResilienceArticlePage from "./components/articles/EmotionalResilienceArticlePage";
import PhilosophyOfHappinessArticlePage from "./components/articles/PhilosophyOfHappinessArticlePage";
import SocialMediaMentalHealthArticlePage from "./components/articles/SocialMediaMentalHealthArticlePage";
import EthicalDecisionMakingArticlePage from "./components/articles/EthicalDecisionMakingArticlePage";
import MeaningOfLifeArticlePage from "./components/articles/MeaningOfLifeArticlePage";
import HealthyCommunicationSkillsArticlePage from "./components/articles/HealthyCommunicationSkillsArticlePage";
import OvercomingProcrastinationArticlePage from "./components/articles/OvercomingProcrastinationArticlePage";

function App() {
    // state برای مدیریت view فعلی
    const [currentView, setCurrentView] = useState("guide");
    // state برای حالت دارک مود
    const [darkMode, setDarkMode] = useState(false);
    // state برای باز و بسته بودن منو
    const [menuOpen, setMenuOpen] = useState(false);
    // useRef برای نگهداری تاریخچه view ها برای قابلیت برگشت به عقب
    const viewHistory = useRef(["guide"]);
    // useRef برای ایندکس فعلی در تاریخچه view ها
    const historyIndex = useRef(0);

    // تابع برای رفتن به یک view مشخص
    const goToView = (viewName) => {
        if (viewName !== currentView) {
            // اگر view جدید با view فعلی متفاوت باشد
            if (viewHistory.current[historyIndex.current] !== currentView) {
                // اگر view فعلی هنوز در تاریخچه ثبت نشده باشد (برای جلوگیری از اضافه شدن چندباره)
                viewHistory.current = viewHistory.current.slice(0, historyIndex.current + 1); // حذف history بعد از ایندکس فعلی، اگر به عقب برگشته باشیم
                viewHistory.current.push(currentView); // اضافه کردن view فعلی به تاریخچه
                historyIndex.current = viewHistory.current.length - 1; // بروزرسانی ایندکس به آخرین آیتم
            }
            setCurrentView(viewName); // تنظیم view فعلی به view جدید
            setMenuOpen(false); // بستن منو بعد از انتخاب گزینه
        }
    };

    // تابع برای برگشت به view قبلی
    const goBackView = () => {
        if (historyIndex.current > 0) {
            // اگر در تاریخچه view های قبلی وجود داشته باشد
            historyIndex.current -= 1; // رفتن به ایندکس قبلی
            setCurrentView(viewHistory.current[historyIndex.current]); // تنظیم view فعلی به view قبلی از تاریخچه
        } else {
            console.log("No history to go back to."); // اگر تاریخچه خالی باشد، پیغام در کنسول
        }
    };

    // تابع برای رندر کردن محتوای صفحه بر اساس state فعلی
    const renderContent = () => {
        switch (currentView) {
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
                        <p>🌍 :<a href="https://arianshoara.github.io/arian/">سایتم</a></p>
                        <p>📩 تلگرام: <a href="https://t.me/ariansho">@ariansho</a></p>
                        <p>📢 کانال تلگرام: <a href="https://t.me/rozgarmanarian">@rozgarmanarian</a></p>
                        <p>📷 اینستاگرام: <a href="https://www.instagram.com/arian__sho2">arian__sho2</a></p>
                        <p>📺 یوتیوب: <a href="https://www.youtube.com/@unipsydeu">unipsydeu</a></p>
                    </div>
                );
                case "reading":
                    return (
                        <div className="reading-content">
                            <h2>📖 خواندنی‌های روانشناسی و فلسفه</h2>
                            <div className="reading-list">
                                {/* مقالات قبلی */}
                                <div className="reading-item">
                                    <h3 onClick={() => goToView("anxietyImpactArticle")} style={{ cursor: 'pointer' }} className="reading-title">
                                        🧠 تاثیرات اضطراب بر عملکرد روزمره
                                    </h3>
                                    <p>چگونه اضطراب می‌تواند بر تصمیم‌گیری و عملکرد کلی ما تأثیر بگذارد؟</p>
                                </div>
                                <div className="reading-item">
                                    <h3 onClick={() => goToView("selfAwarenessArticle")} style={{ cursor: 'pointer' }} className="reading-title">
                                        📚 نقش خودآگاهی در رشد فردی
                                    </h3>
                                    <p>چگونه شناخت بهتر از خود می‌تواند زندگی ما را بهبود بخشد؟</p>
                                </div>
                                <div className="reading-item">
                                    <h3 onClick={() => goToView("depressionVsSadnessArticle")} style={{ cursor: 'pointer' }} className="reading-title">
                                        🧐 تفاوت بین افسردگی و ناراحتی موقتی
                                    </h3>
                                    <p>نشانه‌های افسردگی بالینی در مقایسه با احساس ناراحتی طبیعی چیست؟</p>
                                </div>
                                <div className="reading-item">
                                    <h3 onClick={() => goToView("positivePsychologyArticle")} style={{ cursor: 'pointer' }} className="reading-title">
                                        💡 مبانی روانشناسی مثبت‌گرا
                                    </h3>
                                    <p>رویکردهای مختلف روانشناسی مثبت‌گرا و چگونگی تأثیر آن بر زندگی ما.</p>
                                </div>
                                <div className="reading-item">
                                    <h3 onClick={() => goToView("betterDecisionMakingArticle")} style={{ cursor: 'pointer' }} className="reading-title">
                                        ⚖️ چگونه تصمیمات بهتری بگیریم؟
                                    </h3>
                                    <p>راهکارهای علمی برای بهبود فرآیند تصمیم‌گیری و کاهش اشتباهات شناختی.</p>
                                </div>
                
                                {/* مقالات جدید - اضافه شده */}
                                <div className="reading-item">
                                    <h3 onClick={() => goToView("stressAnxietyManagementArticle")} style={{ cursor: 'pointer' }} className="reading-title">
                                        🧘‍♀️ مدیریت استرس و اضطراب
                                    </h3>
                                    <p>تکنیک‌ها و راهکارهای موثر برای مدیریت استرس روزمره و کاهش اضطراب.</p>
                                </div>
                                <div className="reading-item">
                                    <h3 onClick={() => goToView("mindfulnessImportanceArticle")} style={{ cursor: 'pointer' }} className="reading-title">
                                        🧘 اهمیت ذهن‌آگاهی (Mindfulness)
                                    </h3>
                                    <p>مفهوم ذهن‌آگاهی، فواید آن برای سلامت روان و تمرین‌های کاربردی.</p>
                                </div>
                                <div className="reading-item">
                                    <h3 onClick={() => goToView("cognitiveBiasesArticle")} style={{ cursor: 'pointer' }} className="reading-title">
                                        🤔 سوگیری‌های شناختی در زندگی روزمره
                                    </h3>
                                    <p>معرفی انواع سوگیری‌های شناختی رایج و تاثیر آن‌ها بر تصمیم‌گیری‌ها و تفکر ما.</p>
                                </div>
                                <div className="reading-item">
                                    <h3 onClick={() => goToView("emotionalResilienceArticle")} style={{ cursor: 'pointer' }} className="reading-title">
                                        💪 تقویت تاب‌آوری هیجانی
                                    </h3>
                                    <p>چگونه تاب‌آوری هیجانی را برای مقابله با مشکلات و فشارهای زندگی افزایش دهیم.</p>
                                </div>
                                <div className="reading-item">
                                    <h3 onClick={() => goToView("philosophyOfHappinessArticle")} style={{ cursor: 'pointer' }} className="reading-title">
                                        😊 فلسفه خوشبختی
                                    </h3>
                                    <p>دیدگاه‌های مختلف فلسفی درباره خوشبختی و عوامل موثر بر زندگی معنادار.</p>
                                </div>
                                <div className="reading-item">
                                    <h3 onClick={() => goToView("socialMediaMentalHealthArticle")} style={{ cursor: 'pointer' }} className="reading-title">
                                        📱 تاثیر شبکه‌های اجتماعی بر سلامت روان
                                    </h3>
                                    <p>بررسی اثرات مثبت و منفی شبکه‌های اجتماعی و راهکارهای استفاده سالم.</p>
                                </div>
                                <div className="reading-item">
                                    <h3 onClick={() => goToView("ethicalDecisionMakingArticle")} style={{ cursor: 'pointer' }} className="reading-title">
                                        ⚖️ تصمیم‌گیری اخلاقی در زندگی
                                    </h3>
                                    <p>مبانی و اصول تصمیم‌گیری اخلاقی و چالش‌های رایج در زندگی روزمره.</p>
                                </div>
                                <div className="reading-item">
                                    <h3 onClick={() => goToView("meaningOfLifeArticle")} style={{ cursor: 'pointer' }} className="reading-title">
                                        ❓ معنای زندگی از دیدگاه فلسفی
                                    </h3>
                                    <p>پرسش‌های اساسی درباره معنای زندگی و دیدگاه‌های مختلف فلسفی.</p>
                                </div>
                                <div className="reading-item">
                                    <h3 onClick={() => goToView("healthyCommunicationSkillsArticle")} style={{ cursor: 'pointer' }} className="reading-title">
                                        🗣️ مهارت‌های ارتباطی سالم
                                    </h3>
                                    <p>اصول ارتباط موثر، گوش دادن فعال و راهکارهای بهبود روابط بین فردی.</p>
                                </div>
                                <div className="reading-item">
                                    <h3 onClick={() => goToView("overcomingProcrastinationArticle")} style={{ cursor: 'pointer' }} className="reading-title">
                                        ⏱️ غلبه بر اهمال‌کاری (Procrastination)
                                    </h3>
                                    <p>علل اهمال‌کاری و تکنیک‌های عملی برای افزایش بهره‌وری و غلبه بر آن.</p>
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
                                <h3 onClick={() => goToView("anxietyTestActive")} style={{ cursor: 'pointer' }} className="test-title">
                                    <FaBrain className="bottom-nav-icon" /> تست اضطراب
                                </h3>
                            </div>
                            <div className="test-item">
                                <h3 onClick={() => goToView("depressionTestActive")} style={{ cursor: 'pointer' }} className="test-title">
                                    <FaSadTear className="bottom-nav-icon" /> تست افسردگی
                                </h3>
                            </div>
                            <div className="test-item">
                                <h3 onClick={() => goToView("OCDTestActive")} style={{ cursor: 'pointer' }} className="test-title">
                                    <FaSadTear className="bottom-nav-icon" /> تست وسواس فکری-عملی
                                </h3>
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
            // موارد زیر برای نمایش مقالات هستند
            case "anxietyImpactArticle":
                return <AnxietyImpactArticlePage />;
            case "OCDTestActive":
                return <OCDTestContainer />;   
            case "selfAwarenessArticle":
                return <SelfAwarenessArticlePage />;
            case "depressionVsSadnessArticle":
                return <DepressionVsSadnessArticlePage />;
            case "positivePsychologyArticle":
                return <PositivePsychologyArticlePage />;
            case "betterDecisionMakingArticle":
                return <BetterDecisionMakingArticlePage />;
            case "depressionTestActive": // view برای زمانی که تست افسردگی فعال است
                return <TestContainer />;
            case "anxietyTestActive": // view برای زمانی که تست اضطراب فعال است
                return <TestContainerAnxiety />;
            case "stressAnxietyManagementArticle":
                return <StressAnxietyManagementArticlePage />;
            case "mindfulnessImportanceArticle":
                return <MindfulnessImportanceArticlePage />;
            case "cognitiveBiasesArticle":
                return <CognitiveBiasesArticlePage />;
            case "emotionalResilienceArticle":
                return <EmotionalResilienceArticlePage />;
            case "philosophyOfHappinessArticle":
                return <PhilosophyOfHappinessArticlePage />;
            case "socialMediaMentalHealthArticle":
                return <SocialMediaMentalHealthArticlePage />;
            case "ethicalDecisionMakingArticle":
                return <EthicalDecisionMakingArticlePage />;
            case "meaningOfLifeArticle":
                return <MeaningOfLifeArticlePage />;
            case "healthyCommunicationSkillsArticle":
                return <HealthyCommunicationSkillsArticlePage />;
            case "overcomingProcrastinationArticle":
                return <OvercomingProcrastinationArticlePage />;

            default:        
                return <h2>صفحه نامعتبر</h2>; // هندل کردن view های نامعتبر
        }
    };

    return (
        <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
            {/* هدر برنامه */}
            <header className="top-bar">
                <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                    <FaBars className="bottom-nav-icon" /> {/* آیکون منو */}
                </button>
                {/* دکمه بازگشت به عقب - فقط وقتی که در guide یا tests یا reading یا settings نیستیم نمایش داده میشود */}
                {currentView !== "guide" && currentView !== "tests" && currentView !== "reading" && currentView !== "settings" && (
                    <button className="back-btn" onClick={goBackView}>
                        <span className="bottom-nav-icon">بازگشت</span> {/* متن دکمه بازگشت */}
                    </button>
                )}
            </header>

            {/* منوی کشویی (سایدبار) - نمایش فقط وقتی menuOpen === true */}
            {menuOpen && (
                <div className="menu-overlay" onClick={() => setMenuOpen(false)}> {/* بستن منو با کلیک بیرون از منو */}
                    <div className="menu-drawer" onClick={(e) => e.stopPropagation()}> {/* جلوگیری از بسته شدن منو با کلیک داخل منو */}
                        <div className="menu-item" onClick={() => goToView("guide")}>
                            <FaQuestionCircle className="menu-icon" /> راهنما
                        </div>
                        <div className="menu-item" onClick={() => goToView("reading")}>
                            <FaBook className="menu-icon" /> خواندنی‌ها
                        </div>
                        <div className="menu-item" onClick={() => goToView("tests")}>
                            <span className="menu-icon">📊</span> تست‌ها
                        </div>
                        <div className="menu-item" onClick={() => goToView("settings")}>
                            <FaCog className="menu-icon" /> تنظیمات
                        </div>
                    </div>
                </div>
            )}

            {/* بخش اصلی محتوا */}
            <main className="content">{renderContent()}</main>

            {/* نویگیشن پایین صفحه */}
            <nav className="bottom-nav">
                <button className={`bottom-nav-button ${currentView === "guide" ? "active" : ""}`} onClick={() => goToView("guide")}>
                    <FaQuestionCircle className="bottom-nav-icon" /> {/* آیکون راهنما و دکمه راهنما */}
                </button>
                <button className={`bottom-nav-button ${currentView === "reading" ? "active" : ""}`} onClick={() => goToView("reading")}>
                    <FaBook className="bottom-nav-icon" /> {/* آیکون خواندنی‌ها و دکمه خواندنی‌ها */}
                </button>
                <button className={`bottom-nav-button ${currentView === "tests" ? "active" : ""}`} onClick={() => goToView("tests")}>
                    <span className="bottom-nav-icon">📊</span> {/* آیکون تست‌ها و دکمه تست‌ها */}
                </button>
                <button className={`bottom-nav-button ${currentView === "settings" ? "active" : ""}`} onClick={() => goToView("settings")}>
                    <FaCog className="bottom-nav-icon" /> {/* آیکون تنظیمات و دکمه تنظیمات */}
                </button>
            </nav>
        </div>
    );
}

export default App;