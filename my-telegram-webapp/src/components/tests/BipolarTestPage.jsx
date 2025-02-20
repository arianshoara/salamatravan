import { useState } from "react";
import PropTypes from "prop-types";
import "./DepressionTestPage.css"; // استایل مخصوص این تست

const BipolarTestPage = ({ onTestComplete }) => {
    const [answers, setAnswers] = useState(Array(10).fill(null));

    const questions = [
        "آیا در دوره‌هایی احساس شادی و انرژی بیش از حد داشته‌اید که غیرعادی به نظر برسد؟",
        "آیا در بعضی مواقع بدون دلیل خاصی احساس فوق‌العاده پرانرژی و پرتحرک داشته‌اید؟",
        "آیا در این دوره‌ها کمتر از حد معمول خوابیده‌اید ولی همچنان احساس خستگی نکرده‌اید؟",
        "آیا در دوره‌هایی بیش از حد معمول پرحرف یا سریع صحبت کرده‌اید؟",
        "آیا گاهی تصمیمات عجولانه و پرریسک (مانند خریدهای گران، رانندگی خطرناک، یا قمار) گرفته‌اید؟",
        "آیا در برخی مواقع احساس کرده‌اید که ذهن شما بسیار سریع‌تر از حد معمول کار می‌کند؟",
        "آیا در این دوره‌ها احساس کرده‌اید که قدرت و توانایی‌های خاصی دارید که دیگران ندارند؟",
        "آیا گاهی بدون دلیل احساس عصبانیت شدید یا تحریک‌پذیری داشته‌اید؟",
        "آیا در بعضی مواقع احساس کرده‌اید که کنترل احساسات خود را از دست داده‌اید؟",
        "آیا این دوره‌های احساسی باعث ایجاد مشکلاتی در روابط یا کار شما شده‌اند؟",
    ];

    const options = ["اصلاً نه", "گاهی اوقات", "بیشتر اوقات", "تقریباً همیشه"];

    const handleAnswerChange = (questionIndex, answerIndex) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answerIndex;
        setAnswers(newAnswers);
    };

    const calculateResult = () => {
        const totalScore = answers.reduce((sum, ans) => sum + (ans !== null ? ans : 0), 0);
        const percentage = ((totalScore / 30) * 100).toFixed(2);

        const interpretation =
            totalScore <= 5 ? "احتمال بسیار کم اختلال دوقطبی" :
            totalScore <= 10 ? "علائم خفیف دوقطبی" :
            totalScore <= 20 ? "علائم متوسط دوقطبی" :
            totalScore <= 25 ? "اختلال دوقطبی شدید" :
            "اختلال دوقطبی بسیار شدید";

        onTestComplete && onTestComplete({ totalScore, percentage, interpretation });
    };

    return (
        <div className="test-container">
            <h2>📋 تست اختلال دوقطبی</h2>
            <p className="description">لطفاً به سوالات زیر با دقت پاسخ دهید. پاسخ‌ها مربوط به <b>۲ هفته گذشته</b> باشد.</p>

            {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="question-box">
                    <p className="question-text">{question}</p>
                    <div className="options-container">
                        {options.map((option, optionIndex) => (
                            <label key={optionIndex} className="option-label">
                                <input
                                    type="radio"
                                    name={`question-${questionIndex}`}
                                    value={optionIndex}
                                    checked={answers[questionIndex] === optionIndex}
                                    onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                                    className="option-input"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <button 
                onClick={calculateResult} 
                disabled={answers.includes(null)}
                className="submit-button"
            >
                نمایش نتیجه تست
            </button>
        </div>
    );
};

BipolarTestPage.propTypes = {
    onTestComplete: PropTypes.func.isRequired,
};

export default BipolarTestPage;
