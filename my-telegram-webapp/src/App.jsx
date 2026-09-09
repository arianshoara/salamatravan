import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AppShell from './components/AppShell';
import ErrorBoundary from './components/ErrorBoundary';
import ReadingSection from './components/ReadingSection';
import TestsSection from './components/TestsSection';
import GuideContent from './GuideContent';
import SettingsSection from './components/SettingsSection';
import ArticleLayout from './components/articles/ArticleLayout';
import TestLayout from './components/tests/TestLayout';
import SearchPage from './components/SearchPage';
import LoginPage from './components/LoginPage';
import { useLanguage } from './i18n/LanguageContext';
import { ui } from './i18n/ui';
import { viewPaths } from './data/paths';
import { readStored, writeStored } from './lib/storage';
import './App.css';

const Categories = lazy(() => import('./components/CategoriesContent'));
const Specialized = lazy(() => import('./components/tests/SpecializedTests'));
const Profile = lazy(() => import('./components/Sidebar/Profile'));
const Messages = lazy(() => import('./components/Messages'));
const Cart = lazy(() => import('./components/Sidebar/Cart'));
const AuthoredBooks = lazy(() => import('./components/Sidebar/AuthoredBooks'));
const Thanks = lazy(() => import('./components/ThankYouPage'));

export default function App() {
  const navigate = useNavigate(); const location = useLocation();
  const { language } = useLanguage(); const t = ui[language];
  const [darkMode, setDarkMode] = useState(() => readStored('darkMode', false) === true);
  const [fontSize, setFontSize] = useState(() => Math.min(24, Math.max(16, Number(readStored('fontSize', 16)) || 16)));
  const goToView = view => navigate(viewPaths[view] || '/');
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark-mode', darkMode);
    writeStored('darkMode', darkMode);
  }, [darkMode]);
  useEffect(() => {
    document.documentElement.style.setProperty('--reading-font-size', fontSize / 16 + 'rem');
    writeStored('fontSize', fontSize);
  }, [fontSize]);
  useEffect(() => { if (!location.pathname.startsWith('/articles/')) document.title = t.brand; }, [location.pathname, t.brand]);
  const localContent = children => <>{language !== 'fa' && <p className="content-notice">{t.onlyFa}</p>}<div lang="fa" dir="rtl">{children}</div></>;
  return <AppShell><ErrorBoundary key={location.pathname}><Suspense fallback={<p className="panel" role="status">{t.loading}</p>}><Routes>
    <Route path="/" element={<GuideContent goToView={goToView} />} />
    <Route path="/reading" element={<ReadingSection />} />
    <Route path="/articles/:slug" element={<ArticleLayout key={location.pathname} fontSize={fontSize} setFontSize={setFontSize} />} />
    <Route path="/tests" element={<TestsSection />} />
    <Route path="/tests/specialized" element={localContent(<Specialized />)} />
    <Route path="/tests/:slug" element={<TestLayout />} />
    <Route path="/categories" element={localContent(<Categories goToView={goToView} />)} />
    <Route path="/settings" element={<SettingsSection darkMode={darkMode} setDarkMode={setDarkMode} fontSize={fontSize} setFontSize={setFontSize} />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/messages" element={<Messages />} />
    <Route path="/authored-books" element={localContent(<AuthoredBooks />)} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/thanks" element={localContent(<Thanks />)} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="*" element={<section className="empty-state"><h1>{t.unavailable}</h1><Link to="/">{t.home}</Link></section>} />
  </Routes></Suspense></ErrorBoundary></AppShell>;
}
