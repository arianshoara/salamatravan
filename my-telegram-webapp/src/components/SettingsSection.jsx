import { useLanguage } from '../i18n/LanguageContext';
import { ui } from '../i18n/ui';
export default function SettingsSection({ darkMode, setDarkMode, fontSize, setFontSize }) {
  const { language, changeLanguage, translations: t } = useLanguage();
  function reset() { setDarkMode(false); setFontSize(16); changeLanguage('fa'); }
  return <section className="panel narrow"><h1>{t.settings}</h1>
    <label className="setting-row"><span>{t.darkMode}</span><input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} /></label>
    <label className="search-field" htmlFor="font-size">{t.fontSize}: {fontSize}px<input id="font-size" type="range" min="16" max="24" step="2" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} /></label>
    <label className="search-field" htmlFor="language">{t.language}<select id="language" value={language} onChange={e => changeLanguage(e.target.value)}><option value="fa">فارسی</option><option value="en">English</option><option value="de">Deutsch</option></select></label>
    <p className="article__body">{language === 'fa' ? 'این متن نمونه، اندازهٔ نوشته در صفحه‌های مطالعه را نشان می‌دهد.' : language === 'de' ? 'Dieser Beispieltext zeigt die Schriftgröße beim Lesen.' : 'This sample shows the text size used when reading.'}</p>
    <p className="muted">{ui[language].local}</p><button onClick={reset}>{t.resetSettings}</button>
  </section>;
}
