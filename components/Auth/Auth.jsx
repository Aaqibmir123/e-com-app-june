import React, { useRef, useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../store/TokenContext";
import { useContext } from "react";
const Auth = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [isSignUp, setIsSignUp] = useState(true); // True for signup form, false for login form

  const navigate = useNavigate();

  const AuthCtx = useContext(TokenContext);
  const handleAuth = async () => {
    // Handle authentication here
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (isSignUp) {
      // Handle signup logic
      const confirmPassword = confirmPasswordRef.current.value;

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHGRvoSWTdrSI-EB_qvYmegGq81sMGgTw",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            confirmPassword,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();

      if (password !== confirmPassword) {
        console.error("Passwords do not match.");
        return;
      }
      console.log("Sign up with:", email, password);
    } else {
      // Handle login logic
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHGRvoSWTdrSI-EB_qvYmegGq81sMGgTw",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();
      AuthCtx.login(data.idToken, email);
      console.log(data);
      navigate("/products");
      console.log(data, "login successfully");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
        <input type="email" ref={emailRef} placeholder="Email" />
        <input type="password" ref={passwordRef} placeholder="Password" />
        {isSignUp && (
          <input
            type="password"
            ref={confirmPasswordRef}
            placeholder="Confirm Password"
          />
        )}
        <button onClick={handleAuth}>{isSignUp ? "Sign Up" : "Log In"}</button>
        <p>
          {isSignUp
            ? "Already have an account? Click here to"
            : "Don't have an account? Click here to"}{" "}
          <button className="secondary" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
