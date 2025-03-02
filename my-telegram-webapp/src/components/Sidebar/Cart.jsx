import { useState, useEffect } from 'react';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // فرض می‌کنیم اطلاعات سبد خرید از localStorage یا API دریافت می‌شود
    const savedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
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
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handleCheckout = () => {
    // در اینجا می‌توانید اطلاعات سبد خرید را به درگاه پرداخت آنلاین ارسال کنید
    console.log('Checkout:', cartItems);
    alert('در حال انتقال به درگاه پرداخت...');
  };

  return (
    <div className="cart-container">
      <h2>سبد خرید</h2>
      {cartItems.length === 0 ? (
        <p>سبد خرید شما خالی است.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>قیمت: {item.price} تومان</p>
                  <div className="cart-item-quantity">
                    <label>تعداد:</label>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <button className="remove-item" onClick={() => handleRemoveItem(item.id)}>حذف</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>مجموع: {totalPrice} تومان</p>
            <button className="checkout-button" onClick={handleCheckout}>پرداخت آنلاین</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;