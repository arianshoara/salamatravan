# depression_test.py

from telegram import Update
from telegram.ext import ContextTypes

async def start_depression_test(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # پیامی که قبل از شروع تست ارسال می‌شود
    await update.message.reply_text("📊 در حال شروع تست افسردگی هستید. لطفاً با دقت به سوالات پاسخ دهید.")

    # سوالات و گزینه‌ها
    questions = [
        ("در دو هفته گذشته، آیا احساس ناراحتی یا غمگینی کرده‌اید؟", ["بله", "خیر"]),
        ("آیا احساس بی‌انرژی بودن و کمبود انگیزه کرده‌اید؟", ["بله", "خیر"]),
        ("آیا به راحتی احساس افسردگی یا ناامیدی می‌کنید؟", ["بله", "خیر"]),
        # افزودن سوالات بیشتر به دلخواه
    ]
    
    # ذخیره نتیجه و ارسال سوالات به ترتیب
    for question, options in questions:
        keyboard = [[InlineKeyboardButton(option, callback_data=option) for option in options]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        await update.message.reply_text(question, reply_markup=reply_markup)
