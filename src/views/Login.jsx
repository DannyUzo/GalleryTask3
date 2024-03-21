import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { FcApproval } from "react-icons/fc";

import { auth } from "../Firebase-config";
const Login = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate("/");
    } catch (err) {
      setError(true);
      setLoginEmail("");
      setLoginPassword("");
      console.error(err.code);
      if (err.code.includes("invalid-login")) {
        setErrorMessage("hello world");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div>
      <NavLink to="/">Back to Gallery</NavLink>
      <div className="loginForm">
        <h3>Login</h3>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={loginEmail}
          onChange={(event) => setLoginEmail(event.target.value)}
        />
        <input
          type='password'
          placeholder="password"
          required
          value={loginPassword}
          onChange={(event) => setLoginPassword(event.target.value)}
        />
        {user ? (
          <div className="message">
            {/* <RiErrorWarningLine /> */}
            Successfully logged in <br /> Please proceed to the home page
          </div>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div>
      <div>
        {user ? <h3 id="in">{user?.email} is logged in </h3> : null}
        {user ? null : <h3 id="out">User is logged out</h3>}
        {user ? (
          <button id="logOutBtn" onClick={logout}>
            Log out
          </button>
        ) : null}

        {error && <h5>{errorMessage}</h5>}
      </div>
    </div>
  );
};

export default Login;
