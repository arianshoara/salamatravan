import { useState, useEffect } from "react";
import "./App.css";
import { FaBars, FaQuestionCircle, FaBook, FaCog, FaThList, FaCheckCircle, FaClipboardList, FaArrowRight } from "react-icons/fa";
import PropTypes from "prop-types";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useLanguage } from "./i18n/LanguageContext";

import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import ReadingSection from "./components/ReadingSection";
import TestsSection from "./components/TestsSection";
import GuideContent from "./GuideContent";
import SettingsSection from "./components/SettingsSection";
import ThankYouPage from "./components/ThankYouPage";

import EQBarOnTest from './components/tests/SpecializedTests/EQBarOnTest';

import TestContainer from "./components/tests/TestContainer";
import TestContainerAnxiety from "./components/tests/TestContainerAnxiety";
import OCDTestContainer from "./components/tests/OCDTestContainer";
import TestContainerBipolar from "./components/tests/TestContainerBipolar";
import TestContainerAddiction from "./components/tests/TestContainerAddiction";
import RelationshipReadinessTest from "./components/tests/RelationshipReadinessTest";
import TestPage from "./components/tests/TestPage";
import SpecializedTests from "./components/tests/SpecializedTests";
import MentalHealthTestPage from "./components/tests/MentalHealthTestPage"

import AuthoredBooks from "./components/Sidebar/AuthoredBooks";
import Profile from "./components/Sidebar/Profile";
import Cart from "./components/Sidebar/Cart";

// ایمپورت مقالات
import AnxietyImpactArticlePage from "./components/articles/AnxietyImpactArticlePage";
import SelfAwarenessArticlePage from "./components/articles/SelfAwarenessArticlePage";
import DepressionVsSadnessArticlePage from "./components/articles/DepressionVsSadnessArticlePage";
import PositivePsychologyArticlePage from "./components/articles/PositivePsychologyArticlePage";
import BetterDecisionMakingArticlePage from "./components/articles/BetterDecisionMakingArticlePage";
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

import CategoriesContent from "./components/CategoriesContent";

import "./global.css"; // فایل استایل سراسری که اضافه کردی

// تعریف PropTypes برای GuideContent
GuideContent.propTypes = {
  goToView: PropTypes.func.isRequired,
};

// تعریف PropTypes برای SettingsSection (بهینه‌سازی ساده)
SettingsSection.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  setFontSize: PropTypes.func.isRequired,
};

// آرایه برای نوبری پایین (بهینه‌سازی ساده بدون تغییر ساختار زیاد)
const navItems = [
  { view: "guide", icon: <FaQuestionCircle className="bottom-nav-icon" /> },
  { view: "reading", icon: <FaBook className="bottom-nav-icon" /> },
  { view: "tests", icon: <FaCheckCircle className="bottom-nav-icon" /> },
  { view: "categories", icon: <FaThList className="bottom-nav-icon" /> },
  { view: "settings", icon: <FaCog className="bottom-nav-icon" /> },
];

