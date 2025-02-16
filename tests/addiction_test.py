from telegram import Update
from telegram.ext import CallbackContext

def start_addiction_test(update: Update, context: CallbackContext):
    update.callback_query.message.reply_text(
        "📋 تست اعتیاد:\nلطفاً به سوالات پاسخ دهید."
    )
    # در اینجا می‌توان منطق سوالات تست را اضافه کرد
