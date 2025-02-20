import { useState } from "react";
import PropTypes from "prop-types";
import "./DepressionTestPage.css"; // اضافه کردن فایل استایل

const DepressionTestPage = ({ onTestComplete }) => {
    const [answers, setAnswers] = useState(Array(9).fill(null));

    const questions = [
        "در این دو هفته، چقدر احساس کمبود علاقه یا لذت در انجام کارها داشتید؟",
        "در این دو هفته، چقدر احساس افسردگی، ناامیدی یا درماندگی داشتید؟",
        "در این دو هفته، چقدر مشکل در به خواب رفتن یا زیاد خوابیدن داشتید؟",
        "در این دو هفته، چقدر احساس خستگی و کمبود انرژی داشتید؟",
        "در این دو هفته، چقدر کم اشتهایی یا پرخوری داشتید؟",
        "در این دو هفته، چقدر احساس بدی در مورد خودتان داشتید؟ (مثل احساس گناه، بی‌ارزشی، یا دست کم گرفتن خودتان)",
        "در این دو هفته، چقدر مشکل در تمرکز کردن روی چیزهایی مثل مطالعه یا تماشای تلویزیون داشتید؟",
        "در این دو هفته، چقدر آهسته حرکت کردن یا صحبت کردن داشتید، به طوری که دیگران متوجه شده باشند؟",
        "در این دو هفته، چقدر به فکر خودکشی یا آسیب رساندن به خودتان بودید؟",
    ];

    const options = ["اصلاً نداشتم", "چند روز در هفته", "بیشتر روزها", "تقریباً هر روز"];

    const handleAnswerChange = (questionIndex, answerIndex) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answerIndex;
        setAnswers(newAnswers);
    };

    const calculateResult = () => {
        const totalScore = answers.reduce((sum, ans) => sum + (ans !== null ? ans : 0), 0);
        const percentage = ((totalScore / 27) * 100).toFixed(2);

        const interpretation =
            totalScore <= 4 ? "حداقل افسردگی" :
            totalScore <= 9 ? "افسردگی خفیف" :
            totalScore <= 14 ? "افسردگی متوسط" :
            totalScore <= 19 ? "افسردگی نسبتاً شدید" :
            "افسردگی شدید";

        onTestComplete && onTestComplete({ totalScore, percentage, interpretation });
    };

    return (
        <div className="test-container">
            <h2>📋 تست افسردگی PHQ-9</h2>
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

DepressionTestPage.propTypes = {
    onTestComplete: PropTypes.func.isRequired,
};

export default DepressionTestPage;
