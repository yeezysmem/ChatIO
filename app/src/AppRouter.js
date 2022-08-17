import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { privateRoutes, publickRoutes } from './routes'
import { CHAT_ROUTE, LOGIN_ROUTE } from './utils/consts'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'


const AppRouter = () => {
    const auth = getAuth()
    const [user] = useAuthState(auth)
    console.log(user)

  return user ? 
  (
    <>
    <Switch>
        {privateRoutes.map(({path, Component}) => (
            <Route key={path} path={path} component={Component} exact />
        ))}
        <Redirect to={CHAT_ROUTE} />
    </Switch>
    </>
  )
  :
  (
    <Switch>
        {publickRoutes.map(({path, Component}) => (
            <Route key={path} path={path} component={Component} exact />
        ))}
        <Redirect to={LOGIN_ROUTE} />
    </Switch>
  )
}

export default AppRouter;