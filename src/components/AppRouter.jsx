import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Posts from '../pages/Posts'
import PostIdPage from '../pages/PostIdPage'

export const AppRouter = () => {
  return (
    <Routes>
    <Route path="/about" element={<About/>} />
    <Route exact path="/posts"  element={<Posts/>} />
    <Route path="*"      element={<Navigate to="/posts"/>}/>
    <Route exact path="/posts/:id"  element={<PostIdPage/>} />
  </Routes>
  )
}
