import { Container, Nav, Navbar, Button } from 'react-bootstrap'

import React from 'react'
import useLogout from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom'

export default function NavigationBar() {
  const logout = useLogout()
  const navigate = useNavigate()

  const signout = async () => {
    await logout()
    navigate('/')
  }
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/img/logo.png"
            height="60"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/tramp">Tramp</Nav.Link>
          <Nav.Link href="/walk">Walk</Nav.Link>
          <Nav.Link href="/album">Album</Nav.Link>
          <Nav.Link href="/contactus">Contact us</Nav.Link>
          <Nav.Link href="/admin">Admin</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Button onClick={signout}>Logout</Button>
        </Nav>
      </Container>
    </Navbar>
  )
}