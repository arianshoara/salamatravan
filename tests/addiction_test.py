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
import re

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO
)
logger = logging.getLogger(__name__)

# تعریف مراحل مکالمه
NAME, AGE, QUESTION = range(3)

# سوالات تست اعتیاد کلی
questions = [
    {
        "text": "چقدر به مصرف الکل وابسته هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "وابستگی به الکل در سطح پایینی قرار دارد.",
            "1": "وابستگی به الکل به ندرت اتفاق می‌افتد.",
            "2": "گاهی اوقات ممکن است به الکل وابسته باشید.",
            "3": "اغلب اوقات احساس وابستگی به الکل می‌کنید.",
            "4": "تقریباً همیشه احساس وابستگی شدید به الکل دارید."
        }
    },
    {
        "text": "چقدر نیاز به مصرف مواد مخدر (مثل ماری‌جوانا، کوکائین، هروئین) دارید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "نیازی به مصرف مواد مخدر ندارید.",
            "1": "به ندرت نیاز به مصرف مواد مخدر پیدا می‌کنید.",
            "2": "گاهی اوقات نیاز به مصرف مواد مخدر دارید.",
            "3": "اغلب اوقات نیاز به مصرف مواد مخدر دارید.",
            "4": "تقریباً همیشه نیاز شدید به مصرف مواد مخدر دارید."
        }
    },
    {
        "text": "چقدر به استعمال سیگار یا سایر محصولات نیکوتینی معتاد هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به سیگار یا محصولات نیکوتینی معتاد نیستید.",
            "1": "به ندرت به سیگار یا محصولات نیکوتینی وابسته هستید.",
            "2": "گاهی اوقات به سیگار یا محصولات نیکوتینی وابسته هستید.",
            "3": "اغلب اوقات به سیگار یا محصولات نیکوتینی وابسته هستید.",
            "4": "تقریباً همیشه به سیگار یا محصولات نیکوتینی وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به استفاده از داروهای نسخه‌ای بدون نیاز پزشکی وابسته هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به داروهای نسخه‌ای بدون نیاز پزشکی وابسته نیستید.",
            "1": "به ندرت به داروهای نسخه‌ای بدون نیاز پزشکی وابسته می‌شوید.",
            "2": "گاهی اوقات به داروهای نسخه‌ای بدون نیاز پزشکی وابسته می‌شوید.",
            "3": "اغلب اوقات به داروهای نسخه‌ای بدون نیاز پزشکی وابسته هستید.",
            "4": "تقریباً همیشه به داروهای نسخه‌ای بدون نیاز پزشکی وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به استفاده از پورن و محتوای جنسی آنلاین معتاد هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به پورن و محتوای جنسی آنلاین معتاد نیستید.",
            "1": "به ندرت به پورن و محتوای جنسی آنلاین وابسته می‌شوید.",
            "2": "گاهی اوقات به پورن و محتوای جنسی آنلاین وابسته می‌شوید.",
            "3": "اغلب اوقات به پورن و محتوای جنسی آنلاین وابسته هستید.",
            "4": "تقریباً همیشه به پورن و محتوای جنسی آنلاین وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به بازی‌های رایانه‌ای و ویدئویی وابسته هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به بازی‌های رایانه‌ای و ویدئویی معتاد نیستید.",
            "1": "به ندرت به بازی‌های رایانه‌ای و ویدئویی وابسته می‌شوید.",
            "2": "گاهی اوقات به بازی‌های رایانه‌ای و ویدئویی وابسته می‌شوید.",
            "3": "اغلب اوقات به بازی‌های رایانه‌ای و ویدئویی وابسته هستید.",
            "4": "تقریباً همیشه به بازی‌های رایانه‌ای و ویدئویی وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به شرط‌بندی و قمار اعتیاد دارید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به شرط‌بندی و قمار معتاد نیستید.",
            "1": "به ندرت به شرط‌بندی و قمار وابسته می‌شوید.",
            "2": "گاهی اوقات به شرط‌بندی و قمار وابسته می‌شوید.",
            "3": "اغلب اوقات به شرط‌بندی و قمار وابسته هستید.",
            "4": "تقریباً همیشه به شرط‌بندی و قمار وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به استفاده مفرط از تلفن همراه و شبکه‌های اجتماعی معتاد هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به استفاده مفرط از تلفن همراه و شبکه‌های اجتماعی معتاد نیستید.",
            "1": "به ندرت به استفاده مفرط از تلفن همراه و شبکه‌های اجتماعی وابسته می‌شوید.",
            "2": "گاهی اوقات به استفاده مفرط از تلفن همراه و شبکه‌های اجتماعی وابسته می‌شوید.",
            "3": "اغلب اوقات به استفاده مفرط از تلفن همراه و شبکه‌های اجتماعی وابسته هستید.",
            "4": "تقریباً همیشه به استفاده مفرط از تلفن همراه و شبکه‌های اجتماعی وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به خرید غیرضروری و بی‌رویه وابسته هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به خرید غیرضروری و بی‌رویه معتاد نیستید.",
            "1": "به ندرت به خرید غیرضروری و بی‌رویه وابسته می‌شوید.",
            "2": "گاهی اوقات به خرید غیرضروری و بی‌رویه وابسته می‌شوید.",
            "3": "اغلب اوقات به خرید غیرضروری و بی‌رویه وابسته هستید.",
            "4": "تقریباً همیشه به خرید غیرضروری و بی‌رویه وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به خوردن بیش از حد و بدون کنترل غذا اعتیاد دارید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به خوردن بیش از حد و بدون کنترل غذا معتاد نیستید.",
            "1": "به ندرت به خوردن بیش از حد و بدون کنترل غذا وابسته می‌شوید.",
            "2": "گاهی اوقات به خوردن بیش از حد و بدون کنترل غذا وابسته می‌شوید.",
            "3": "اغلب اوقات به خوردن بیش از حد و بدون کنترل غذا وابسته هستید.",
            "4": "تقریباً همیشه به خوردن بیش از حد و بدون کنترل غذا وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به کارکردن بیش از حد و بی‌وقفه وابسته هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به کارکردن بیش از حد و بی‌وقفه معتاد نیستید.",
            "1": "به ندرت به کارکردن بیش از حد و بی‌وقفه وابسته می‌شوید.",
            "2": "گاهی اوقات به کارکردن بیش از حد و بی‌وقفه وابسته می‌شوید.",
            "3": "اغلب اوقات به کارکردن بیش از حد و بی‌وقفه وابسته هستید.",
            "4": "تقریباً همیشه به کارکردن بیش از حد و بی‌وقفه وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به ورزش کردن بیش از حد و بی‌رویه معتاد هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به ورزش کردن بیش از حد و بی‌رویه معتاد نیستید.",
            "1": "به ندرت به ورزش کردن بیش از حد و بی‌رویه وابسته می‌شوید.",
            "2": "گاهی اوقات به ورزش کردن بیش از حد و بی‌رویه وابسته می‌شوید.",
            "3": "اغلب اوقات به ورزش کردن بیش از حد و بی‌رویه وابسته هستید.",
            "4": "تقریباً همیشه به ورزش کردن بیش از حد و بی‌رویه وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به مصرف کافئین (مثل قهوه و نوشابه‌های انرژی‌زا) معتاد هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به مصرف کافئین معتاد نیستید.",
            "1": "به ندرت به مصرف کافئین وابسته می‌شوید.",
            "2": "گاهی اوقات به مصرف کافئین وابسته می‌شوید.",
            "3": "اغلب اوقات به مصرف کافئین وابسته هستید.",
            "4": "تقریباً همیشه به مصرف کافئین وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به استفاده از داروهای لاغری و مکمل‌های غذایی وابسته هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به داروهای لاغری و مکمل‌های غذایی وابسته نیستید.",
            "1": "به ندرت به داروهای لاغری و مکمل‌های غذایی وابسته می‌شوید.",
            "2": "گاهی اوقات به داروهای لاغری و مکمل‌های غذایی وابسته می‌شوید.",
            "3": "اغلب اوقات به داروهای لاغری و مکمل‌های غذایی وابسته هستید.",
            "4": "تقریباً همیشه به داروهای لاغری و مکمل‌های غذایی وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به استفاده از اینترنت و گشت و گذار آنلاین معتاد هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به استفاده از اینترنت و گشت و گذار آنلاین معتاد نیستید.",
            "1": "به ندرت به استفاده از اینترنت و گشت و گذار آنلاین وابسته می‌شوید.",
            "2": "گاهی اوقات به استفاده از اینترنت و گشت و گذار آنلاین وابسته می‌شوید.",
            "3": "اغلب اوقات به استفاده از اینترنت و گشت و گذار آنلاین وابسته هستید.",
            "4": "تقریباً همیشه به استفاده از اینترنت و گشت و گذار آنلاین وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به روابط ناسالم و وابستگی‌های عاطفی غیرمنطقی معتاد هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به روابط ناسالم و وابستگی‌های عاطفی غیرمنطقی معتاد نیستید.",
            "1": "به ندرت به روابط ناسالم و وابستگی‌های عاطفی غیرمنطقی وابسته می‌شوید.",
            "2": "گاهی اوقات به روابط ناسالم و وابستگی‌های عاطفی غیرمنطقی وابسته می‌شوید.",
            "3": "اغلب اوقات به روابط ناسالم و وابستگی‌های عاطفی غیرمنطقی وابسته هستید.",
            "4": "تقریباً همیشه به روابط ناسالم و وابستگی‌های عاطفی غیرمنطقی وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به مصرف غذاهای ناسالم و فست‌فودها معتاد هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به مصرف غذاهای ناسالم و فست‌فودها معتاد نیستید.",
            "1": "به ندرت به مصرف غذاهای ناسالم و فست‌فودها وابسته می‌شوید.",
            "2": "گاهی اوقات به مصرف غذاهای ناسالم و فست‌فودها وابسته می‌شوید.",
            "3": "اغلب اوقات به مصرف غذاهای ناسالم و فست‌فودها وابسته هستید.",
            "4": "تقریباً همیشه به مصرف غذاهای ناسالم و فست‌فودها وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به استفاده از محصولات آرایشی و بهداشتی بیش از حد وابسته هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به استفاده از محصولات آرایشی و بهداشتی بیش از حد معتاد نیستید.",
            "1": "به ندرت به استفاده از محصولات آرایشی و بهداشتی بیش از حد وابسته می‌شوید.",
            "2": "گاهی اوقات به استفاده از محصولات آرایشی و بهداشتی بیش از حد وابسته می‌شوید.",
            "3": "اغلب اوقات به استفاده از محصولات آرایشی و بهداشتی بیش از حد وابسته هستید.",
            "4": "تقریباً همیشه به استفاده از محصولات آرایشی و بهداشتی بیش از حد وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به مصرف داروهای آرام‌بخش و خواب‌آور بدون نیاز پزشکی معتاد هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به مصرف داروهای آرام‌بخش و خواب‌آور بدون نیاز پزشکی معتاد نیستید.",
            "1": "به ندرت به مصرف داروهای آرام‌بخش و خواب‌آور بدون نیاز پزشکی وابسته می‌شوید.",
            "2": "گاهی اوقات به مصرف داروهای آرام‌بخش و خواب‌آور بدون نیاز پزشکی وابسته می‌شوید.",
            "3": "اغلب اوقات به مصرف داروهای آرام‌بخش و خواب‌آور بدون نیاز پزشکی وابسته هستید.",
            "4": "تقریباً همیشه به مصرف داروهای آرام‌بخش و خواب‌آور بدون نیاز پزشکی وابستگی شدید دارید."
        }
    },
    {
        "text": "چقدر به برنامه‌ریزی افراطی و نظم بیش از حد معتاد هستید؟",
        "options": {
            "0": "اصلاً",
            "1": "به ندرت",
            "2": "گاهی",
            "3": "اغلب",
            "4": "تقریباً همیشه"
        },
        "scores": {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4
        },
        "messages": {
            "0": "به برنامه‌ریزی افراطی و نظم بیش از حد معتاد نیستید.",
            "1": "به ندرت به برنامه‌ریزی افراطی و نظم بیش از حد وابسته می‌شوید.",
            "2": "گاهی اوقات به برنامه‌ریزی افراطی و نظم بیش از حد وابسته می‌شوید.",
            "3": "اغلب اوقات به برنامه‌ریزی افراطی و نظم بیش از حد وابسته هستید.",
            "4": "تقریباً همیشه به برنامه‌ریزی افراطی و نظم بیش از حد وابستگی شدید دارید."
        }
    }
]

