import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { articles } from '../../data/articles';
import { articleComponents } from '../../data/routeComponents';
import { useLanguage } from '../../i18n/LanguageContext';
import { ui } from '../../i18n/ui';
import { readStored, writeStored } from '../../lib/storage';
import './ArticleLayout.css';

export default function ArticleLayout({ fontSize, setFontSize }) {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);
  const { language } = useLanguage(); const t = ui[language];
  const body = useRef(null);
  const [headings, setHeadings] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [saved, setSaved] = useState(() => { const value = readStored('savedArticles', []); return Array.isArray(value) ? value : []; });
  useEffect(() => {
    if (!body.current) return;
    const update = () => {
      const bounds = body.current.getBoundingClientRect();
      const available = window.innerHeight - 160;
      setProgress(bounds.height <= available ? 100 : Math.max(0, Math.min(100, (80 - bounds.top) / (bounds.height - available) * 100)));
      setHeadings(Array.from(body.current.querySelectorAll('h2[id]')).map(h => ({ id: h.id, text: h.textContent })));
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(body.current, { childList: true, subtree: true });
    window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update);
    return () => { observer.disconnect(); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [slug]);
  useEffect(() => { if (article) document.title = `${article.title.fa} | ${t.brand}`; }, [article, t.brand]);
  if (!article) return <section className="empty-state"><h1>{t.unavailable}</h1><Link to="/reading">{t.reading}</Link></section>;
  const Body = articleComponents[slug];
  const next = articles[(articles.indexOf(article) + 1) % articles.length];
  function toggleSaved() {
    const values = saved.includes(slug) ? saved.filter(s => s !== slug) : [...saved, slug];
    if (writeStored('savedArticles', values)) setSaved(values);
    else setStatus(language === 'fa' ? 'مرورگر اجازهٔ ذخیره‌سازی نمی‌دهد.' : 'Browser storage unavailable.');
  }
  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: article.title.fa, url });
      else { await navigator.clipboard.writeText(url); setStatus(t.copied); }
    } catch (error) { if (error.name !== 'AbortError') setStatus(t.copyFailed); }
  }
  return <article className="article">
    <progress className="article__progress" max="100" value={progress} aria-label={language === 'fa' ? 'پیشرفت مطالعه' : 'Reading progress'} />
    <Link to="/reading">{t.back} · {t.reading}</Link>
    {language !== 'fa' && <p className="content-notice">{t.onlyFa}</p>}
    <header className="article__header"><span className="article__eyebrow">{article.minutes} {t.minutes}</span><h1 lang="fa" dir="rtl">{article.title.fa}</h1><p lang="fa" dir="rtl">{article.description.fa}</p></header>
    <div className="toolbar">
      <button onClick={() => setFontSize(Math.max(16, fontSize - 2))} disabled={fontSize <= 16} aria-label={t.smaller} title={t.smaller}>A−</button>
      <button onClick={() => setFontSize(Math.min(24, fontSize + 2))} disabled={fontSize >= 24} aria-label={t.larger} title={t.larger}>A+</button>
      <button onClick={toggleSaved} aria-pressed={saved.includes(slug)}>{saved.includes(slug) ? t.saved : t.save}</button>
      <button onClick={share}>{t.share}</button>
    </div>
    <p className="muted" role="status">{status}</p>
    {headings.length > 0 && <details className="article__toc"><summary>{t.contents}</summary><ol lang="fa" dir="rtl">{headings.map(h => <li key={h.id}><a href={'#' + h.id}>{h.text}</a></li>)}</ol></details>}
    <div ref={body} lang="fa" dir="rtl"><Body /></div>
    <footer className="article__sources"><h2>{t.sources}</h2>{article.sources.length ? <ul>{article.sources.map(s => <li key={s.url}><a href={s.url}>{s.title}</a></li>)}</ul> : <p>{t.unreviewed}</p>}{article.reviewedAt && <time dateTime={article.reviewedAt}>{article.reviewedAt}</time>}<p lang="fa" dir="rtl">این مطلب آموزشی است و جایگزین ارزیابی یا درمان تخصصی نیست.</p></footer>
    <Link className="content-card" to={'/articles/' + next.slug}><small>{t.next}</small><h2 lang={next.title[language] ? language : 'fa'} dir={next.title[language] ? undefined : 'rtl'}>{next.title[language] || next.title.fa}</h2></Link>
  </article>;
}
