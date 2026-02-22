import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { NotificationContext } from "../context/NotificationContext";

function Wishlist() {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);
    const { showNotification } = useContext(NotificationContext);
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        addToCart(product);
        showNotification(`${product.name} added to your cart!`);
        navigate("/my-cart");
    };

    const handleRemove = (id) => {
        removeFromWishlist(id);
        showNotification("Item removed from wishlist");
    };

    return (
        <main style={{ padding: "0 2rem", maxWidth: "1200px", margin: "0 auto" }} className="animate-fade-in">
            <header style={{ padding: "3rem 0", textAlign: "center" }}>
                <h2 style={{ fontSize: "3rem", fontWeight: "800", background: "linear-gradient(to right, var(--primary), #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    My Wishlist
                </h2>
                <p style={{ color: "var(--text-muted)", marginTop: "0.5rem", fontSize: "1.1rem" }}>
                    Items you've saved for your future shopping spree
                </p>
            </header>

            {wishlist.length === 0 ? (
                <div className="empty-state">
                    <div style={{ fontSize: "5rem", marginBottom: "1.5rem" }}>💝</div>
                    <h2>No favorites yet</h2>
                    <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
                        Start browsing and heart the items you love!
                    </p>
                    <Link to="/" className="btn-primary" style={{ width: "auto", padding: "1rem 2.5rem" }}>
                        Explore Products
                    </Link>
                </div>
            ) : (
                <div className="product-grid" style={{ padding: "0 0 4rem 0" }}>
                    {wishlist.map((p) => (
                        <div key={p._id} className="product-card glass" style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ position: "relative", overflow: "hidden", borderRadius: "16px" }}>
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="product-image"
                                    style={{ marginBottom: 0 }}
                                />
                                <button
                                    onClick={() => handleRemove(p._id)}
                                    style={{
                                        position: "absolute",
                                        top: "12px",
                                        right: "12px",
                                        background: "white",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "36px",
                                        height: "36px",
                                        cursor: "pointer",
                                        color: "#ef4444",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "1.2rem",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                                    }}
                                >
                                    ✕
                                </button>
                            </div>

                            <div style={{ padding: "0.5rem 0", flex: 1 }}>
                                <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{p.name}</h3>
                                <div className="product-price">₹{p.price}</div>
                            </div>

                            <button className="btn-primary" onClick={() => handleAddToCart(p)} style={{ marginTop: "1rem" }}>
                                move to cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

export default Wishlist;
