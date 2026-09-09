import { useEffect, useId, useRef, useState } from 'react';
import { readStored, writeStored, removeStored } from '../../lib/storage';
import MedicalDisclaimer from './MedicalDisclaimer';
import './TestUI.css';

const memoryDrafts = new Map();
export function sanitizeAnswers(value, count, optionCount) {
  if (!Array.isArray(value) || value.length !== count) return Array(count).fill(null);
  return Array.from(value, v => Number.isInteger(v) && v >= 0 && v < optionCount ? v : null);
}
export function useAnswers(id, count, optionCount = 5) {
  const [answers, setAnswers] = useState(() => {
    const memory = memoryDrafts.get(id);
    const stored = readStored('draftConsent:' + id, false) === true ? readStored('draft:' + id, null) : null;
    return sanitizeAnswers(memory ?? stored, count, optionCount);
  });
  useEffect(() => { memoryDrafts.set(id, answers); }, [id, answers]);
  return [answers, setAnswers];
}
export function TestProgress({ completed, total }) {
  return <div className="test-progress"><span>پاسخ داده‌شده: {completed} از {total}</span><progress max={total || 1} value={completed} aria-label="پیشرفت آزمون" /></div>;
}
export function TestIntro({ count }) {
  return <div className="test-intro"><p>{count} پرسش · حدود {Math.max(1, Math.ceil(count / 4))} دقیقه، بسته به سرعت پاسخ‌گویی</p><p>منبع: محتوای نسخهٔ موجود پروژه؛ صحت ترجمه، مجوز استفاده و اعتبار امتیازدهی هنوز تأیید تخصصی نشده است.</p></div>;
}
export function AnswerOptions({ options, value, onChange, name }) {
  const choices = Array.isArray(options) ? options : Object.values(options);
  return <div className="test-options">{choices.map((option, index) => <label className="test-option" key={index}><input type="radio" name={name} value={index} checked={value === index} onChange={() => onChange(index)} /><span>{option}</span></label>)}</div>;
}
export function QuestionCard({ index, text, children }) {
  return <fieldset className="test-question" id={'question-' + index}><legend><span>{index + 1}.</span> {text}</legend>{children}</fieldset>;
}
export function TestNavigation({ completed, total }) {
  return <p className="test-validation" role="status">{completed === total ? 'همهٔ پرسش‌ها پاسخ داده شدند؛ می‌توانید نتیجه را ببینید.' : `برای دیدن نتیجه، به ${total - completed} پرسش باقی‌مانده پاسخ دهید.`}</p>;
}
export function TestResult({ result }) {
  const ref = useRef(null);
  useEffect(() => { if (result) ref.current?.focus(); }, [result]);
  if (!result) return null;
  return <section className="test-result" ref={ref} tabIndex="-1" aria-label="نتیجهٔ آموزشی"><h2>نتیجهٔ آموزشی</h2><p>نمرهٔ خام: {result.totalScore}</p><p>درصد از حداکثر نمرهٔ این پرسش‌نامه: {result.percentage}٪ — این عدد احتمال بیماری نیست.</p><p>این نمره بدون ارزیابی تخصصی قابل تبدیل به تشخیص بیماری نیست.</p></section>;
}
export default function TestQuestions({ questions, options, answers, onChange, draftId, urgentIndex, renderFeedback }) {
  const group = useId();
  const [persist, setPersist] = useState(() => readStored('draftConsent:' + draftId, false) === true);
  const [storageError, setStorageError] = useState(false);
  const completed = questions.filter((_, i) => Number.isInteger(answers[i])).length;
  useEffect(() => {
    if (persist) {
      const consentSaved = writeStored('draftConsent:' + draftId, true);
      setStorageError(!consentSaved || !writeStored('draft:' + draftId, answers));
    }
  }, [answers, draftId, persist]);
  useEffect(() => {
    if (!completed || persist && !storageError) return;
    const warn = e => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [completed, persist, storageError]);
  function changeConsent(value) {
    const success = writeStored('draftConsent:' + draftId, value);
    if (!value) { const removed = removeStored('draft:' + draftId); setStorageError(!success || !removed); }
    else setStorageError(!success);
    setPersist(value);
  }
  return <>
    <TestIntro count={questions.length} />
    <label className="draft-consent"><input type="checkbox" checked={persist} onChange={e => changeConsent(e.target.checked)} />پاسخ‌ها روی همین دستگاه بمانند تا بعداً ادامه بدهم. روی دستگاه مشترک فعال نکنید.</label>
    <p className="test-privacy">پاسخ‌ها به سرور ارسال نمی‌شوند. بدون فعال‌کردن این گزینه، فقط تا بازبودن برنامه در حافظه می‌مانند؛ با بستن یا نوسازی صفحه از دست می‌روند. غیرفعال‌کردن گزینه، نسخهٔ ذخیره‌شدهٔ این آزمون را پاک می‌کند.</p>
    {storageError && <p role="alert">مرورگر اجازهٔ ذخیره یا پاک‌کردن نداد؛ برای حفظ پاسخ‌ها صفحه را نبندید و برای حذف داده از تنظیمات مرورگر استفاده کنید.</p>}
    <TestProgress completed={completed} total={questions.length} />
    {urgentIndex !== undefined && answers[urgentIndex] > 0 && <MedicalDisclaimer urgent />}
    {questions.map((question, index) => <QuestionCard key={index} index={index} text={typeof question === 'string' ? question : question.text}><AnswerOptions name={group + '-' + index} options={options || question.options} value={answers[index]} onChange={value => onChange(index, value)} />{renderFeedback && Number.isInteger(answers[index]) && <p className="option-analysis">{renderFeedback(index, answers[index])}</p>}</QuestionCard>)}
    <TestNavigation completed={completed} total={questions.length} />
  </>;
}
