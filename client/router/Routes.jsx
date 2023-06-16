import { createBrowserRouter } from 'react-router-dom'
import App from '../components/App'
import React from 'react'
import About from '../components/About'
import Fruits from '../components/Fruits'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'about', element: <About /> },
      { path: 'fruits', element: <Fruits /> },
    ],
  },
])
