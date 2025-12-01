"use client";

import { useCart } from "../context/CartContext";
import css from "./page.module.css";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={css.cart}>
      <h1>Your Cart</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      <div className={css.items}>
        {cart.map((item) => (
          <div className={css.item} key={item.id}>
            <img src={item.image_url} alt={item.title} className={css.img} />

            <div className={css.info}>
              <h3>{item.title}</h3>
              <p>Price: {item.price} ₴</p>
              <p>Quantity: {item.quantity}</p>

              <button
                className={css.remove}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className={css.total}>
          <h2>Total: {total} ₴</h2>
          <button className={css.clear} onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
