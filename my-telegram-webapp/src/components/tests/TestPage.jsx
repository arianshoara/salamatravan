import { useState } from 'react';
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
    const [selectedFactor, setSelectedFactor] = useState(null);

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
                        <div
                            key={factorNamePersian}
                            className={`factor-icon ${selectedFactor === factorNameEnglish ? 'selected' : ''}`}
                            onClick={() => handleFactorClick(factorNameEnglish)}
                            style={{ cursor: 'pointer', fontSize: '2em', margin: '10px', border: selectedFactor === factorNameEnglish ? '2px solid #007bff' : 'none', padding: '10px', backgroundColor: selectedFactor === factorNameEnglish ? '#f0f0f0' : 'white', borderRadius: '10px', textAlign: 'center' }}
                        >
                            {icon}
                            <p style={{ fontSize: '0.9em', marginTop: '5px' }}>{factorNamePersian}</p>
                        </div>
                    )
                })}
            </div>

            <BigFivePersonalityTest
                selectedFactor={selectedFactor}
                onTestComplete={(result) => { console.log("نتیجه تست:", result); }}
            />
        </div>
    );
};

export default TestPage;