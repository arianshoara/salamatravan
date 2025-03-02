import React from "react";
import "./ReadingSection.css"; // استایل‌ها رو جداگانه ایمپورت می‌کنیم

function ReadingSection({ goToView }) {
  return (
    <div className="reading-section">
      <h2>📖 خواندنی‌های روانشناسی و فلسفه</h2>
      <div className="reading-list">
        {/* مقالات قبلی */}
        <div className="reading-item">
          <h3
            onClick={() => goToView("anxietyImpactArticle")}
            style={{ cursor: "pointer" }}
            className="reading-title"
          >
            🧠 تاثیرات اضطراب بر عملکرد روزمره
          </h3>
          <p>چگونه اضطراب می‌تواند بر تصمیم‌گیری و عملکرد کلی ما تأثیر بگذارد؟</p>
        </div>
        <div className="reading-item">
          <h3
            onClick={() => goToView("selfAwarenessArticle")}
            style={{ cursor: "pointer" }}
            className="reading-title"
          >
            📚 نقش خودآگاهی در رشد فردی
          </h3>
          <p>چگونه شناخت بهتر از خود می‌تواند زندگی ما را بهبود بخشد؟</p>
        </div>
        <div className="reading-item">
          <h3
            onClick={() => goToView("depressionVsSadnessArticle")}
            style={{ cursor: "pointer" }}
            className="reading-title"
          >
            🧐 تفاوت بین افسردگی و ناراحتی موقتی
          </h3>
          <p>نشانه‌های افسردگی بالینی در مقایسه با احساس ناراحتی طبیعی چیست؟</p>
        </div>
        <div className="reading-item">
          <h3
            onClick={() => goToView("positivePsychologyArticle")}
            style={{ cursor: "pointer" }}
            className="reading-title"
          >
            💡 مبانی روانشناسی مثبت‌گرا
          </h3>
          <p>رویکردهای مختلف روانشناسی مثبت‌گرا و چگونگی تأثیر آن بر زندگی ما.</p>
        </div>
        <div className="reading-item">
          <h3
            onClick={() => goToView("betterDecisionMakingArticle")}
            style={{ cursor: "pointer" }}
            className="reading-title"
          >
            ⚖️ چگونه تصمیمات بهتری بگیریم؟
          </h3>
          <p>راهکارهای علمی برای بهبود فرآیند تصمیم‌گیری و کاهش اشتباهات شناختی.</p>
        </div>

        {/* مقالات جدید - اضافه شده */}
        <div className="reading-item">
          <h3
            onClick={() => goToView("stressAnxietyManagementArticle")}
            style={{ cursor: "pointer" }}
            className="reading-title"
          >
            🧘‍♀️ مدیریت استرس و اضطراب
          </h3>
          <p>تکنیک‌ها و راهکارهای موثر برای مدیریت استرس روزمره و کاهش اضطراب.</p>
        </div>
        <div className="reading-item">
          <h3
            onClick={() => goToView("mindfulnessImportanceArticle")}
            style={{ cursor: "pointer" }}
            className="reading-title"
          >
            🧘 اهمیت ذهن‌آگاهی (Mindfulness)
          </h3>
          <p>مفهوم ذهن‌آگاهی، فواید آن برای سلامت روان و تمرین‌های کاربردی.</p>
        </div>
        <div className="reading-item">
          <h3
            onClick={() => goToView("cognitiveBiasesArticle")}
            style={{ cursor: "pointer" }}
            className="reading-title"
          >
            🤔 سوگیری‌های شناختی در زندگی روزمره
          </h3>
          <p>معرفی انواع سوگیری‌های شناختی رایج و تاثیر آن‌ها بر تصمیم‌گیری‌ها و تفکر ما.</p>
        </div>
        <div className="reading-item">
          <h3
            onClick={() => goToView("emotionalResilienceArticle")}
            style={{ cursor: "pointer" }}
            className="reading-title"
          >
            💪 تقویت تاب‌آوری هیجانی
          </h3>
          <p>چگونه تاب‌آوری هیجانی را برای مقابله با مشکلات و فشارهای زندگی افزایش دهیم.</p>
        </div>
        <div className="reading-item">
          <h3
            onClick={() => goToView("philosophyOfHappinessArticle")}
            style={{ cursor: "pointer" }}
            className="reading-title"
          >
            😊 فلسفه خوشبختی
          </h3>
          <p>دیدگاه‌های مختلف فلسفی درباره خوشبختی و عوامل موثر بر زندگی معنادار.</p>
        </div>
        <div className="reading-item">
          <h3
            onClick={() => goToView("socialMediaMentalHealthArticle")}
            style={{ cursor: "pointer" }}
            className="reading-title"
          >
            📱 تاثیر شبکه‌های اجتماعی بر سلامت روان
          </h3>
          <p>بررسی اثرات مثبت و منفی شبکه‌های اجتماعی و راهکارهای استفاده سالم.</p>
        </div>
        <div className="reading-item">
          <h3
            onClick={() => goToView("ethicalDecisionMakingArticle")}
            style={{ cursor: "pointer" }}
            className="reading-title"
          >
            ⚖️ تصمیم‌گیری اخلاقی در زندگی
          </h3>
          <p>مبانی و اصول تصمیم‌گیری اخلاقی و چالش‌های رایج در زندگی روزمره.</p>
        </div>
        <div className="reading-item">
          <h3
            onClick={() => goToView("meaningOfLifeArticle")}
            style={{ cursor: "pointer" }}
            className="reading-title"
          >
            ❓ معنای زندگی از دیدگاه فلسفی
          </h3>
          <p>پرسش‌های اساسی درباره معنای زندگی و دیدگاه‌های مختلف فلسفی.</p>
        </div>
        <div className="reading-item">
          <h3
            onClick={() => goToView("healthyCommunicationSkillsArticle")}
            style={{ cursor: "pointer" }}
            className="reading-title"
          >
            🗣️ مهارت‌های ارتباطی سالم
          </h3>
          <p>اصول ارتباط موثر، گوش دادن فعال و راهکارهای بهبود روابط بین فردی.</p>
        </div>
        <div className="reading-item">
          <h3
            onClick={() => goToView("overcomingProcrastinationArticle")}
            style={{ cursor: "pointer" }}
            className="reading-title"
          >
            ⏱️ غلبه بر اهمال‌کاری (Procrastination)
          </h3>
          <p>علل اهمال‌کاری و تکنیک‌های عملی برای افزایش بهره‌وری و غلبه بر آن.</p>
        </div>
      </div>
    </div>
  );
}

export default ReadingSection;