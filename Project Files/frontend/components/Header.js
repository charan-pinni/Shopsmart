import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

function Header() {
  const [user, setUser] = useState(null);
  const { showNotification } = useContext(NotificationContext);
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    window.addEventListener("authChange", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("authChange", checkUser);
    };
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    showNotification("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="header glass">
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <h2 style={{ margin: 0, fontSize: "1.6rem", fontWeight: "900", cursor: "pointer" }} onClick={() => navigate("/")}>
          <span style={{ color: "var(--primary)" }}>🛒</span> ShopSmart
        </h2>

        <div className="search-bar" style={{ display: "flex", alignItems: "center", background: "rgba(0,0,0,0.05)", borderRadius: "12px", padding: "8px 15px", width: "300px" }}>
          <span style={{ marginRight: "10px", opacity: 0.5 }}>🔍</span>
          <input
            placeholder="Search products..."
            style={{ border: "none", background: "none", outline: "none", width: "100%", fontSize: "0.9rem" }}
          />
        </div>
      </div>

      <nav className="nav-links">
        <Link to="/">Explore</Link>
        <Link to="/wishlist">Wishlist</Link>
        <Link to="/my-cart">Cart</Link>
        <Link to="/my-orders">Orders</Link>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginLeft: "1rem", borderLeft: "1px solid var(--glass-border)", paddingLeft: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: "700" }}>{user.name}</span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>{user.role}</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn-primary"
              style={{ width: "auto", padding: "8px 20px", fontSize: "0.85rem", background: "rgba(0,0,0,0.05)", color: "var(--text-main)", boxShadow: "none" }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn-primary" style={{ width: "auto", padding: "8px 25px", marginLeft: "1rem", color: "white" }}>Login</Link>
        )}

        <button
          onClick={() => setIsDark(!isDark)}
          className="theme-toggle glass"
          title="Toggle Theme"
          style={{ marginLeft: "1rem", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {isDark ? "🌙" : "☀️"}
        </button>
      </nav>
    </header>
  );
}

export default Header;
