import { createBrowserRouter } from 'react-router-dom'
import App from '../layout/App'
import React from 'react'
import About from '../../features/about/About'

import Album from '../../features/album/Album'
import ContactUs from '../../features/contactUs/ContactUs'
import SingleAlbum from '../../features/album/SingleAlbum'
import CreateAlbum from '../../features/admin/CreateAlbum'
import ManageAlbum from '../../features/admin/ManageAlbum'
import ManageSingleAlbum from '../../features/admin/ManageSingleAlbum'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'about', element: <About /> },
      { path: 'album', element: <Album /> },
      { path: 'album/:albumId', element: <SingleAlbum /> },
      { path: 'createAlbum', element: <CreateAlbum /> },
      { path: 'contactus', element: <ContactUs /> },
      { path: 'manageAlbum', element: <ManageAlbum /> },
      { path: 'manageAlbum/:albumId', element: <ManageSingleAlbum /> },
    ],
  },
])
