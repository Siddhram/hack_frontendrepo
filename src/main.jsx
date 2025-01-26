import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import React from 'react'
import About from './components/About/About'
import ContactUs from './components/ContactUs/ContactUs'


import Home from './components/Home/Home'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      // {
      //   path:"",
      //   element:<Hero/>
      // },
      {
        path:"home",
        element:<Home/>
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"contactus",
        element:<ContactUs/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>
)
