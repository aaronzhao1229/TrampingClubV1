import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotosAsync } from '../slice/photosSlice'
import { useParams } from 'react-router-dom'
import { Container, Image } from 'react-bootstrap'

export default function SingleAlbum() {
  const params = useParams()
  const albumId = params.albumId
  const photos = useSelector((state) => state.photos)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPhotosAsync(albumId))
  }, [])

  return (
    <Container fluid>
      {photos.photos.map((url, i) => (
        <Image key={i} src={url} onClick={() => window.open(url)} />
      ))}
    </Container>
  )
}
