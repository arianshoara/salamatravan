import { useSearchParams } from 'react-router-dom';
import BigFivePersonalityTest from './BigFivePersonalityTest'; // مسیر را مطابق با ساختار پروژه خود تنظیم کنید

const factorIcons = {
    "Openness": "💡",
    "Conscientiousness": "⚙️",
    "Extraversion": "🧑‍🤝‍🧑",
    "Agreeableness": "❤️",
    "Neuroticism": "🧠",
    "روان‌رنجوری" : "🧠",
    "توافق‌پذیری" : "❤️",
    "برونگرایی" : "🧑‍🤝‍🧑",
    "وظیفه‌شناسی" : "⚙️",
    "گشودگی" : "💡"

};

const factorNamesPersian = {
    "Openness": "گشودگی",
    "Conscientiousness": "وظیفه‌شناسی",
    "Extraversion": "برونگرایی",
    "Agreeableness": "توافق‌پذیری",
    "Neuroticism": "روان‌رنجوری"
};


const TestPage = () => {
    const [params, setParams] = useSearchParams();
    const selectedFactor = params.get('factor');
    const setSelectedFactor = factor => setParams({ factor });

    const handleFactorClick = (factorName) => {
        setSelectedFactor(factorName);
    };

    return (
        <div>
            <h1>تست شخصیت پنج عاملی</h1>
            <p>لطفا به سوالات زیر با دقت پاسخ دهید</p>
            <div className="factor-icons">
                {Object.entries(factorIcons).slice(5,10).map(([factorNamePersian, icon]) => {

                    const factorNameEnglish = Object.keys(factorNamesPersian).find(key => factorNamesPersian[key] === factorNamePersian);
                    return (
                        <button
                            type="button" aria-pressed={selectedFactor === factorNameEnglish}
                            key={factorNamePersian}
                            className={`factor-icon ${selectedFactor === factorNameEnglish ? 'selected' : ''}`}
                            onClick={() => handleFactorClick(factorNameEnglish)}
                        >
                            {icon}
                            <p style={{ fontSize: '0.9em', marginTop: '5px' }}>{factorNamePersian}</p>
                        </button>
                    )
                })}
            </div>

            {selectedFactor && factorNamesPersian[selectedFactor] ? <BigFivePersonalityTest
                key={selectedFactor}
                selectedFactor={selectedFactor}
                onTestComplete={() => {}}
            /> : <p>برای شروع، یکی از پنج عامل بالا را انتخاب کنید.</p>}
        </div>
    );
};

export default TestPage;