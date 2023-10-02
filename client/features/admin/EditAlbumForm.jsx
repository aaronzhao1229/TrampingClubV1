import Form from 'react-bootstrap/Form'
import React, { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editAlbumAsync } from './albumSlice'
import { convertDateForDatePicker } from '../../app/utils/utils'

export default function EditAlbumForm({ targetAlbum }) {
  const navigate = useNavigate()
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const initState = {
    email: '',
    name: '',
    message: '',
  }
  const dispatch = useDispatch()
  const {
    reset,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: initState,
  })

  function handleApiErrors(errors) {
    if (errors) {
      errors.forEach((error) => {
        if (error.includes('albumName')) {
          setError('albumName', { message: error })
        } else if (error.includes('tripDate')) {
          setError('tripDate', { message: error })
        }
      })
    }
  }

  useEffect(() => {
    if (targetAlbum && !isDirty) {
      // const date = targetAlbum.tripDate.split('T')[0]
      const albumInfo = {
        albumName: targetAlbum.albumName,
        tripDate: convertDateForDatePicker(targetAlbum.tripDate),
      }
      reset(albumInfo)
    }
  }, [targetAlbum, reset, isDirty])

  const onSubmit = (values) => {
    const editedAlbum = {
      albumId: targetAlbum.albumId,
      tripName: values.albumName,
      tripDate: values.tripDate,
    }

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve()
    //   }, 2000)
    // })

    return dispatch(editAlbumAsync(editedAlbum))
      .then(() => {
        toast.success('Album info has been saved.')
        setHasSubmitted(true)
      })
      .catch((error) => handleApiErrors(error))
  }

  return (
    <Container className="my-4" style={{ marginTop: 50 }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Trip Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="trip name"
            {...register('albumName', { required: 'Trip name is required' })}
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
            {...register('tripDate', {
              required: 'Date is required',
            })}
          />
          {errors.date && (
            <Form.Text className="text-danger">{errors.date.message}</Form.Text>
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
        variant="dark"
        onClick={() => navigate(`/addmorephotos/${targetAlbum.albumId}`)}
        style={{ marginTop: 10 }}
      >
        Add more photos
      </Button>
    </Container>
  )
}
