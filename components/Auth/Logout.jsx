import React from "react";
import { useContext } from "react";
import { TokenContext } from "../store/TokenContext";
import { useNavigate } from "react-router-dom";
function Logout() {
  const Authctx = useContext(TokenContext);
  const Navigate = useNavigate();
  const logoutHandler = () => {
    Authctx.logout();
    Navigate("/login");
  };
  return (
    <div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}

export default Logout;
