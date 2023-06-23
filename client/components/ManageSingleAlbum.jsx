import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotosAsync, removePhotoAsync } from '../slice/photosSlice'
import { useParams } from 'react-router-dom'
import { Container, Image, Button, Spinner } from 'react-bootstrap'
import EditAlbumForm from './EditAlbumForm'

export default function ManageSingleAlbum() {
  const params = useParams()

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
    <Container fluid>
      <EditAlbumForm targetAlbum={targetAlbum} />
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
