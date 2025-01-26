import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import React from 'react'
import About from './components/About/About'
import ContactUs from './components/ContactUs/ContactUs'


import Home from './components/Home/Home'
import Hero from './components/Hero/Hero'
import News from './components/News/News'
import Photos from './components/Photos/Photos'
import Videos from './components/VIdeos/Videos'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='hero' element={<Hero/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contactus' element={<ContactUs/>}/>
      <Route path='news' element={<News/>}/>
      <Route path='photos' element={<Photos/>}/>
      <Route path='videos' element={<Videos/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>
)
