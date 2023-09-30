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
import TrampProgramme from '../../features/programmes/TrampProgramme'
import WalkProgramme from '../../features/programmes/WalkProgramme'
import CreateProgramme from '../../features/programmes/CreateProgramme'
import Login from '../../features/auth/Login'
import ForgetPassword from '../../features/auth/ForgetPassword'
import RequiredAuth from './RequiredAuth'
import PersistLogin from '../components/PersistLogin'
import Admin from '../../features/admin/Admin'
import Register from '../../features/auth/Register'
import ResetPassword from '../../features/auth/ResetPassword'
import Videos from '../../features/videos/Videos'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequiredAuth allowedRoles={['admin']} />,
            children: [
              { path: 'admin', element: <Admin /> },
              { path: 'manageAlbum', element: <ManageAlbum /> },
              { path: 'createAlbum', element: <CreateAlbum /> },
              { path: 'updateProgramme', element: <CreateProgramme /> },
              { path: 'manageAlbum/:albumId', element: <ManageSingleAlbum /> },
            ],
          },
        ],
      },
      { path: 'about', element: <About /> },
      { path: 'tramp', element: <TrampProgramme /> },
      { path: 'walk', element: <WalkProgramme /> },
      { path: 'album', element: <Album /> },
      { path: 'album/:albumId', element: <SingleAlbum /> },
      { path: 'videos', element: <Videos /> },
      { path: 'contactus', element: <ContactUs /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgetPassword', element: <ForgetPassword /> },
      { path: 'resetPassword/*', element: <ResetPassword /> },
    ],
  },
])
