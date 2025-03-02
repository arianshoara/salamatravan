import { FaQuestionCircle, FaBook, FaCog, FaThList, FaCheckCircle, FaUser, FaShoppingCart, FaBookOpen } from "react-icons/fa";
import './Sidebar.css';



function Sidebar({ goToView, setMenuOpen }) {
  return (
    <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
      <div className="menu-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="menu-item" onClick={() => goToView("guide")}> 
          <FaQuestionCircle className="menu-icon" /> راهنما
        </div>
        <div className="menu-item" onClick={() => goToView("reading")}> 
          <FaBook className="menu-icon" /> خواندنی‌ها
        </div>
        <div className="menu-item" onClick={() => goToView("tests")}> 
          <FaCheckCircle className="menu-icon" /> تست‌ها
        </div>
        <div className="menu-item" onClick={() => goToView("categories")}> 
          <FaThList className="menu-icon" /> دسته‌بندی‌ها
        </div>
        <div className="menu-item" onClick={() => goToView("settings")}> 
          <FaCog className="menu-icon" /> تنظیمات
        </div>
        <div className="menu-item" onClick={() => goToView("authoredBooks")}> 
          <FaBookOpen className="menu-icon" /> کتاب‌های تألیف شده
        </div>
        <div className="menu-item" onClick={() => goToView("profile")}> 
          <FaUser className="menu-icon" /> پروفایل
        </div>
        <div className="menu-item" onClick={() => goToView("cart")}> 
          <FaShoppingCart className="menu-icon" /> سبد خرید
        </div>
      </div>
    </div>
  );
}

      
      
export default Sidebar;
