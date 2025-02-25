import { useState, useEffect } from "react";
import "./App.css";
import { FaBars, FaQuestionCircle, FaBook, FaCog, FaBrain, FaSadTear, FaTelegram, FaInstagram, FaYoutube, FaGlobe, FaUserTie, FaThList, FaCheckCircle } from "react-icons/fa";
import PropTypes from 'prop-types';

import TestContainer from './components/tests/TestContainer';
import TestContainerAnxiety from "./components/tests/TestContainerAnxiety";
import OCDTestContainer from "./components/tests/OCDTestContainer";
import TestContainerBipolar from "./components/tests/TestContainerBipolar";
import TestContainerAddiction from "./components/tests/TestContainerAddiction";
import RelationshipReadinessTest from "./components/tests/RelationshipReadinessTest";
import TestPage from "./components/tests/TestPage";
// ایمپورت مقالات
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
import profileImage from './assets/profile-image.jpg'; // ایمپورت عکس پروفایل
import pathHeroImage from './assets/path-to-your-hero-image.jpg'; // ایمپورت hero image (اگر دارید و نامش اینه)

import CategoriesContent from './components/CategoriesContent'; // ⬅️ ایمپورت CategoriesContent از مسیر components
//import MovieDetailPage from './components/MovieDetailPage'; // ایمپورت MovieDetailPage
//import BookDetailPage from './components/BookDetailPage';  // ایمپورت BookDetailPage
//import books from './components/data/books'; // ⬅️ ایمپورت books در App.jsx
//import movies from './components/data/movies'; // ⬅️ ایمپورت movies در App.jsx
// کامپوننت GuideContent برای صفحه نخست جدید
/**
 * @param {object} props - پراپ‌های کامپوننت GuideContent
 * @param {function} props.goToView - تابعی برای تغییر View برنامه
 */
function GuideContent(props) {
    return (
        <div className="guide-content">
            <section className="hero-section">
                <div className="hero-text">
                    <h2>همراه شما در مسیر خودشناسی و بهبود فردی</h2>
                    <p className="subtitle">مطالب و ابزارهای روانشناسی کاربردی برای زندگی روزمره شما.</p>
                    <button className="hero-button" onClick={() => props.goToView('reading')}>شروع یادگیری</button>
                </div>
                <div className="hero-image"> {/* {} حذف شد و div از حالت comment  اومد */}
                    {/* می‌تونید یک تصویر مرتبط اینجا اضافه کنید */}
                    <img src={pathHeroImage} alt="تصویر بخش قهرمان" /> {/* src به pathHeroImage تغییر کرد */}
                </div>
            </section>

            <section className="about-me-section">
                <div className="profile-image-container">
                    {/* دایره عکس پروفایل - شما باید عکس خودتون رو در پوشه public/assets قرار بدید و مسیر رو اینجا وارد کنید */}
                    <img src={profileImage} alt="عکس پروفایل آرین شعرا" className="profile-image" /> {/* src به profileImage تغییر کرد */}
                </div>
                <h3><FaUserTie className="section-icon" /> درباره آرین شعرا</h3>
                <p>
                    سلام! من آرین شعرا هستم، مدرس زبان آلمانی، دانش‌آموخته روانشناسی و علاقه‌مند به برنامه‌نویسی.
                    هدفم از ایجاد این وبسایت، ارائه مطالب و ابزارهای کاربردی در زمینه روانشناسی و خودشناسی به زبان فارسیه.
                    امیدوارم این مجموعه بتونه گامی مثبت در جهت بهبود کیفیت زندگی شما باشه.
                </p>
                <ul className="about-me-list">
                    <li>👨🏻‍🏫 مدرس زبان آلمانی</li>
                    <li>🎓 دانش‌آموخته کارشناسی روانشناسی</li>
                    <li>💻 در حال پیشرفت در زمینه برنامه‌نویسی</li>
                </ul>
            </section>

            <section className="contact-section" style={{ direction: 'rtl', textAlign: 'right' }}> {/* style اضافه شد */}
                <h3>🔗 راه‌های ارتباط با من</h3>
                <ul className="contact-list">
                    <li><a href="https://arianshoara.github.io/arian/" target="_blank" rel="noopener noreferrer"><FaGlobe className="contact-icon" /> سایتم</a></li>
                    <li><a href="https://t.me/ariansho" target="_blank" rel="noopener noreferrer"><FaTelegram className="contact-icon" /> تلگرام: @ariansho</a></li>
                    <li><a href="https://t.me/rozgarmanarian" target="_blank" rel="noopener noreferrer"><FaTelegram className="contact-icon" /> کانال تلگرام: @rozgarmanarian</a></li>
                    <li><a href="https://www.instagram.com/arian__sho2" target="_blank" rel="noopener noreferrer"><FaInstagram className="contact-icon" /> اینستاگرام: arian__sho2</a></li>
                    <li><a href="https://www.youtube.com/@unipsydeu" target="_blank" rel="noopener noreferrer"><FaYoutube className="contact-icon" /> یوتیوب: unipsydeu</a></li>
                </ul>
            </section>
        </div>
    );
}

