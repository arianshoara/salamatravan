import "./AuthoredBooks.css";

function AuthoredBooks() {
  return (
    <div className="books-container">
      <h2 className="books-title">📚 کتاب‌های تألیف شده</h2>
      <div className="book-item">
        <h3>درد و لذت</h3>
        <p>✍️ مؤلف: آرین شعرا</p>
        <p>🔹 این کتاب درباره تجربه‌های انسانی از درد و لذت و تأثیر آن‌ها بر تصمیم‌گیری‌ها و رفتارهای ما صحبت می‌کند.</p>
      </div>
      <div className="book-item">
        <h3>کتاب دوم (در حال تألیف...)</h3>
        <p>⏳ این کتاب هنوز در حال نگارش است و به زودی منتشر خواهد شد!</p>
      </div>
    </div>
  );
}

export default AuthoredBooks;
