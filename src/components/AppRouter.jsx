import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes} from '../router'
import { useContext } from 'react';
import { AuthContext } from './context';

export const AppRouter = () => {
  const {isAuth} = useContext(AuthContext);
  return (
    isAuth
    ?
      <Routes>
        {privateRoutes.map(route => (
            <Route 
              key={route.path} //ASKkkkkkkkkkkkk
              path={route.path}
              element={<route.component />}
            />
          ))}
        <Route path="*" element={<Navigate to="/posts"/>}/>
    </Routes>

    :
      <Routes>
      {publicRoutes.map(route => (
        <Route 
          key={route.path} //ASKkkkkkkkkkkkk
          path={route.path}
          element={<route.component />}
        />
      ))}
      <Route path="*" element={<Navigate to="/login"/>}/>
      </Routes>

 )
}



//<Route path="/posts"  element={<Posts/>} />
