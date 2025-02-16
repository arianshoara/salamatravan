from telegram import Update, ForceReply
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext

# List of questions to ask the user
questions = [
    "1. آیا شما احساس می‌کنید که از نظر عاطفی آماده برای یک رابطه هستید؟",
    "2. آیا می‌توانید به فرد دیگری اعتماد کنید؟",
    "3. آیا شما از رابطه‌های گذشته خود درس گرفته‌اید؟",
    "4. آیا شما می‌توانید وقت و انرژی لازم برای یک رابطه بگذارید؟",
    "5. آیا شما به دنبال رابطه‌ای هستید که بر اساس احترام متقابل باشد؟",
    "6. آیا شما می‌توانید نیازهای خود را به شیوه‌ای سالم بیان کنید؟",
    "7. آیا شما می‌توانید نیازهای شریک خود را بشنوید و درک کنید؟",
    "8. آیا شما از نظر مالی و شغلی در موقعیت پایداری هستید؟",
    "9. آیا شما از نظر روحی و جسمی در وضعیت خوبی هستید؟",
    "10. آیا شما آماده‌اید که با مشکلات و چالش‌های رابطه مواجه شوید؟"
]

# Initialize the current question index
current_question_index = 0

def start(update: Update, _: CallbackContext) -> None:
    """Send a message when the command /start is issued."""
    user = update.effective_user
    update.message.reply_markdown_v2(
        fr'سلام {user.mention_markdown_v2()}\! به تست آمادگی رابطه خوش آمدید\! برای شروع، به سوالات زیر پاسخ دهید\.',
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
        update.message.reply_text("از شما بخاطر شرکت در تست آمادگی رابطه متشکریم!")

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
```` ▋