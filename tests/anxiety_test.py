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

# سوالات تست اضطراب
questions = [
    {
        "text": "سوال 1: چقدر احساس می‌کنید که همیشه در حال نگرانی هستید؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "اصلاً: شما به ندرت نگرانی دارید که نشان‌دهنده‌ی سطح پایین اضطراب است.",
            "2": "کم: شما گهگاه نگرانی دارید اما این نگرانی‌ها شدید نیستند.",
            "3": "متوسط: شما معمولاً نگرانی‌های قابل توجهی دارید.",
            "4": "زیاد: شما غالباً درگیر نگرانی‌های زیاد هستید که نشان‌دهنده‌ی سطح بالای اضطراب است.",
            "5": "بسیار زیاد: شما همواره در حال نگرانی‌های شدید هستید که ممکن است به شدت اضطراب بالا باشد."
        }
    },
    {
        "text": "سوال 2: چقدر در مواقع استرس‌زا توانایی کنترل احساسات خود را دارید؟",
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
            "1": "اصلاً: شما ممکن است در مواقع استرس‌زا به سختی بتوانید احساسات خود را کنترل کنید که نشان‌دهنده‌ی سطح بالای اضطراب است.",
            "2": "کم: شما به طور معمول در کنترل احساسات خود در مواقع استرس‌زا مشکل دارید.",
            "3": "متوسط: شما گاهی اوقات توانایی کنترل احساسات خود را در مواقع استرس‌زا دارید.",
            "4": "زیاد: شما معمولاً توانایی کنترل احساسات خود را در مواقع استرس‌زا دارید.",
            "5": "بسیار زیاد: شما توانایی بالایی در کنترل احساسات خود در مواقع استرس‌زا دارید که نشان‌دهنده‌ی سطح پایین اضطراب است."
        }
    },
    {
        "text": "سوال 3: چقدر به علت نگرانی‌هایتان دچار اختلالات خواب می‌شوید؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "اصلاً: شما به ندرت به علت نگرانی‌هایتان دچار اختلالات خواب می‌شوید که نشان‌دهنده‌ی سطح پایین اضطراب است.",
            "2": "کم: شما گهگاه به علت نگرانی‌هایتان دچار مشکلات خواب می‌شوید.",
            "3": "متوسط: شما معمولاً به علت نگرانی‌هایتان دچار اختلالات خواب می‌شوید.",
            "4": "زیاد: شما غالباً به علت نگرانی‌هایتان دچار اختلالات خواب می‌شوید.",
            "5": "بسیار زیاد: شما همواره به علت نگرانی‌های شدید دچار مشکلات خواب می‌شوید که نشان‌دهنده‌ی سطح بالای اضطراب است."
        }
    },
    {
        "text": "سوال 4: چقدر اضطراب شما باعث شده است تا از انجام فعالیت‌های روزمره خود باز بمانید؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "اصلاً: اضطراب شما تاثیر کمی بر توانایی انجام فعالیت‌های روزمره دارد.",
            "2": "کم: شما گهگاه به دلیل اضطراب از انجام فعالیت‌های روزمره باز می‌مانید.",
            "3": "متوسط: شما معمولاً به دلیل اضطراب از انجام فعالیت‌های روزمره باز می‌مانید.",
            "4": "زیاد: اضطراب شما به شدت توانایی انجام فعالیت‌های روزمره را تحت تأثیر قرار می‌دهد.",
            "5": "بسیار زیاد: اضطراب شدید شما به طور کامل انجام فعالیت‌های روزمره را مختل می‌کند."
        }
    },
    {
        "text": "سوال 5: چقدر در مواجهه با افکار منفی دائم قرار دارید؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "اصلاً: شما به ندرت با افکار منفی مواجه می‌شوید که نشان‌دهنده‌ی سطح پایین اضطراب است.",
            "2": "کم: شما گهگاه با افکار منفی مواجه می‌شوید اما توانایی مقابله با آن‌ها را دارید.",
            "3": "متوسط: شما معمولاً با افکار منفی مواجه می‌شوید.",
            "4": "زیاد: شما غالباً با افکار منفی مواجه می‌شوید که ممکن است به اضطراب بالا باشد.",
            "5": "بسیار زیاد: شما همواره درگیر افکار منفی هستید که نشان‌دهنده‌ی سطح بالای اضطراب است."
        }
    },
    {
        "text": "سوال 6: چقدر در مواقع نیاز به تصمیم‌گیری دچار استرس می‌شوید؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "اصلاً: شما به ندرت در مواقع نیاز به تصمیم‌گیری دچار استرس می‌شوید که نشان‌دهنده‌ی سطح پایین اضطراب است.",
            "2": "کم: شما گهگاه در مواقع تصمیم‌گیری دچار استرس می‌شوید.",
            "3": "متوسط: شما معمولاً در مواقع تصمیم‌گیری دچار استرس می‌شوید.",
            "4": "زیاد: شما غالباً در مواقع تصمیم‌گیری با استرس زیاد روبرو می‌شوید.",
            "5": "بسیار زیاد: شما همواره در مواقع تصمیم‌گیری دچار استرس شدید می‌شوید که نشان‌دهنده‌ی سطح بالای اضطراب است."
        }
    },
    {
        "text": "سوال 7: چقدر مشکلات معده یا دردهای جسمی به علت اضطراب تجربه می‌کنید؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "اصلاً: شما به ندرت مشکلات معده یا دردهای جسمی به علت اضطراب تجربه می‌کنید که نشان‌دهنده‌ی سطح پایین اضطراب است.",
            "2": "کم: شما گهگاه به علت اضطراب با مشکلات معده یا دردهای جسمی روبرو می‌شوید.",
            "3": "متوسط: شما معمولاً به علت اضطراب مشکلات معده یا دردهای جسمی تجربه می‌کنید.",
            "4": "زیاد: شما غالباً به علت اضطراب با مشکلات معده یا دردهای جسمی روبرو می‌شوید.",
            "5": "بسیار زیاد: شما همواره به علت اضطراب با مشکلات معده یا دردهای جسمی شدید روبرو می‌شوید."
        }
    },
    {
        "text": "سوال 8: چقدر از محیط‌های اجتماعی اجتناب می‌کنید؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "اصلاً: شما به ندرت از محیط‌های اجتماعی اجتناب می‌کنید که نشان‌دهنده‌ی سطح پایین اضطراب است.",
            "2": "کم: شما گهگاه از محیط‌های اجتماعی اجتناب می‌کنید.",
            "3": "متوسط: شما معمولاً از محیط‌های اجتماعی اجتناب می‌کنید.",
            "4": "زیاد: شما غالباً از محیط‌های اجتماعی اجتناب می‌کنید که ممکن است به علت اضطراب بالا باشد.",
            "5": "بسیار زیاد: شما همواره از محیط‌های اجتماعی اجتناب می‌کنید که نشان‌دهنده‌ی سطح بالای اضطراب است."
        }
    },
    {
        "text": "سوال 9: چقدر در مواقع تعامل با دیگران دچار تنش و استرس می‌شوید؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "اصلاً: شما به ندرت در تعاملات اجتماعی دچار تنش و استرس می‌شوید که نشان‌دهنده‌ی سطح پایین اضطراب است.",
            "2": "کم: شما گهگاه در تعاملات اجتماعی دچار تنش و استرس می‌شوید.",
            "3": "متوسط: شما معمولاً در تعاملات اجتماعی دچار تنش و استرس می‌شوید.",
            "4": "زیاد: شما غالباً در تعاملات اجتماعی با تنش و استرس زیاد روبرو می‌شوید.",
            "5": "بسیار زیاد: شما همواره در تعاملات اجتماعی دچار تنش و استرس شدید می‌شوید که نشان‌دهنده‌ی سطح بالای اضطراب است."
        }
    },
    {
        "text": "سوال 10: چقدر احساس می‌کنید که به طور کلی تحت فشار و تنش هستید؟",
        "options": {
            "1": "اصلاً",
            "2": "کم",
            "3": "متوسط",
            "4": "زیاد",
            "5": "بسیار زیاد"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "اصلاً: شما به ندرت تحت فشار و تنش هستید که نشان‌دهنده‌ی سطح پایین اضطراب است.",
            "2": "کم: شما گهگاه تحت فشار و تنش هستید.",
            "3": "متوسط: شما معمولاً تحت فشار و تنش هستید.",
            "4": "زیاد: شما غالباً تحت فشار و تنش زیادی هستید که ممکن است نشان‌دهنده‌ی سطح بالای اضطراب باشد.",
            "5": "بسیار زیاد: شما همواره تحت فشار و تنش شدید هستید که نشان‌دهنده‌ی سطح بالای اضطراب است."
        }
    }
]

