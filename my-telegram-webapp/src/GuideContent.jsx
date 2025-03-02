import React from "react";
import { FaUserTie, FaGlobe, FaTelegram, FaInstagram, FaYoutube } from "react-icons/fa";
import profileImage from "/assets/profile-image.jpg"; // مسیر عکس پروفایل
import pathHeroImage from "/assets/path-to-your-hero-image.jpg"; // مسیر عکس هیرو
import "./GuideContent.css"; // استایل‌ها رو جداگانه ایمپورت می‌کنیم

function GuideContent({ goToView }) {
  // دیتای بخش "درباره من"
  const aboutMeItems = [
    { text: "👨🏻‍🏫 مدرس زبان آلمانی" },
    { text: "🎓 دانش‌آموخته کارشناسی روانشناسی" },
    { text: "💻 در حال پیشرفت در زمینه برنامه‌نویسی" },
  ];

  // دیتای بخش "راه‌های ارتباط"
  const contactLinks = [
    {
      href: "https://arianshoara.github.io/arian/",
      icon: <FaGlobe className="contact-icon" />,
      text: "سایتم",
    },
    {
      href: "https://t.me/ariansho",
      icon: <FaTelegram className="contact-icon" />,
      text: "تلگرام: @ariansho",
    },
    {
      href: "https://t.me/rozgarmanarian",
      icon: <FaTelegram className="contact-icon" />,
      text: "کانال تلگرام: @rozgarmanarian",
    },
    {
      href: "https://www.instagram.com/arian__sho2",
      icon: <FaInstagram className="contact-icon" />,
      text: "اینستاگرام: arian__sho2",
    },
    {
      href: "https://www.youtube.com/@unipsydeu",
      icon: <FaYoutube className="contact-icon" />,
      text: "یوتیوب: unipsydeu",
    },
  ];

  return (
    <div className="guide-content">
      <section className="hero-section">
        <div className="hero-text">
          <h2>همراه شما در مسیر خودشناسی و بهبود فردی</h2>
          <p className="subtitle">
            مطالب و ابزارهای روانشناسی کاربردی برای زندگی روزمره شما.
          </p>
          <button
            className="hero-button"
            onClick={() => goToView("reading")}
          >
            شروع یادگیری
          </button>
        </div>
        <div className="hero-image">
          <img src={pathHeroImage} alt="تصویر بخش قهرمان" />
        </div>
      </section>

      <section className="about-me-section">
        <div className="profile-image-container">
          <img
            src={profileImage}
            alt="عکس پروفایل آرین شعرا"
            className="profile-image"
          />
        </div>
        <h3>
          <FaUserTie className="section-icon" /> درباره آرین شعرا
        </h3>
        <p>
          سلام! من آرین شعرا هستم، مدرس زبان آلمانی، دانش‌آموخته روانشناسی و
          علاقه‌مند به برنامه‌نویسی. هدفم از ایجاد این وبسایت، ارائه مطالب و
          ابزارهای کاربردی در زمینه روانشناسی و خودشناسی به زبان فارسیه.
          امیدوارم این مجموعه بتونه گامی مثبت در جهت بهبود کیفیت زندگی شما باشه.
        </p>
        <ul className="about-me-list">
          {aboutMeItems.map((item, index) => (
            <li key={index}>{item.text}</li>
          ))}
        </ul>
      </section>

      <section className="contact-section">
        <h3>🔗 راه‌های ارتباط با من</h3>
        <ul className="contact-list">
          {contactLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon} {link.text}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default GuideContent;