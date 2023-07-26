import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import "./App.css";
import Navbar from "./components/Auth/Navbar";
import ProductList from "./components/Products/Availableproducts";
import Example from "./components/Modal/ModalComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import Logout from "./components/Auth/Logout";
import ProductDetails from "./components/Products/productDetailPage";
const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const HandleSearch = (e) => {
    const Value = e.target.value;
    setSearchQuery(Value);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    console.log("close");
  };

  const handleOpenModal = () => {
    setShowModal(true);
    console.log("open");
  };

  const clearAll = () => {
    setSearchQuery("");
  };

  return (
    <div>
      <Navbar
        onCartButtonClick={handleOpenModal}
        searchQuery={searchQuery}
        HandleSearch={HandleSearch}
        clearAll={clearAll}
      />
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route
          path="products"
          element={<ProductList searchQuery={searchQuery} />}
        />
        <Route
          path="/cart"
          element={<Example openCart={showModal} onHide={handleCloseModal} />}
        />
        <Route path="logout" element={<Logout />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
};

export default App;
