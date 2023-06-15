import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import store from './store'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Routes'
// import App from './components/App'
// import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <Router>
        <App />
      </Router> */}
    </Provider>,
    document.getElementById('app')
  )
})
