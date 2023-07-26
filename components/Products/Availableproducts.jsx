import React, { useState, useEffect } from "react";
import "./ProductList.css"; // Import CSS file for styling
import { TokenContext } from "../store/TokenContext";
import { Link } from "react-router-dom";

import { useContext } from "react";
const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const ProductCtx = useContext(TokenContext);
  const [darkMode, setDarkmode] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    // Here you can implement the logic to add the product with the given productId to the cart
    ProductCtx.addItem({
      id: product.id,
      image: product.thumbnail,
      brand: product.brand,
      price: product.price,
      rating: product.rating,
    });
  };

  const filterProducts = products.filter((product) =>
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const themeToggler = () => {
    setDarkmode((prestate) => !prestate);
  };
  return (
    <div className={darkMode ? "dark-mode " : "product-list-container"}>
      <h1>Product List</h1>
      <button onClick={themeToggler}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {filterProducts.map((product, index) => (
            <div key={product.id} className="product-item">
              {product.thumbnail && (
                <img src={product.thumbnail} alt={product.title} />
              )}
              <h2>{product.title}</h2>
              {product.brand && <p>Brand: {product.brand}</p>}
              {product.price && <p>Price: ${product.price.toFixed(2)}</p>}
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              <Link to={`/products/${product.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
