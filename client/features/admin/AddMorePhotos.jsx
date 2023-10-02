import React from 'react'
import { useForm } from 'react-hook-form'
import { Container, Spinner, Form, Button } from 'react-bootstrap'
// import { createAlbum } from '../../app/apis/albumApi'
import { useDispatch } from 'react-redux'

import { useNavigate, useParams } from 'react-router-dom'

import agentPrivate from '../../app/apis/agentPrivate'
import { setPhotos } from './photosSlice'

const initState = {
  photos: [],
}

export default function AddMorePhotos() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const albumId = params.albumId
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
    // console.log(isSubmitting)
    // setTimeout(() => console.log(values), 3000)
    // console.log(isSubmitting)

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve()
    //   }, 2000)
    // })

    const formData = new FormData()

    for (let i = 0; i < values.photos.length; i++) {
      formData.append('image', values.photos.item(i))
    }
    return (
      agentPrivate.album
        .addMorePhotos(albumId, formData)
        // createAlbum(formData)
        .then(() => {
          dispatch(setPhotos())
          navigate(`/manageAlbum/${albumId}`)
        })
        .catch((err) => console.error(err.message))
    )
  }

  return (
    <Container className="my-4" style={{ marginTop: 50 }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Upload Photos</Form.Label>
          <Form.Control
            type="file"
            accept="image/*, .heic"
            multiple
            {...register('photos', {
              required: 'Photo(s) is required',
            })}
          />
          {errors.photos && (
            <Form.Text className="text-danger">
              {errors.photos.message}
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