# --- توابع شروع و دریافت اطلاعات کاربر ---
async def start_anxiety_test(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text("سلام! به تست اضطراب خوش آمدید.\nلطفاً نام خود را وارد کنید:")
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
        if update.message:  # برای ارسال اولین سوال
            await update.message.reply_text(text, reply_markup=reply_markup)
        elif update.callback_query:  # برای ادامه تست
            await update.callback_query.message.reply_text(text, reply_markup=reply_markup)
    else:
        await send_final_result(update, context)

# --- دریافت پاسخ سوال (از طریق CallbackQuery) ---
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

# --- ارسال نتیجه نهایی به همراه تحلیل پاسخ‌ها ---
async def send_final_result(update: Update, context: ContextTypes.DEFAULT_TYPE):
    total_score = context.user_data["total_score"]
    max_score = len(questions) * 4  # هر سوال حداکثر 4 امتیاز دارد
    percentage = (total_score / max_score) * 100

    analysis = f"نتیجه تست اضطراب:\n\n"
    analysis += f"نام: {context.user_data.get('Name', 'نامشخص')}\n"
    analysis += f"سن: {context.user_data.get('Age', 'نامشخص')}\n\n"
    analysis += f"امتیاز کل: {total_score} از {max_score}\n"
    analysis += f"درصد اضطراب: {percentage:.2f}%\n\n"
    analysis += "تحلیل پاسخ‌های شما:\n"
    for idx, resp in context.user_data["responses"].items():
        analysis += f"\nسوال {idx + 1}: {resp['question']}\n"
        analysis += f"گزینه انتخاب شده: {resp['selected_option']}) {resp['option_text']}\n"
        analysis += f"پیام: {resp['message']}\n"

    # تفسیر کلی بر اساس درصد (بر مبنای امتیازدهی سیستم)
    if percentage < 25:
        interpretation = "شما به نظر نمی‌رسد که سطح قابل توجهی از اضطراب داشته باشید."
    elif percentage < 50:
        interpretation = "ممکن است گاهی احساس اضطراب کنید. در صورت افزایش علائم، مشورت با متخصص توصیه می‌شود."
    elif percentage < 75:
        interpretation = "نشانه‌های قابل توجهی از اضطراب وجود دارد. پیشنهاد می‌شود با یک مشاور یا روانشناس مشورت کنید."
    else:
        interpretation = "شما علائم شدید اضطراب دارید. توصیه می‌شود در اسرع وقت به دنبال مشاوره تخصصی باشید."

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
anxiety_conversation_handler = ConversationHandler(
    entry_points=[CommandHandler('start_anxiety', start_anxiety_test)],
    states={
        NAME: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_name)],
        AGE: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_age)],
        QUESTION: [CallbackQueryHandler(question_callback)],
    },
    fallbacks=[CommandHandler('cancel', cancel)]
)

async def error_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    logger.error(msg="Exception while handling an update:", exc_info=context.error)
