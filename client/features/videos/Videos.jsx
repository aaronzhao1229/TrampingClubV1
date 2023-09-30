import React, { useEffect } from 'react'

import { fetchVideosAsync } from './videoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

export default function Videos() {
  const dispatch = useDispatch()

  const videos = useSelector((state) => state.videos)

  useEffect(() => {
    dispatch(fetchVideosAsync())
  }, [dispatch])
  console.log(videos)
  return (
    <Container>
      <Row xs={1} md={4} className="g-4">
        {videos.videos.map((videos, i) => (
          <Col key={i}>
            <p>{videos.videoUrl}</p>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
