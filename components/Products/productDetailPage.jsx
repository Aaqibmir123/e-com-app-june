import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details using the id and update the state
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-details">
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} />
      <p>Brand: {product.brand}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <p>Rating: {product.rating}</p>
      <p>Description: {product.description}</p>
    </div>
  );
};

export default ProductDetails;
