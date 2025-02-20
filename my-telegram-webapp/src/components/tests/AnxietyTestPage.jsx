import { useState } from "react";
import PropTypes from "prop-types";
import "./DepressionTestPage.css"; // استفاده از همان استایل تست افسردگی

const AnxietyTestPage = ({ onTestComplete }) => {
    const [answers, setAnswers] = useState(Array(7).fill(null));

    const questions = [
        "در این دو هفته، چقدر احساس نگرانی و عصبی بودن داشتید؟",
        "در این دو هفته، چقدر نتوانستید اضطراب خود را کنترل کنید؟",
        "در این دو هفته، چقدر نگرانی‌هایتان بیش از حد بود؟",
        "در این دو هفته، چقدر در آرام ماندن و استراحت مشکل داشتید؟",
        "در این دو هفته، چقدر بی‌قرار بودید و نمی‌توانستید آرام باشید؟",
        "در این دو هفته، چقدر زود عصبانی یا تحریک‌پذیر شدید؟",
        "در این دو هفته، چقدر احساس ترس داشتید که ممکن است اتفاق بدی بیفتد؟",
    ];

    const options = ["اصلاً نداشتم", "چند روز در هفته", "بیشتر روزها", "تقریباً هر روز"];

    const handleAnswerChange = (questionIndex, answerIndex) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answerIndex;
        setAnswers(newAnswers);
    };

    const calculateResult = () => {
        const totalScore = answers.reduce((sum, ans) => sum + (ans !== null ? ans : 0), 0);
        const percentage = ((totalScore / 21) * 100).toFixed(2);

        const interpretation =
            totalScore <= 4 ? "حداقل اضطراب" :
            totalScore <= 9 ? "اضطراب خفیف" :
            totalScore <= 14 ? "اضطراب متوسط" :
            "اضطراب شدید";

        onTestComplete && onTestComplete({ totalScore, percentage, interpretation });
    };

    return (
        <div className="test-container">
            <h2>📋 تست اضطراب GAD-7</h2>
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

AnxietyTestPage.propTypes = {
    onTestComplete: PropTypes.func.isRequired,
};

export default AnxietyTestPage;
