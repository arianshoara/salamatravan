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
    format='%(asctime)s - %(name)s - %(levellevel)s - %(message)s', level=logging.INFO
)
logger = logging.getLogger(__name__)

# تعریف مراحل مکالمه
NAME, AGE, QUESTION = range(3)

# ساختار پرسش‌ها (نمونه 10 سوال)
questions = [
    {
        "text": "۱. در هفته گذشته، چقدر احساس غمگینی یا افسردگی کرده‌اید؟",
        "options": {
            "الف": "اصلاً",
            "ب": "گاهی اوقات",
            "ج": "اغلب اوقات",
            "د": "همیشه"
        },
        "scores": {
            "الف": 0,
            "ب": 1,
            "ج": 2,
            "د": 3
        }
    },
    {
        "text": "۲. چقدر احساس بی‌ارزشی یا گناه کرده‌اید؟",
        "options": {
            "الف": "اصلاً",
            "ب": "گاهی اوقات",
            "ج": "اغلب اوقات",
            "د": "همیشه"
        },
        "scores": {
            "الف": 0,
            "ب": 1,
            "ج": 2,
            "د": 3
        }
    },
    {
        "text": "۳. چقدر احساس خستگی یا کم‌انرژی بودن کرده‌اید؟",
        "options": {
            "الف": "اصلاً",
            "ب": "گاهی اوقات",
            "ج": "اغلب اوقات",
            "د": "همیشه"
        },
        "scores": {
            "الف": 0,
            "ب": 1,
            "ج": 2,
            "د": 3
        }
    },
    {
        "text": "۴. چقدر در تمرکز یا تصمیم‌گیری مشکل داشته‌اید؟",
        "options": {
            "الف": "اصلاً",
            "ب": "گاهی اوقات",
            "ج": "اغلب اوقات",
            "د": "همیشه"
        },
        "scores": {
            "الف": 0,
            "ب": 1,
            "ج": 2,
            "د": 3
        }
    },
    {
        "text": "۵. چقدر احساس بی‌علاقگی یا لذت نبردن از فعالیت‌هایی که قبلاً لذت‌بخش بودند، کرده‌اید؟",
        "options": {
            "الف": "اصلاً",
            "ب": "گاهی اوقات",
            "ج": "اغلب اوقات",
            "د": "همیشه"
        },
        "scores": {
            "الف": 0,
            "ب": 1,
            "ج": 2,
            "د": 3
        }
    },
    {
        "text": "۶. چقدر احساس بی‌قراری یا کندی روانی-حرکتی کرده‌اید؟",
        "options": {
            "الف": "اصلاً",
            "ب": "گاهی اوقات",
            "ج": "اغلب اوقات",
            "د": "همیشه"
        },
        "scores": {
            "الف": 0,
            "ب": 1,
            "ج": 2,
            "د": 3
        }
    },
    {
        "text": "۷. چقدر در خوابیدن مشکل داشته‌اید (بی‌خوابی یا پرخوابی)؟",
        "options": {
            "الف": "اصلاً",
            "ب": "گاهی اوقات",
            "ج": "اغلب اوقات",
            "د": "همیشه"
        },
        "scores": {
            "الف": 0,
            "ب": 1,
            "ج": 2,
            "د": 3
        }
    },
    {
        "text": "۸. چقدر احساس تغییر در اشتها یا وزن کرده‌اید؟",
        "options": {
            "الف": "اصلاً",
            "ب": "گاهی اوقات",
            "ج": "اغلب اوقات",
            "د": "همیشه"
        },
        "scores": {
            "الف": 0,
            "ب": 1,
            "ج": 2,
            "د": 3
        }
    },
    {
        "text": "۹. چقدر افکار مرگ یا خودکشی به ذهن‌تان خطور کرده است؟",
        "options": {
            "الف": "اصلاً",
            "ب": "گاهی اوقات",
            "ج": "اغلب اوقات",
            "د": "همیشه"
        },
        "scores": {
            "الف": 0,
            "ب": 1,
            "ج": 2,
            "د": 3
        }
    },
    {
        "text": "۱۰. چقدر احساس می‌کنید که دیگران بدون شما زندگی بهتری خواهند داشت؟",
        "options": {
            "الف": "اصلاً",
            "ب": "گاهی اوقات",
            "ج": "اغلب اوقات",
            "د": "همیشه"
        },
        "scores": {
            "الف": 0,
            "ب": 1,
            "ج": 2,
            "د": 3
        }
    }
]

# --- توابع شروع و دریافت اطلاعات کاربر ---

async def start_depression_test(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text("سلام! خوش آمدید.\nلطفاً نام خود را وارد کنید:")
    context.user_data.clear()
    return NAME

async def get_name(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data["Name"] = update.message.text
    await update.message.reply_text("سن شما چیست؟")
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
        if update.message:
            await update.message.reply_text(text, reply_markup=reply_markup)
        else:
            await update.callback_query.message.reply_text(text, reply_markup=reply_markup)
    else:
        await send_final_result(update, context)

# --- دریافت پاسخ سوال (از طریق callback query) ---

async def question_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    selected_option = query.data
    q_index = context.user_data["current_question"]
    question = questions[q_index]
    context.user_data["total_score"] += question["scores"].get(selected_option, 0)
    context.user_data["responses"][q_index] = {
        "question": question["text"],
        "selected": selected_option,
        "option_text": question["options"][selected_option]
    }
    context.user_data["current_question"] += 1
    await send_question(update, context)
    return QUESTION

# --- ارسال نتیجه نهایی به همراه تحلیل جامع ---

async def send_final_result(update: Update, context: ContextTypes.DEFAULT_TYPE):
    total_score = context.user_data["total_score"]
    if total_score <= 10:
        result_text = "شما **علائم افسردگی خفیف** دارید. 😊"
    elif 11 <= total_score <= 20:
        result_text = "شما **علائم افسردگی متوسط** دارید. 😐"
    else:
        result_text = "شما **علائم افسردگی شدید** دارید. 😟"

    analysis = f"امتیاز شما: {total_score}\n\n{result_text}\n\nتحلیل پاسخ‌های شما:\n"
    for idx, resp in context.user_data["responses"].items():
        analysis += f"\nسوال {idx + 1}: {resp['question']}\n"
        analysis += f"گزینه انتخاب شده: {resp['selected']}) {resp['option_text']}\n"
    await update.callback_query.message.reply_text(analysis, parse_mode="Markdown")

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