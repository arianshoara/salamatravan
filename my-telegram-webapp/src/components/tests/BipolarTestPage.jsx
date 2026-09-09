import TestQuestions, { useAnswers } from './TestUI';
import PropTypes from "prop-types";


const BipolarTestPage = ({ onTestComplete }) => {

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

    const [answers, setAnswers] = useAnswers("BipolarTestPage", questions.length, options.length);
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

            <TestQuestions questions={questions} options={options} answers={answers} onChange={handleAnswerChange} draftId={"BipolarTestPage"} />

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

BipolarTestPage.propTypes = {
    onTestComplete: PropTypes.func,
};

export default BipolarTestPage;
