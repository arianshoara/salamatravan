import React from "react";
import { FaBrain, FaSadTear, FaStar } from "react-icons/fa";
import "./TestsSection.css"; // استایل‌ها رو جداگانه ایمپورت می‌کنیم

function TestsSection({ goToView }) {
  return (
    <div className="tests-content">
      <h2>تست‌های روانشناسی</h2>
      <div className="tests-list">
        <div className="test-item">
          <h3
            onClick={() => goToView("MentalHealthTestActive")}
            style={{ cursor: "pointer" }}
            className="test-title"
          > 
            <FaBrain className="bottom-nav-icon" /> تست اندازه گیری سلامت روان
          </h3>
        </div>
        <div className="test-item">
          <h3
            onClick={() => goToView("anxietyTestActive")}
            style={{ cursor: "pointer" }}
            className="test-title"
          > 
            <FaBrain className="bottom-nav-icon" /> تست اضطراب
          </h3>
        </div>
        <div className="test-item">
          <h3
            onClick={() => goToView("depressionTestActive")}
            style={{ cursor: "pointer" }}
            className="test-title"  
          >
            <FaSadTear className="bottom-nav-icon" /> تست افسردگی
          </h3>
        </div>
        <div className="test-item">
          <h3
            onClick={() => goToView("OCDTestActive")}
            style={{ cursor: "pointer" }}
            className="test-title"
          >
            <FaSadTear className="bottom-nav-icon" /> تست وسواس فکری-عملی
          </h3>
        </div>
        <div className="test-item">
          <h3
            onClick={() => goToView("BipolarTestActive")}
            style={{ cursor: "pointer" }}
            className="test-title"
          >
            <FaSadTear className="bottom-nav-icon" /> تست اختلال دو قطبی MDQ
          </h3>
        </div>
        <div className="test-item">
          <h3
            onClick={() => goToView("AddictionTestActive")}
            style={{ cursor: "pointer" }}
            className="test-title"
          >
            <FaSadTear className="bottom-nav-icon" /> تست اعتیاد
          </h3>
        </div>
        <div className="test-item">
          <h3
            onClick={() => goToView("RelationshipReadinessTestActive")}
            style={{ cursor: "pointer" }}
            className="test-title"
          >
            <FaSadTear className="bottom-nav-icon" /> تست آمادگی رابطه
          </h3>
        </div>
        <div className="test-item">
          <h3
            onClick={() => goToView("bigFiveTestActive")}
            style={{ cursor: "pointer" }}
            className="test-title"
          >
            <FaSadTear className="bottom-nav-icon" /> تست شخصیت
          </h3>
        </div>
      </div>

      {/* خط جداکننده */}
      <div className="separator"></div>

      {/* آیتم تست‌های تخصصی */}
      <div className="specialized-tests-section">
        <h3
          onClick={() => goToView("specializedTestsActive")}
          style={{ cursor: "pointer" }}
          className="test-title"
        >
          <FaStar className="bottom-nav-icon" /> تست‌های تخصصی
        </h3>
      </div>
    </div>
  );
}

export default TestsSection;