import { useState } from "react";
import PropTypes from "prop-types";
import "./AnxietyTestPage.css"; // می‌توانید استایل جداگانه داشته باشید

const AnxietyTestPage = ({ onTestComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [testFinished, setTestFinished] = useState(false);
  const [result, setResult] = useState(null);

  const questionsData = [
    // سوالات و گزینه‌های تست اضطراب مشابه به تست افسردگی
    {
      text: "سوال 1: چقدر احساس می‌کنید که اضطراب دارید؟",
      options: [
        { text: "اصلاً", value: "1", score: 4 },
        { text: "کم", value: "2", score: 3 },
        { text: "متوسط", value: "3", score: 2 },
        { text: "زیاد", value: "4", score: 1 },
        { text: "بسیار زیاد", value: "5", score: 0 },
      ]
    },
    // اضافه کردن سوالات بیشتر...
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
      interpretation = "شما به نظر نمی‌رسد که علائم قابل توجهی از اضطراب داشته باشید.";
    } else if (percentage < 50) {
      interpretation = "ممکن است علائم اضطراب در حد خفیف تا متوسط داشته باشید.";
    } else if (percentage < 75) {
      interpretation = "نشانه‌های قابل توجهی از اضطراب وجود دارد.";
    } else {
      interpretation = "شما علائم شدید اضطراب دارید. پیشنهاد می‌شود هر چه زودتر با یک متخصص مشاوره روانشناسی ملاقات کنید.";
    }

    setResult({ totalScore, percentage: percentage.toFixed(2), interpretation });
    setTestFinished(true);

    if (onTestComplete) {
      onTestComplete();
    }
  };

  if (testFinished) {
    return (
      <div className="anxiety-test-container">
        <h2>نتیجه تست اضطراب</h2>
        <div className="result-container">
          <p>امتیاز کل: {result.totalScore}</p>
          <p>درصد اضطراب: {result.percentage}%</p>
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
    <div className="anxiety-test-container">
      <h2>تست اضطراب</h2>
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
        <button onClick={goToNextQuestion} disabled={userAnswers[currentQuestionIndex] === undefined}>
          بعدی
        </button>
      </div>
    </div>
  );
};

AnxietyTestPage.propTypes = {
  onTestComplete: PropTypes.func,
};

export default AnxietyTestPage;
