import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotosAsync, removePhotoAsync } from './photosSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Image, Button, Spinner, Row, Col } from 'react-bootstrap'
import EditAlbumForm from './EditAlbumForm'

export default function ManageSingleAlbum() {
  const params = useParams()
  const navigate = useNavigate()

  const albumId = params.albumId
  const photos = useSelector((state) => state.photos)
  const album = useSelector((state) => state.album)

  const targetAlbum = album.album.find((e) => e.albumId === Number(albumId))

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPhotosAsync(albumId))
  }, [dispatch])

  function deletePhoto(photoId) {
    dispatch(removePhotoAsync(photoId))
  }

  return (
    <Container fluid style={{ marginTop: 50 }}>
      <EditAlbumForm targetAlbum={targetAlbum} />
      <Row xs={1} md={4} className="g-4">
        {photos.photos.map((photo, i) => (
          <Col key={i}>
            <Image
              className="photos"
              src={photo.url}
              onClick={() => window.open(photo.url)}
              style={{ marginBottom: 2 }}
            />
            <Button variant="danger" onClick={() => deletePhoto(photo.photoId)}>
              {photos.status === 'pendingRemovePhoto' + photo.photoId ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                'Delete photo'
              )}
            </Button>
          </Col>
        ))}
      </Row>
      <Button
        variant="secondary"
        onClick={() => navigate('/admin')}
        style={{ marginTop: 10 }}
      >
        Back to admin menu
      </Button>
    </Container>
  )
}
