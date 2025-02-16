from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import CallbackContext
from database import save_test_result

# سوالات تست اضطراب
anxiety_questions = [
    {
        "text": "در طول هفته گذشته چقدر احساس اضطراب داشتید؟",
        "options": {
            "الف": "اصلاً نداشتم",
            "ب": "گاهی اوقات",
            "ج": "اغلب اوقات",
            "د": "همیشه"
        }
    },
    {
        "text": "آیا اضطراب شما در کارهای روزانه تأثیر دارد؟",
        "options": {
            "الف": "اصلاً تأثیر ندارد",
            "ب": "کم تأثیر دارد",
            "ج": "زیاد تأثیر دارد",
            "د": "کاملاً مختل کرده است"
        }
    }
]

# نمره‌دهی به گزینه‌ها
scores = {"الف": 0, "ب": 1, "ج": 2, "د": 3}

def start_anxiety_test(update: Update, context: CallbackContext):
    context.user_data["test"] = "anxiety"
    context.user_data["current_question"] = 0
    context.user_data["score"] = 0
    send_anxiety_question(update, context)

def send_anxiety_question(update: Update, context: CallbackContext):
    index = context.user_data["current_question"]
    
    if index < len(anxiety_questions):
        question = anxiety_questions[index]
        keyboard = [
            [InlineKeyboardButton(f"{key}) {value}", callback_data=key)]
            for key, value in question["options"].items()
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        update.callback_query.message.reply_text(question["text"], reply_markup=reply_markup)
    else:
        finish_anxiety_test(update, context)

def handle_anxiety_response(update: Update, context: CallbackContext):
    query = update.callback_query
    user_answer = query.data
    context.user_data["score"] += scores[user_answer]
    context.user_data["current_question"] += 1

    if context.user_data["current_question"] < len(anxiety_questions):
        send_anxiety_question(update, context)
    else:
        finish_anxiety_test(update, context)

def finish_anxiety_test(update: Update, context: CallbackContext):
    score = context.user_data["score"]
    user_id = update.callback_query.from_user.id
    save_test_result(user_id, "اضطراب", score)

    if score < 2:
        result_text = "📊 سطح اضطراب شما پایین است. به همین منوال ادامه دهید!"
    elif score < 4:
        result_text = "📊 سطح اضطراب شما متوسط است. کمی بیشتر استراحت کنید."
    else:
        result_text = "🚨 سطح اضطراب شما بالا است! پیشنهاد می‌شود با یک متخصص صحبت کنید."

    update.callback_query.message.reply_text(result_text)

