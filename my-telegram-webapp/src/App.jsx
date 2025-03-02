import { useState, useEffect } from "react";
import "./App.css";
import { FaBars, FaQuestionCircle, FaBook, FaCog, FaThList, FaCheckCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import Sidebar from "./components/Sidebar";
import ReadingSection from "./components/ReadingSection";
import TestsSection from "./components/TestsSection";
import GuideContent from "./GuideContent";
import SettingsSection from "./components/SettingsSection";

import EQBarOnTest from './components/tests/SpecializedTests/EQBarOnTest';

import TestContainer from "./components/tests/TestContainer";
import TestContainerAnxiety from "./components/tests/TestContainerAnxiety";
import OCDTestContainer from "./components/tests/OCDTestContainer";
import TestContainerBipolar from "./components/tests/TestContainerBipolar";
import TestContainerAddiction from "./components/tests/TestContainerAddiction";
import RelationshipReadinessTest from "./components/tests/RelationshipReadinessTest";
import TestPage from "./components/tests/TestPage";
import SpecializedTests from "./components/tests/SpecializedTests";

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

function App() {
  const [currentView, setCurrentView] = useState("guide");
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewHistoryState, setViewHistoryState] = useState(["guide"]);
  const [fontSize, setFontSize] = useState(parseInt(localStorage.getItem("fontSize")) || 16);

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
      default:
        return <h2>صفحه نامعتبر</h2>;
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      {/* هدر برنامه */}
      <header className="top-bar">
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars className="bottom-nav-icon" />
        </button>

        <div className="top-bar-circle-image"></div>

        {!["guide", "tests", "reading", "settings", "categories", "login"].includes(currentView) && (
          <button className="back-btn" onClick={goBackView}>
            <span className="bottom-nav-icon">بازگشت</span>
          </button>
        )}

        <div className="login-section">
          <button onClick={() => goToView("login")} className="login-gmail-button">
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google Icon"
              style={{ width: "24px", height: "24px" }}
              className="google-icon"
            />
          </button>
        </div>
      </header>

      {/* منوی کناری */}
      {menuOpen && <Sidebar goToView={goToView} setMenuOpen={setMenuOpen} />}

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