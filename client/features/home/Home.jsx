import React from 'react'
import { Container, Carousel, Row, Col } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom'
import {
  faFacebook,
  faMeetup,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons'

export default function Home() {
  const navigate = useNavigate()
  return (
    <Container>
      <p>
        The Lambda Trampers and Lambda Latte Walkers are social tramping and
        walking groups for the LGBTQ+ community, and their friends, living in
        and around Christchurch. The Lambda Trampers go on day tramps of varying
        difficulty while the Lambda Latte Walkers go on shorter walks, generally
        2 to 3 hours, and usually have a coffee at the end.
      </p>
      <Carousel style={{ marginBottom: 20, marginTop: 20 }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/slide1.jpeg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/slide2.jpeg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/img/slide3.jpeg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <p>
        To join the Lambda Trampers or Latte walkers, join our Meetup group or
        message us by clicking on the icons below:
      </p>
      <Row>
        <Col>
          <FontAwesomeIcon
            icon={faFacebook}
            size="2xl"
            className="iconHover"
            onClick={() =>
              window.open('https://www.facebook.com/groups/lambdatrampers')
            }
            data-testid="facebook-icon"
          />
        </Col>
        <Col>
          <FontAwesomeIcon
            icon={faInstagram}
            size="2xl"
            className="iconHover"
            onClick={() =>
              window.open('https://www.instagram.com/lambdatrampers22/')
            }
          />
        </Col>
        <Col>
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
        <Col>
          <FontAwesomeIcon
            icon={faMessage}
            size="2xl"
            className="iconHover"
            onClick={() => navigate('/contactus')}
            data-testid="message-icon"
          />
        </Col>
      </Row>
    </Container>
  )
}
