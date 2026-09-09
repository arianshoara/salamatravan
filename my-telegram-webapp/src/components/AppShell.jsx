import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaBookOpen, FaCheckCircle, FaHome, FaThList, FaCog, FaSearch, FaTimes, FaUser } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';
import { ui } from '../i18n/ui';

const navigation = [ ['/', 'home', FaHome], ['/reading', 'reading', FaBookOpen], ['/tests', 'tests', FaCheckCircle], ['/categories', 'categories', FaThList], ['/settings', 'settings', FaCog] ];
export default function AppShell({ children }) {
  const { language, translations } = useLanguage();
  const t = ui[language];
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const header = useRef(null);
  const bottom = useRef(null);
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--shell-header-height', header.current.getBoundingClientRect().height + 'px');
      document.documentElement.style.setProperty('--shell-bottom-height', bottom.current.getBoundingClientRect().height + 'px');
    });
    observer.observe(header.current); observer.observe(bottom.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [location.pathname]);
  useEffect(() => {
    if (menuOpen) dialog.current?.showModal();
    else dialog.current?.close();
  }, [menuOpen]);
  function closeMenu() { setMenuOpen(false); trigger.current?.focus(); }
  return <div className="app-container">
    <a className="skip-link" href="#main-content">{t.skip}</a>
    <header className="app-header" ref={header}><div className="app-header__inner">
      <button ref={trigger} className="icon-button" onClick={() => setMenuOpen(true)} aria-label={t.menu} title={t.menu} aria-expanded={menuOpen} aria-controls="app-menu"><FaBars /></button>
      <Link className="brand" to="/"><img src="/assets/salamat-image.jpg" width="36" height="36" alt="" /><span>{t.brand}</span></Link>
      <Link className="icon-button" to="/search" aria-label={t.search} title={t.search}><FaSearch /></Link>
      <Link className="icon-button" to="/login" aria-label={t.login} title={t.login}><FaUser /></Link>
    </div></header>
    <dialog id="app-menu" aria-label={t.menu} className="app-menu" ref={dialog} onCancel={closeMenu} onClose={() => setMenuOpen(false)} onClick={e => { if (e.target === dialog.current) closeMenu(); }}>
      <div className="app-menu__heading"><strong>{t.brand}</strong><button className="icon-button" onClick={closeMenu} aria-label={t.close} title={t.close}><FaTimes /></button></div>
      <nav aria-label={t.menu} onClick={e => { if (e.target.closest('a')) closeMenu(); }}>
        {navigation.map(([path, label, Icon]) => <NavLink key={path} to={path} end={path === '/'}><Icon aria-hidden="true" />{t[label]}</NavLink>)}
        <Link to="/profile">{translations.profile}</Link><Link to="/messages">{translations.messages}</Link><Link to="/authored-books">{translations.authoredBooks}</Link><Link to="/cart">{translations.cart || 'سبد خرید'}</Link><Link to="/thanks">{translations.thankyou || 'تشکر ویژه'}</Link>
      </nav>
    </dialog>
    <main id="main-content" className="content" tabIndex="-1">{children}</main>
    <nav className="bottom-nav" ref={bottom} aria-label={t.menu}>
      {navigation.map(([path, label, Icon]) => <NavLink key={path} to={path} end={path === '/'} aria-current={path === '/reading' && location.pathname.startsWith('/articles/') ? 'page' : undefined} className={({ isActive }) => `bottom-nav__link${isActive || (path === '/reading' && location.pathname.startsWith('/articles/')) ? ' active' : ''}`} title={t[label]}><Icon aria-hidden="true" /><span>{t[label]}</span></NavLink>)}
    </nav>
  </div>;
}
