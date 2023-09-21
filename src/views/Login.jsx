import React,{ useState } from 'react'
import { NavLink, Link } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../Firebase-config'


 const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState('')

 const login = async () => {
    try{
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
       console.log(user)
    } catch (error) {
       console.log(error.message);
       setError(error.message);
    }
    alert("logged in")
   
}
const logout = async () => {
    await signOut(auth); 
};


 const [user, setUser] = useState({});

onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
})


  return (
    <div>
        <NavLink to='/'>Back to Gallery</NavLink>
       
        <div className="loginForm">
        <h3>Login</h3>
        <input type="text" placeholder='Enter your email' onChange={(event) => setLoginEmail(event.target.value)} />
        <input type="password" placeholder='password' onChange={(event) => setLoginPassword(event.target.value)} />
       <Link to='/'>
        <button onClick={login}>Login</button>
       </Link>
        </div>
        <div>
        <h3 id='in'>{user?.email} is logged in </h3>
        <h3 id="out">User is logged out</h3>
        <button id='logOutBtn' onClick={logout}>Log out</button>
       
        <h5>{error}</h5>
       
        
        </div>
    </div>
  )
}

export default Login