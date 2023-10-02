import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbumAsync } from '../admin/albumSlice'
import { Card, Row, Col, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { convertDateToString } from '../../app/utils/utils'
import LoadingComponent from '../../app/components/LoadingComponent'

export default function Album() {
  const album = useSelector((state) => state.album)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (!album.albumLoaded) dispatch(fetchAlbumAsync())
  }, [album.albumLoaded, dispatch])

  if (album.album.length === 0) return <h6>No Album created.</h6>

  if (!album.albumLoaded) return <LoadingComponent />

  return (
    <Container fluid style={{ marginTop: 50 }}>
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
                <Card.Text>{convertDateToString(trip.tripDate)}</Card.Text>
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
