import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "@/features/cart";
import type { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h2 className="page-title">Shopping Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} className="cart-img" />
              <div className="cart-info">
                <h3>{item.title}</h3>
                <p>
                  ${item.price} × {item.quantity}
                </p>
              </div>
              <div className="cart-actions">
                <button onClick={() => dispatch(decreaseQty(item.id))}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(increaseQty(item.id))}>
                  +
                </button>
              </div>
              <button
                className="btn-secondary"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          ))}

          <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
          <button className="btn-danger" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
