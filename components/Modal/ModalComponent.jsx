import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { TokenContext } from "../store/TokenContext";
import "./CartModal.css";
function Example({ openCart, onHide, searchQuery }) {
  const { products } = useContext(TokenContext);
  const ProductCtx = useContext(TokenContext);
  const removeHandler = (id) => {
    ProductCtx.removeItem(id);
  };
  const handleIncreaseQuantity = (id) => {
    ProductCtx.increaseQuantity(id);
  };

  const handleDecreaseQuantity = (id) => {
    ProductCtx.decreaseQuantity(id);
  };

  return (
    <>
      <h2>Shopping cart</h2>
      <Modal show={openCart} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Cart Items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display the added products */}
          <div className="cart-container">
            {products.map((product) => (
              <div className="cart-item" key={product.id}>
                <img
                  className="cart-item-image"
                  src={product.image}
                  alt={product.brand}
                />
                <div className="cart-item-details">
                  <h3>{product.brand}</h3>
                  <p>Price: {product.price}</p>
                  <p>Rating: {product.rating}</p>
                  <div className="cart-item-quantity">
                    <button onClick={() => handleDecreaseQuantity(product.id)}>
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(product.id)}>
                      +
                    </button>
                  </div>
                </div>
                <Button
                  variant="danger"
                  onClick={() => removeHandler(product.id)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={onHide}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
