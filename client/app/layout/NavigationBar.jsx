import { Container, Nav, Navbar, Button, Offcanvas } from 'react-bootstrap'

import React from 'react'
import useLogout from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function NavigationBar() {
  const { userRoles } = useSelector((state) => state.auth)

  const logout = useLogout()
  const navigate = useNavigate()

  const signout = async () => {
    await logout()
    navigate('/')
  }
  return (
    <Navbar
      bg="primary"
      variant="dark"
      collapseOnSelect
      expand="lg"
      style={{ marginBottom: 20 }}
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src="/img/logo.png"
            height="60"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              Lambda Trampers & Latte Walkers
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav
              className="justify-content-end flex-grow-1 pe-3"
              variant="underline"
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/tramp">Tramp</Nav.Link>
              <Nav.Link href="/walk">Walk</Nav.Link>
              <Nav.Link href="/album">Album</Nav.Link>
              <Nav.Link href="/videos">Videos</Nav.Link>
              <Nav.Link href="/contactus">Contact us</Nav.Link>
              {userRoles && userRoles.includes('admin') && (
                <Button onClick={signout}>Logout</Button>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}
