import React from 'react'

import Container from 'react-bootstrap/Container'
import { Outlet } from 'react-router-dom'
import NavigationBar from './NavigationBar'

function App() {
  return (
    <>
      <div className="app">
        <NavigationBar />
        <Container>
          <Outlet />
        </Container>
      </div>
    </>
  )
}

export default App
