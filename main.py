import logging
import os
from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import (
    Application, CommandHandler, CallbackQueryHandler,
    MessageHandler, filters, ContextTypes
)
from database import init_db, save_test_result
from tests.anxiety_test import start_anxiety_test, anxiety_conversation_handler
from tests.depression_test import start_depression_test, depression_conversation_handler  # اضافه کردن این خط
from tests.addiction_test import start_addiction_test
from tests.relationship_readiness_test import start_relationship_test
from help_message import help_text  # ایمپورت متن راهنما

# تنظیمات لاگ‌ها
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",  # اصلاح این خط
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

TOKEN = "7882625954:AAGiDHMhSV_guKOuhJ9r3mf97seAFqQF0mk"

def setup_handlers(app: Application):
    # هندلرهای مربوط به دستورات متنی
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", start))  # یا یک تابع متفاوت برای راهنما

    # هندلر مربوط به گفتگو برای تست افسردگی
    app.add_handler(depression_conversation_handler)
    
    # هندلر مربوط به گفتگو برای تست اضطراب
    app.add_handler(anxiety_conversation_handler)
    
    # هندلر مربوط به دکمه‌های inline
    app.add_handler(CallbackQueryHandler(button_handler))
    
# توابع اصلی بات
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("راهنما", callback_data="help")],  # دکمه راهنما در بالای منو
        [InlineKeyboardButton("تست اضطراب", callback_data="start_anxiety")],
        [InlineKeyboardButton("تست افسردگی", callback_data="start_depression")],
        [InlineKeyboardButton("تست اعتیاد", callback_data="addiction")],
        [InlineKeyboardButton("تست آمادگی رابطه عاطفی", callback_data="relationship")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("سلام! لطفاً یک تست را انتخاب کنید:✌️", reply_markup=reply_markup)

# تابع راهنما
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("تست اضطراب", callback_data="start_anxiety")],
        [InlineKeyboardButton("تست افسردگی", callback_data="start_depression")],
        [InlineKeyboardButton("تست اعتیاد", callback_data="addiction")],
        [InlineKeyboardButton("تست آمادگی رابطه عاطفی", callback_data="relationship")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(help_text, reply_markup=reply_markup, disable_web_page_preview=False)

async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    
    if query.data == "help":
        await query.message.reply_text(help_text, disable_web_page_preview=False)
    elif query.data == "start_depression": # بررسی callback_data جدید
        await update.callback_query.message.reply_text("برای شروع تست افسردگی /start_depression را بزنید") # راهنمایی کاربر برای شروع تست
    elif query.data == "start_anxiety":
        await start_anxiety_test(update, context)
    elif query.data == "addiction":
        await start_addiction_test(update, context)
    elif query.data == "relationship":
        await start_relationship_test(update, context)

async def main():
    init_db()  # مقداردهی اولیه دیتابیس

    app = Application.builder().token(TOKEN).build()

    # ثبت تمامی هندلرها به صورت یک بخش جداگانه
    setup_handlers(app)
    
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
