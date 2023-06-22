import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbumAsync } from '../slice/albumSlice'
import { Card, Row, Col, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Album() {
  const album = useSelector((state) => state.album)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAlbumAsync())
  }, [])

  return (
    <Container fluid>
      <Row xs={1} md={4} className="g-4">
        {album.album.map((trip) => (
          <Col key={trip.albumId}>
            <Card>
              <Card.Img
                variant="top"
                src={trip.photoUrl}
                style={{ objectFit: 'contain' }}
              />
              <Card.Body>
                <Card.Title>{trip.albumName}</Card.Title>
                <Card.Text>{trip.tripDate}</Card.Text>
                <Button
                  onClick={() => navigate(`/album/${trip.albumId}`)}
                  variant="primary"
                >
                  View More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
