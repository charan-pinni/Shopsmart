import { useState } from "react";
import axios from "axios";

function AdminAddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/api/products/add", product)
      .then(() => {
        alert("Product Added Successfully");
        setProduct({ name: "", price: "", category: "", stock: "" });
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Product</h2>

      <input name="name" placeholder="Name" value={product.name} onChange={handleChange} /><br /><br />
      <input name="price" placeholder="Price" value={product.price} onChange={handleChange} /><br /><br />
      <input name="category" placeholder="Category" value={product.category} onChange={handleChange} /><br /><br />
      <input name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} /><br /><br />

      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}

export default AdminAddProduct;
