import logging
from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import (
    Application,
    CommandHandler,
    CallbackQueryHandler,
    MessageHandler,
    filters,
    ContextTypes,
    ConversationHandler,
)

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO
)
logger = logging.getLogger(__name__)

# تعریف مراحل مکالمه
NAME, AGE, QUESTION = range(3)

# سوالات تست افسردگی
# لیست سوالات با گزینه‌ها، امتیازها و پیام‌های مربوط به هر گزینه
questions = [
    {
        "text": "سوال 1: چقدر احساس می‌کنید که خانواده‌تان از شما حمایت می‌کنند؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 1,
            "5": 0
        },
        "messages": {
            "1": "عدم حمایت خانوادگی می‌تواند یکی از عوامل مؤثر در تجربه‌ی افسردگی شما باشد.",
            "2": "خانواده‌ی شما ممکن است نیاز به افزایش حمایت و توجه به شما داشته باشند.",
            "3": "حمایت خانواده در سطح متوسط است؛ ممکن است گاهی احساس کمبود حمایت کنید.",
            "4": "خانواده‌ی شما به شما حمایت می‌کنند، اما ممکن است هنوز جاهایی برای بهبود وجود داشته باشد.",
            "5": "خانواده‌ی شما به نظر می‌رسد که پشتیبان و حامی شما هستند، که می‌تواند از علائم افسردگی جلوگیری کند."
        }
    },
    {
        "text": "سوال 2: چقدر احساس می‌کنید که جامعه‌تان ارزش و اهمیت به شما می‌دهد؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 1,
            "5": 0
        },
        "messages": {
            "1": "احساس بی‌ارزشی اجتماعی می‌تواند یکی از عوامل افسردگی باشد.",
            "2": "احساس کنید که جامعه به شما ارزش کافی نمی‌دهد.",
            "3": "درک جامعه از شما در سطح متوسط است؛ ممکن است گاهی دچار تردید شوید.",
            "4": "شما به طور کلی از حمایت جامعه بهره می‌برید.",
            "5": "شما از نظر اجتماعی احساس ارزشمندی می‌کنید که می‌تواند نشانه‌ی عدم افسردگی باشد."
        }
    },
    {
        "text": "سوال 3: چقدر انگیزه برای انجام کارهای روزمره دارید؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 1,
            "5": 0
        },
        "messages": {
            "1": "فقدان انگیزه می‌تواند نشانه‌ای قوی از افسردگی باشد.",
            "2": "شما ممکن است با کاهش انگیزه روبرو شوید که از علائم افسردگی است.",
            "3": "انگیزه شما در سطح متوسط قرار دارد؛ ممکن است برخی فعالیت‌ها را کمتر انجام دهید.",
            "4": "شما انگیزه کافی دارید، اما ممکن است نیاز به افزایش انگیزه داشته باشید.",
            "5": "شما انگیزه‌ی زیادی برای انجام کارهای روزمره دارید که نشانه‌ی سلامت روانی است."
        }
    },
    {
        "text": "سوال 4: چقدر از فعالیت‌های اجتماعی لذت می‌برید؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 1,
            "5": 0
        },
        "messages": {
            "1": "عدم لذت از فعالیت‌های اجتماعی می‌تواند نشانه‌ی افسردگی باشد.",
            "2": "ممکن است از فعالیت‌های اجتماعی لذت کمتری ببرید که نشانه‌ای از افسردگی است.",
            "3": "لذت شما از فعالیت‌های اجتماعی در سطح متوسط است؛ ممکن است گاهی احساس تنهایی کنید.",
            "4": "شما به طور کلی از فعالیت‌های اجتماعی لذت می‌برید.",
            "5": "شما از فعالیت‌های اجتماعی لذت می‌برید که می‌تواند نشانه‌ی عدم افسردگی باشد."
        }
    },
    {
        "text": "سوال 5: چقدر احساس می‌کنید که اهداف و آرزوهایتان قابل دسترسی هستند؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 1,
            "5": 0
        },
        "messages": {
            "1": "فقدان امید به اهداف می‌تواند از علائم افسردگی باشد.",
            "2": "شاید احساس کنید اهداف شما به سختی دست‌یافتنی هستند.",
            "3": "درک شما از دسترسی به اهداف در سطح متوسط است؛ گاهی دچار تردید می‌شوید.",
            "4": "شما احساس می‌کنید که به اهداف خود دسترسی دارید، اما ممکن است نیاز به تقویت بیشتری داشته باشید.",
            "5": "شما اطمینان بالایی در رسیدن به اهداف خود دارید که نشانه‌ی سلامت روانی است."
        }
    },
    {
        "text": "سوال 6: چقدر از خواب خود راضی هستید؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 1,
            "5": 0
        },
        "messages": {
            "1": "عدم رضایت از خواب می‌تواند نشان‌دهنده‌ی افسردگی باشد.",
            "2": "ممکن است با مشکلات خواب روبرو باشید که نشانه‌ای از افسردگی است.",
            "3": "کیفیت خواب شما در سطح متوسط است؛ گاهی نارضایتی حس می‌کنید.",
            "4": "شما خواب مناسبی دارید اما ممکن است نیاز به بهبود داشته باشد.",
            "5": "خواب شما مناسب است که می‌تواند نشانه‌ی عدم افسردگی باشد."
        }
    },
    {
        "text": "سوال 7: چقدر احساس می‌کنید که توانایی مقابله با استرس را دارید؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 1,
            "5": 0
        },
        "messages": {
            "1": "فقدان توانایی مقابله با استرس می‌تواند نشانه‌ی افسردگی باشد.",
            "2": "ممکن است در مقابله با استرس دچار مشکل شوید.",
            "3": "توانایی شما در مقابله با استرس در سطح متوسط است؛ گاهی نیاز به کمک دارید.",
            "4": "شما به طور کلی توانایی مقابله با استرس را دارید، اما شاید در مواقع بحرانی نیاز به حمایت داشته باشید.",
            "5": "شما توانایی بالایی در مقابله با استرس دارید که نشانه‌ی سلامت روانی است."
        }
    },
    {
        "text": "سوال 8: چقدر احساس رضایت از خود دارید؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 1,
            "5": 0
        },
        "messages": {
            "1": "فقدان رضایت از خود می‌تواند نشانه‌ی افسردگی باشد.",
            "2": "ممکن است در رضایت از خود دچار مشکل شوید.",
            "3": "احساس رضایت از خود شما در سطح متوسط است؛ گاهی تردیدهایی دارید.",
            "4": "شما به طور کلی از خود راضی هستید، اگرچه همیشه جا برای بهبود وجود دارد.",
            "5": "شما احساس رضایت بالایی از خود دارید که نشان‌دهنده‌ی سلامت روانی است."
        }
    },
    {
        "text": "سوال 9: چقدر از تفریحات و سرگرمی‌های خود لذت می‌برید؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 1,
            "5": 0
        },
        "messages": {
            "1": "عدم لذت از تفریحات می‌تواند نشانه‌ی افسردگی باشد.",
            "2": "ممکن است از تفریحات خود لذت کمتری ببرید.",
            "3": "لذت شما از تفریحات در سطح متوسط است؛ شاید نیاز به تنوع داشته باشید.",
            "4": "شما به طور کلی از تفریحات خود لذت می‌برید، اما امکان بهبود وجود دارد.",
            "5": "شما از تفریحات و سرگرمی‌های خود لذت می‌برید که نشانه‌ی عدم افسردگی است."
        }
    },
    {
        "text": "سوال 10: چقدر احساس می‌کنید که زندگی‌تان ارزشمند است؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 1,
            "5": 0
        },
        "messages": {
            "1": "فقدان احساس ارزشمندی زندگی می‌تواند نشان‌دهنده‌ی افسردگی باشد.",
            "2": "ممکن است در احساس ارزشمندی زندگی دچار مشکل شوید.",
            "3": "احساس شما از ارزشمندی زندگی در سطح متوسط است؛ گاهی دچار تردید می‌شوید.",
            "4": "شما به طور کلی احساس ارزشمندی می‌کنید اما شاید نیاز به تقویت داشته باشید.",
            "5": "شما احساس می‌کنید که زندگی‌تان ارزشمند است که نشانه‌ی سلامت روانی است."
        }
    }
]
# --- توابع شروع و دریافت اطلاعات کاربر ---
async def start_depression_test(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text("سلام! خوش آمدید.\nلطفاً نام خود را وارد کنید:") # همیشه از update.message استفاده کنید چون این تابع فقط از طریق /start صدا زده میشود
    context.user_data.clear()
    return NAME

async def get_name(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data["Name"] = update.message.text
    await update.message.reply_text("چند سال دارید؟")
    return AGE

async def get_age(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data["Age"] = update.message.text
    context.user_data["current_question"] = 0
    context.user_data["total_score"] = 0
    context.user_data["responses"] = {}
    await send_question(update, context)
    return QUESTION

# --- ارسال سوال به همراه دکمه‌های تعاملی ---
async def send_question(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q_index = context.user_data["current_question"]
    if q_index < len(questions):
        question = questions[q_index]
        text = question["text"]
        keyboard = []
        for key, option in question["options"].items():
            keyboard.append([InlineKeyboardButton(f"{key}) {option}", callback_data=key)])
        reply_markup = InlineKeyboardMarkup(keyboard)
        if update.message: # برای شروع تست
            await update.message.reply_text(text, reply_markup=reply_markup)
        elif update.callback_query: # برای ادامه تست
            await update.callback_query.message.reply_text(text, reply_markup=reply_markup)
    else:
        await send_final_result(update, context)

# --- دریافت پاسخ سوال (از طریق callback query) ---
# دریافت پاسخ سوال از طریق callback query
async def question_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    selected_option = query.data
    q_index = context.user_data["current_question"]
    question = questions[q_index]
    score = question["scores"].get(selected_option, 0)
    context.user_data["total_score"] += score
    context.user_data["responses"][q_index] = {
        "question": question["text"],
        "selected_option": selected_option,
        "option_text": question["options"][selected_option],
        "message": question["messages"][selected_option],
        "score": score
    }
    context.user_data["current_question"] += 1
    if context.user_data["current_question"] < len(questions):
        await send_question(update, context)
        return QUESTION
    else:
        await send_final_result(update, context)
        return ConversationHandler.END

# --- ارسال نتیجه نهایی به همراه درصد و تحلیل پاسخ‌ها ---
async def send_final_result(update: Update, context: ContextTypes.DEFAULT_TYPE):
    total_score = context.user_data["total_score"]
    max_score = len(questions) * 4  # هر سوال حداکثر 4 امتیاز دارد
    percentage = (total_score / max_score) * 100

    analysis = f"نتیجه تست افسردگی:\n\n"
    analysis += f"نام: {context.user_data.get('Name', 'نامشخص')}\n"
    analysis += f"سن: {context.user_data.get('Age', 'نامشخص')}\n\n"
    analysis += f"امتیاز کل: {total_score} از {max_score}\n"
    analysis += f"درصد افسردگی: {percentage:.2f}%\n\n"
    analysis += "تحلیل پاسخ‌های شما:\n"
    for idx, resp in context.user_data["responses"].items():
        analysis += f"\nسوال {idx + 1}: {resp['question']}\n"
        analysis += f"گزینه انتخاب شده: {resp['selected_option']}) {resp['option_text']}\n"
        analysis += f"پیام: {resp['message']}\n"
    
    # تفسیر کلی بر اساس درصد (با توجه به سیستم ۵ گزینه‌ای)
    if percentage < 25:
        interpretation = "شما به نظر نمی‌رسد که علائم قابل توجهی از افسردگی داشته باشید."
    elif percentage < 50:
        interpretation = "ممکن است علائم افسردگی در حد خفیف تا متوسط داشته باشید. در صورت تداوم، مشاوره با متخصص توصیه می‌شود."
    elif percentage < 75:
        interpretation = "نشانه‌های قابل توجهی از افسردگی وجود دارد. توصیه می‌شود با یک مشاور یا روانشناس مشورت کنید."
    else:
        interpretation = "شما علائم شدید افسردگی دارید. پیشنهاد می‌شود هر چه زودتر با یک متخصص مشاوره روانشناسی ملاقات کنید."
        
    analysis += f"\n\nتفسیر نهایی: {interpretation}"

    if update.callback_query:
        await update.callback_query.message.reply_text(analysis, parse_mode="Markdown")
    else:
        await update.message.reply_text(analysis, parse_mode="Markdown")

# --- تابع لغو مکالمه ---
async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text('مکالمه لغو شد.')
    return ConversationHandler.END

# --- ایجاد ConversationHandler ---
depression_conversation_handler = ConversationHandler(
    entry_points=[CommandHandler('start_depression', start_depression_test)],
    states={
        NAME: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_name)],
        AGE: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_age)],
        QUESTION: [CallbackQueryHandler(question_callback)],
    },
    fallbacks=[CommandHandler('cancel', cancel)]
)

async def error_handler(update, context):
    print(f"An error occurred: {context.error}")
