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
from tests.addiction_test import start_addiction_test, addiction_conversation_handler, show_specialized_tests_menu
from tests.relationship_readiness_test import start_relationship_test
from help_message import help_text  # ایمپورت متن راهنما
from tests.ocd_test import start_ocd_test, ocd_conversation_handler
from tests.mdq_test import start_mdq_test, mdq_conversation_handler

# import های تست های اختصاصی از پوشه specialized_addictions:
from tests.specialized_addictions.alcohol_addiction_test import start_alcohol_addiction_test, alcohol_addiction_conversation_handler
from tests.specialized_addictions.substance_addiction_test import start_substance_addiction_test, substance_addiction_conversation_handler
from tests.specialized_addictions.nicotine_addiction_test import start_nicotine_addiction_test, nicotine_addiction_conversation_handler
from tests.specialized_addictions.prescription_drugs_addiction_test import start_prescription_drugs_addiction_test, prescription_drugs_addiction_conversation_handler
from tests.specialized_addictions.pornography_addiction_test import start_pornography_addiction_test, pornography_addiction_conversation_handler
from tests.specialized_addictions.video_games_addiction_test import start_video_games_addiction_test, video_games_addiction_conversation_handler
from tests.specialized_addictions.gambling_addiction_test import start_gambling_addiction_test, gambling_addiction_conversation_handler
from tests.specialized_addictions.mobile_social_media_addiction_test import start_mobile_social_media_addiction_test, mobile_social_media_addiction_conversation_handler
from tests.specialized_addictions.shopping_addiction_test import start_shopping_addiction_test, shopping_addiction_conversation_handler
from tests.specialized_addictions.overeating_addiction_test import start_overeating_addiction_test, overeating_addiction_conversation_handler
from tests.specialized_addictions.work_addiction_test import start_work_addiction_test, work_addiction_conversation_handler
from tests.specialized_addictions.excessive_exercise_addiction_test import start_excessive_exercise_addiction_test, excessive_exercise_addiction_conversation_handler
from tests.specialized_addictions.caffeine_addiction_test import start_caffeine_addiction_test, caffeine_addiction_conversation_handler
from tests.specialized_addictions.diet_pills_supplements_addiction_test import start_diet_pills_supplements_addiction_test, diet_pills_supplements_addiction_conversation_handler
from tests.specialized_addictions.internet_addiction_test import start_internet_addiction_test, internet_addiction_conversation_handler
from tests.specialized_addictions.unhealthy_relationships_addiction_test import start_unhealthy_relationships_addiction_test, unhealthy_relationships_addiction_conversation_handler
from tests.specialized_addictions.unhealthy_foods_addiction_test import start_unhealthy_foods_addiction_test, unhealthy_foods_addiction_conversation_handler
from tests.specialized_addictions.cosmetics_addiction_test import start_cosmetics_addiction_test, cosmetics_addiction_conversation_handler
from tests.specialized_addictions.sedatives_sleeping_pills_addiction_test import start_sedatives_sleeping_pills_addiction_test, sedatives_sleeping_pills_addiction_conversation_handler
from tests.specialized_addictions.excessive_planning_addiction_test import start_excessive_planning_addiction_test, excessive_planning_addiction_conversation_handler

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
    
    #هندلر مربوط به گفتگو برای تست اختلال وسواسی-اجباری
    app.add_handler(ocd_conversation_handler)
    
    # هندلر مربوط به گفتگو برای تست اختلال دوقطبی - MDQ
    app.add_handler(mdq_conversation_handler)
    
    # هندلر مربوط به گفتگو برای تست اعتیاد
    app.add_handler(addiction_conversation_handler)
    
    # هندلر مربوط به دکمه‌های inline
    app.add_handler(CallbackQueryHandler(button_handler))
    
