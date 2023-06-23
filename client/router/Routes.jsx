import { createBrowserRouter } from 'react-router-dom'
import App from '../components/App'
import React from 'react'
import About from '../components/About'
import Fruits from '../components/Fruits'
import Album from '../components/Album'
import ContactUs from '../components/ContactUs'
import SingleAlbum from '../components/SingleAlbum'
import CreateAlbum from '../components/CreateAlbum'
import ManageAlbum from '../components/ManageAlbum'
import ManageSingleAlbum from '../components/ManageSingleAlbum'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'about', element: <About /> },
      { path: 'album', element: <Album /> },
      { path: 'album/:albumId', element: <SingleAlbum /> },
      { path: 'createAlbum', element: <CreateAlbum /> },
      { path: 'fruits', element: <Fruits /> },
      { path: 'contactus', element: <ContactUs /> },
      { path: 'manageAlbum', element: <ManageAlbum /> },
      { path: 'manageAlbum/:albumId', element: <ManageSingleAlbum /> },
    ],
  },
])
