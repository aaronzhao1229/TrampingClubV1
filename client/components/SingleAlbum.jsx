import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotosAsync, removePhoto } from '../slice/photosSlice'
import { useParams } from 'react-router-dom'
import { Container, Image, Button, Spinner } from 'react-bootstrap'
import { deletePhotoByPhotoId } from '../apis/albumApi'

export default function SingleAlbum() {
  const params = useParams()
  const albumId = params.albumId
  const photos = useSelector((state) => state.photos)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPhotosAsync(albumId))
  }, [dispatch])

  function deletePhoto(photoId) {
    setLoading(true)
    deletePhotoByPhotoId(photoId)
      .then(() => dispatch(removePhoto(photoId)))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

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
            {loading ? (
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
