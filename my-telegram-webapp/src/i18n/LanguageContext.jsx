import React, { createContext, useState, useContext, useEffect } from 'react';
import translations from './translations';

// Define LanguageContext with default values
export const LanguageContext = createContext({
  language: 'fa',
  translations: translations.fa,
  dir: 'rtl',
  changeLanguage: () => {}
});

// Define available languages
const availableLanguages = {
  fa: { name: 'فارسی', dir: 'rtl' },
  en: { name: 'English', dir: 'ltr' },
  de: { name: 'Deutsch', dir: 'ltr' }
};

export const LanguageProvider = ({ children }) => {
  // Initialize language from localStorage or default to Persian
  const [language, setLanguage] = useState(() => {
    let savedLanguage;
    try { savedLanguage = localStorage.getItem('language'); } catch { /* Storage disabled. */ }
    return availableLanguages[savedLanguage] ? savedLanguage : 'fa';
  });

  // Get current translations based on selected language
  const currentTranslations = translations[language] || translations.fa;
  
  // Get text direction based on language
  const dir = availableLanguages[language]?.dir || 'rtl';

  // Handle language change
  const changeLanguage = (newLanguage) => {
    if (availableLanguages[newLanguage]) {
      setLanguage(newLanguage);
      try { localStorage.setItem('language', newLanguage); } catch { /* In-memory language still works. */ }
    }
  };

  // Update document direction attribute when language changes
  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
  }, [language, dir]);

  // Prepare context value
  const contextValue = {
    language,
    translations: currentTranslations,
    dir,
    changeLanguage,
    availableLanguages
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for consuming the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 