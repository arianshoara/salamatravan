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

# سوالات تست وسواس فکری-عملی
# هر سوال شامل متن، گزینه‌ها، امتیازدهی و پیام (تحلیل + راهکار مقابله‌ای) برای هر گزینه است.
questions = [
    {
        "text": "سوال 1: افکار ناخواسته مرتبط با آسیب زدن به دیگران به‌طور مکرر به ذهنم هجوم می‌آورند.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما افکار ناخواسته‌ای در این زمینه ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های تنفس عمیق و آرام‌سازی.\nمشاوره با روانشناس یا درمانگر برای مدیریت افکار ناخواسته.",
            "2": "🔵: به ندرت افکار ناخواسته‌ای در این زمینه دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های تنفس عمیق و آرام‌سازی.\nمشاوره با روانشناس یا درمانگر برای مدیریت افکار ناخواسته.",
            "3": "🟡: گاهی اوقات این افکار به ذهن شما هجوم می‌آورند.\nراهکار مقابله‌ای: تمرین تکنیک‌های تنفس عمیق و آرام‌سازی.\nمشاوره با روانشناس یا درمانگر برای مدیریت افکار ناخواسته.",
            "4": "🟠: اغلب اوقات درگیر این افکار ناخواسته هستید.\nراهکار مقابله‌ای: تمرین تکنیک‌های تنفس عمیق و آرام‌سازی.\nمشاوره با روانشناس یا درمانگر برای مدیریت افکار ناخواسته.",
            "5": "🔴: تقریباً همیشه این افکار به ذهن شما هجوم می‌آورند که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های تنفس عمیق و آرام‌سازی.\nمشاوره با روانشناس یا درمانگر برای مدیریت افکار ناخواسته."
        }
    },
    {
        "text": "سوال 2: نیاز شدیدی به تکرار اعمال خاصی (مثل لمس اشیا، تکرار کلمات یا شمارش قدم‌ها) دارم تا احساس آرامش کنم.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما نیازی به تکرار اعمال خاصی ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به تکرار اعمال.",
            "2": "🔵: به ندرت نیاز به تکرار اعمال خاصی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به تکرار اعمال.",
            "3": "🟡: گاهی اوقات نیاز به تکرار اعمال خاصی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به تکرار اعمال.",
            "4": "🟠: اغلب اوقات نیاز به تکرار اعمال خاصی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به تکرار اعمال.",
            "5": "🔴: تقریباً همیشه نیاز به تکرار اعمال خاصی دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به تکرار اعمال."
        }
    },
    {
        "text": "سوال 3: اگر اشیا در جای مناسب خود قرار نگیرند یا قرینه نباشند، دچار اضطراب می‌شوم.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما دچار اضطراب نمی‌شوید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های آرام‌سازی و تنفس عمیق.\nمشاوره با درمانگر برای مدیریت اضطراب و کاهش نیاز به قرینگی.",
            "2": "🔵: به ندرت دچار اضطراب می‌شوید.\nراهکار مقابله‌ای: تمرین تکنیک‌های آرام‌سازی و تنفس عمیق.\nمشاوره با درمانگر برای مدیریت اضطراب و کاهش نیاز به قرینگی.",
            "3": "🟡: گاهی اوقات دچار اضطراب می‌شوید.\nراهکار مقابله‌ای: تمرین تکنیک‌های آرام‌سازی و تنفس عمیق.\nمشاوره با درمانگر برای مدیریت اضطراب و کاهش نیاز به قرینگی.",
            "4": "🟠: اغلب اوقات دچار اضطراب می‌شوید.\nراهکار مقابله‌ای: تمرین تکنیک‌های آرام‌سازی و تنفس عمیق.\nمشاوره با درمانگر برای مدیریت اضطراب و کاهش نیاز به قرینگی.",
            "5": "🔴: تقریباً همیشه دچار اضطراب می‌شوید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های آرام‌سازی و تنفس عمیق.\nمشاوره با درمانگر برای مدیریت اضطراب و کاهش نیاز به قرینگی."
        }
    },
    {
        "text": "سوال 4: ترس مداومی دارم که مبادا به دلیل بی‌دقتی باعث حادثه یا فاجعه شوم.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما ترس مداومی ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت ترس‌ها.\nمشاوره با روانشناس برای کاهش ترس‌های مداوم.",
            "2": "🔵: به ندرت ترس مداومی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت ترس‌ها.\nمشاوره با روانشناس برای کاهش ترس‌های مداوم.",
            "3": "🟡: گاهی اوقات ترس مداومی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت ترس‌ها.\nمشاوره با روانشناس برای کاهش ترس‌های مداوم.",
            "4": "🟠: اغلب اوقات ترس مداومی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت ترس‌ها.\nمشاوره با روانشناس برای کاهش ترس‌های مداوم.",
            "5": "🔴: تقریباً همیشه ترس مداومی دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت ترس‌ها.\nمشاوره با روانشناس برای کاهش ترس‌های مداوم."
        }
    },
    {
        "text": "سوال 5: برای اطمینان از انجام درست کارها (مثل قفل در یا خاموش کردن گاز)، بارها آن‌ها را چک می‌کنم.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما نیازی به چک کردن مکرر ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به چک کردن مکرر.",
            "2": "🔵: به ندرت نیاز به چک کردن مکرر دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به چک کردن مکرر.",
            "3": "🟡: گاهی اوقات نیاز به چک کردن مکرر دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به چک کردن مکرر.",
            "4": "🟠: اغلب اوقات نیاز به چک کردن مکرر دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به چک کردن مکرر.",
            "5": "🔴: تقریباً همیشه نیاز به چک کردن مکرر دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به چک کردن مکرر."
        }
    },
    {
        "text": "سوال 6: تصاویر ذهنی ناخوشایند یا تابو (مثل محتوای جنسی یا مذهبی) دارم که نمی‌توانم آن‌ها را کنترل کنم.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما تصاویر ذهنی ناخوشایندی ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت تصاویر ذهنی.\nمشاوره با روانشناس برای کاهش تصاویر ذهنی ناخوشایند.",
            "2": "🔵: به ندرت تصاویر ذهنی ناخوشایندی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت تصاویر ذهنی.\nمشاوره با روانشناس برای کاهش تصاویر ذهنی ناخوشایند.",
            "3": "🟡: گاهی اوقات تصاویر ذهنی ناخوشایندی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت تصاویر ذهنی.\nمشاوره با روانشناس برای کاهش تصاویر ذهنی ناخوشایند.",
            "4": "🟠: اغلب اوقات تصاویر ذهنی ناخوشایندی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت تصاویر ذهنی.\nمشاوره با روانشناس برای کاهش تصاویر ذهنی ناخوشایند.",
            "5": "🔴: تقریباً همیشه تصاویر ذهنی ناخوشایندی دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت تصاویر ذهنی.\nمشاوره با روانشناس برای کاهش تصاویر ذهنی ناخوشایند."
        }
    },
    {
        "text": "سوال 7: برای جلوگیری از وقوع اتفاقات بد، باید اعمال خاصی را طبق یک الگوی مشخص انجام دهم.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما نیازی به انجام اعمال خاصی ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به انجام اعمال خاص.",
            "2": "🔵: به ندرت نیاز به انجام اعمال خاصی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به انجام اعمال خاص.",
            "3": "🟡: گاهی اوقات نیاز به انجام اعمال خاصی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به انجام اعمال خاص.",
            "4": "🟠: اغلب اوقات نیاز به انجام اعمال خاصی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به انجام اعمال خاص.",
            "5": "🔴: تقریباً همیشه نیاز به انجام اعمال خاصی دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به انجام اعمال خاص."
        }
    },
    {
        "text": "سوال 8: نیاز دارم دیگران از من تضمین بگیرند که کارها را درست انجام داده‌ام.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما نیازی به تضمین گرفتن ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت نیاز به تضمین گرفتن.\nمشاوره با روانشناس برای کاهش نیاز به تضمین گرفتن.",
            "2": "🔵: به ندرت نیاز به تضمین گرفتن دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت نیاز به تضمین گرفتن.\nمشاوره با روانشناس برای کاهش نیاز به تضمین گرفتن.",
            "3": "🟡: گاهی اوقات نیاز به تضمین گرفتن دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت نیاز به تضمین گرفتن.\nمشاوره با روانشناس برای کاهش نیاز به تضمین گرفتن.",
            "4": "🟠: اغلب اوقات نیاز به تضمین گرفتن دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت نیاز به تضمین گرفتن.\nمشاوره با روانشناس برای کاهش نیاز به تضمین گرفتن.",
            "5": "🔴: تقریباً همیشه نیاز به تضمین گرفتن دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت نیاز به تضمین گرفتن.\nمشاوره با روانشناس برای کاهش نیاز به تضمین گرفتن."
        }
    },
    {
        "text": "سوال 9: اگر عدد یا رنگ خاصی را نبینم، احساس می‌کنم اتفاق بدی رخ خواهد داد.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما نیازی به دیدن عدد یا رنگ خاصی ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت نیاز به دیدن عدد یا رنگ خاص.\n(مشاوره با روانشناس برای کاهش این نیاز)",
            "2": "🔵: به ندرت نیاز به دیدن عدد یا رنگ خاصی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت نیاز به دیدن عدد یا رنگ خاص.\n(مشاوره با روانشناس برای کاهش این نیاز)",
            "3": "🟡: گاهی اوقات نیاز به دیدن عدد یا رنگ خاصی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت نیاز به دیدن عدد یا رنگ خاص.\n(مشاوره با روانشناس برای کاهش این نیاز)",
            "4": "🟠: اغلب اوقات نیاز به دیدن عدد یا رنگ خاصی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت نیاز به دیدن عدد یا رنگ خاص.\n(مشاوره با روانشناس برای کاهش این نیاز)",
            "5": "🔴: تقریباً همیشه نیاز به دیدن عدد یا رنگ خاصی دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت نیاز به دیدن عدد یا رنگ خاص.\n(مشاوره با روانشناس برای کاهش این نیاز)"
        }
    },
    {
        "text": "سوال 10: از لمس دستگیره در، وسایل عمومی یا دست دادن با دیگران به دلیل ترس از آلودگی اجتناب می‌کنم.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما نیازی به اجتناب ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای مدیریت ترس از آلودگی.",
            "2": "🔵: به ندرت نیاز به اجتناب دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای مدیریت ترس از آلودگی.",
            "3": "🟡: گاهی اوقات نیاز به اجتناب دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای مدیریت ترس از آلودگی.",
            "4": "🟠: اغلب اوقات نیاز به اجتناب دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای مدیریت ترس از آلودگی.",
            "5": "🔴: تقریباً همیشه نیاز به اجتناب دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای مدیریت ترس از آلودگی."
        }
    },
    {
        "text": "سوال 11: زمان زیادی صرف انجام کارهای روزمره می‌کنم زیرا باید آن‌ها را بارها اصلاح کنم.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما نیازی به اصلاح مکرر ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به اصلاح مکرر.",
            "2": "🔵: به ندرت نیاز به اصلاح مکرر دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به اصلاح مکرر.",
            "3": "🟡: گاهی اوقات نیاز به اصلاح مکرر دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به اصلاح مکرر.",
            "4": "🟠: اغلب اوقات نیاز به اصلاح مکرر دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به اصلاح مکرر.",
            "5": "🔴: تقریباً همیشه نیاز به اصلاح مکرر دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به اصلاح مکرر."
        }
    },
    {
        "text": "سوال 12: اگر نتوانم یک عمل وسواسی را انجام دهم، تا ساعت‌ها افکار مزاحم ذهنم را آزار می‌دهند.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما نیازی به انجام عمل وسواسی ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت افکار مزاحم.\nمشاوره با روانشناس برای کاهش نیاز به انجام اعمال وسواسی.",
            "2": "🔵: به ندرت نیاز به انجام عمل وسواسی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت افکار مزاحم.\nمشاوره با روانشناس برای کاهش نیاز به انجام اعمال وسواسی.",
            "3": "🟡: گاهی اوقات نیاز به انجام عمل وسواسی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت افکار مزاحم.\nمشاوره با روانشناس برای کاهش نیاز به انجام اعمال وسواسی.",
            "4": "🟠: اغلب اوقات نیاز به انجام عمل وسواسی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت افکار مزاحم.\nمشاوره با روانشناس برای کاهش نیاز به انجام اعمال وسواسی.",
            "5": "🔴: تقریباً همیشه نیاز به انجام عمل وسواسی دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت افکار مزاحم.\nمشاوره با روانشناس برای کاهش نیاز به انجام اعمال وسواسی."
        }
    },
    {
        "text": "سوال 13: احساس می‌کنم مسئول پیشگیری از حوادث غیرمنتظره هستم، حتی اگر ارتباط منطقی وجود نداشته باشد.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما نیازی به پیشگیری از حوادث غیرمنتظره ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت احساس مسئولیت غیرمنطقی.\nمشاوره با روانشناس برای کاهش نیاز به پیشگیری از حوادث.",
            "2": "🔵: به ندرت نیاز به پیشگیری از حوادث غیرمنتظره دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت احساس مسئولیت غیرمنطقی.\nمشاوره با روانشناس برای کاهش نیاز به پیشگیری از حوادث.",
            "3": "🟡: گاهی اوقات نیاز به پیشگیری از حوادث غیرمنتظره دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت احساس مسئولیت غیرمنطقی.\nمشاوره با روانشناس برای کاهش نیاز به پیشگیری از حوادث.",
            "4": "🟠: اغلب اوقات نیاز به پیشگیری از حوادث غیرمنتظره دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت احساس مسئولیت غیرمنطقی.\nمشاوره با روانشناس برای کاهش نیاز به پیشگیری از حوادث.",
            "5": "🔴: تقریباً همیشه نیاز به پیشگیری از حوادث غیرمنتظره دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت احساس مسئولیت غیرمنطقی.\nمشاوره با روانشناس برای کاهش نیاز به پیشگیری از حوادث."
        }
    },
    {
        "text": "سوال 14: افکار مکرری درباره نقض قوانین اخلاقی یا مذهبی دارم که باعث شرمساری من می‌شود.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما افکار مکرری در این زمینه ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت افکار شرمساری‌آور.\nمشاوره با روانشناس برای کاهش افکار مکرر.",
            "2": "🔵: به ندرت افکار مکرری در این زمینه دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت افکار شرمساری‌آور.\nمشاوره با روانشناس برای کاهش افکار مکرر.",
            "3": "🟡: گاهی اوقات افکار مکرری در این زمینه دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت افکار شرمساری‌آور.\nمشاوره با روانشناس برای کاهش افکار مکرر.",
            "4": "🟠: اغلب اوقات افکار مکرری در این زمینه دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت افکار شرمساری‌آور.\nمشاوره با روانشناس برای کاهش افکار مکرر.",
            "5": "🔴: تقریباً همیشه افکار مکرری در این زمینه دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت افکار شرمساری‌آور.\nمشاوره با روانشناس برای کاهش افکار مکرر."
        }
    },
    {
        "text": "سوال 15: نیاز دارم اعمال یا افکارم را به دیگران اعتراف کنم تا از احساس گناه رها شوم.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما نیازی به اعتراف ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت نیاز به اعتراف.\nمشاوره با روانشناس برای کاهش نیاز به اعتراف.",
            "2": "🔵: به ندرت نیاز به اعتراف دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت نیاز به اعتراف.\nمشاوره با روانشناس برای کاهش نیاز به اعتراف.",
            "3": "🟡: گاهی اوقات نیاز به اعتراف دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت نیاز به اعتراف.\nمشاوره با روانشناس برای کاهش نیاز به اعتراف.",
            "4": "🟠: اغلب اوقات نیاز به اعتراف دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت نیاز به اعتراف.\nمشاوره با روانشناس برای کاهش نیاز به اعتراف.",
            "5": "🔴: تقریباً همیشه نیاز به اعتراف دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت نیاز به اعتراف.\nمشاوره با روانشناس برای کاهش نیاز به اعتراف."
        }
    },
    {
        "text": "سوال 16: به‌طور مداوم حس می‌کنم بخشی از بدنم آلوده یا ناقص است و نیاز به بررسی دارد.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما نیازی به بررسی مداوم بدن خود ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت احساس آلودگی یا نقص.\nمشاوره با روانشناس برای کاهش نیاز به بررسی مداوم بدن.",
            "2": "🔵: به ندرت نیاز به بررسی مداوم دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت احساس آلودگی یا نقص.\nمشاوره با روانشناس برای کاهش نیاز به بررسی مداوم بدن.",
            "3": "🟡: گاهی اوقات نیاز به بررسی مداوم دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت احساس آلودگی یا نقص.\nمشاوره با روانشناس برای کاهش نیاز به بررسی مداوم بدن.",
            "4": "🟠: اغلب اوقات نیاز به بررسی مداوم دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت احساس آلودگی یا نقص.\nمشاوره با روانشناس برای کاهش نیاز به بررسی مداوم بدن.",
            "5": "🔴: تقریباً همیشه نیاز به بررسی مداوم دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت احساس آلودگی یا نقص.\nمشاوره با روانشناس برای کاهش نیاز به بررسی مداوم بدن."
        }
    },
    {
        "text": "سوال 17: برای شروع یا پایان کارها باید عدد خاصی را تکرار کنم (مثل ۳ بار روشن کردن چراغ).",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما نیازی به تکرار اعداد ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به تکرار اعداد.",
            "2": "🔵: به ندرت نیاز به تکرار اعداد دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به تکرار اعداد.",
            "3": "🟡: گاهی اوقات نیاز به تکرار اعداد دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به تکرار اعداد.",
            "4": "🟠: اغلب اوقات نیاز به تکرار اعداد دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به تکرار اعداد.",
            "5": "🔴: تقریباً همیشه نیاز به تکرار اعداد دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به تکرار اعداد."
        }
    },
    {
        "text": "سوال 18: انجام کارهای ساده (مثل پوشیدن لباس) به دلیل نیاز به رعایت ترتیب خاص، زمان زیادی می‌برد.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما نیازی به رعایت ترتیب خاص ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به رعایت ترتیب خاص.",
            "2": "🔵: به ندرت نیاز به رعایت ترتیب خاص دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به رعایت ترتیب خاص.",
            "3": "🟡: گاهی اوقات نیاز به رعایت ترتیب خاص دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به رعایت ترتیب خاص.",
            "4": "🟠: اغلب اوقات نیاز به رعایت ترتیب خاص دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به رعایت ترتیب خاص.",
            "5": "🔴: تقریباً همیشه نیاز به رعایت ترتیب خاص دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به رعایت ترتیب خاص."
        }
    },
    {
        "text": "سوال 19: افکار مزاحمی درباره از دست دادن کنترل و انجام کارهای غیرمنطقی دارم.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما افکار مزاحمی ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت افکار مزاحم.\nمشاوره با روانشناس برای کاهش افکار مزاحم.",
            "2": "🔵: به ندرت افکار مزاحمی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت افکار مزاحم.\nمشاوره با روانشناس برای کاهش افکار مزاحم.",
            "3": "🟡: گاهی اوقات افکار مزاحمی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت افکار مزاحم.\nمشاوره با روانشناس برای کاهش افکار مزاحم.",
            "4": "🟠: اغلب اوقات افکار مزاحمی دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت افکار مزاحم.\nمشاوره با روانشناس برای کاهش افکار مزاحم.",
            "5": "🔴: تقریباً همیشه افکار مزاحمی دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های شناختی-رفتاری (CBT) برای مدیریت افکار مزاحم.\nمشاوره با روانشناس برای کاهش افکار مزاحم."
        }
    },
    {
        "text": "سوال 20: اگر اشیای بی‌ارزش (مثل روزنامه یا بسته‌بندی) را دور بریزم، احساس اضطراب شدید می‌کنم.",
        "options": {
            "1": "⭕ اصلاً",
            "2": "🔵 به ندرت",
            "3": "🟡 گاهی",
            "4": "🟠 اغلب",
            "5": "🔴 تقریباً همیشه"
        },
        "scores": {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4
        },
        "messages": {
            "1": "⭕: شما نیازی به نگه داشتن اشیای بی‌ارزش ندارید که نشان‌دهنده‌ی سطح پایین وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به نگه داشتن اشیای بی‌ارزش.",
            "2": "🔵: به ندرت نیاز به نگه داشتن اشیای بی‌ارزش دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به نگه داشتن اشیای بی‌ارزش.",
            "3": "🟡: گاهی اوقات نیاز به نگه داشتن اشیای بی‌ارزش دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به نگه داشتن اشیای بی‌ارزش.",
            "4": "🟠: اغلب اوقات نیاز به نگه داشتن اشیای بی‌ارزش دارید.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به نگه داشتن اشیای بی‌ارزش.",
            "5": "🔴: تقریباً همیشه نیاز به نگه داشتن اشیای بی‌ارزش دارید که نشان‌دهنده‌ی سطح بالای وسواس است.\nراهکار مقابله‌ای: تمرین تکنیک‌های مواجهه و جلوگیری از پاسخ (ERP).\nمشاوره با روانشناس برای کاهش نیاز به نگه داشتن اشیای بی‌ارزش."
        }
    }
]

