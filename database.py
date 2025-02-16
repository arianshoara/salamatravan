import sqlite3

# ایجاد و اتصال به دیتابیس
def init_db():
    conn = sqlite3.connect("bot_data.db")
    cursor = conn.cursor()
    
    # ایجاد جدول برای ذخیره نتایج تست کاربران
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS test_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        test_type TEXT,
        result TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    conn.commit()
    conn.close()

# ذخیره نتیجه تست در دیتابیس
def save_test_result(user_id, test_type, result):
    conn = sqlite3.connect("bot_data.db")
    cursor = conn.cursor()
    
    cursor.execute("INSERT INTO test_results (user_id, test_type, result) VALUES (?, ?, ?)", 
                   (user_id, test_type, result))
    
    conn.commit()
    conn.close()
