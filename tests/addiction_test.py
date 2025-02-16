from telegram import Update, ForceReply
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext

# List of questions to ask the user
questions = [
    "1. آیا شما بیش از حد معمول به مواد مخدر یا الکل فکر می‌کنید؟",
    "2. آیا شما تلاش کرده‌اید مصرف مواد مخدر یا الکل را کاهش دهید اما موفق نشدید؟",
    "3. آیا شما به دلیل مصرف مواد مخدر یا الکل مشکلاتی در کار یا تحصیل دارید؟",
    "4. آیا شما به دلیل مصرف مواد مخدر یا الکل با خانواده یا دوستان خود درگیری دارید؟",
    "5. آیا شما به دلیل مصرف مواد مخدر یا الکل مشکلات مالی دارید؟",
    "6. آیا شما به دلیل مصرف مواد مخدر یا الکل مشکلات سلامتی دارید؟",
    "7. آیا شما به دلیل مصرف مواد مخدر یا الکل دچار مشکلات قانونی شده‌اید؟",
    "8. آیا شما به دلیل مصرف مواد مخدر یا الکل احساس گناه یا شرمندگی می‌کنید؟",
    "9. آیا شما به دلیل مصرف مواد مخدر یا الکل از فعالیت‌های اجتماعی و تفریحی خودداری می‌کنید؟",
    "10. آیا شما به دلیل مصرف مواد مخدر یا الکل احساس می‌کنید که کنترل زندگی خود را از دست داده‌اید؟"
]

# Initialize the current question index
current_question_index = 0

def start(update: Update, _: CallbackContext) -> None:
    """Send a message when the command /start is issued."""
    user = update.effective_user
    update.message.reply_markdown_v2(
        fr'سلام {user.mention_markdown_v2()}\! به تست اعتیاد خوش آمدید\! برای شروع، به سوالات زیر پاسخ دهید\.',
        reply_markup=ForceReply(selective=True),
    )
    ask_question(update, _)

def ask_question(update: Update, _: CallbackContext) -> None:
    """Ask the next question in the list."""
    global current_question_index
    if current_question_index < len(questions):
        update.message.reply_text(questions[current_question_index])
        current_question_index += 1
    else:
        update.message.reply_text("از شما بخاطر شرکت در تست اعتیاد متشکریم!")

def handle_message(update: Update, _: CallbackContext) -> None:
    """Handle the user's response and ask the next question."""
    ask_question(update, _)

def main() -> None:
    """Start the bot."""
    # Create the Updater and pass it your bot's token.
    updater = Updater("YOUR_TOKEN_HERE")

    # Get the dispatcher to register handlers
    dispatcher = updater.dispatcher

    # on different commands - answer in Telegram
    dispatcher.add_handler(CommandHandler("start", start))

    # on non command i.e message - ask the next question on user's response
    dispatcher.add_handler(MessageHandler(Filters.text & ~Filters.command, handle_message))

    # Start the Bot
    updater.start_polling()

    # Run the bot until you press Ctrl-C or the process receives SIGINT,
    # SIGTERM or SIGABRT
    updater.idle()

if __name__ == '__main__':
    main()
``` ▋