import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import { Outlet, useLocation } from 'react-router-dom'
import NavigationBar from './NavigationBar'
import { ToastContainer } from 'react-toastify'
import { fetchProgrammesAsync } from '../../features/programmes/programmeSlice'
import Home from '../../features/home/Home'
import Footer from './Footer'

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => dispatch(fetchProgrammesAsync()))
  return (
    <>
      <div className="app">
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
        <NavigationBar />
        {location.pathname === '/' ? (
          <Home />
        ) : (
          <Container>
            <Outlet />
          </Container>
        )}
        <Footer />
      </div>
    </>
  )
}

export default App
