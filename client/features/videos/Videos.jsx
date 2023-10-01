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

  return (
    <Container>
      <Row xs={1} md={2} className="g-4">
        {[...videos.videos].reverse().map((videos, i) => (
          <Col key={i}>
            <h6 className="mb-3">{videos.videoTitle}</h6>

            {/* <video controls width="70%" src={videos.videoUrl}></video> */}
            <div className="ratio ratio-16x9">
              <iframe
                width="560"
                height="315"
                src={videos.videoUrl}
                title={videos.videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
