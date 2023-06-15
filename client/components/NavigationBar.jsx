import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
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
          />{' '}
          React Bootstrap
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
