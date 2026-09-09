import { Link, useSearchParams } from 'react-router-dom';
import { articles } from '../data/articles';
import { tests } from '../data/tests';
import { ui } from '../i18n/ui';
import { useLanguage } from '../i18n/LanguageContext';
import { normalizeSearch } from '../lib/storage';
export default function SearchPage() {
  const [params, setParams] = useSearchParams(); const query = params.get('q') || '';
  const { language } = useLanguage(); const t = ui[language];
  const entries = [...articles.map(a => ({ ...a, path: '/articles/' + a.slug, type: t.reading })), ...tests.map(a => ({ ...a, path: '/tests/' + a.slug, type: t.tests }))];
  const results = entries.filter(a => normalizeSearch([...Object.values(a.title), ...Object.values(a.description)].join(' ')).includes(normalizeSearch(query)));
  return <section><h1>{t.search}</h1><label className="search-field">{t.search}<input type="search" value={query} placeholder={t.searchHint} onChange={e => setParams({ q: e.target.value }, { replace: true })} /></label><div className="card-grid">{results.map(a => <Link className="content-card" to={a.path} key={a.id}><small>{a.type}</small><h2>{a.title[language] || a.title.fa}</h2><p lang={a.description[language] ? language : 'fa'} dir={a.description[language] ? undefined : 'rtl'}>{a.description[language] || a.description.fa}</p></Link>)}</div>{!results.length && <p className="empty-state" role="status">{t.empty}</p>}</section>;
}
