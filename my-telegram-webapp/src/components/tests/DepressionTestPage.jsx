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
          messages: [
            "عدم حمایت خانوادگی می‌تواند یکی از عوامل مؤثر در تجربه‌ی افسردگی شما باشد.",
            "خانواده‌ی شما ممکن است نیاز به افزایش حمایت و توجه به شما داشته باشند.",
            "حمایت خانواده در سطح متوسط است؛ ممکن است گاهی احساس کمبود حمایت کنید.",
            "خانواده‌ی شما به شما حمایت می‌کنند، اما ممکن است هنوز جاهایی برای بهبود وجود داشته باشد.",
            "خانواده‌ی شما به نظر می‌رسد که پشتیبان و حامی شما هستند، که می‌تواند از علائم افسردگی جلوگیری کند."
          ]
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
          messages: [
            "احساس بی‌ارزشی اجتماعی می‌تواند یکی از عوامل افسردگی باشد.",
            "احساس کنید که جامعه به شما ارزش کافی نمی‌دهد.",
            "درک جامعه از شما در سطح متوسط است؛ ممکن است گاهی دچار تردید شوید.",
            "شما به طور کلی از حمایت جامعه بهره می‌برید.",
            "شما از نظر اجتماعی احساس ارزشمندی می‌کنید که می‌تواند نشانه‌ی عدم افسردگی باشد."
          ]
        },
        {
          text: "سوال 3: چقدر انگیزه برای انجام کارهای روزمره دارید؟",
          options: [
            { text: "اصلاً", value: "1", score: 4 },
            { text: "کم", value: "2", score: 3 },
            { text: "متوسط", value: "3", score: 2 },
            { text: "زیاد", value: "4", score: 1 },
            { text: "بسیار زیاد", value: "5", score: 0 },
          ],
          messages: [
            "فقدان انگیزه می‌تواند نشانه‌ای قوی از افسردگی باشد.",
            "شما ممکن است با کاهش انگیزه روبرو شوید که از علائم افسردگی است.",
            "انگیزه شما در سطح متوسط قرار دارد؛ ممکن است برخی فعالیت‌ها را کمتر انجام دهید.",
            "شما انگیزه کافی دارید، اما ممکن است نیاز به افزایش انگیزه داشته باشید.",
            "شما انگیزه‌ی زیادی برای انجام کارهای روزمره دارید که نشانه‌ی سلامت روانی است."
          ]
        },
        {
          text: "سوال 4: چقدر از فعالیت‌های اجتماعی لذت می‌برید؟",
          options: [
            { text: "اصلاً", value: "1", score: 4 },
            { text: "کم", value: "2", score: 3 },
            { text: "متوسط", value: "3", score: 2 },
            { text: "زیاد", value: "4", score: 1 },
            { text: "بسیار زیاد", value: "5", score: 0 },
          ],
          messages: [
            "عدم لذت از فعالیت‌های اجتماعی می‌تواند نشانه‌ی افسردگی باشد.",
            "ممکن است از فعالیت‌های اجتماعی لذت کمتری ببرید که نشانه‌ای از افسردگی است.",
            "لذت شما از فعالیت‌های اجتماعی در سطح متوسط است؛ ممکن است گاهی احساس تنهایی کنید.",
            "شما به طور کلی از فعالیت‌های اجتماعی لذت می‌برید.",
            "شما از فعالیت‌های اجتماعی لذت می‌برید که می‌تواند نشانه‌ی عدم افسردگی باشد."
          ]
        },
        {
          text: "سوال 5: چقدر احساس می‌کنید که اهداف و آرزوهایتان قابل دسترسی هستند؟",
          options: [
            { text: "اصلاً", value: "1", score: 4 },
            { text: "کم", value: "2", score: 3 },
            { text: "متوسط", value: "3", score: 2 },
            { text: "زیاد", value: "4", score: 1 },
            { text: "بسیار زیاد", value: "5", score: 0 },
          ],
          messages: [
            "فقدان امید به اهداف می‌تواند از علائم افسردگی باشد.",
            "شاید احساس کنید اهداف شما به سختی دست‌یافتنی هستند.",
            "درک شما از دسترسی به اهداف در سطح متوسط است؛ گاهی دچار تردید می‌شوید.",
            "شما احساس می‌کنید که به اهداف خود دسترسی دارید، اما ممکن است نیاز به تقویت بیشتری داشته باشید.",
            "شما اطمینان بالایی در رسیدن به اهداف خود دارید که نشانه‌ی سلامت روانی است."
          ]
        },
        {
          text: "سوال 6: چقدر از خواب خود راضی هستید؟",
          options: [
            { text: "اصلاً", value: "1", score: 4 },
            { text: "کم", value: "2", score: 3 },
            { text: "متوسط", value: "3", score: 2 },
            { text: "زیاد", value: "4", score: 1 },
            { text: "بسیار زیاد", value: "5", score: 0 },
          ],
          messages: [
            "عدم رضایت از خواب می‌تواند نشان‌دهنده‌ی افسردگی باشد.",
            "ممکن است با مشکلات خواب روبرو باشید که نشانه‌ای از افسردگی است.",
            "کیفیت خواب شما در سطح متوسط است؛ گاهی نارضایتی حس می‌کنید.",
            "شما خواب مناسبی دارید اما ممکن است نیاز به بهبود داشته باشد.",
            "خواب شما مناسب است که می‌تواند نشانه‌ی عدم افسردگی باشد."
          ]
        },
        {
          text: "سوال 7: چقدر احساس می‌کنید که توانایی مقابله با استرس را دارید؟",
          options: [
            { text: "اصلاً", value: "1", score: 4 },
            { text: "کم", value: "2", score: 3 },
            { text: "متوسط", value: "3", score: 2 },
            { text: "زیاد", value: "4", score: 1 },
            { text: "بسیار زیاد", value: "5", score: 0 },
          ],
          messages: [
            "فقدان توانایی مقابله با استرس می‌تواند نشانه‌ی افسردگی باشد.",
            "ممکن است در مقابله با استرس دچار مشکل شوید.",
            "توانایی شما در مقابله با استرس در سطح متوسط است؛ گاهی نیاز به کمک دارید.",
            "شما به طور کلی توانایی مقابله با استرس را دارید، اما شاید در مواقع بحرانی نیاز به حمایت داشته باشید.",
            "شما توانایی بالایی در مقابله با استرس دارید که نشانه‌ی سلامت روانی است."
          ]
        },
        {
          text: "سوال 8: چقدر احساس رضایت از خود دارید؟",
          options: [
            { text: "اصلاً", value: "1", score: 4 },
            { text: "کم", value: "2", score: 3 },
            { text: "متوسط", value: "3", score: 2 },
            { text: "زیاد", value: "4", score: 1 },
            { text: "بسیار زیاد", value: "5", score: 0 },
          ],
          messages: [
            "فقدان رضایت از خود می‌تواند نشانه‌ی افسردگی باشد.",
            "ممکن است در رضایت از خود دچار مشکل شوید.",
            "احساس رضایت از خود شما در سطح متوسط است؛ گاهی تردیدهایی دارید.",
            "شما به طور کلی از خود راضی هستید، اگرچه همیشه جا برای بهبود وجود دارد.",
            "شما احساس رضایت بالایی از خود دارید که نشان‌دهنده‌ی سلامت روانی است."
          ]
        },
        {

            text: "سوال 9: چقدر از تفریحات و سرگرمی‌های خود لذت می‌برید؟",
            options: [
                { text: "اصلاً", value: "1", score: 4 },
                { text: "کم", value: "2", score: 3 },
                { text: "متوسط", value: "3", score: 2 },
                { text: "زیاد", value: "4", score: 1 },
                { text: "بسیار زیاد", value: "5", score: 0 },
            ],
            messages: [
                "عدم لذت از تفریحات می‌تواند نشانه‌ی افسردگی باشد.",
                "ممکن است از تفریحات خود لذت کمتری ببرید.",
                "لذت شما از تفریحات در سطح متوسط است؛ شاید نیاز به تنوع داشته باشید.",
                "شما به طور کلی از تفریحات خود لذت می‌برید، اما امکان بهبود وجود دارد.",
                "شما از تفریحات و سرگرمی‌های خود لذت می‌برید که نشانه‌ی عدم افسردگی است."
            ]
        },
        {
            text: "سوال 10: چقدر احساس می‌کنید که زندگی‌تان ارزشمند است؟",
            options: [
                { text: "اصلاً", value: "1", score: 4 },
                { text: "کم", value: "2", score: 3 },
                { text: "متوسط", value: "3", score: 2 },
                { text: "زیاد", value: "4", score: 1 },
                { text: "بسیار زیاد", value: "5", score: 0 },
            ],
            messages: [
                "فقدان احساس ارزشمندی زندگی می‌تواند نشان‌دهنده‌ی افسردگی باشد.",
                "ممکن است در احساس ارزشمندی زندگی دچار مشکل شوید.",
                "احساس شما از ارزشمندی زندگی در سطح متوسط است؛ گاهی دچار تردید می‌شوید.",
                "شما به طور کلی احساس ارزشمندی می‌کنید اما شاید نیاز به تقویت داشته باشید.",
                "شما احساس می‌کنید که زندگی‌تان ارزشمند است که نشانه‌ی سلامت روانی است."
            ]
        }
        ];

    const handleAnswerSelect = (option) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = option.score;
        setUserAnswers(updatedAnswers);
        console.log(`سوال ${currentQuestionIndex + 1}: انتخاب امتیاز ${option.score}`);
        };
    
        const goToNextQuestion = () => {
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            finishTest();
        }
        };
    
        const finishTest = () => {
        console.log("آرایه امتیازات کاربر:", userAnswers);
        // محاسبه امتیاز کل
        let totalScore = userAnswers.reduce((sum, score) => sum + (score || 0), 0);
        console.log("امتیاز کل محاسبه شده:", totalScore);
        // حداکثر امتیاز ممکن (هر سوال بیشترین امتیاز ۴ دارد)
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
    
        const finalResult = {
            totalScore,
            percentage: percentage.toFixed(2),
            interpretation,
        };
    
        console.log("نتیجه نهایی تست:", finalResult);
        setResult(finalResult);
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
            <button
                onClick={() => {
                setTestFinished(false);
                setCurrentQuestionIndex(0);
                setUserAnswers([]);
                setResult(null);
                }}
            >
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
            <h3>
                سوال {currentQuestionIndex + 1} از {questionsData.length}
            </h3>
            <p>{currentQuestion.text}</p>
            </div>
            <div className="options-container">
            {currentQuestion.options.map((option) => (
                <button
                key={option.value}
                className={`option-button ${
                    userAnswers[currentQuestionIndex] === option.score ? "selected" : ""
                }`}
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