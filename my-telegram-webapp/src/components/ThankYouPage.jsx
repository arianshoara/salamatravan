import React, { useEffect } from "react";
import "./ThankYouPage.css";
import { useLanguage } from "../i18n/LanguageContext";

function ThankYouPage() {
  const { translations, language } = useLanguage();
  
  // متن‌های چندزبانه
  const texts = {
    title: {
      fa: "❤️ تشکر ویژه ❤️",
      en: "❤️ Special Thanks ❤️",
      de: "❤️ Besonderer Dank ❤️"
    },
    thankYouMessage: {
      fa: "با تشکر ویژه از",
      en: "With special thanks to",
      de: "Mit besonderem Dank an"
    },
    personName: {
      fa: "صبا عشقم",
      en: "my beloved Saba",
      de: "meine geliebte Saba"
    },
    loveMessage: {
      fa: "برای تمام پشتیبانی‌ها و همراهی‌های بی‌نظیرت\nهر لحظه با تو بودن یک نعمت است ❤️",
      en: "For all your unparalleled support and companionship\nEvery moment with you is a blessing ❤️",
      de: "Für all deine unvergleichliche Unterstützung und Begleitung\nJeder Moment mit dir ist ein Segen ❤️"
    }
  };
  
  // ایجاد انیمیشن گل و قلب هنگام نمایش صفحه
  useEffect(() => {
    const container = document.querySelector('.thank-you-container');
    if (!container) return;
    
    // Create hearts animation
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDuration = `${Math.random() * 3 + 4}s`;
      heart.innerText = '❤️';
      container.appendChild(heart);
      
      // Remove heart after animation completes
      setTimeout(() => {
        if (heart.parentNode === container) {
          container.removeChild(heart);
        }
      }, 7000);
    };
    
    // Create flower animation
    const createFlower = () => {
      const flowers = ['🌷', '🌸', '🌹', '🌺', '🌻', '🌼'];
      const flower = document.createElement('div');
      flower.className = 'flower';
      flower.style.left = `${Math.random() * 100}%`;
      flower.style.animationDuration = `${Math.random() * 3 + 5}s`;
      flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
      container.appendChild(flower);
      
      // Remove flower after animation completes
      setTimeout(() => {
        if (flower.parentNode === container) {
          container.removeChild(flower);
        }
      }, 8000);
    };
    
    // Create hearts and flowers at intervals
    const heartInterval = setInterval(createHeart, 300);
    const flowerInterval = setInterval(createFlower, 600);
    
    // Create initial hearts and flowers
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        createHeart();
        if (i % 2 === 0) createFlower();
      }, i * 200);
    }
    
    // Clean up intervals on unmount
    return () => {
      clearInterval(heartInterval);
      clearInterval(flowerInterval);
    };
  }, []);

  // تبدیل متن چندخطی به پاراگراف با خط جدید
  const formatMessage = (message) => {
    return message.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < message.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        <h2 className="thank-you-title">{texts.title[language]}</h2>
        
        <div className="image-container">
          <img 
            src="/images/saba.jpg" 
            alt="Thank You" 
            className="thank-you-image" 
            style={{
              width: '250px',
              height: '250px',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '5px solid #ff80ab',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
            }}
          />
        </div>
        
        <p className="thank-you-message">
          {texts.thankYouMessage[language]} <span className="special-name">{texts.personName[language]}</span>
        </p>
        
        <p className="love-message">
          {formatMessage(texts.loveMessage[language])}
        </p>
        
        <div className="hearts-container">
          <span className="big-heart">❤️</span>
          <span className="big-heart">💖</span>
          <span className="big-heart">💓</span>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage; 