# --- توابع شروع و دریافت اطلاعات کاربر ---
async def start_ocd_test(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text("سلام! به تست وسواس فکری-عملی خوش آمدید.\nلطفاً نام خود را وارد کنید:")
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
        # ایجاد دکمه‌ها برای گزینه‌ها
        for key, option in question["options"].items():
            keyboard.append([InlineKeyboardButton(f"{key}) {option}", callback_data=key)])
        reply_markup = InlineKeyboardMarkup(keyboard)
        if update.message:  # برای شروع تست
            await update.message.reply_text(text, reply_markup=reply_markup)
        elif update.callback_query:  # برای ادامه تست
            await update.callback_query.message.reply_text(text, reply_markup=reply_markup)
        logger.info("send_question: Sending question to user") # لاگ اضافه شد
    else:
        logger.info("send_question: Calling send_final_result from send_question - q_index >= len(questions)") # لاگ اضافه شد
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
    
    logger.info(f"question_callback: current_question after increment: {context.user_data['current_question']}, len(questions): {len(questions)}") # لاگ اضافه شد
    
    if context.user_data["current_question"] < len(questions):
        await send_question(update, context)
        return QUESTION
    else:
        await send_final_result(update, context)
        return ConversationHandler.END

# --- ارسال نتیجه نهایی به همراه تحلیل پاسخ‌ها ---
async def send_final_result(update: Update, context: ContextTypes.DEFAULT_TYPE):
    total_score = context.user_data["total_score"]
    max_score = len(questions) * 4  # هر سوال حداکثر ۴ امتیاز دارد
    percentage = (total_score / max_score) * 100

    analysis = f"نتیجه تست وسواس فکری-عملی:\n\n"
    analysis += f"نام: {context.user_data.get('Name', 'نامشخص')}\n"
    analysis += f"سن: {context.user_data.get('Age', 'نامشخص')}\n\n"
    analysis += f"امتیاز کل: {total_score} از {max_score}\n"
    analysis += f"درصد وسواس: {percentage:.2f}%\n\n"

    # تفسیر کلی بر اساس امتیازدهی
    if total_score <= 15:
        interpretation = "علائم OCD بسیار خفیف یا عدم وجود."
    elif total_score <= 30:
        interpretation = "گرایش‌های وسواسی در سطح متوسط."
    elif total_score <= 50:
        interpretation = "علائم قابل توجه؛ مشاوره با روانشناس توصیه می‌شود."
    else:
        interpretation = "احتمال شدت بالای علائم؛ نیاز به ارزیابی تخصصی فوری."

    analysis += f"\n\nتفسیر نهایی: {interpretation}\n\n"
    analysis += "توصیه کلی:\n"
    analysis += "1. تمرین تنفس عمیق و آرام‌سازی.\n"
    analysis += "2. استفاده از تکنیک‌های شناختی-رفتاری (CBT) و مواجهه و جلوگیری از پاسخ (ERP).\n"
    analysis += "3. در صورت افزایش علائم، مشاوره با روانشناس یا متخصص سلامت روان توصیه می‌شود."
    analysis += "برای اطلاعات و تحلیل های دقیق تر به وب اپ مراجعه کنید و نتیجه تست ها را با تحلیل دقیق تر ببینید."
    logger.info(f"send_final_result: Length of analysis message: {len(analysis)}") # لاگ طول پیام
    
    max_telegram_message_length = 4096
    if len(analysis) > max_telegram_message_length:
        shortened_analysis = f"نتیجه تست وسواس فکری-عملی (OCD):\n\n"
        shortened_analysis += f"نام: {context.user_data.get('Name', 'نامشخص')}\n"
        shortened_analysis += f"سن: {context.user_data.get('Age', 'نامشخص')}\n\n"
        shortened_analysis += f"امتیاز کل: {total_score} از {max_score}\n"
        shortened_analysis += f"درصد وسواس: {percentage:.2f}%\n\n"
        shortened_analysis += "برای اطلاعات و تحلیل های دقیق تر به وب اپ مراجعه کنید و نتیجه تست ها را با تحلیل دقیق تر ببینید."
        final_message = shortened_analysis
    else:
        final_message = analysis
    
    if update.callback_query:
        await update.callback_query.message.reply_text(analysis, parse_mode="Markdown")
    else:
        await update.message.reply_text(analysis, parse_mode="Markdown")

# --- تابع لغو مکالمه ---
async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text('مکالمه لغو شد.')
    return ConversationHandler.END

# --- ایجاد ConversationHandler برای تست OCD ---
ocd_conversation_handler = ConversationHandler(
    entry_points=[CommandHandler('start_ocd', start_ocd_test)],
    states={
        NAME: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_name)],
        AGE: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_age)],
        QUESTION: [CallbackQueryHandler(question_callback)],
    },
    fallbacks=[CommandHandler('cancel', cancel)]
)

async def error_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    logger.error(msg="Exception while handling an update:", exc_info=context.error)