// Organize reading materials into a structured array for searching
const readingMaterials = [
  { viewName: "anxietyImpactArticle", title: "تأثیر اضطراب بر زندگی روزمره", description: "بررسی تأثیرات اضطراب بر جنبه‌های مختلف زندگی", type: 'article' },
  { viewName: "selfAwarenessArticle", title: "خودآگاهی و رشد شخصی", description: "چگونه خودآگاهی می‌تواند به رشد شخصی کمک کند", type: 'article' },
  { viewName: "depressionVsSadnessArticle", title: "تفاوت افسردگی و غم", description: "چگونه افسردگی را از غم معمولی تشخیص دهیم", type: 'article' },
  { viewName: "positivePsychologyArticle", title: "روانشناسی مثبت‌گرا", description: "اصول و کاربردهای روانشناسی مثبت‌گرا", type: 'article' },
  { viewName: "betterDecisionMakingArticle", title: "تصمیم‌گیری بهتر", description: "روش‌های بهبود تصمیم‌گیری در زندگی", type: 'article' },
  { viewName: "stressAnxietyManagementArticle", title: "مدیریت استرس و اضطراب", description: "تکنیک‌های مؤثر برای مدیریت استرس و اضطراب روزانه", type: 'article' },
  { viewName: "mindfulnessImportanceArticle", title: "اهمیت ذهن‌آگاهی", description: "چرا ذهن‌آگاهی برای سلامت روان مهم است", type: 'article' },
  { viewName: "cognitiveBiasesArticle", title: "سوگیری‌های شناختی", description: "آشنایی با سوگیری‌های شناختی رایج و تأثیر آنها بر تفکر", type: 'article' },
  { viewName: "emotionalResilienceArticle", title: "تاب‌آوری عاطفی", description: "چگونه تاب‌آوری عاطفی خود را تقویت کنیم", type: 'article' },
  { viewName: "philosophyOfHappinessArticle", title: "فلسفه شادی", description: "بررسی مفهوم شادی از دیدگاه فلسفی", type: 'article' },
  { viewName: "socialMediaMentalHealthArticle", title: "شبکه‌های اجتماعی و سلامت روان", description: "تأثیر شبکه‌های اجتماعی بر سلامت روان", type: 'article' },
  { viewName: "ethicalDecisionMakingArticle", title: "تصمیم‌گیری اخلاقی", description: "اصول تصمیم‌گیری اخلاقی در زندگی روزمره", type: 'article' },
  { viewName: "meaningOfLifeArticle", title: "معنای زندگی", description: "جستجوی معنا در زندگی مدرن", type: 'article' },
  { viewName: "healthyCommunicationSkillsArticle", title: "مهارت‌های ارتباطی سالم", description: "تکنیک‌های برقراری ارتباط مؤثر و سالم", type: 'article' },
  { viewName: "overcomingProcrastinationArticle", title: "غلبه بر تعلل", description: "روش‌های عملی برای غلبه بر تعلل و اهمال‌کاری", type: 'article' }
];

// Organize tests into a structured array for searching
const tests = [
  { viewName: "depressionTestActive", title: "تست افسردگی", description: "سنجش علائم افسردگی بر اساس معیارهای استاندارد", type: 'test' },
  { viewName: "anxietyTestActive", title: "تست اضطراب", description: "ارزیابی سطح اضطراب و علائم مرتبط", type: 'test' },
  { viewName: "bigFiveTestActive", title: "تست شخصیت", description: "ارزیابی پنج عامل بزرگ شخصیت", type: 'test' },
  { viewName: "OCDTestActive", title: "تست OCD", description: "بررسی علائم اختلال وسواس فکری-عملی", type: 'test' },
  { viewName: "BipolarTestActive", title: "تست دوقطبی", description: "ارزیابی علائم اختلال دوقطبی", type: 'test' },
  { viewName: "eqBarOnTestActive", title: "تست هوش هیجانی بار-آن", description: "سنجش هوش هیجانی با مدل بار-آن", type: 'test' },
  { viewName: "AddictionTestActive", title: "تست اعتیاد", description: "ارزیابی میزان وابستگی به مواد مختلف", type: 'test' },
  { viewName: "MentalHealthTestActive", title: "تست سلامت روان", description: "ارزیابی کلی وضعیت سلامت روان", type: 'test' },
  { viewName: "RelationshipReadinessTestActive", title: "تست آمادگی برای رابطه", description: "ارزیابی آمادگی روانی برای ورود به رابطه", type: 'test' }
];

