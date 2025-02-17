import logging
import os
from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import (
    Application, CommandHandler, CallbackQueryHandler,
    MessageHandler, filters, ContextTypes
)
from database import init_db, save_test_result
from tests.anxiety_test import start_anxiety_test
from tests.depression_test import start_depression_test, depression_conversation_handler  # اضافه کردن این خط
from tests.addiction_test import start_addiction_test
from tests.relationship_readiness_test import start_relationship_test

# تنظیمات لاگ‌ها
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",  # اصلاح این خط
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

TOKEN = "7882625954:AAGiDHMhSV_guKOuhJ9r3mf97seAFqQF0mk"

# توابع اصلی بات
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("تست اضطراب", callback_data="anxiety")],
        [InlineKeyboardButton("تست افسردگی", callback_data="start_depression")],
        [InlineKeyboardButton("تست اعتیاد", callback_data="addiction")],
        [InlineKeyboardButton("تست آمادگی رابطه عاطفی", callback_data="relationship")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("👋 سلام! لطفاً یک تست را انتخاب کنید:", reply_markup=reply_markup)

async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    
    if query.data == "start_depression": # بررسی callback_data جدید
        await update.callback_query.message.reply_text("برای شروع تست افسردگی /start_depression را بزنید") # راهنمایی کاربر برای شروع تست

    
    if query.data == "anxiety":
        await start_anxiety_test(update, context)
    elif query.data == "addiction":
        await start_addiction_test(update, context)
    elif query.data == "relationship":
        await start_relationship_test(update, context)

async def main():
    init_db()  # مقداردهی اولیه دیتابیس

    app = Application.builder().token(TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CallbackQueryHandler(button_handler))
    app.add_handler(depression_conversation_handler)  # اضافه کردن handler افسردگی

    print("ربات شروع به کار کرد...")
    await app.run_polling()

if __name__ == "__main__":
    import asyncio
    import nest_asyncio

    nest_asyncio.apply()
    loop = asyncio.get_event_loop()
    # جلوگیری از بستن حلقه رویداد (patch کردن متد close به یک تابع بی‌عمل)
    loop.close = lambda: None
    loop.create_task(main())
    loop.run_forever()
