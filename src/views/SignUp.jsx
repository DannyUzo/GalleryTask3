import React, { useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { Link, NavLink } from 'react-router-dom'
import { auth } from '../Firebase-config'

const SignUp = () => {

const [signUpEmail, setSignUpEmail] = useState("");
const [signUpPassword, setSignUpPassword] = useState("");
const [error, setError] = useState('')



const [user, setUser] = useState({});

onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
})

const signUp = async () => {
 try{
     await createUserWithEmailAndPassword(auth, signUpEmail,signUpPassword);
 } catch (error) {
    setError(error.message);
 }
};



  return (
    <div>
        <NavLink to='/'>Back to Gallery</NavLink>
    <div className="SignUpForm">
        <h3>Sign Up</h3>
        <input type="text" placeholder='Enter your email' onChange={(event) => {setSignUpEmail(event.target.value)}} />
        <input type="password" placeholder='password' onChange={(event) => {setSignUpPassword(event.target.value)}} />
      <Link to='/'>
        <button onClick={signUp}>Register</button>
      </Link>
        <p>Have an account? <Link to='/login'>Login</Link></p>
    </div>
    <h6></h6>
    <h5>{error}</h5>

    </div>
  )
}

export default SignUp