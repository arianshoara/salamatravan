import TestQuestions, { useAnswers } from './TestUI';
import PropTypes from "prop-types";


const DepressionTestPage = ({ onTestComplete }) => {

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

    const [answers, setAnswers] = useAnswers("DepressionTestPage", questions.length, options.length);
    const handleAnswerChange = (questionIndex, answerIndex) => {
        onTestComplete?.(null);
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answerIndex;
        setAnswers(newAnswers);
    };

    const calculateResult = () => {
      if (questions.some((_, i) => !Number.isInteger(answers[i]))) return;
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

            <TestQuestions questions={questions} options={options} answers={answers} onChange={handleAnswerChange} draftId={"DepressionTestPage"} urgentIndex={8} />

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

DepressionTestPage.propTypes = {
    onTestComplete: PropTypes.func,
};

export default DepressionTestPage;
