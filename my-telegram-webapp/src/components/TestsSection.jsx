import { Link } from 'react-router-dom';
import { tests } from '../data/tests';
import { useLanguage } from '../i18n/LanguageContext';
import { ui } from '../i18n/ui';
export default function TestsSection() {
  const { language } = useLanguage(); const t = ui[language];
  return <section><h1>{t.tests}</h1><p className="content-notice">{language === 'fa' ? 'ابزارهای آموزشی خودشناسی؛ نتیجهٔ این پرسش‌نامه‌ها تشخیص بیماری نیست.' : language === 'de' ? 'Lernwerkzeuge zur Selbsterkenntnis, keine medizinische Diagnose.' : 'Educational self-reflection tools, not a medical diagnosis.'}</p>
    {language !== 'fa' && <p className="muted">{t.onlyFa}</p>}
    <div className="card-grid">{tests.map(test => <Link className="content-card" key={test.id} to={'/tests/' + test.slug}><h2>{test.title[language] || test.title.fa}</h2><p dir="rtl" lang="fa">{test.description.fa}</p></Link>)}</div>
    <div className="toolbar"><Link to="/tests/specialized">{language === 'fa' ? 'فهرست آزمون‌های تخصصی و وضعیت دسترسی' : language === 'de' ? 'Spezialisierte Tests und Verfügbarkeit' : 'Specialized tests and availability'}</Link></div>
  </section>;
}
