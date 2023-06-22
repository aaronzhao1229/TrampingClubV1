import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotosAsync, removePhotoAsync } from '../slice/photosSlice'
import { useParams } from 'react-router-dom'
import { Container, Image, Button, Spinner } from 'react-bootstrap'

export default function SingleAlbum() {
  const params = useParams()
  const albumId = params.albumId
  const photos = useSelector((state) => state.photos)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPhotosAsync(albumId))
  }, [dispatch])

  function deletePhoto(photoId) {
    dispatch(removePhotoAsync(photoId))
  }

  console.log(photos)
  return (
    <Container fluid>
      {photos.photos.map((photo, i) => (
        <div key={i} className="photoFrame">
          <Image
            className="photos"
            src={photo.url}
            onClick={() => window.open(photo.url)}
          />
          <Button onClick={() => deletePhoto(photo.photoId)}>
            {photos.status === 'pendingRemovePhoto' + photo.photoId ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              'Delete the photo'
            )}
          </Button>
        </div>
      ))}
    </Container>
  )
}
