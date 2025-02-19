const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('YOUR_BOT_TOKEN');

// Define conversation stages
const stages = {
    NAME: 'NAME',
    AGE: 'AGE',
    QUESTION: 'QUESTION'
};

// Depression test questions
const questions = [
    {
        text: "سوال 1: چقدر احساس می‌کنید که خانواده‌تان از شما حمایت می‌کنند؟",
        options: {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        scores: {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 1,
            "5": 0
        },
        messages: {
            "1": "عدم حمایت خانوادگی می‌تواند یکی از عوامل مؤثر در تجربه‌ی افسردگی شما باشد.",
            "2": "خانواده‌ی شما ممکن است نیاز به افزایش حمایت و توجه به شما داشته باشند.",
            "3": "حمایت خانواده در سطح متوسط است؛ ممکن است گاهی احساس کمبود حمایت کنید.",
            "4": "خانواده‌ی شما به شما حمایت می‌کنند، اما ممکن است هنوز جاهایی برای بهبود وجود داشته باشد.",
            "5": "خانواده‌ی شما به نظر می‌رسد که پشتیبان و حامی شما هستند، که می‌تواند از علائم افسردگی جلوگیری کند."
        }
    },
    {
        text: "سوال 2: چقدر احساس می‌کنید که جامعه‌تان ارزش و اهمیت به شما می‌دهد؟",
        options: {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        scores: {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 1,
            "5": 0
        },
        messages: {
            "1": "احساس بی‌ارزشی اجتماعی می‌تواند یکی از عوامل افسردگی باشد.",
            "2": "احساس کنید که جامعه به شما ارزش کافی نمی‌دهد.",
            "3": "درک جامعه از شما در سطح متوسط است؛ ممکن است گاهی دچار تردید شوید.",
            "4": "شما به طور کلی از حمایت جامعه بهره می‌برید.",
            "5": "شما از نظر اجتماعی احساس ارزشمندی می‌کنید که می‌تواند نشانه‌ی عدم افسردگی باشد."
        }
    },
    // Add other questions similarly...
];

// Start the depression test
bot.start((ctx) => {
    ctx.reply('سلام! خوش آمدید.\nلطفاً نام خود را وارد کنید:');
    ctx.session = {};
    ctx.session.current_stage = stages.NAME;
});

// Handle text messages
bot.on('text', (ctx) => {
    const stage = ctx.session.current_stage;

    if (stage === stages.NAME) {
        ctx.session.name = ctx.message.text;
        ctx.reply('چند سال دارید؟');
        ctx.session.current_stage = stages.AGE;
    } else if (stage === stages.AGE) {
        ctx.session.age = ctx.message.text;
        ctx.session.current_question = 0;
        ctx.session.total_score = 0;
        ctx.session.responses = [];
        sendQuestion(ctx);
        ctx.session.current_stage = stages.QUESTION;
    }
});

// Send question with interactive buttons
function sendQuestion(ctx) {
    const qIndex = ctx.session.current_question;
    if (qIndex < questions.length) {
        const question = questions[qIndex];
        const buttons = Object.keys(question.options).map(key => 
            Markup.button.callback(`${key}) ${question.options[key]}`, key)
        );
        ctx.reply(question.text, Markup.inlineKeyboard(buttons).oneTime().resize());
    } else {
        sendFinalResult(ctx);
    }
}

// Handle button clicks
bot.on('callback_query', (ctx) => {
    const selectedOption = ctx.callbackQuery.data;
    const qIndex = ctx.session.current_question;
    const question = questions[qIndex];
    const score = question.scores[selectedOption] || 0;
    ctx.session.total_score += score;
    ctx.session.responses.push({
        question: question.text,
        selected_option: selectedOption,
        option_text: question.options[selectedOption],
        message: question.messages[selectedOption],
        score: score
    });
    ctx.session.current_question += 1;
    sendQuestion(ctx);
});

// Send final result
function sendFinalResult(ctx) {
    const totalScore = ctx.session.total_score;
    const maxScore = questions.length * 4; // Each question has a max score of 4
    const percentage = (totalScore / maxScore) * 100;
    let analysis = `نتیجه تست افسردگی:\n\n`;
    analysis += `نام: ${ctx.session.name || 'نامشخص'}\n`;
    analysis += `سن: ${ctx.session.age || 'نامشخص'}\n\n`;
    analysis += `امتیاز کل: ${totalScore} از ${maxScore}\n`;
    analysis += `درصد افسردگی: ${percentage.toFixed(2)}%\n\n`;
    analysis += `تحلیل پاسخ‌های شما:\n`;
    ctx.session.responses.forEach((resp, idx) => {
        analysis += `\nسوال ${idx + 1}: ${resp.question}\n`;
        analysis += `گزینه انتخاب شده: ${resp.selected_option}) ${resp.option_text}\n`;
        analysis += `پیام: ${resp.message}\n`;
    });
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
    analysis += `\n\nتفسیر نهایی: ${interpretation}`;
    ctx.reply(analysis);
}

// Start the bot
bot.launch();