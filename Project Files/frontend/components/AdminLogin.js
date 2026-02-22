import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    // TEMP admin login
    localStorage.setItem("admin", "true");
    navigate("/admin/add-product");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Login</h2>

      <input placeholder="Admin Email" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />

      <button onClick={handleAdminLogin}>Login as Admin</button>
    </div>
  );
}

export default AdminLogin;
