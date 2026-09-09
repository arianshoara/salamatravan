import { useLanguage } from '../../i18n/LanguageContext';

export default function MedicalDisclaimer({ urgent = false }) {
  const { language } = useLanguage();
  let resources = [];
  try {
    const config = JSON.parse(import.meta.env.VITE_CRISIS_RESOURCES || '{}');
    const entries = config[language] || config.fa;
    if (Array.isArray(entries)) resources = entries.filter(item => item && typeof item.label === 'string' && typeof item.url === 'string' && new URL(item.url).protocol === 'https:');
  } catch { /* Keep the general safety guidance if resources are not configured. */ }
  return <aside className={urgent ? 'safety-notice safety-notice--urgent' : 'safety-notice'} lang="fa" dir="rtl" role={urgent ? 'alert' : undefined}>
    <h2>{urgent ? 'کمک و ایمنی شما مهم‌تر از نمرهٔ آزمون است' : 'پیش از استفاده از نتیجه'}</h2>
    <p>{urgent ? 'اگر احتمال می‌دهید اکنون به خودتان آسیب بزنید یا در خطر فوری هستید، آزمون را کنار بگذارید، با اورژانس محل زندگی‌تان تماس بگیرید و از یک فرد قابل‌اعتماد بخواهید کنارتان بماند. برای افکار آسیب به خود، حتی با نمرهٔ کل پایین، کمک تخصصی بگیرید.' : 'این ابزار آموزشی است، تشخیص پزشکی نمی‌دهد و جایگزین روان‌شناس یا روان‌پزشک نیست. متن و امتیازدهی نسخهٔ فعلی هنوز بازبینی تخصصی مستند ندارد؛ نتیجه را تشخیص یا احتمال قطعی بیماری ندانید.'}</p>
    {urgent && resources.length > 0 && <ul>{resources.map(item => <li key={item.url}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.label}</a></li>)}</ul>}
  </aside>;
}
