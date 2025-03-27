import { FaQuestionCircle, FaBook, FaCog, FaThList, FaCheckCircle, FaUser, FaShoppingCart, FaBookOpen, FaHeart, FaTimes, FaHome, FaClipboardCheck, FaBell } from "react-icons/fa";
import './Sidebar.css';
import { useLanguage } from "../i18n/LanguageContext";

function Sidebar({ isOpen, goToView, setMenuOpen }) {
  const { translations } = useLanguage();
  
  // Handle close sidebar
  const handleClose = () => {
    if (setMenuOpen) {
      setMenuOpen(false);
    }
  };
  
  // Get current view options
  const views = {
    main: 'guide',
    reading: 'reading',
    tests: 'tests',
    categories: 'categories',
    settings: 'settings',
    messages: 'messages',
    profile: 'profile',
    thankyou: 'thankYouPage'
  };

  const handleItemClick = (view) => {
    goToView(view);
    handleClose();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{ direction: 'rtl' }}>
      <div className="sidebar-header">
        <button className="close-button" onClick={handleClose}>
          <FaTimes />
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li onClick={() => handleItemClick(views.main)}>
            <FaHome className="menu-icon" />
            <span>{translations.guide}</span>
          </li>
          
          <li onClick={() => handleItemClick(views.reading)}>
            <FaBook className="menu-icon" />
            <span>{translations.reading}</span>
          </li>
          
          <li onClick={() => handleItemClick(views.tests)}>
            <FaClipboardCheck className="menu-icon" />
            <span>{translations.tests}</span>
          </li>
          
          <li onClick={() => handleItemClick(views.categories)}>
            <FaThList className="menu-icon" />
            <span>{translations.categories}</span>
          </li>
          
          <li onClick={() => handleItemClick(views.settings)}>
            <FaCog className="menu-icon" />
            <span>{translations.settings}</span>
          </li>
          
          <li onClick={() => handleItemClick(views.profile)}>
            <FaUser className="menu-icon" />
            <span>{translations.profile}</span>
          </li>
          
          <li onClick={() => handleItemClick(views.messages)}>
            <FaBell className="menu-icon" />
            <span>{translations.messages}</span>
          </li>
          
          <li onClick={() => handleItemClick('authoredBooks')}>
            <FaBookOpen className="menu-icon" />
            <span>{translations.authoredBooks}</span>
          </li>
          
          <li onClick={() => handleItemClick(views.thankyou)}>
            <FaHeart className="menu-icon" />
            <span>{translations.thankyou || "تشکر ویژه"}</span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
