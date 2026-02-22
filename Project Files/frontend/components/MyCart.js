import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { NotificationContext } from "../context/NotificationContext";

function MyCart() {
  const { cart, increaseQty, decreaseQty, placeOrder } = useContext(CartContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleBuy = () => {
    placeOrder();
    showNotification("Order placed successfully! Thank you for shopping with us.");
    navigate("/my-orders");
  };

  if (cart.length === 0) {
    return (
      <div className="empty-state animate-fade-in">
        <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🛒</div>
        <h2>Your cart is empty</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/" className="btn-primary" style={{ width: "auto", padding: "1rem 2.5rem" }}>
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }} className="animate-fade-in">
      <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "2rem" }}>Shopping Cart</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "2rem" }}>
        {/* CART ITEMS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {cart.map((item) => (
            <div key={item._id} className="glass" style={{ padding: "1.25rem", borderRadius: "20px", display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "12px" }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{item.name}</h3>
                <p style={{ color: "var(--primary)", fontWeight: "700", marginTop: "0.25rem" }}>₹{item.price}</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", background: "rgba(0,0,0,0.05)", borderRadius: "12px", padding: "4px" }}>
                <button
                  onClick={() => decreaseQty(item._id)}
                  style={{ width: "32px", height: "32px", border: "none", background: "white", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
                >
                  -
                </button>
                <span style={{ margin: "0 15px", fontWeight: "700", minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item._id)}
                  style={{ width: "32px", height: "32px", border: "none", background: "white", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY SECTION */}
        <div className="summary-card glass" style={{ padding: "2rem", borderRadius: "24px" }}>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.4rem" }}>Order Summary</h3>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
            <span style={{ fontWeight: "600" }}>₹{total}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span style={{ color: "var(--text-muted)" }}>Shipping</span>
            <span style={{ color: "var(--primary)", fontWeight: "600" }}>FREE</span>
          </div>
          <hr style={{ border: "none", borderTop: "1px solid var(--glass-border)", margin: "1.5rem 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>Total</span>
            <span style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--primary)" }}>₹{total}</span>
          </div>

          <button onClick={handleBuy} className="btn-primary" style={{ padding: "1.2rem" }}>
            Checkout Now
          </button>
          <p style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "1rem" }}>
            Secure payment powered by ShopSmart
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyCart;
