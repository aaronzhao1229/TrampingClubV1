import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Spinner, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { editVideoAsync } from './videoSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const initState = {
  videoTitle: '',
  videoUrl: '',
}

export default function EditVideo() {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const params = useParams()
  const videoId = params.videoId
  const videos = useSelector((state) => state.videos)

  const targetVideo = videos.videos.find((e) => e.videoId === Number(videoId))

  const {
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: initState,
  })

  function handleApiErrors(errors) {
    if (errors) {
      errors.forEach((error) => {
        if (error.includes('videoTitle')) {
          setError('videoTitle', { message: error })
        } else if (error.includes('tripDate')) {
          setError('videoUrl', { message: error })
        }
      })
    }
  }

  useEffect(() => {
    if (targetVideo && !isDirty) {
      reset(targetVideo)
    }
  }, [targetVideo, reset, isDirty])

  const onSubmit = (values) => {
    const editedVideo = {
      videoId: targetVideo.videoId,
      videoTitle: values.videoTitle,
      videoUrl: values.videoUrl,
    }
    return dispatch(editVideoAsync(editedVideo))
      .then(() => {
        toast.success('Album info has been saved.')
        setHasSubmitted(true)
        navigate('/manageVideos')
      })
      .catch((error) => handleApiErrors(error))
  }

  return (
    <Container className="my-4" style={{ marginTop: 50 }}>
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

        <Button
          variant="primary"
          type="submit"
          disabled={!isDirty || hasSubmitted === true}
        >
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
