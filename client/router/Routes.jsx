import { createBrowserRouter } from 'react-router-dom'
import App from '../components/App'
import React from 'react'
import About from '../components/About'
import Fruits from '../components/Fruits'
import Album from '../components/Album'
import ContactUs from '../components/ContactUs'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'about', element: <About /> },
      { path: 'album', element: <Album /> },
      { path: 'fruits', element: <Fruits /> },
      { path: 'contactus', element: <ContactUs /> },
      // { path: 'profile', element: <Profile /> },
    ],
  },
])
