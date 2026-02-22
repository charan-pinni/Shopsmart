import { useEffect, useState, useContext } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { NotificationContext } from "../context/NotificationContext";

function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    API.get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error(err);
        showNotification("Failed to load products", "error");
      });
  }, []);

  // Add to cart logic
  const handleAddToCart = (product) => {
    const user = localStorage.getItem("user");

    if (!user) {
      showNotification("Please login to add products to your cart", "error");
      navigate("/login");
      return;
    }

    addToCart(product);
    showNotification(`${product.name} added to cart!`);
    navigate("/my-cart");
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      showNotification("Removed from wishlist");
    } else {
      addToWishlist(product);
      showNotification("Added to wishlist ❤️");
    }
  };

  return (
    <main style={{ padding: "0 20px" }}>
      <header style={{ padding: "2rem 0", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", fontWeight: "800" }}>Explore Products</h2>
        <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>Handpicked quality just for you</p>
      </header>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card glass">
            <div style={{ position: "relative", overflow: "hidden", borderRadius: "12px" }}>
              <img
                src={p.image}
                alt={p.name}
                className="product-image"
              />
              <button
                onClick={() => toggleWishlist(p)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "var(--glass-bg)",
                  border: "none",
                  borderRadius: "50%",
                  width: "35px",
                  height: "35px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(4px)"
                }}
              >
                {isInWishlist(p._id) ? "❤️" : "🤍"}
              </button>
            </div>

            <h3>{p.name}</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1rem" }}>
              High quality product with premium features.
            </p>
            <div className="product-price">₹{p.price}</div>

            <button className="btn-primary" onClick={() => handleAddToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Products;
