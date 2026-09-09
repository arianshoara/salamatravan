import { useParams } from 'react-router-dom';
import { tests } from '../../data/tests';
import { testComponents } from '../../data/routeComponents';
import { useLanguage } from '../../i18n/LanguageContext';
import { ui } from '../../i18n/ui';
import MedicalDisclaimer from './MedicalDisclaimer';
import './TestUI.css';

export default function TestLayout() {
  const { slug } = useParams(); const item = tests.find(a => a.slug === slug);
  const { language } = useLanguage(); const t = ui[language];
  const Test = testComponents[slug];
  if (!item || !Test) return <h1>{t.unavailable}</h1>;
  return <section className="test-layout" key={slug}>
    {language !== 'fa' && <p className="content-notice">{t.onlyFa}</p>}
    <div lang="fa" dir="rtl"><MedicalDisclaimer /><Test /></div>
  </section>;
}
