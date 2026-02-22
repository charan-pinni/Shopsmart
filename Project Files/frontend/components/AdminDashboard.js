import { useEffect, useState, useContext } from "react";
import API from "../api";
import { NotificationContext } from "../context/NotificationContext";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const { showNotification } = useContext(NotificationContext);

  const fetchProducts = () => {
    API.get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.category || !form.image || !form.stock) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    setLoading(true);
    const request = editId
      ? API.put(`/api/products/${editId}`, form)
      : API.post("/api/products/add", form);

    request
      .then(() => {
        fetchProducts();
        setForm({ name: "", price: "", category: "", image: "", stock: "" });
        setEditId(null);
        showNotification(editId ? "Product updated successfully!" : "Product added successfully!");
      })
      .catch((err) => {
        showNotification(err.response?.data?.message || "Operation failed", "error");
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      API.delete(`/api/products/${id}`)
        .then(() => {
          fetchProducts();
          showNotification("Product deleted successfully!");
        })
        .catch((err) => {
          showNotification(err.response?.data?.message || "Failed to delete product", "error");
        });
    }
  };

  const startEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
    });
    setEditId(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setForm({ name: "", price: "", category: "", image: "", stock: "" });
    setEditId(null);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }} className="animate-fade-in">
      <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "2rem" }}>Admin Workspace</h2>

      <div style={{ display: "grid", gridTemplateColumns: "400px 1fr", gap: "2rem", alignItems: "start" }}>
        {/* ADD / EDIT FORM */}
        <div className="glass" style={{ padding: "2rem", borderRadius: "24px", position: "sticky", top: "100px" }}>
          <h3 style={{ marginBottom: "1.5rem" }}>{editId ? "Edit Product" : "Add New Item"}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              className="admin-input"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid var(--glass-border)", background: "rgba(0,0,0,0.03)" }}
            />
            <div style={{ display: "flex", gap: "1rem" }}>
              <input
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid var(--glass-border)", background: "rgba(0,0,0,0.03)" }}
              />
              <input
                placeholder="Stock"
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid var(--glass-border)", background: "rgba(0,0,0,0.03)" }}
              />
            </div>
            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid var(--glass-border)", background: "rgba(0,0,0,0.03)" }}
            />
            <input
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid var(--glass-border)", background: "rgba(0,0,0,0.03)" }}
            />

            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={loading}
              style={{ marginTop: "1rem" }}
            >
              {loading ? <div className="spinner" style={{ margin: "0 auto" }}></div> : (editId ? "Update Product" : "Launch Product")}
            </button>
            {editId && (
              <button
                onClick={cancelEdit}
                style={{ border: "none", background: "none", color: "var(--text-muted)", cursor: "pointer", fontWeight: "600" }}
              >
                Cancel Editing
              </button>
            )}
          </div>
        </div>

        {/* INVENTORY LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="glass" style={{ padding: "1rem 2rem", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "700", color: "var(--text-muted)" }}>Current Inventory</span>
            <span style={{ background: "var(--primary)", color: "white", padding: "4px 12px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "700" }}>{products.length} Items</span>
          </div>

          {products.map((p) => (
            <div key={p._id} className="glass" style={{ padding: "1rem", borderRadius: "20px", display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <img src={p.image} alt={p.name} style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "12px" }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{p.name}</h4>
                <div style={{ display: "flex", gap: "15px", marginTop: "4px" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: "700" }}>₹{p.price}</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Stock: {p.stock}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => startEdit(p)}
                  className="glass"
                  style={{ padding: "8px 15px", borderRadius: "10px", border: "none", cursor: "pointer", color: "var(--primary)", fontWeight: "600" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  style={{ padding: "8px 15px", borderRadius: "10px", border: "none", cursor: "pointer", color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", fontWeight: "600" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
