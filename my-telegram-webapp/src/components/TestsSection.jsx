import React from "react";
import { FaBrain, FaSadTear, FaStar } from "react-icons/fa";
import "./TestsSection.css"; // استایل‌ها رو جداگانه ایمپورت می‌کنیم
import { useLanguage } from "../i18n/LanguageContext";

function TestsSection({ goToView }) {
  const { translations, language } = useLanguage();
  
  // Define tests data structure with multi-language support
  const testsData = [
    {
      id: "MentalHealthTestActive",
      icon: <FaBrain className="bottom-nav-icon" />,
      title: {
        fa: "تست اندازه گیری سلامت روان",
        en: "Mental Health Assessment Test",
        de: "Psychische Gesundheit Bewertungstest"
      }
    },
    {
      id: "anxietyTestActive",
      icon: <FaBrain className="bottom-nav-icon" />,
      title: {
        fa: "تست اضطراب",
        en: "Anxiety Test",
        de: "Angsttest"
      }
    },
    {
      id: "depressionTestActive",
      icon: <FaSadTear className="bottom-nav-icon" />,
      title: {
        fa: "تست افسردگی",
        en: "Depression Test",
        de: "Depressionstest"
      }
    },
    {
      id: "OCDTestActive",
      icon: <FaSadTear className="bottom-nav-icon" />,
      title: {
        fa: "تست وسواس فکری-عملی",
        en: "OCD Test",
        de: "Zwangsstörungstest"
      }
    },
    {
      id: "BipolarTestActive",
      icon: <FaSadTear className="bottom-nav-icon" />,
      title: {
        fa: "تست اختلال دو قطبی MDQ",
        en: "Bipolar Disorder Test (MDQ)",
        de: "Bipolare Störungstest (MDQ)"
      }
    },
    {
      id: "AddictionTestActive",
      icon: <FaSadTear className="bottom-nav-icon" />,
      title: {
        fa: "تست اعتیاد",
        en: "Addiction Test",
        de: "Suchttest"
      }
    },
    {
      id: "RelationshipReadinessTestActive",
      icon: <FaSadTear className="bottom-nav-icon" />,
      title: {
        fa: "تست آمادگی رابطه",
        en: "Relationship Readiness Test",
        de: "Beziehungsbereitschaftstest"
      }
    },
    {
      id: "bigFiveTestActive",
      icon: <FaSadTear className="bottom-nav-icon" />,
      title: {
        fa: "تست شخصیت",
        en: "Personality Test",
        de: "Persönlichkeitstest"
      }
    }
  ];

  return (
    <div className="tests-content">
      <h2>{translations.tests}</h2>
      <div className="tests-list">
        {testsData.map((test) => (
          <div className="test-item" key={test.id}>
            <h3
              onClick={() => goToView(test.id)}
              style={{ cursor: "pointer" }}
              className="test-title"
            > 
              {test.icon} {test.title[language]}
            </h3>
          </div>
        ))}
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
          <FaStar className="bottom-nav-icon" /> 
          {language === 'fa' ? 'تست‌های تخصصی' : 
           language === 'en' ? 'Specialized Tests' : 
           'Spezialisierte Tests'}
        </h3>
      </div>
    </div>
  );
}

export default TestsSection;