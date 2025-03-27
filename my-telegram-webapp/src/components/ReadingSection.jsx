import React from "react";
import "./ReadingSection.css"; // استایل‌ها رو جداگانه ایمپورت می‌کنیم
import { useLanguage } from "../i18n/LanguageContext";

function ReadingSection({ goToView }) {
  const { translations, language } = useLanguage();
  
  // Define reading items based on language
  const readingItems = [
    {
      id: "anxietyImpactArticle",
      title: {
        fa: "🧠 تاثیرات اضطراب بر عملکرد روزمره",
        en: "🧠 Effects of Anxiety on Daily Performance",
        de: "🧠 Auswirkungen von Angst auf die tägliche Leistung"
      },
      description: {
        fa: "چگونه اضطراب می‌تواند بر تصمیم‌گیری و عملکرد کلی ما تأثیر بگذارد؟",
        en: "How can anxiety affect our decision-making and overall performance?",
        de: "Wie kann Angst unsere Entscheidungsfindung und allgemeine Leistung beeinflussen?"
      }
    },
    {
      id: "selfAwarenessArticle",
      title: {
        fa: "📚 نقش خودآگاهی در رشد فردی",
        en: "📚 The Role of Self-Awareness in Personal Growth",
        de: "📚 Die Rolle des Selbstbewusstseins bei der persönlichen Entwicklung"
      },
      description: {
        fa: "چگونه شناخت بهتر از خود می‌تواند زندگی ما را بهبود بخشد؟",
        en: "How can better self-knowledge improve our lives?",
        de: "Wie kann bessere Selbsterkenntnis unser Leben verbessern?"
      }
    },
    {
      id: "depressionVsSadnessArticle",
      title: {
        fa: "🧐 تفاوت بین افسردگی و ناراحتی موقتی",
        en: "🧐 The Difference Between Depression and Temporary Sadness",
        de: "🧐 Der Unterschied zwischen Depression und vorübergehender Traurigkeit"
      },
      description: {
        fa: "نشانه‌های افسردگی بالینی در مقایسه با احساس ناراحتی طبیعی چیست؟",
        en: "What are the signs of clinical depression compared to natural feelings of sadness?",
        de: "Was sind die Anzeichen einer klinischen Depression im Vergleich zu natürlichen Gefühlen der Traurigkeit?"
      }
    },
    {
      id: "positivePsychologyArticle",
      title: {
        fa: "💡 مبانی روانشناسی مثبت‌گرا",
        en: "💡 Fundamentals of Positive Psychology",
        de: "💡 Grundlagen der positiven Psychologie"
      },
      description: {
        fa: "رویکردهای مختلف روانشناسی مثبت‌گرا و چگونگی تأثیر آن بر زندگی ما.",
        en: "Different approaches to positive psychology and how it affects our lives.",
        de: "Verschiedene Ansätze der positiven Psychologie und wie sie unser Leben beeinflusst."
      }
    },
    {
      id: "betterDecisionMakingArticle",
      title: {
        fa: "⚖️ چگونه تصمیمات بهتری بگیریم؟",
        en: "⚖️ How to Make Better Decisions?",
        de: "⚖️ Wie trifft man bessere Entscheidungen?"
      },
      description: {
        fa: "راهکارهای علمی برای بهبود فرآیند تصمیم‌گیری و کاهش اشتباهات شناختی.",
        en: "Scientific strategies to improve decision-making and reduce cognitive errors.",
        de: "Wissenschaftliche Strategien zur Verbesserung der Entscheidungsfindung und Reduzierung kognitiver Fehler."
      }
    },
    {
      id: "stressAnxietyManagementArticle",
      title: {
        fa: "🧘‍♀️ مدیریت استرس و اضطراب",
        en: "🧘‍♀️ Stress and Anxiety Management",
        de: "🧘‍♀️ Stress- und Angstmanagement"
      },
      description: {
        fa: "تکنیک‌ها و راهکارهای موثر برای مدیریت استرس روزمره و کاهش اضطراب.",
        en: "Effective techniques and strategies for managing daily stress and reducing anxiety.",
        de: "Effektive Techniken und Strategien zum Umgang mit täglichem Stress und zur Reduzierung von Angst."
      }
    },
    {
      id: "mindfulnessImportanceArticle",
      title: {
        fa: "🧘 اهمیت ذهن‌آگاهی (Mindfulness)",
        en: "🧘 The Importance of Mindfulness",
        de: "🧘 Die Bedeutung der Achtsamkeit"
      },
      description: {
        fa: "مفهوم ذهن‌آگاهی، فواید آن برای سلامت روان و تمرین‌های کاربردی.",
        en: "The concept of mindfulness, its benefits for mental health, and practical exercises.",
        de: "Das Konzept der Achtsamkeit, ihre Vorteile für die psychische Gesundheit und praktische Übungen."
      }
    },
    {
      id: "cognitiveBiasesArticle",
      title: {
        fa: "🤔 سوگیری‌های شناختی در زندگی روزمره",
        en: "🤔 Cognitive Biases in Everyday Life",
        de: "🤔 Kognitive Verzerrungen im Alltag"
      },
      description: {
        fa: "معرفی انواع سوگیری‌های شناختی رایج و تاثیر آن‌ها بر تصمیم‌گیری‌ها و تفکر ما.",
        en: "Introduction to common cognitive biases and their impact on our decision-making and thinking.",
        de: "Einführung in häufige kognitive Verzerrungen und ihre Auswirkungen auf unsere Entscheidungsfindung und unser Denken."
      }
    },
    {
      id: "emotionalResilienceArticle",
      title: {
        fa: "💪 تقویت تاب‌آوری هیجانی",
        en: "💪 Strengthening Emotional Resilience",
        de: "💪 Stärkung der emotionalen Widerstandsfähigkeit"
      },
      description: {
        fa: "چگونه تاب‌آوری هیجانی را برای مقابله با مشکلات و فشارهای زندگی افزایش دهیم.",
        en: "How to increase emotional resilience to cope with life's problems and pressures.",
        de: "Wie man die emotionale Widerstandsfähigkeit erhöht, um mit den Problemen und Belastungen des Lebens fertig zu werden."
      }
    },
    {
      id: "philosophyOfHappinessArticle",
      title: {
        fa: "😊 فلسفه خوشبختی",
        en: "😊 Philosophy of Happiness",
        de: "😊 Philosophie des Glücks"
      },
      description: {
        fa: "دیدگاه‌های مختلف فلسفی درباره خوشبختی و عوامل موثر بر زندگی معنادار.",
        en: "Different philosophical perspectives on happiness and factors affecting a meaningful life.",
        de: "Verschiedene philosophische Perspektiven auf Glück und Faktoren, die ein sinnvolles Leben beeinflussen."
      }
    }
  ];

  return (
    <div className="reading-section">
      <h2>📖 {translations.reading}</h2>
      <div className="reading-list">
        {readingItems.map((item) => (
          <div className="reading-item" key={item.id}>
            <h3
              onClick={() => goToView(item.id)}
              style={{ cursor: "pointer" }}
              className="reading-title"
            >
              {item.title[language]}
            </h3>
            <p>{item.description[language]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReadingSection;