import React from 'react'
import { Container, ListGroup } from 'react-bootstrap'

export default function Admin() {
  return (
    <Container className="mt-4">
      <ListGroup>
        <ListGroup.Item action href="/createAlbum">
          Create Album
        </ListGroup.Item>
        <ListGroup.Item action href="/manageAlbum">
          Manage Albums
        </ListGroup.Item>
        <ListGroup.Item action href="/updateProgramme">
          Update Programme
        </ListGroup.Item>
        <ListGroup.Item action href="/createVideo">
          Create Video
        </ListGroup.Item>
      </ListGroup>
    </Container>
  )
}
