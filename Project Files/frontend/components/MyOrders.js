import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function MyOrders() {
  const { orders } = useContext(CartContext);

  if (orders.length === 0) {
    return (
      <div className="empty-state animate-fade-in">
        <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>📦</div>
        <h2>No orders yet</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
          You haven't placed any orders yet. Start exploring our premium products!
        </p>
        <Link to="/" className="btn-primary" style={{ width: "auto", padding: "1rem 2.5rem" }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }} className="animate-fade-in">
      <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "2rem" }}>Order History</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {orders.map((item, index) => (
          <div key={index} className="glass" style={{ padding: "1.5rem", borderRadius: "24px", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "16px" }}
            />
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{item.name}</h3>
                <span className="glass" style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: "700", background: "var(--primary-glow)", color: "var(--primary)" }}>
                  Delivered
                </span>
              </div>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Quantity: <span style={{ fontWeight: "700", color: "var(--text-main)" }}>{item.quantity}</span>
              </p>
              <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: "800", fontSize: "1.2rem", color: "var(--primary)" }}>₹{item.price * item.quantity}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Order ID: #{Math.floor(Math.random() * 100000)}</span>
              </div>
            </div>
            <button className="btn-primary" style={{ marginTop: "0.5rem", background: "rgba(0,0,0,0.05)", color: "var(--text-main)", boxShadow: "none" }}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
