import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import { Outlet } from 'react-router-dom'
import NavigationBar from './NavigationBar'
import { ToastContainer } from 'react-toastify'
import { fetchProgrammesAsync } from '../../features/programmes/programmeSlice'

function App() {
  const dispatch = useDispatch()
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
        <Container>
          <Outlet />
        </Container>
      </div>
    </>
  )
}

export default App
