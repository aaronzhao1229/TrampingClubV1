import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faMeetup,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="font-small blue pt-4">
      <hr />
      <Container>
        <Row>
          <Col sm={{ span: 2, offset: 3 }} style={{ textAlign: 'center' }}>
            <FontAwesomeIcon
              icon={faFacebook}
              size="2xl"
              className="iconHover"
              onClick={() =>
                window.open('https://www.facebook.com/groups/lambdatrampers')
              }
            />
          </Col>
          <Col sm={{ span: 2 }} style={{ textAlign: 'center' }}>
            <FontAwesomeIcon
              icon={faInstagram}
              size="2xl"
              className="iconHover"
              onClick={() =>
                window.open('https://www.instagram.com/lambdatrampers22/')
              }
            />
          </Col>
          <Col sm={{ span: 2 }} style={{ textAlign: 'center' }}>
            <FontAwesomeIcon
              icon={faMeetup}
              size="2xl"
              className="iconHover"
              onClick={() =>
                window.open(
                  'https://www.meetup.com/lambda-trampers-and-lambda-latte-walkers/'
                )
              }
            />
          </Col>
        </Row>
        <Row>
          <Col sm={{ span: 6, offset: 3 }}>
            <div className="text-center py-3">
              © 2023 Copyright: Lambda Trampers and Latte Walkers
            </div>
          </Col>
          <Col sm={{ span: 3 }}>
            <div className="text-end py-3">
              <Link to="/admin">Admin</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
