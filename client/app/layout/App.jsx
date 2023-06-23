import React from 'react'

import Container from 'react-bootstrap/Container'
import { Outlet } from 'react-router-dom'
import NavigationBar from './NavigationBar'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <div className="app">
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
        <NavigationBar />
        <Container>
          <Outlet />
        </Container>
      </div>
    </>
  )
}

export default App
