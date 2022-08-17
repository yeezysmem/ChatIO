import React from 'react'
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';


const Navbar = () => {
  const auth = getAuth()
  const [user] = useAuthState(auth)

  const logout = () => {
    auth.signOut()
  }

  return (
    <>
    {user ? (
      
        <div>
          <p>{user.displayName}</p>
          <button onClick={logout}>
            Log out
          </button>
        </div>
      ) : (
        <NavLink to={LOGIN_ROUTE}>
          <button>Login</button>
        </NavLink>
      )}
    </>
  )
}

export default Navbar