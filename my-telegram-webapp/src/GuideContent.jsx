import { Link } from 'react-router-dom';
import { ui } from './i18n/ui';
import { FaUserTie, FaGlobe, FaTelegram, FaInstagram, FaYoutube } from "react-icons/fa";
import { useLanguage } from "./i18n/LanguageContext";
import "./GuideContent.css"; // استایل‌ها رو جداگانه ایمپورت می‌کنیم

function GuideContent() {
  // Get translations
  const { translations, language } = useLanguage();
  
  // دیتای بخش "درباره من"
  const aboutMeItems = [
    { text: translations.germanTeacher },
    { text: translations.psychologyGraduate },
    { text: translations.programming },
  ];

  // دیتای بخش "راه‌های ارتباط" با پشتیبانی چندزبانه
  const contactLinks = [
    {
      href: "https://arianshoara.github.io/arian/",
      icon: <FaGlobe className="contact-icon" />,
      text: translations.myWebsite,
    },
    {
      href: "https://t.me/ariansho",
      icon: <FaTelegram className="contact-icon" />,
      text: `${translations.telegram}: @ariansho`,
    },
    {
      href: "https://t.me/rozgarmanarian",
      icon: <FaTelegram className="contact-icon" />,
      text: `${translations.telegramChannel}: @rozgarmanarian`,
    },
    {
      href: "https://www.instagram.com/arian__sho2",
      icon: <FaInstagram className="contact-icon" />,
      text: `${translations.instagram}: arian__sho2`,
    },
    {
      href: "https://www.youtube.com/@unipsydeu",
      icon: <FaYoutube className="contact-icon" />,
      text: `${translations.youtube}: unipsydeu`,
    },
  ];

  return (
    <div className="guide-content">
      <section className="hero-section">
        <div className="hero-text">
          <small>{ui[language].brand}</small>
          <h1>{translations.heroTitle}</h1>
          <p className="subtitle">
            {translations.heroSubtitle}
          </p>
          <div className="home-actions"><Link to="/reading">{ui[language].reading}</Link><Link to="/tests">{ui[language].tests}</Link><Link to="/articles/self-awareness">{ui[language].recommended}</Link></div>
        </div>
        <div className="hero-image">
          <img 
            src="/images/path-to-your-hero-image.jpg" 
            alt="" width="240" height="240"
            className="hero-img" 
          />
        </div>
      </section>

      <section className="about-me-section">
        <div className="profile-image-container">
          <img src="/images/profile-image.jpg" alt="آرین شعرا" width="80" height="80" loading="lazy" className="profile-image" />
        </div>
        <h3>
          <FaUserTie className="section-icon" /> {translations.aboutMe}
        </h3>
        <p>
          {translations.aboutMeDesc}
        </p>
        <ul className="about-me-list">
          {aboutMeItems.map((item, index) => (
            <li key={index}>{item.text}</li>
          ))}
        </ul>
      </section>

      <section className="contact-section">
        <h3>🔗 {translations.contactWays}</h3>
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
