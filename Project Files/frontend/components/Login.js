import { useState, useContext } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { NotificationContext } from "../context/NotificationContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    API.post("/api/auth/login", { email, password, role })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.dispatchEvent(new Event("authChange")); // Notify Header
        showNotification(`Welcome back, ${res.data.user.name}!`);
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        showNotification(err.response?.data?.message || "Login failed", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass">
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ margin: 0 }}>Welcome Back</h2>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Login to continue your shopping journey
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="role-toggle" style={{ marginBottom: "1.5rem" }}>
            <button
              type="button"
              className={role === "user" ? "active" : ""}
              onClick={() => setRole("user")}
              style={{ borderRadius: "10px 0 0 10px", padding: "10px" }}
            >
              User
            </button>
            <button
              type="button"
              className={role === "admin" ? "active" : ""}
              onClick={() => setRole("admin")}
              style={{ borderRadius: "0 10px 10px 0", padding: "10px" }}
            >
              Admin
            </button>
          </div>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" style={{ marginTop: "1rem" }} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
            Don't have an account? <Link to="/registration" style={{ color: "var(--primary)", fontWeight: "600" }}>Create one here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
