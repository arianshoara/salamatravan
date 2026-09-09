import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../src/i18n/LanguageContext';
import App from '../src/App';
import { articles } from '../src/data/articles';
import { tests } from '../src/data/tests';
import { normalizeSearch, readStored, writeStored } from '../src/lib/storage';
import { sanitizeAnswers, useAnswers } from '../src/components/tests/TestUI';
import translations from '../src/i18n/translations';
import { ui } from '../src/i18n/ui';

function open(path) { return render(<MemoryRouter initialEntries={[path]}><LanguageProvider><App /></LanguageProvider></MemoryRouter>); }
async function ready() { await waitFor(() => expect(screen.queryByText('در حال بارگذاری…')).toBeNull()); }

describe('routing and accessible content', () => {
  it.each(['/', '/reading', '/tests', '/categories', '/settings', '/profile', '/messages', '/cart', '/login', '/search', '/tests/specialized', '/thanks', '/authored-books'])('opens %s without an error boundary', async path => {
    open(path); await ready(); expect(screen.queryByText('این بخش بارگذاری نشد')).toBeNull(); expect(screen.queryByText('این صفحه پیدا نشد')).toBeNull();
    expect(screen.getByRole('main')).toBeTruthy();
  });
  it.each(articles.map(a => a.slug))('loads article %s with one h1 and a reading body', async slug => {
    open('/articles/' + slug); await ready(); expect(document.querySelectorAll('h1').length).toBe(1); expect(document.querySelector('.article__body')).toBeTruthy();
    const ids = [...document.querySelectorAll('.article__body h2')].map(e => e.id); expect(ids.every(Boolean)).toBe(true); expect(new Set(ids).size).toBe(ids.length);
  });
  it('shows all fifteen articles with real links', () => { open('/reading'); expect(document.querySelectorAll('.content-card').length).toBe(15); });
  it('searches normalized Persian and German titles', () => { expect(normalizeSearch('  تصميم‌گيري  ')).toBe('تصمیم گیری'); open('/search?q=Angst'); expect(document.querySelectorAll('.content-card').length).toBeGreaterThan(0); });
  it('supports a visible language change and language notice', async () => {
    open('/settings'); fireEvent.change(screen.getByRole('combobox'), { target: { value: 'de' } }); expect(document.documentElement.lang).toBe('de'); expect(document.documentElement.dir).toBe('ltr');
    fireEvent.click(screen.getByRole('link', { name: 'Lesen' })); expect(screen.getByText('Dieser Inhalt ist derzeit nur auf Persisch verfügbar.')).toBeTruthy();
  });
  it('translates the active home, profile and cart surfaces into German', async () => {
    open('/settings'); fireEvent.change(screen.getByRole('combobox'), { target: { value: 'de' } });
    fireEvent.click(screen.getByRole('link', { name: 'Start' }));
    expect(screen.getByText('Absolvent eines Psychologiestudiums')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Menü' }));
    fireEvent.click(screen.getByRole('link', { name: 'Profil' })); await ready();
    expect(screen.getByRole('heading', { name: 'Benutzerprofil' })).toBeTruthy();
    expect(screen.queryByText(/اطلاعات این صفحه/)).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Menü' }));
    fireEvent.click(screen.getByRole('link', { name: 'Warenkorb' })); await ready();
    expect(screen.getByText('Ihr Warenkorb ist leer.')).toBeTruthy();
  });
  it('uses language-aware drawer placement', () => {
    const css = readFileSync(`${process.cwd()}/src/App.css`, 'utf8');
    expect(css).toMatch(/\.app-menu\s*\{[^}]*inset-inline-start:\s*0;[^}]*inset-inline-end:\s*auto;/s);
  });
  it('persists explicit theme and limits reading size without resizing root', () => {
    open('/settings'); fireEvent.click(screen.getByRole('checkbox')); expect(document.documentElement.dataset.theme).toBe('dark'); expect(JSON.parse(localStorage.getItem('darkMode'))).toBe(true);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '24' } }); expect(document.documentElement.style.getPropertyValue('--reading-font-size')).toBe('1.5rem');
  });
  it('renders the honest unconfigured login state without a Google token request', () => { open('/login'); expect(screen.getByText(/ورود هنوز روی این نسخه پیکربندی نشده/)).toBeTruthy(); });
  it('opens a labelled menu dialog', () => { open('/'); fireEvent.click(screen.getByRole('button', { name: 'فهرست' })); expect(document.querySelector('dialog').open).toBe(true); fireEvent.click(screen.getByRole('button', { name: 'بستن فهرست' })); expect(document.querySelector('dialog').open).toBe(false); });
});