// ✅ اضافه کردن propTypes برای کامپوننت GuideContent در App.jsx
GuideContent.propTypes = {
    goToView: PropTypes.func.isRequired,
};

function App() {
    // state برای مدیریت view فعلی
    const [currentView, setCurrentView] = useState("guide");
    // state برای حالت دارک مود
    const [darkMode, setDarkMode] = useState(false);
    // state برای باز و بسته بودن منو
    const [menuOpen, setMenuOpen] = useState(false);
    // State جدید برای نگهداری history
    const [viewHistoryState, setViewHistoryState] = useState(["guide"]);

    const [fontSize, setFontSize] = useState(parseInt(localStorage.getItem("fontSize")) || 16); // مقدار پیش‌فرض 16px

    useEffect(() => {
        localStorage.setItem("fontSize", fontSize); // ذخیره سایز فونت در localStorage
        document.documentElement.style.fontSize = `${fontSize}px`; // اعمال سایز فونت به کل صفحه
    }, [fontSize]);

    // تابع برای رفتن به یک view مشخص
    const goToView = (viewName) => {
        console.log("goToView فراخوانی شد با viewName:", viewName);
        if (viewName !== currentView) {
            // History رو آپدیت میکنیم - اول view قبلی رو اضافه میکنیم
            setViewHistoryState(prevHistory => [...prevHistory, currentView]);
            setCurrentView(viewName);
            setMenuOpen(false);
        }
    };


    // تابع برای برگشت به view قبلی
    const goBackView = () => {
        if (viewHistoryState.length > 1) {
            // یک کپی از history state میگیریم
            const newHistory = [...viewHistoryState];
            // آخرین view رو از history حذف میکنیم
            newHistory.pop();
            // view قبلی رو از history (که الان آخرین آیتم هست) میگیریم و state رو آپدیت میکنیم
            setCurrentView(newHistory[newHistory.length - 1]);
            // history state رو با حذف آخرین آیتم آپدیت میکنیم
            setViewHistoryState(newHistory);
        } else {
            console.log("No history to go back to.");
        }
    };


    // تابع برای رندر کردن محتوای صفحه بر اساس state فعلی
    const renderContent = () => {

        switch (currentView) {
            case "guide":
                return <GuideContent goToView={goToView} />;
            case "reading":
                return (
                    <div className="reading-section">
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
                                <h3 onClick={() => goToView("BipolarTestActive")} style={{ cursor: 'pointer' }} className="test-title">
                                    <FaSadTear className="bottom-nav-icon" /> تست اختلال دو قطبی MDQ
                                </h3>
                            </div>
                            <div className="test-item">
                                <h3 onClick={() => goToView("AddictionTestActive")} style={{ cursor: 'pointer' }} className="test-title">
                                    <FaSadTear className="bottom-nav-icon" /> تست اعتیاد
                                </h3>
                            </div>
                            <div className="test-item">
                                <h3 onClick={() => goToView("RelationshipReadinessTestActive")} style={{ cursor: 'pointer' }} className="test-title">
                                    <FaSadTear className="bottom-nav-icon" /> تست آمادگی رابطه
                                </h3>
                            </div>
                            <div className="test-item">
                                <h3 onClick={() => goToView("bigFiveTestActive")} style={{ cursor: 'pointer' }} className="test-title">
                                    <FaSadTear className="bottom-nav-icon" /> تست شخصیت
                                </h3>
                            </div>
                        </div>
                    </div>
                );
            case "categories": // ⬅️ View جدید دسته‌بندی‌ها
                return (
                    <div className="categories-content">
                        <CategoriesContent goToView={goToView} /> {/* ✅ پاس دادن goToView به CategoriesContent */}
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
                        <div className="font-size-setting">
                            <label htmlFor="font-size-slider">سایز فونت:</label>
                            <input
                                type="range"
                                min="12"
                                max="24"
                                value={fontSize}
                                onChange={(e) => setFontSize(e.target.value)}
                                id="font-size-slider"
                            />
                            <span>{fontSize}px</span>
                        </div>
                    </div>
                );
            // موارد زیر برای نمایش مقالات هستند
            // ✅ اصلاح case های movieDetail و bookDetail برای هندل کردن viewName های داینامیک
           // case currentView.startsWith("movieDetail-"): {
               // const movieId = currentView.split('-')[1];
               // return <MovieDetailPage movieId={movieId} movies={movies} />; // ✅ پاس دادن movies به عنوان prop
           // }
            //case currentView.startsWith("bookDetail-"): {
             //   const bookId = currentView.split('-')[1];
              //  return <BookDetailPage bookId={bookId} books={books} />; // ✅ پاس دادن books به عنوان prop
          //  }
            case "anxietyImpactArticle":
                return <AnxietyImpactArticlePage />;
            case "bigFiveTestActive":
                return <TestPage />;    
            case "OCDTestActive":
                return <OCDTestContainer />;
            case "BipolarTestActive":
                return <TestContainerBipolar />;
            case "AddictionTestActive":
                return <TestContainerAddiction />;
            case "RelationshipReadinessTestActive":
                return <RelationshipReadinessTest />;    
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
        <div className={`app-container ${darkMode ? "dark-mode" : ""}`}> {/* Template literals بجای + برای className */}
            {/* هدر برنامه */}
            <header className="top-bar">
                <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                    <FaBars className="bottom-nav-icon" /> {/* آیکون منو */}
                </button>
                {
                    !["guide", "tests", "reading", "settings", "categories"].includes(currentView) && ( // اضافه شدن categories به لیست исключений
                        <button className="back-btn" onClick={goBackView}>
                            <span className="bottom-nav-icon">بازگشت</span>
                        </button>
                    )
                }
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
                            <FaCheckCircle className="menu-icon" /> تست‌ها
                        </div> 
                        {/* ⬅️ مورد جدید منو - دسته‌بندی‌ها */}
                        <div className="menu-item" onClick={() => goToView("categories")}>
                            <FaThList className="menu-icon" /> دسته‌بندی‌ها
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
                <button className={`bottom-nav-button ${currentView === "guide" ? "active" : ""}`} onClick={() => goToView("guide")}> {/* Template literals بجای + برای className */}
                    <FaQuestionCircle className="bottom-nav-icon" /> {/* آیکون راهنما و دکمه راهنما */}
                </button>
                <button className={`bottom-nav-button ${currentView === "reading" ? "active" : ""}`} onClick={() => goToView("reading")}> {/* Template literals بجای + برای className */}
                    <FaBook className="bottom-nav-icon" /> {/* آیکون خواندنی‌ها و دکمه خواندنی‌ها */}
                </button>
                <button className={`bottom-nav-button ${currentView === "tests" ? "active" : ""}`} onClick={() => goToView("tests")}> {/* Template literals بجای + برای className */}
                    <FaCheckCircle className="bottom-nav-icon" /> {/* آیکون تست‌ها و دکمه تست‌ها */}
                </button>
                {/* ⬅️ دکمه جدید نویگیشن - دسته‌بندی‌ها */}
                <button className={`bottom-nav-button ${currentView === "categories" ? "active" : ""}`} onClick={() => goToView("categories")}>
                    <FaThList className="bottom-nav-icon" /> {/* آیکون دسته‌بندی‌ها */}
                </button>
                <button className={`bottom-nav-button ${currentView === "settings" ? "active" : ""}`} onClick={() => goToView("settings")}> {/* Template literals بجای + برای className */}
                    <FaCog className="bottom-nav-icon" /> {/* آیکون تنظیمات و دکمه تنظیمات */}
                </button>
            </nav>
        </div>
    );
}

export default App;