import { useState } from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import { useLanguage } from '../i18n/LanguageContext';
import { ui } from '../i18n/ui';
import { normalizeSearch, readStored } from '../lib/storage';
export default function ReadingSection() {
  const { language } = useLanguage(); const t = ui[language];
  const [query, setQuery] = useState(''); const [savedOnly, setSavedOnly] = useState(false);
  const value = readStored('savedArticles', []); const saved = Array.isArray(value) ? value : [];
  const visible = articles.filter(a => (!savedOnly || saved.includes(a.slug)) && normalizeSearch([...Object.values(a.title), ...Object.values(a.description)].join(' ')).includes(normalizeSearch(query)));
  return <section><header className="page-heading"><h1>{t.reading}</h1><p className="muted">{articles.length} {language === 'fa' ? 'مقاله برای شناخت بهتر خود و زندگی روزمره' : language === 'de' ? 'Artikel über Selbsterkenntnis und Alltag' : 'articles on self-knowledge and everyday life'}</p></header>
    <label className="search-field">{t.search}<input type="search" placeholder={t.searchHint} value={query} onChange={e => setQuery(e.target.value)} /></label>
    <div className="toolbar"><button aria-pressed={!savedOnly} onClick={() => setSavedOnly(false)}>{t.all}</button><button aria-pressed={savedOnly} onClick={() => setSavedOnly(true)}>{t.saved}</button></div>
    {language !== 'fa' && <p className="content-notice">{t.onlyFa}</p>}
    <div className="card-grid">{visible.map(a => <Link className="content-card" key={a.id} to={'/articles/' + a.slug}><small>{a.minutes} {t.minutes}</small><h2 lang={a.title[language] ? language : 'fa'} dir={a.title[language] ? undefined : 'rtl'}>{a.title[language] || a.title.fa}</h2><p lang={a.description[language] ? language : 'fa'} dir={a.description[language] ? undefined : 'rtl'}>{a.description[language] || a.description.fa}</p></Link>)}</div>
    {!visible.length && <p className="empty-state" role="status">{t.empty}</p>}
  </section>;
}
