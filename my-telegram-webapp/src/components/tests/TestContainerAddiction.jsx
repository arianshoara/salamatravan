import { useState } from "react";
import AddictionTestPage from "./AddictionTestPage";

const AddictionTestContainer = () => {
    const [testResult, setTestResult] = useState(null);
    const [selectedAddiction, setSelectedAddiction] = useState(null);

    const addictions = [
        { label: "اعتیاد به الکل", type: "alcohol" },
        { label: "اعتیاد به مواد مخدر", type: "substance" },
        { label: "اعتیاد به نیکوتین", type: "nicotine" },
        { label: "اعتیاد به داروهای نسخه‌ای", type: "prescription_drugs" },
        { label: "اعتیاد به پورن", type: "pornography" },
        { label: "اعتیاد به بازی‌های رایانه‌ای", type: "video_games" },
        { label: "اعتیاد به قمار", type: "gambling" },
        { label: "اعتیاد به تلفن همراه و شبکه‌های اجتماعی", type: "mobile_social_media" },
        { label: "اعتیاد به خرید", type: "shopping" },
        { label: "اعتیاد به خوردن بی‌رویه", type: "overeating" },
        { label: "اعتیاد به کارکردن", type: "work" },
        { label: "اعتیاد به ورزش بی‌رویه", type: "excessive_exercise" },
        { label: "اعتیاد به کافئین", type: "caffeine" },
        { label: "اعتیاد به داروهای لاغری و مکمل‌ها", type: "diet_pills_supplements" },
        { label: "اعتیاد به اینترنت", type: "internet" },
        { label: "اعتیاد به روابط ناسالم", type: "unhealthy_relationships" },
        { label: "اعتیاد به غذاهای ناسالم", type: "unhealthy_foods" },
        { label: "اعتیاد به محصولات آرایشی", type: "cosmetics" },
        { label: "اعتیاد به داروهای آرام‌بخش و خواب‌آور", type: "sedatives_sleeping_pills" },
        { label: "اعتیاد به برنامه‌ریزی افراطی", type: "excessive_planning" },
    ];

    const handleTestComplete = (result) => {
        setTestResult(result);
    };

    return (
        <div className="test-container">
            <h1>📋 تست اعتیاد</h1>
            <p>لطفاً نوع اعتیاد مورد نظر را انتخاب کنید:</p>
            
            <div className="addiction-selection">
                {addictions.map((addiction) => (
                    <button 
                        key={addiction.type} 
                        onClick={() => setSelectedAddiction(addiction.type)}
                        className={`addiction-button ${selectedAddiction === addiction.type ? "selected" : ""}`}
                    >
                        {addiction.label}
                    </button>
                ))}
            </div>

            {selectedAddiction && <AddictionTestPage addictionType={selectedAddiction} onTestComplete={handleTestComplete} />}

            {testResult && (
                <div className="test-result">
                    <h2>نتیجه تست:</h2>
                    <p>نمره کل: {testResult.totalScore}</p>
                    <p>درصد: {testResult.percentage}%</p>
                    <p>تفسیر: {testResult.interpretation}</p>
                </div>
            )}
        </div>
    );
};

export default AddictionTestContainer;
