import { useState } from "react";
import PropTypes from 'prop-types'; // ایمپورت PropTypes
import "./DepressionTestPage.css"; // فایل CSS برای استایل دهی (در مرحله بعد ایجاد می شود)

const DepressionTestPage = ({ onTestComplete }) => { // prop برای اطلاع رسانی اتمام تست به کامپوننت والد (اختیاری)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [testFinished, setTestFinished] = useState(false);
    const [result, setResult] = useState(null);

    // **مهم:**  سوالات، گزینه‌ها، امتیازات و پیام‌ها را اینجا تعریف کنید.
    //         این یک نمونه ساده است و باید با داده های تست افسردگی واقعی جایگزین شود.
    const questionsData = [
        {
            text: "سوال 1: چقدر احساس می‌کنید که خانواده‌تان از شما حمایت می‌کنند؟",
            options: [
                { text: "اصلاً", value: "1", score: 4, message: "عدم حمایت خانوادگی می‌تواند یکی از عوامل مؤثر در تجربه‌ی افسردگی شما باشد." },
                { text: "کم", value: "2", score: 3, message: "خانواده‌ی شما ممکن است نیاز به افزایش حمایت و توجه به شما داشته باشند." },
                { text: "متوسط", value: "3", score: 2, message: "حمایت خانواده در سطح متوسط است؛ ممکن است گاهی احساس کمبود حمایت کنید." },
                { text: "زیاد", value: "4", score: 1, message: "خانواده‌ی شما به شما حمایت می‌کنند، اما ممکن است هنوز جاهایی برای بهبود وجود داشته باشد." },
                { text: "بسیار زیاد", value: "5", score: 0, message: "خانواده‌ی شما به نظر می‌رسد که پشتیبان و حامی شما هستند، که می‌تواند از علائم افسردگی جلوگیری کند." },
            ],
        },
        {
            text: "سوال 2: چقدر احساس می‌کنید که جامعه‌تان ارزش و اهمیت به شما می‌دهد؟",
            options: [
                { text: "اصلاً", value: "1", score: 4, message: "احساس بی‌ارزشی اجتماعی می‌تواند یکی از عوامل افسردگی باشد." },
                { text: "کم", value: "2", score: 3, message: "احساس کنید که جامعه به شما ارزش کافی نمی‌دهد." },
                { text: "متوسط", value: "3", score: 2, message: "درک جامعه از شما در سطح متوسط است؛ ممکن است گاهی دچار تردید شوید." },
                { text: "زیاد", value: "4", score: 1, message: "شما به طور کلی از حمایت جامعه بهره می‌برید." },
                { text: "بسیار زیاد", value: "5", score: 0, message: "شما از نظر اجتماعی احساس ارزشمندی می‌کنید که می‌تواند نشانه‌ی عدم افسردگی باشد." },
            ],
        },
        // ... سوالات دیگر را به همین شکل اضافه کنید
    ];


    const handleAnswerSelect = (optionValue) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = optionValue;
        setUserAnswers(updatedAnswers);
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            finishTest();
        }
    };

    const finishTest = () => {
        let totalScore = 0;
        questionsData.forEach((question, index) => {
            const selectedOption = question.options.find(opt => opt.value === userAnswers[index]);
            if (selectedOption) {
                totalScore += selectedOption.score;
            }
        });

        const maxScore = questionsData.length * 4;
        const percentage = (totalScore / maxScore) * 100;
        let interpretation = '';
        if (percentage < 25) {
            interpretation = "شما به نظر نمی‌رسد که علائم قابل توجهی از افسردگی داشته باشید.";
        } else if (percentage < 50) {
            interpretation = "ممکن است علائم افسردگی در حد خفیف تا متوسط داشته باشید. در صورت تداوم، مشاوره با متخصص توصیه می‌شود.";
        } else if (percentage < 75) {
            interpretation = "نشانه‌های قابل توجهی از افسردگی وجود دارد. توصیه می‌شود با یک مشاور یا روانشناس مشورت کنید.";
        } else {
            interpretation = "شما علائم شدید افسردگی دارید. پیشنهاد می‌شود هر چه زودتر با یک متخصص مشاوره روانشناسی ملاقات کنید.";
        }

        setResult({
            totalScore: totalScore,
            percentage: percentage.toFixed(2),
            interpretation: interpretation,
        });
        setTestFinished(true);
        if(onTestComplete) { // اطلاع رسانی به کامپوننت والد (اختیاری)
            onTestComplete();
        }
    };


    const currentQuestion = questionsData[currentQuestionIndex];

    if (testFinished) {
        return (
            <div className="depression-test-container">
                <h2>نتیجه تست افسردگی</h2>
                <div className="result-container">
                    <p>امتیاز کل: {result.totalScore} </p>
                    <p>درصد افسردگی: {result.percentage}%</p>
                    <p>تفسیر نهایی: {result.interpretation}</p>
                </div>
                <button onClick={() => { setTestFinished(false); setCurrentQuestionIndex(0); setUserAnswers([]); setResult(null); }}>انجام مجدد تست</button>
            </div>
        );
    }


    return (
        <div className="depression-test-container">
            <h2>تست افسردگی</h2>
            <div className="question-container">
                <h3>سوال {currentQuestionIndex + 1} از {questionsData.length}</h3>
                <p>{currentQuestion.text}</p>
            </div>
            <div className="options-container">
                {currentQuestion.options.map((option) => (
                    <button
                        key={option.value}
                        className={`option-button ${userAnswers[currentQuestionIndex] === option.value ? 'selected' : ''}`}
                        onClick={() => handleAnswerSelect(option.value)}
                    >
                        {option.text}
                    </button>
                ))}
            </div>
            <div className="navigation-buttons">
                <button
                    onClick={goToNextQuestion}
                    disabled={!userAnswers[currentQuestionIndex]} // غیرفعال کردن دکمه تا زمانی که پاسخ انتخاب نشده
                >
                    بعدی
                </button>
            </div>
        </div>
    );
};
DepressionTestPage.propTypes = {
    onTestComplete: PropTypes.func, // مشخص کنید که onTestComplete باید یک تابع باشد
};

export default DepressionTestPage;