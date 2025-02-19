import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  const handleClose = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.close();
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🚀 تلگرام وب‌اپ</h1>
      <p>این یک وب‌اپ ساده برای تلگرام است!</p>
      <button
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        onClick={handleClose}
      >
        بستن وب‌اپ
      </button>
    </div>
  );
}

export default App;
