import React from 'react'
import { useForm } from 'react-hook-form'
import { Container, Spinner, Form, Button } from 'react-bootstrap'
import { createAlbum } from '../apis/albumApi'
import { useDispatch } from 'react-redux'
import { setAlbum } from '../slice/albumSlice'
import { useNavigate } from 'react-router-dom'

const initState = {
  tripName: '',
  date: '',
  photos: [],
}

export default function CreateAlbum() {
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

  // function handleApiErrors(errors) {
  //   if (errors) {
  //     errors.forEach((error) => {
  //       if (error.includes('Name')) {
  //         setError('name', { message: error })
  //       } else if (error.includes('Email')) {
  //         setError('email', { message: error })
  //       } else if (error.includes('Message')) {
  //         setError('message', { message: error })
  //       }
  //     })
  //   }
  // }

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

    formData.append('albumName', values.tripName)
    formData.append('tripDate', values.date)
    for (let i = 0; i < values.photos.length; i++) {
      formData.append('image', values.photos.item(i))
    }
    return createAlbum(formData)
      .then(() => {
        dispatch(setAlbum())
        navigate('/manageAlbum')
      })
      .catch((err) => console.error(err.message))
  }

  return (
    <Container className="my-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Trip Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="trip name"
            {...register('tripName', { required: 'Trip name is required' })}
          />
          {errors.tripName && (
            <Form.Text className="text-danger">
              {errors.tripName.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Trip date</Form.Label>
          <Form.Control
            type="date"
            {...register('date', {
              required: 'Date is required',
            })}
          />
          {errors.date && (
            <Form.Text className="text-danger">{errors.date.message}</Form.Text>
          )}
        </Form.Group>
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
    </Container>
  )
}
