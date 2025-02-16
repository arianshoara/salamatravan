from telegram import Update
from telegram.ext import CallbackContext

def start_depression_test(update: Update, context: CallbackContext):
    update.callback_query.message.reply_text(
        "📋 تست افسردگی:\nلطفاً به سوالات پاسخ دهید."
    )
    # در اینجا می‌توان منطق سوالات تست را اضافه کرد
