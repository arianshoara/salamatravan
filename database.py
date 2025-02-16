import os
import psycopg2

DATABASE_URL = os.getenv("DATABASE_URL")

def init_db():
    conn = psycopg2.connect(DATABASE_URL, sslmode="require")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS test_results (
            id SERIAL PRIMARY KEY,
            user_id BIGINT NOT NULL,
            test_name TEXT NOT NULL,
            score INT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

def save_test_result(user_id, test_name, score):
    conn = psycopg2.connect(DATABASE_URL, sslmode="require")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO test_results (user_id, test_name, score) VALUES (%s, %s, %s)", (user_id, test_name, score))
    conn.commit()
    conn.close()
