import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: "gallery-authentication.firebaseapp.com",
    projectId: "gallery-authentication",
    storageBucket: "gallery-authentication.appspot.com",
    messagingSenderId: "566428956887",
    appId: `${process.env.REACT_APP_APP_ID}`,
    measurementId: "G-5CGR4JM51D"
  };

  const app = initializeApp(firebaseConfig);

export  const auth = getAuth(app);