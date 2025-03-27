import { useState, useEffect } from "react";
import { FaBars, FaHome, FaUser, FaBook, FaChartBar } from "react-icons/fa";
import Messages from "./components/Messages";
import MessageIndicator from "./components/MessageIndicator";
import { MessageProvider, useMessages } from './contexts/MessageContext';
import { useLanguage } from "./i18n/LanguageContext";
import { MessageIndicatorProvider, useMessageIndicator } from './contexts/MessageIndicatorContext';
import { Sidebar } from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import "./App.css";

// Navigation items configuration
const navItems = [
  { view: 'home', icon: <FaHome className="bottom-nav-icon" />, label: 'خانه' },
  { view: 'profile', icon: <FaUser className="bottom-nav-icon" />, label: 'پروفایل' },
  { view: 'guide', icon: <FaBook className="bottom-nav-icon" />, label: 'راهنما' },
  { view: 'results', icon: <FaChartBar className="bottom-nav-icon" />, label: 'نتایج' }
];

function AppContent() {
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('guide');
  const [userName, setUserName] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const { addMessage } = useMessages();
  const { translations } = useLanguage();
  const { showMessageIndicator } = useMessageIndicator();

  // Add initial welcome message
  useEffect(() => {
    if (!userName) {
      addMessage({
        type: 'welcome',
        text: 'به سامانه سلامت روان خوش آمدید. برای شروع می‌توانید یکی از تست‌های ما را انتخاب کنید.',
        details: {
          welcomeType: 'initial',
          timestamp: new Date().toISOString()
        }
      });
    }
  }, []);

  // Handle user login
  const handleLogin = (user) => {
    setUserName(user.name);
    addMessage({
      type: 'welcome',
      text: `${user.name} عزیز، خوش آمدید به سامانه سلامت روان`,
      details: {
        welcomeType: 'login',
        timestamp: new Date().toISOString()
      }
    });
  };

  // Handle test completion
  const handleTestComplete = (testName, score, details) => {
    addMessage({
      type: 'test_result',
      text: `نتیجه تست ${testName} شما آماده است`,
      details: {
        testName,
        score,
        timestamp: new Date().toISOString(),
        ...details
      }
    });
  };

  const goToView = (view) => {
    setCurrentView(view);
    setMenuOpen(false);
  };

  const handleSearch = (query) => {
    // Handle search functionality
    console.log('Searching for:', query);
  };

  // Render content based on current view
  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <div>صفحه اصلی</div>;
      case 'profile':
        return <div>پروفایل</div>;
      case 'guide':
        return <div>راهنما</div>;
      case 'results':
        return <div>نتایج</div>;
      default:
        return <div>صفحه اصلی</div>;
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`} dir="rtl">
      {/* هدر برنامه */}
      <header className="top-bar">
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <FaBars className="bottom-nav-icon" />
        </button>

        {showMessageIndicator && (
          <MessageIndicator onClick={() => setIsMessagesOpen(!isMessagesOpen)} />
        )}

        <div 
          className="top-bar-circle-image" 
          title={translations.mentalHealth || "سلامت روان"} 
          onClick={() => goToView("MentalHealthTestActive")}
        ></div>

        <div className="search-container">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="login-section">
          <button onClick={() => goToView("login")} className="login-gmail-button" aria-label="Login">
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google Icon"
              className="google-icon"
            />
          </button>
        </div>
      </header>

      {/* Messages Component */}
      <Messages 
        isOpen={isMessagesOpen} 
        onClose={() => setIsMessagesOpen(false)} 
        userName={userName}
      />

      {/* منوی کناری */}
      <Sidebar 
        isOpen={menuOpen} 
        goToView={goToView} 
        setMenuOpen={setMenuOpen} 
        onLogin={handleLogin}
      />

      {/* محتوای اصلی */}
      <main className="content">
        {renderContent()}
      </main>

      {/* نوبری پایین */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.view}
            className={`bottom-nav-button ${currentView === item.view ? "active" : ""}`}
            onClick={() => goToView(item.view)}
            aria-label={item.label}
          >
            {item.icon}
          </button>
        ))}
      </nav>
    </div>
  );
}

function App() {
  return (
    <MessageProvider>
      <MessageIndicatorProvider>
        <AppContent />
      </MessageIndicatorProvider>
    </MessageProvider>
  );
}

export default App; 