import { Link } from 'react-router-dom';
import { tests } from '../data/tests';
import { useLanguage } from '../i18n/LanguageContext';
import { ui } from '../i18n/ui';
export default function TestsSection() {
  const { language } = useLanguage(); const t = ui[language];
  return <section><h1>{t.tests}</h1><p className="content-notice">{t.testNotice}</p>
    {language !== 'fa' && <p className="muted">{t.onlyFa}</p>}
    <div className="card-grid">{tests.map(test => <Link className="content-card" key={test.id} to={'/tests/' + test.slug}><h2>{test.title[language] || test.title.fa}</h2><p>{test.description[language] || test.description.fa}</p></Link>)}</div>
    <div className="toolbar"><Link to="/tests/specialized">{t.specializedTests}</Link></div>
  </section>;
}
