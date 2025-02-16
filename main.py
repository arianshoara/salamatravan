import logging
import os
from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import (
    Updater, CommandHandler, CallbackQueryHandler, ConversationHandler,
    MessageHandler, filters, CallbackContext
)
from database import init_db, save_test_result
from tests.anxiety_test import start_anxiety_test
from tests.depression_test import start_depression_test
from tests.addiction_test import start_addiction_test
from tests.relationship_readiness_test import start_relationship_test

# تنظیمات لاگ‌ها
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO
)
logger = logging.getLogger(__name__)

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")  # دریافت توکن از متغیر محیطی

# توابع اصلی بات
def start(update: Update, context: CallbackContext):
    keyboard = [
        [InlineKeyboardButton("تست اضطراب", callback_data="anxiety")],
        [InlineKeyboardButton("تست افسردگی", callback_data="depression")],
        [InlineKeyboardButton("تست اعتیاد", callback_data="addiction")],
        [InlineKeyboardButton("تست آمادگی رابطه عاطفی", callback_data="relationship")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    update.message.reply_text("👋 سلام! لطفاً یک تست را انتخاب کنید:", reply_markup=reply_markup)

def button_handler(update: Update, context: CallbackContext):
    query = update.callback_query
    query.answer()
    
    if query.data == "anxiety":
        start_anxiety_test(update, context)
    elif query.data == "depression":
        start_depression_test(update, context)
    elif query.data == "addiction":
        start_addiction_test(update, context)
    elif query.data == "relationship":
        start_relationship_test(update, context)

def main():
    init_db()  # مقداردهی اولیه دیتابیس
    updater = Updater(TOKEN, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CallbackQueryHandler(button_handler))

    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
