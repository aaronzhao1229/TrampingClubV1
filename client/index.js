import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import store from './store'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Routes'

import 'bootstrap/dist/css/bootstrap.min.css'
import './custom.scss'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
    document.getElementById('app')
  )
})
