import TestQuestions, { useAnswers } from './TestUI';
import PropTypes from "prop-types";


const OCDTestPage = ({ onTestComplete }) => {

    const questions = [
        "آیا به طور مداوم افکار یا تصاویر ناخواسته‌ای دارید که ذهن شما را مشغول می‌کنند؟",
        "آیا احساس می‌کنید باید کارهای خاصی را بارها و بارها انجام دهید تا اضطراب خود را کاهش دهید؟",
        "آیا هنگام انجام این کارها (مثل چک کردن، شستن دست، یا شمارش) احساس اجبار می‌کنید؟",
        "آیا وسواس‌های فکری یا اعمال اجباری شما زمان زیادی از روزتان را می‌گیرد؟",
        "آیا این افکار یا رفتارها باعث ایجاد ناراحتی یا اختلال در زندگی روزمره شما شده‌اند؟",
        "آیا سعی کرده‌اید این افکار یا اعمال را کنترل کنید اما موفق نبوده‌اید؟",
        "آیا هنگام نادیده گرفتن این افکار یا اعمال، احساس اضطراب شدیدی دارید؟",
        "آیا وسواس‌های شما روی تمیزی، نظم، یا دقت بیش از حد تمرکز دارند؟",
        "آیا این افکار یا رفتارها باعث مشکلاتی در روابط اجتماعی یا کاری شما شده‌اند؟",
        "آیا یکی از اعضای خانواده یا دوستان متوجه وسواس‌های شما شده است و به شما گفته است؟",
    ];

    const options = ["اصلاً نه", "گاهی اوقات", "بیشتر اوقات", "تقریباً همیشه"];

    const [answers, setAnswers] = useAnswers("OCDTestPage", questions.length, options.length);
    const handleAnswerChange = (questionIndex, answerIndex) => {
        onTestComplete?.(null);
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answerIndex;
        setAnswers(newAnswers);
    };

    const calculateResult = () => {
      if (questions.some((_, i) => !Number.isInteger(answers[i]))) return;
        const totalScore = answers.reduce((sum, ans) => sum + (ans !== null ? ans : 0), 0);
        const percentage = ((totalScore / 30) * 100).toFixed(2);

        const interpretation =
            totalScore <= 5 ? "سطح کم وسواس فکری-عملی" :
            totalScore <= 10 ? "وسواس خفیف" :
            totalScore <= 20 ? "وسواس متوسط" :
            totalScore <= 25 ? "وسواس شدید" :
            "وسواس بسیار شدید";

        onTestComplete && onTestComplete({ totalScore, percentage, interpretation });
    };

    return (
        <div className="test-container">
            <h2>📋 تست وسواس فکری-عملی (OCD)</h2>
            <p className="description">لطفاً به سوالات زیر با دقت پاسخ دهید. پاسخ‌ها مربوط به <b>۲ هفته گذشته</b> باشد.</p>

            <TestQuestions questions={questions} options={options} answers={answers} onChange={handleAnswerChange} draftId={"OCDTestPage"} />

            <button 
                onClick={calculateResult} 
                disabled={questions.some((_, i) => !Number.isInteger(answers[i]))}
                className="submit-button"
            >
                نمایش نتیجه تست
            </button>
        </div>
    );
};

OCDTestPage.propTypes = {
    onTestComplete: PropTypes.func,
};

export default OCDTestPage;
