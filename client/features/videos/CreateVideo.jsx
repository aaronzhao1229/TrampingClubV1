import React from 'react'
import { useForm } from 'react-hook-form'
import { Container, Spinner, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setVideos } from './videoSlice'
import { useNavigate } from 'react-router-dom'
import agentPrivate from '../../app/apis/agentPrivate'

const initState = {
  videoTitle: '',
  videoUrl: '',
}

export default function CreateVideo() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: initState,
  })

  const onSubmit = (values) => {
    console.log(typeof setVideos)
    return agentPrivate.videos
      .createVideo(values)
      .then(() => {
        dispatch(setVideos())
        navigate('/videos')
      })
      .catch((err) => console.error(err.message))
  }

  return (
    <Container className="my-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="videoTitle">
          <Form.Label>Video Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. Avalanche Peak"
            {...register('videoTitle', { required: 'Video title is required' })}
          />
          {errors.videoTitle && (
            <Form.Text className="text-danger">
              {errors.videoTitle.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="videoUrl">
          <Form.Label>Video Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. https://www.youtube.com/embed/Zg6vtGpwltY?si=fLdeiNYHF2APhOjQ"
            {...register('videoUrl', {
              required: 'Video url is required',
            })}
          />
          <Form.Text id="urlHelpBlock" muted>
            The video url should be the embed url from YouTube. For example:
            https://www.youtube.com/embed/Zg6vtGpwltY?si=fLdeiNYHF2APhOjQ
          </Form.Text>
          {errors.videoUrl && (
            <Form.Text className="text-danger">
              {errors.videoUrl.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!isValid}>
          {isSubmitting ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            'Submit'
          )}
        </Button>
      </Form>
    </Container>
  )
}
