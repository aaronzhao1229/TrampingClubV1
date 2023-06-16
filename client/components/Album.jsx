import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbumAsync } from '../slice/albumSlice'
import ListGroup from 'react-bootstrap/ListGroup'

export default function Album() {
  const album = useSelector((state) => state.album)
  let albumNames = new Set()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAlbumAsync())
  }, [])
  if (album.album.length !== 0) {
    album.album.forEach((element) => {
      if (!albumNames.has(element.albumName)) {
        albumNames.add(element.albumName)
      }
    })
  }
  console.log(albumNames)
  return (
    <ListGroup as="ol" numbered>
      {album.album.map((album) => (
        <ListGroup.Item as="li" key={album.photoId}>
          {album.photoUrl}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