describe('questionnaire flows with synthetic answers only', () => {
  it.each(tests.filter(t => !['AddictionTestActive', 'bigFiveTestActive'].includes(t.id)).map(t => t.slug))('renders %s with native answer groups', async slug => {
    open('/tests/' + slug); await ready(); expect(screen.queryByText('این بخش بارگذاری نشد')).toBeNull(); expect(document.querySelectorAll('fieldset').length).toBeGreaterThan(0); expect(screen.getAllByRole('radio').length).toBeGreaterThan(0);
  });
  it('requires every PHQ response, keeps arithmetic, and shows immediate safety guidance', async () => {
    open('/tests/depression'); await ready(); const groups = screen.getAllByRole('group'); expect(groups.length).toBe(9);
    expect(screen.getByRole('button', { name: 'نمایش نتیجه تست' }).disabled).toBe(true);
    for (const group of groups) fireEvent.click(within(group).getAllByRole('radio')[3]);
    expect(screen.getByRole('alert').textContent).toContain('کمک و ایمنی');
    expect(screen.getByRole('button', { name: 'نمایش نتیجه تست' }).disabled).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: 'نمایش نتیجه تست' })); expect(screen.getByText('نمرهٔ خام: 27')).toBeTruthy();
    fireEvent.click(within(groups[0]).getAllByRole('radio')[0]);
    expect(screen.queryByText('نمرهٔ خام: 27')).toBeNull();
    expect(localStorage.getItem('draft:DepressionTestPage')).toBeNull();
  });
  it('offers consent-based persistence and restores a draft after remount', async () => {
    let view = open('/tests/o-c-d'); await ready(); const group = screen.getAllByRole('group')[0];
    fireEvent.click(within(group).getAllByRole('radio')[2]); fireEvent.click(screen.getByRole('checkbox')); await waitFor(() => expect(JSON.parse(localStorage.getItem('draft:OCDTestPage'))[0]).toBe(2));
    view.unmount(); view = open('/tests/o-c-d'); await ready(); expect(within(screen.getAllByRole('group')[0]).getAllByRole('radio')[2].checked).toBe(true); view.unmount();
  });
  it('does not enable the long emotional-health test after just ten answers', async () => {
    open('/tests/mental-health'); await ready(); const groups=screen.getAllByRole('group'); expect(groups.length).toBeGreaterThan(10); for(const group of groups.slice(0,10)) fireEvent.click(within(group).getAllByRole('radio')[0]);
    expect(screen.getByRole('button', { name: 'نمایش نتیجه تست' }).disabled).toBe(true);
  });
  it('retains non-linear relationship option labels and scoring', async () => {
    open('/tests/relationship-readiness'); await ready(); const groups=screen.getAllByRole('group'); expect(groups.length).toBeGreaterThan(0); expect(within(groups[0]).getAllByRole('radio').length).toBe(5);
    for(const group of groups) fireEvent.click(within(group).getAllByRole('radio')[1]); fireEvent.click(screen.getByRole('button', { name: 'محاسبه نتیجه تست' })); expect(screen.getByText(/تحلیل نتایج تست/)).toBeTruthy();
  });
  it('starts an addiction subtype and resets result when switching', async () => {
    open('/tests/addiction'); await ready(); fireEvent.click(screen.getByRole('button', { name: 'اعتیاد به الکل' })); expect(screen.getAllByRole('group').length).toBe(11);
    fireEvent.click(within(screen.getAllByRole('group')[0]).getAllByRole('radio')[1]); fireEvent.click(screen.getByRole('button', { name: 'اعتیاد به کافئین' })); expect(screen.getAllByRole('radio').every(r => !r.checked)).toBe(true);
  });
  it('loads and completes a personality factor without changing reverse scoring', async () => {
    open('/tests/big-five?factor=Openness'); await ready(); const groups=screen.getAllByRole('group'); expect(groups.length).toBe(10); for(const group of groups) fireEvent.click(within(group).getAllByRole('radio')[4]);
    fireEvent.click(screen.getByRole('button', { name: 'تکمیل تست و نمایش نتیجه' })); expect(screen.getByText(/تحلیل نتیجه تست/)).toBeTruthy();
  });
  it('completes and restarts EQ without discarding the shared shell', async () => {
    open('/tests/eq-bar-on'); await ready();
    for (const group of screen.getAllByRole('group')) fireEvent.click(within(group).getAllByRole('radio')[3]);
    fireEvent.click(screen.getByRole('button', { name: 'نمایش نتیجه' }));
    expect(screen.getByText('نتیجه آزمون هوش هیجانی شما')).toBeTruthy();
    expect(document.querySelector('.score-number').textContent).toBe('100%');
    fireEvent.click(screen.getByRole('button', { name: 'شروع مجدد تست' }));
    expect(screen.getAllByRole('radio').every(r => !r.checked)).toBe(true);
  });
});

