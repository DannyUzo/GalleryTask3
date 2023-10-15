import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase-config";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      if(error.message === "Firebase: Error (auth/invalid-login-credentials)."){
        setError("Invaild Email or Password")
      }else if(error.message === undefined){
        setError("User not found")
      }
      else {
         setError(error.message);
       }
    }
    console.log(error.message)
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
          onChange={(event) => setLoginEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          required
          onChange={(event) => setLoginPassword(event.target.value)}
        />
        {user ? (
          <NavLink to="/">
            <div className="message">
              Successfully logged in <br /> Please proceed to the home page
            </div>
          </NavLink>
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

        <h5>{errorMessage}</h5>

        <h5>{error}</h5>
      </div>
    </div>
  );
};

export default Login;
