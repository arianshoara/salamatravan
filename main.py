import logging
import os
from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import (
    Application, CommandHandler, CallbackQueryHandler,
    MessageHandler, filters, ContextTypes
)
from database import init_db, save_test_result
from tests.anxiety_test import start_anxiety_test
from tests.depression_test import start_depression_test
from tests.addiction_test import start_addiction_test
from tests.relationship_readiness_test import start_relationship_test

# تنظیمات لاگ‌ها
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

TOKEN = os.getenv("7882625954:AAGiDHMhSV_guKOuhJ9r3mf97seAFqQF0mk")  # دریافت توکن از متغیر محیطی

# توابع اصلی بات
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("تست اضطراب", callback_data="anxiety")],
        [InlineKeyboardButton("تست افسردگی", callback_data="depression")],
        [InlineKeyboardButton("تست اعتیاد", callback_data="addiction")],
        [InlineKeyboardButton("تست آمادگی رابطه عاطفی", callback_data="relationship")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("👋 سلام! لطفاً یک تست را انتخاب کنید:", reply_markup=reply_markup)

async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()

    if query.data == "anxiety":
        await start_anxiety_test(update, context)
    elif query.data == "depression":
        await start_depression_test(update, context)
    elif query.data == "addiction":
        await start_addiction_test(update, context)
    elif query.data == "relationship":
        await start_relationship_test(update, context)

async def main():
    init_db()  # مقداردهی اولیه دیتابیس

    app = Application.builder().token(TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CallbackQueryHandler(button_handler))

    print("ربات شروع به کار کرد...")
    await app.run_polling()

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