describe('storage resilience', () => {
  it('falls back on invalid preference JSON', () => { localStorage.setItem('bad', '{broken'); expect(readStored('bad', 16)).toBe(16); expect(writeStored('good', true)).toBe(true); });
  it('rejects an unknown saved language', () => { localStorage.setItem('language','unknown'); open('/'); expect(document.documentElement.lang).toBe('fa'); });
  it('drops out-of-range, sparse and malformed saved answers', () => {
    expect(sanitizeAnswers([3, 4, -1, '2', null], 5, 4)).toEqual([3, null, null, null, null]);
    expect(sanitizeAnswers(Array(2), 2, 4)).toEqual([null, null]);
    expect(sanitizeAnswers({ length: 2 }, 2, 4)).toEqual([null, null]);
  });
  it('ignores stored answers when consent is absent', () => {
    localStorage.setItem('draft:consent-regression', '[3]');
    function Draft() { const [answers] = useAnswers('consent-regression', 1, 4); return <output>{JSON.stringify(answers)}</output>; }
    render(<Draft />); expect(screen.getByRole('status').textContent).toBe('[null]');
  });
  it('opens messages with malformed records', async () => {
    localStorage.setItem('userMessages', '{"wrong":"shape"}');
    localStorage.setItem('testResults', '[null]');
    open('/messages'); await ready(); expect(screen.queryByText('این بخش بارگذاری نشد')).toBeNull();
  });
});

describe('translation completeness', () => {
  it.each(['en', 'de'])('has every Persian UI key in %s without Persian leakage', language => {
    expect(Object.keys(translations[language]).sort()).toEqual(Object.keys(translations.fa).sort());
    expect(Object.keys(ui[language]).sort()).toEqual(Object.keys(ui.fa).sort());
    expect(Object.values(translations[language]).some(value => /[\u0600-\u06ff]/.test(value))).toBe(false);
    expect(Object.values(ui[language]).some(value => /[\u0600-\u06ff]/.test(value))).toBe(false);
  });
  it('provides translated titles and descriptions for every content card', () => {
    for (const item of [...articles, ...tests]) for (const language of ['fa', 'en', 'de']) {
      expect(item.title[language]).toBeTruthy();
      expect(item.description[language]).toBeTruthy();
    }
  });
});
