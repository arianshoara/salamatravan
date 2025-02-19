import { useState } from "react";
import PropTypes from "prop-types";
import "./DepressionTestPage.css";

const DepressionTestPage = ({ onTestComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [testFinished, setTestFinished] = useState(false);
    const [result, setResult] = useState(null);

    const questionsData = [
        {
            text: "سوال 1: چقدر احساس می‌کنید که خانواده‌تان از شما حمایت می‌کنند؟",
            options: [
                { text: "اصلاً", value: "1", score: 4 },
                { text: "کم", value: "2", score: 3 },
                { text: "متوسط", value: "3", score: 2 },
                { text: "زیاد", value: "4", score: 1 },
                { text: "بسیار زیاد", value: "5", score: 0 },
            ],
        },
        {
            text: "سوال 2: چقدر احساس می‌کنید که جامعه‌تان ارزش و اهمیت به شما می‌دهد؟",
            options: [
                { text: "اصلاً", value: "1", score: 4 },
                { text: "کم", value: "2", score: 3 },
                { text: "متوسط", value: "3", score: 2 },
                { text: "زیاد", value: "4", score: 1 },
                { text: "بسیار زیاد", value: "5", score: 0 },
            ],
        },
    ];

    const handleAnswerSelect = (option) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = option.score;
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
        let totalScore = userAnswers.reduce((sum, score) => sum + (score || 0), 0);
        const maxScore = questionsData.length * 4;
        const percentage = (totalScore / maxScore) * 100;

        let interpretation = "";
        if (percentage < 25) {
            interpretation = "شما به نظر نمی‌رسد که علائم قابل توجهی از افسردگی داشته باشید.";
        } else if (percentage < 50) {
            interpretation = "ممکن است علائم افسردگی در حد خفیف تا متوسط داشته باشید.";
        } else if (percentage < 75) {
            interpretation = "نشانه‌های قابل توجهی از افسردگی وجود دارد.";
        } else {
            interpretation = "شما علائم شدید افسردگی دارید. پیشنهاد می‌شود هر چه زودتر با یک متخصص مشاوره روانشناسی ملاقات کنید.";
        }

        setResult({ totalScore, percentage: percentage.toFixed(2), interpretation });
        setTestFinished(true);

        if (onTestComplete) {
            onTestComplete();
        }
    };

    if (testFinished) {
        return (
            <div className="depression-test-container">
                <h2>نتیجه تست افسردگی</h2>
                <div className="result-container">
                    <p>امتیاز کل: {result.totalScore}</p>
                    <p>درصد افسردگی: {result.percentage}%</p>
                    <p>تفسیر نهایی: {result.interpretation}</p>
                </div>
                <button onClick={() => { setTestFinished(false); setCurrentQuestionIndex(0); setUserAnswers([]); setResult(null); }}>
                    انجام مجدد تست
                </button>
            </div>
        );
    }

    const currentQuestion = questionsData[currentQuestionIndex];

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
                        className={`option-button ${userAnswers[currentQuestionIndex] === option.score ? 'selected' : ''}`}
                        onClick={() => handleAnswerSelect(option)}
                    >
                        {option.text}
                    </button>
                ))}
            </div>
            <div className="navigation-buttons">
                <button
                    onClick={goToNextQuestion}
                    disabled={userAnswers[currentQuestionIndex] === undefined}
                >
                    بعدی
                </button>
            </div>
        </div>
    );
};

DepressionTestPage.propTypes = {
    onTestComplete: PropTypes.func,
};

export default DepressionTestPage;