# توابع اصلی بات
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("راهنما", callback_data="help")],  # دکمه راهنما در بالای منو
        [InlineKeyboardButton("تست اضطراب", callback_data="start_anxiety")],
        [InlineKeyboardButton("تست افسردگی", callback_data="start_depression")],
        [InlineKeyboardButton("(OCD)تست وسواس فکری-عملی", callback_data="start_ocd")],
        [InlineKeyboardButton("تست اختلال دوقطبی - MDQ", callback_data="start_mdq")],  
        [InlineKeyboardButton("تست اعتیاد", callback_data="start_addiction")],
        [InlineKeyboardButton("تست آمادگی رابطه عاطفی", callback_data="relationship")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text("سلام! لطفاً یک تست را انتخاب کنید:✌️", reply_markup=reply_markup)

# تابع راهنما
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("تست اضطراب", callback_data="start_anxiety")],
        [InlineKeyboardButton("تست افسردگی", callback_data="start_depression")],
        [InlineKeyboardButton("(OCD)تست وسواس فکری-عملی", callback_data="start_ocd")], 
        [InlineKeyboardButton("تست اختلال دوقطبی - MDQ", callback_data="start_mdq")],
        [InlineKeyboardButton("تست اعتیاد", callback_data="start_addiction")],
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
        await update.callback_query.message.reply_text("برای شروع تست اضطراب /start_anxiety را بزنید")
    elif query.data == "start_ocd":
        await update.callback_query.message.reply_text("برای شروع تست وسواس فکری-عملی /start_ocd را بزنید")
    elif query.data == "start_mdq":
        await update.callback_query.message.reply_text("برای شروع تست اختلال دوقطبی - MDQ /start_mdq را بزنید")       
    elif query.data == "start_addiction":
        await update.callback_query.message.reply_text("برای شروع تست اعتیاد /start_addiction را بزنید")
    elif query.data == "relationship":
        await start_relationship_test(update, context)
    # شرط‌های شروع تست‌های اختصاصی به‌روزرسانی شده:
    elif query.data == "start_alcohol_addiction":
        await start_alcohol_addiction_test(update, context)
    elif query.data == "start_substance_addiction":
        await start_substance_addiction_test(update, context)
    elif query.data == "start_nicotine_addiction":
        await start_nicotine_addiction_test(update, context)
    elif query.data == "start_prescription_drugs_addiction":
        await start_prescription_drugs_addiction_test(update, context)
    elif query.data == "start_pornography_addiction":
        await start_pornography_addiction_test(update, context)
    elif query.data == "start_video_games_addiction":
        await start_video_games_addiction_test(update, context)
    elif query.data == "start_gambling_addiction":
        await start_gambling_addiction_test(update, context)
    elif query.data == "start_mobile_social_media_addiction":
        await start_mobile_social_media_addiction_test(update, context)
    elif query.data == "start_shopping_addiction":
        await start_shopping_addiction_test(update, context)
    elif query.data == "start_overeating_addiction":
        await start_overeating_addiction_test(update, context)
    elif query.data == "start_work_addiction":
        await start_work_addiction_test(update, context)
    elif query.data == "start_excessive_exercise_addiction":
        await start_excessive_exercise_addiction_test(update, context)
    elif query.data == "start_caffeine_addiction":
        await start_caffeine_addiction_test(update, context)
    elif query.data == "start_diet_pills_supplements_addiction":
        await start_diet_pills_supplements_addiction_test(update, context)
    elif query.data == "start_internet_addiction":
        await start_internet_addiction_test(update, context)
    elif query.data == "start_unhealthy_relationships_addiction":
        await start_unhealthy_relationships_addiction_test(update, context)
    elif query.data == "start_unhealthy_foods_addiction":
        await start_unhealthy_foods_addiction_test(update, context)
    elif query.data == "start_cosmetics_addiction":
        await start_cosmetics_addiction_test(update, context)
    elif query.data == "start_sedatives_sleeping_pills_addiction":
        await start_sedatives_sleeping_pills_addiction_test(update, context)
    elif query.data == "start_excessive_planning_addiction":
        await start_excessive_planning_addiction_test(update, context)
    elif query.data == "show_specialized_tests":
        await show_specialized_tests_menu(update, context)

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
