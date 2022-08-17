import React, { useContext } from 'react'
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';


const Login = () => {

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const user = auth.currentUser;
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
      }).catch((error) => {
        const errorMessage = error.message;
      });
      console.log(user);
  }

  return (
    <>
    <button onClick={login}>Войти с помощью гугл</button>
    
    </>
  )
}

export default Login