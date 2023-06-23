import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import React from 'react'

export default function NavigationBar() {
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
          <Nav.Link href="/album">Album</Nav.Link>
          <Nav.Link href="/contactus">Contact us</Nav.Link>
          <Nav.Link href="/createAlbum">Create Album</Nav.Link>
          <Nav.Link href="/manageAlbum">Manage Albums</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
