import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from '../router'

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map(route => (
        <Route 
          key={route.path} //ASKkkkkkkkkkkkk
          path={route.path}
          element={<route.component />}
        />
      ))}
      <Route path="*" element={<Navigate to="/posts"/>}/>
   </Routes>
  )
}



//<Route path="/posts"  element={<Posts/>} />
