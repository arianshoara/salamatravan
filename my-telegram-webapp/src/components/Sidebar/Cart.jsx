import { readStored, writeStored } from '../../lib/storage';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import './Cart.css';

const Cart = () => {
  const { translations: t } = useLanguage();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // فرض می‌کنیم اطلاعات سبد خرید از localStorage یا API دریافت می‌شود
    const stored = readStored('cart', []);
    const savedCartItems = Array.isArray(stored) ? stored.filter(item => item && Number.isFinite(item.price) && Number.isInteger(item.quantity) && item.quantity > 0 && item.price >= 0) : [];
    setCartItems(savedCartItems);
  }, []);

  useEffect(() => {
    // محاسبه مجموع قیمت سبد خرید
    const newTotalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    writeStored('cart', updatedCartItems);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (!Number.isInteger(newQuantity) || newQuantity < 1) return;
    const updatedCartItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    writeStored('cart', updatedCartItems);
  };

  const handleCheckout = () => {
    // در اینجا می‌توانید اطلاعات سبد خرید را به درگاه پرداخت آنلاین ارسال کنید

    alert(t.checkoutUnavailable);
  };

  return (
    <div className="cart-container">
      <h1>{t.cart}</h1>
      {cartItems.length === 0 ? (
        <p>{t.emptyCart}</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" width="80" height="80" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{t.price}: {item.price} {t.currency}</p>
                  <div className="cart-item-quantity">
                    <label htmlFor={`quantity-${item.id}`}>{t.quantity}:</label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number" aria-label={`${t.quantityFor} ${item.name}`}
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <button className="remove-item" onClick={() => handleRemoveItem(item.id)}>{t.remove}</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>{t.total}: {totalPrice} {t.currency}</p>
            <button className="checkout-button" onClick={handleCheckout}>{t.checkout}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
