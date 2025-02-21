// fight-club.jsx - فایل داده برای فیلم "Fight Club"

export default {
    id: '4', // شناسه یکتا برای فیلم (مطابق با id در لیست movies)
    title: 'Fight Club', // عنوان فیلم به زبان اصلی
    persianTitle: 'کلاب مبارزه', // عنوان فارسی فیلم
    year: 1999, // سال انتشار فیلم
    duration: '139 دقیقه', // مدت زمان فیلم
    genre: ['درام', 'روانشناختی', 'فلسفی', 'تریلر'], // ژانرهای فیلم
    director: 'دیوید فینچر', // کارگردان فیلم
    writers: ['چاک پالانیک', 'دیوید فینچر'], // نویسندگان (بر اساس منبع داستان و فیلم‌نامه)
    voices: ['ادورد نورتون', 'برد پیت', 'هلنا بونهام کارتر'], // بازیگران اصلی فیلم
    description: 'فیلمی تند و خشن که به بررسی عمق روان انسان و ناهنجاری‌های جامعه مدرن می‌پردازد.', // توضیح کوتاه درباره فیلم
    fullDescription: `
        **Fight Club** (کلاب مبارزه) محصول سال ۱۹۹۹، فیلمی دراماتیک و روانشناختی است که با رویکردی فلسفی به بررسی بحران‌های هویتی و مفاهیم زندگی مدرن می‌پردازد.
        داستان فیلم از دیدگاه یک شخصیت بی‌نام روایت می‌شود که در جستجوی هویت واقعی خود، به دنیای تاریک و نمادین ناهنجاری‌های اجتماعی فرو می‌رود.
        
        **محورهای اصلی فیلم:**
        
        *   **شک و تردید از هویت:** روایت جدال داخلی میان تصویر ساخته شده توسط جامعه و خود واقعی فرد.
        *   **انتقاد از مصرف‌گرایی:** نقد تند ساختارهای اجتماعی که افراد را در چرخه بی‌پایان مصرف و بی‌معنایی فرو می‌برند.
        *   **نبرد روانی و فلسفی:** مواجهه با پرسش‌های عمیق درباره آزادی، هویت و معنای زندگی در دنیایی پر از تناقض.
    `,
    article: `
        <article>
            <h2>تحلیل روانشناختی و فلسفی Fight Club</h2>
            <p>
                فیلم <strong>Fight Club</strong> با ارائه داستانی چندلایه و انتقادی، به بررسی ابعاد عمیق روان انسان می‌پردازد. این اثر نشان می‌دهد که چگونه درگیری‌های درونی و فروپاشی هویت می‌تواند فرد را به جستجوی معنا در میان بی‌ثباتی‌های زندگی سوق دهد.
            </p>
            <p>
                از منظر فلسفی، فیلم به نقد ساختارهای مصرف‌گرایانه و نظام‌های قدرت می‌پردازد که اغلب باعث سرکوب خودشناسی و اصالت انسانی می‌شوند. این پیام دعوتی است به بازنگری در باورها و ارزش‌های تعیین‌شده توسط جامعه.
            </p>
            <h3>موضوعات کلیدی:</h3>
            <ul>
                <li><b>شک و تردید در مورد خود:</b> بازتاب دقیق درگیری‌های روانی و تردیدهای مداوم درباره هویت واقعی فرد.</li>
                <li><b>فروپاشی ساختارهای اجتماعی:</b> نقد ساختارهای مصرفی و اجتماعی که افراد را از درک اصالت وجودی‌شان باز می‌دارند.</li>
                <li><b>تحول و آزادی:</b> دعوت به شکستن زنجیرهای ذهنی برای دستیابی به آزادی و هویت حقیقی.</li>
            </ul>
        </article>
    `,
    review: `
        <article>
            <h2>نقد فیلم Fight Club</h2>
            <p>
                <strong>Fight Club</strong> با بازی‌های قدرتمند ادورد نورتون و برد پیت و کارگردانی جسورانه دیوید فینچر، تصویری بی‌بدیل از بحران‌های هویتی و درگیری‌های روانی ارائه می‌دهد.
                فیلم با استفاده از سبک روایتی غیرخطی و تصاویر نمادین، مخاطب را به تفکر عمیق درباره ساختارهای اجتماعی و معنای واقعی آزادی دعوت می‌کند.
            </p>
            <p>
                نقاط قوت فیلم در اجرای دقیق بازیگران، پرداخت فلسفی و روانشناختی به مفاهیم زندگی مدرن و نقد تند مصرف‌گرایی نهفته است که آن را به یک اثر فرهنگی ماندگار تبدیل می‌کند.
            </p>
            <h3>نقاط قوت فیلم:</h3>
            <ul>
                <li><b>بازیگری خیره‌کننده:</b> اجرای برجسته بازیگران که به خوبی لایه‌های پنهان شخصیت‌ها را به تصویر می‌کشند.</li>
                <li><b>کارگردانی نوآورانه:</b> استفاده از سبک بصری و روایتی منحصر به فرد برای بیان داستانی چندبعدی.</li>
                <li><b>پیام‌های عمیق فلسفی:</b> نقد ساختارهای اجتماعی و دعوت به بازنگری در ارزش‌ها و باورهای زندگی.</li>
            </ul>
        </article>
    `,
    imageUrl: './assets/fight_club_poster.jpg', // آدرس تصویر پوستر فیلم (تصویر باید در پوشه public/assets موجود باشد)
    trailerUrl: 'https://www.youtube.com/watch?v=SUXWAEX2jlg', // لینک تریلر فیلم در یوتیوب
    imdbUrl: 'https://www.imdb.com/title/tt0137523/' // لینک صفحه فیلم در IMDB
};