# --- توابع شروع و دریافت اطلاعات کاربر ---
async def start_addiction_test(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text("تست سنجش میزان اعتیاد کلی به شما خوش آمد می‌گوید!\n\n"+
                                    "**دستورالعمل پاسخ‌دهی:**\n"+
                                    "برای هر سؤال، گزینه‌ای را انتخاب کنید که بیشترین تطابق را با تجربه شما دارد.\n\n"+
                                    "⭕ اصلاً (۰)\n🔵 به ندرت (۱)\n🟡 گاهی (۲)\n🟠 اغلب (۳)\n🔴 تقریباً همیشه (۴)\n\n"+
                                    "لطفاً نام خود را وارد کنید:") # همیشه از update.message استفاده کنید چون این تابع فقط از طریق /start صدا زده میشود
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
            keyboard.append([InlineKeyboardButton(f"{option} ({key})", callback_data=key)]) # تغییر در نمایش دکمه‌ها
        reply_markup = InlineKeyboardMarkup(keyboard)
        if update.message: # برای شروع تست
            await update.message.reply_text(text, reply_markup=reply_markup)
        elif update.callback_query: # برای ادامه تست
            await update.callback_query.message.reply_text(text, reply_markup=reply_markup)
    else:
        await send_final_result(update, context)

# --- دریافت پاسخ سوال (از طریق callback query) ---
# دریافت پاسخ سوال از طریق callback query
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

async def show_specialized_tests_menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """نمایش منوی تست‌های اختصاصی اعتیاد."""
    keyboard = [
        [InlineKeyboardButton("تست اعتیاد به الکل", callback_data="start_alcohol_addiction")],
        [InlineKeyboardButton("تست اعتیاد به مواد مخدر", callback_data="start_substance_addiction")],
        [InlineKeyboardButton("تست اعتیاد به نیکوتین", callback_data="start_nicotine_addiction")],
        [InlineKeyboardButton("تست اعتیاد به داروهای نسخه‌ای", callback_data="start_prescription_drugs_addiction")],
        [InlineKeyboardButton("تست اعتیاد به پورن", callback_data="start_pornography_addiction")],
        [InlineKeyboardButton("تست اعتیاد به بازی‌های رایانه‌ای", callback_data="start_video_games_addiction")],
        [InlineKeyboardButton("تست اعتیاد به قمار", callback_data="start_gambling_addiction")],
        [InlineKeyboardButton("تست اعتیاد به تلفن همراه و شبکه‌های اجتماعی", callback_data="start_mobile_social_media_addiction")],
        [InlineKeyboardButton("تست اعتیاد به خرید", callback_data="start_shopping_addiction")],
        [InlineKeyboardButton("تست اعتیاد به خوردن بی‌رویه", callback_data="start_overeating_addiction")],
        [InlineKeyboardButton("تست اعتیاد به کارکردن", callback_data="start_work_addiction")],
        [InlineKeyboardButton("تست اعتیاد به ورزش بی‌رویه", callback_data="start_excessive_exercise_addiction")],
        [InlineKeyboardButton("تست اعتیاد به کافئین", callback_data="start_caffeine_addiction")],
        [InlineKeyboardButton("تست اعتیاد به داروهای لاغری و مکمل‌ها", callback_data="start_diet_pills_supplements_addiction")],
        [InlineKeyboardButton("تست اعتیاد به اینترنت", callback_data="start_internet_addiction")],
        [InlineKeyboardButton("تست اعتیاد به روابط ناسالم", callback_data="start_unhealthy_relationships_addiction")],
        [InlineKeyboardButton("تست اعتیاد به غذاهای ناسالم", callback_data="start_unhealthy_foods_addiction")],
        [InlineKeyboardButton("تست اعتیاد به محصولات آرایشی", callback_data="start_cosmetics_addiction")],
        [InlineKeyboardButton("تست اعتیاد به داروهای آرام‌بخش و خواب‌آور", callback_data="start_sedatives_sleeping_pills_addiction")],
        [InlineKeyboardButton("تست اعتیاد به برنامه‌ریزی افراطی", callback_data="start_excessive_planning_addiction")],
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.callback_query.message.reply_text(" لطفاً تست اختصاصی مورد نظر خود را انتخاب کنید:(یا میتوانید در وب اپ تست ها را بدهید)", reply_markup=reply_markup)

# --- ارسال نتیجه نهایی به همراه درصد و تحلیل پاسخ‌ها و لینک به تست‌های خاص ---
async def send_final_result(update: Update, context: ContextTypes.DEFAULT_TYPE):
    total_score = context.user_data["total_score"]
    max_score = len(questions) * 4  # هر سوال حداکثر ۴ امتیاز دارد
    percentage = (total_score / max_score) * 100

    analysis = f"**نتیجه تست سنجش میزان اعتیاد کلی:**\n\n"
    analysis += f"نام: {context.user_data.get('Name', 'نامشخص')}\n"
    analysis += f"سن: {context.user_data.get('Age', 'نامشخص')}\n\n"
    analysis += f"امتیاز کل: {total_score} از {max_score}\n"
    analysis += f"درصد اعتیاد کلی: {percentage:.2f}%\n\n"
    analysis += "**تحلیل پاسخ‌های شما:**\n"

    specific_addiction_keyboard = [] # لیست دکمه‌ها برای تست‌های خاص
    callback_data_set = set() # مجموعه برای نگهداری callback_data ها
    high_addiction_types = [] # لیست برای نگهداری انواع اعتیاد با امتیاز بالا (جدید)

    for idx, resp in context.user_data["responses"].items():
        analysis += f"\n**سوال {idx + 1}:** {resp['question']}\n"
        analysis += f"**گزینه انتخاب شده:** {resp['option_text']} ({resp['selected_option']})\n"
        analysis += f"**تفسیر:** {resp['message']}\n"
        if resp['selected_option'] in ["3", "4"]: # اگر پاسخ "اغلب" یا "تقریباً همیشه" بود
            addiction_type = questions[idx]["text"].split("چقدر به ")[1].split(" وابسته هستید؟")[0] # استخراج نوع اعتیاد از متن سوال
            high_addiction_types.append(addiction_type) # افزودن نوع اعتیاد به لیست (جدید)

    # ایجاد دکمه‌های اختصاصی (حداکثر 3 تا)
    if high_addiction_types: # اگر لیست اعتیادهای با امتیاز بالا خالی نباشد
        analysis += "\n\n**تست‌های اختصاصی پیشنهادی بر اساس پاسخ‌های شما:**\n" # پیام جدید
        num_specific_tests = min(len(high_addiction_types), 3) # حداکثر 3 تست اختصاصی
        for i in range(num_specific_tests):
            addiction_type = high_addiction_types[i]
            callback_data_prefix = "start_" + "_".join(addiction_type.split())
            callback_data_prefix = callback_data_prefix[:60]
            callback_data_prefix = re.sub(r'[^a-zA-Z0-9_]', '', callback_data_prefix)
            logger.info(f"Generated callback_data_prefix: {callback_data_prefix}, length: {len(callback_data_prefix)}")
            if len(callback_data_prefix) > 64:
                logger.warning(f"callback_data_prefix is too long! Length: {len(callback_data_prefix)}")
            button_text = f"تست اختصاصی {addiction_type}"
            if callback_data_prefix not in callback_data_set:
                specific_addiction_keyboard.append([InlineKeyboardButton(button_text, callback_data=callback_data_prefix)])
                callback_data_set.add(callback_data_prefix)
            else:
                logger.warning(f"Duplicate callback_data detected: {callback_data_prefix}")
            analysis += f"- برای تست **{addiction_type}** روی دکمه زیر بزنید.\n" # پیام جدید

    # تفسیر کلی بر اساس درصد (بدون تغییر)
    if percentage < 25:
        interpretation = "میزان اعتیاد شما در سطح پایینی قرار دارد."
    elif percentage < 50:
        interpretation = "میزان اعتیاد شما در سطح متوسطی قرار دارد. توصیه می‌شود به رفتارهای خود توجه بیشتری داشته باشید."
    elif percentage < 75:
        interpretation = "میزان اعتیاد شما قابل توجه است. توصیه می‌شود به فکر دریافت کمک حرفه‌ای باشید."
    else:
        interpretation = "میزان اعتیاد شما در سطح بالایی قرار دارد. اکیداً توصیه می‌شود فوراً به دنبال کمک تخصصی باشید."

    analysis += f"\n\n**تفسیر نهایی:** {interpretation}\n\n"
    analysis += "**همچنین می‌توانید با زدن دکمه زیر به لیست کامل تست‌های اختصاصی دسترسی پیدا کنید:**" # پیام جدید برای دکمه کلی

    # ایجاد دکمه کلی "تست‌های اختصاصی" (بدون تغییر)
    specific_addiction_keyboard.append([InlineKeyboardButton("نمایش لیست کامل تست‌های اختصاصی اعتیاد", callback_data="show_specialized_tests")]) # دکمه کلی
    reply_markup_specific_addictions = InlineKeyboardMarkup(specific_addiction_keyboard)
    logger.info(f"reply_markup_specific_addictions content: {reply_markup_specific_addictions}")

    max_telegram_message_length = 4096
    if len(analysis) > max_telegram_message_length:
        shortened_analysis = f"**نتیجه تست سنجش میزان اعتیاد کلی (خلاصه):**\n\n"
        shortened_analysis += f"نام: {context.user_data.get('Name', 'نامشخص')}\n"
        shortened_analysis += f"سن: {context.user_data.get('Age', 'نامشخص')}\n\n"
        shortened_analysis += f"امتیاز کل: {total_score} از {max_score}\n"
        shortened_analysis += f"درصد اعتیاد کلی: {percentage:.2f}%\n\n"
        shortened_analysis += f"**تفسیر نهایی:** {interpretation}\n\n"
        shortened_analysis += "**برای تحلیل کامل‌تر پاسخ‌ها و دسترسی به تست‌های اختصاصی،** به وب اپلیکیشن مراجعه کنید." # پیام جدید برای ارجاع به وب اپ
        final_message = shortened_analysis
    else:
        final_message = analysis

    if update.callback_query:
        await update.callback_query.message.reply_text(final_message, parse_mode="Markdown", reply_markup=reply_markup_specific_addictions)
    else:
        await update.message.reply_text(final_message, parse_mode="Markdown", reply_markup=reply_markup_specific_addictions)
        
# --- تابع لغو مکالمه ---
async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text('مکالمه لغو شد.')
    return ConversationHandler.END

# --- ایجاد ConversationHandler ---
addiction_conversation_handler = ConversationHandler(
    entry_points=[CommandHandler('start_addiction', start_addiction_test)],  # تغییر نام کامند
    states={
        NAME: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_name)],
        AGE: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_age)],
        QUESTION: [CallbackQueryHandler(question_callback)],
    },
    fallbacks=[CommandHandler('cancel', cancel)],  # فیکس جایگاه fallbacks
    allow_reentry=True,  # اجازه ورود مجدد
    conversation_timeout=300,  # تعیین زمان‌سنج مکالمه
    name="addiction_conversation",  # نام منحصر‌به‌فرد برای پایداری
    persistent=True  # فعال‌سازی پایداری مکالمه
)

async def error_handler(update, context):
    print(f"An error occurred: {context.error}")