function App() {
  const [currentView, setCurrentView] = useState("guide");
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewHistoryState, setViewHistoryState] = useState(["guide"]);
  const [fontSize, setFontSize] = useState(parseInt(localStorage.getItem("fontSize")) || 16);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { translations } = useLanguage();

  // ذخیره سایز فونت تو localStorage
  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  // درخواست به Netlify Functions
  useEffect(() => {
    fetch("/.netlify/functions/mongo")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // تابع تغییر ویو
  const goToView = (viewName) => {
    console.log("goToView فراخوانی شد با viewName:", viewName);
    if (viewName !== currentView) {
      setViewHistoryState((prevHistory) => [...prevHistory, currentView]);
      setCurrentView(viewName);
      setMenuOpen(false);
      window.scrollTo(0, 0); // اضافه شده: اسکرول به بالای صفحه
    }
  };

  // تابع بازگشت به ویوی قبلی
  const goBackView = () => {
    if (viewHistoryState.length > 1) {
      const newHistory = [...viewHistoryState];
      newHistory.pop();
      setCurrentView(newHistory[newHistory.length - 1]);
      setViewHistoryState(newHistory);
    } else {
      console.log("No history to go back to.");
    }
  };

  // مدیریت موفقیت ورود با گوگل
  const responseGoogle = async (response) => {
    console.log("Google Login Success Response:", response);
    if (response.credential) {
      try {
        const serverResponse = await fetch("/api/google-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: response.credential }),
        });

        const data = await serverResponse.json();

        if (serverResponse.ok) {
          console.log("Login successful:", data);
          alert("ورود با گوگل موفقیت‌آمیز بود!");
        } else {
          console.error("Login failed on server:", data);
          alert("خطا در ورود به سیستم. لطفاً دوباره تلاش کنید.");
        }
      } catch (error) {
        console.error("Error during Google login request:", error);
        alert("خطا در برقراری ارتباط با سرور. لطفاً بعداً تلاش کنید.");
      }
    } else {
      console.error("Credential is missing in Google response:", response);
      alert("مشکلی در دریافت اطلاعات از گوگل پیش آمد. لطفاً دوباره تلاش کنید.");
    }
  };

  // مدیریت خطای ورود با گوگل
  const onFailureGoogle = (error) => {
    console.error("Google Login Failed Response:", error);
    alert("ورود با گوگل ناموفق بود. لطفاً دوباره تلاش کنید.");
  };

  // Handle search functionality
  const handleSearch = (searchTerm, isLiveSearch = false) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const searchTermLower = searchTerm.toLowerCase();
    
    // Search in reading materials (articles)
    const articleResults = readingMaterials.filter(article => 
      article.title.toLowerCase().includes(searchTermLower) ||
      article.description.toLowerCase().includes(searchTermLower)
    );

    // Search in tests
    const testResults = tests.filter(test =>
      test.title.toLowerCase().includes(searchTermLower) ||
      test.description.toLowerCase().includes(searchTermLower)
    );

    // Combine and sort results
    const combinedResults = [...articleResults, ...testResults].sort((a, b) => {
      // Exact matches first
      const aExact = a.title.toLowerCase() === searchTermLower;
      const bExact = b.title.toLowerCase() === searchTermLower;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      // Then starts with matches
      const aStarts = a.title.toLowerCase().startsWith(searchTermLower);
      const bStarts = b.title.toLowerCase().startsWith(searchTermLower);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      
      // Then alphabetically
      return a.title.localeCompare(b.title);
    });

    setSearchResults(combinedResults);

    // Only navigate to search view for full searches, not live searches
    if (!isLiveSearch && currentView !== "search") {
      setViewHistoryState((prevHistory) => [...prevHistory, currentView]);
      setCurrentView("search");
    }
  };

  // رندر محتوای ویوها
  const renderContent = () => {
    switch (currentView) {
      case "guide":
        return <GuideContent goToView={goToView} />;
      case "reading":
        return <ReadingSection goToView={goToView} />;
      case "tests":
        return <TestsSection goToView={goToView} />;
      case "categories":
        return (
          <div className="categories-content">
            <CategoriesContent goToView={goToView} />
          </div>
        );
      case "settings":
        return (
          <SettingsSection
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        );
      case "thankYouPage":
        return <ThankYouPage />;
      case "specializedTestsActive":
        return <SpecializedTests />;
      case "eqBarOnTestActive": // یا هر نام دیگری که می‌خواهید برای view استفاده کنید
        return <EQBarOnTest />;  
      case "authoredBooks":
        return <AuthoredBooks />;
      case "profile":
        return <Profile />;
      case "cart":
        return <Cart />;  
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
      case "MentalHealthTestActive":
        return <MentalHealthTestPage />;
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
      case "depressionTestActive":
        return <TestContainer />;
      case "anxietyTestActive":
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
      case "login":
        return (
          <div className="login-page">
            <h2>ورود به حساب گوگل</h2>
            <p>برای ورود به سایت با حساب گوگل خود، روی دکمه زیر کلیک کنید:</p>
            <GoogleOAuthProvider clientId="212369861199-eduokb22pmiv5m156j6i2j5dga999stp.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  responseGoogle(credentialResponse);
                }}
                onError={() => {
                  onFailureGoogle();
                }}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="login-gmail-button- مرحله-دوم"
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/google-logo.png"
                      alt="Google Icon"
                      style={{ width: "24px", height: "24px" }}
                      className="google-icon"
                    />
                    <span>ورود با گوگل</span>
                  </button>
                )}
              />
            </GoogleOAuthProvider>
          </div>
        );
      case "search":
        return (
          <div className="search-results-container">
            <h2>{isSearching ? "نتایج جستجو" : "جستجو"}</h2>
            {searchResults.length > 0 ? (
              <div className="search-results-list">
                {searchResults.map((result, index) => (
                  <div 
                    key={index} 
                    className="search-result-item"
                    onClick={() => goToView(result.viewName)}
                  >
                    <div className="search-result-icon">
                      {result.type === 'article' ? <FaBook /> : <FaClipboardList />}
                    </div>
                    <div className="search-result-content">
                      <h3>{result.title}</h3>
                      <p>{result.description}</p>
                      <span className="search-result-type">
                        {result.type === 'article' ? 'مقاله' : 'آزمون'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : isSearching ? (
              <div className="no-results">
                <p className="search-tip">نتیجه‌ای یافت نشد</p>
                <p className="search-tip">لطفاً با کلمات کلیدی دیگری جستجو کنید.</p>
              </div>
            ) : (
              <div className="search-instructions">
                <p className="search-tip">برای جستجو، عبارت مورد نظر خود را وارد کنید.</p>
                <p className="search-tip">می‌توانید در مقالات، آزمون‌ها و دسته‌بندی‌ها جستجو کنید.</p>
              </div>
            )}
          </div>
        );
      default:
        return <h2>صفحه نامعتبر</h2>;
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      {/* هدر برنامه */}
      <header className="top-bar">
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <FaBars className="bottom-nav-icon" />
        </button>

        <div className="search-container">
          <SearchBar onSearch={handleSearch} searchResults={searchResults} />
        </div>

        <div 
          className="top-bar-circle-image" 
          title={translations.mentalHealth || "سلامت روان"} 
          onClick={() => goToView("MentalHealthTestActive")}
        ></div>

        <div className="login-section">
          {!["guide", "tests", "reading", "settings", "categories", "login"].includes(currentView) ? (
            <button className="back-btn" onClick={goBackView} aria-label="Back">
              <FaArrowRight className="bottom-nav-icon" />
            </button>
          ) : (
            <button onClick={() => goToView("login")} className="login-gmail-button" aria-label="Login">
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google Icon"
                style={{ width: "24px", height: "24px" }}
                className="google-icon"
              />
            </button>
          )}
        </div>
      </header>

      {/* منوی کناری - always on right side regardless of language */}
      <Sidebar isOpen={menuOpen} goToView={goToView} setMenuOpen={setMenuOpen} />

      {/* محتوای اصلی */}
      <main className="content">{renderContent()}</main>

      {/* نوبری پایین */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.view}
            className={`bottom-nav-button ${currentView === item.view ? "active" : ""}`}
            onClick={() => goToView(item.view)}
          >
            {item.icon}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;