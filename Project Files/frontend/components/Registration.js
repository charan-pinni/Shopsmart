import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { NotificationContext } from "../context/NotificationContext";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });
  const [loading, setLoading] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/api/auth/register", formData);
      showNotification("Registration successful! Please login to continue.");
      navigate("/login");
    } catch (err) {
      showNotification(err.response?.data?.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass">
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ margin: 0 }}>Join ShopSmart</h2>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Create an account to start shopping
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="role-toggle" style={{ marginBottom: "1.5rem" }}>
            <button
              type="button"
              className={formData.role === "user" ? "active" : ""}
              onClick={() => setFormData({ ...formData, role: "user" })}
              style={{ borderRadius: "10px 0 0 10px", padding: "10px" }}
            >
              User
            </button>
            <button
              type="button"
              className={formData.role === "admin" ? "active" : ""}
              onClick={() => setFormData({ ...formData, role: "admin" })}
              style={{ borderRadius: "0 10px 10px 0", padding: "10px" }}
            >
              Admin
            </button>
          </div>

          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <button type="submit" className="btn-primary" style={{ marginTop: "1rem" }} disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Already have an account? <Link to="/login" style={{ color: "var(--primary)", fontWeight: "600" }}>Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
