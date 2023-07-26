import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { TokenContext } from "../store/TokenContext";
const Navbar = ({
  onCartButtonClick,
  onLogout,
  HandleSearch,
  searchQuery,
  clearAll,
}) => {
  const Authctx = useContext(TokenContext);

  return (
    <nav className="navbar">
      <div className="left-nav-links">
        <ul>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          {Authctx.isLoggined && (
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          )}
          {Authctx.isLoggined && (
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
          )}
        </ul>
      </div>
      {Authctx.isLoggined && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={HandleSearch}
          />
        </div>
      )}
      {searchQuery && <button onClick={clearAll}>x</button>}
      {Authctx.isLoggined && (
        <div className="right-nav-links">
          <ul>
            <li>
              <button className="cart-button" onClick={onCartButtonClick}>
                <NavLink to="/cart">
                  Cart <span>{Authctx.products.length}</span>
                </NavLink>
              </button>
            </li>
            <li>
              <button className="logout-button" onClick={onLogout}>
                <NavLink to="/logout">Logout</NavLink>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
