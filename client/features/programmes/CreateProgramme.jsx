import React from 'react'
import { useForm } from 'react-hook-form'
import { Container, Spinner, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setProgrammes } from './programmeSlice'
import { useNavigate } from 'react-router-dom'
import agentPrivate from '../../app/apis/agentPrivate'
import { toast } from 'react-toastify'

const initState = {
  tripName: '',
  date: '',
  photos: [],
}

export default function CreateProgramme() {
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

  function handleError(error) {
    console.log(error)
    toast.error('Something wrong with the server. Please try later.')
  }

  const onSubmit = (values) => {
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('category', values.category)
    formData.append('file', values.file.item(0))

    return agentPrivate.programmes
      .uploadProgramme(formData)
      .then(() => {
        dispatch(setProgrammes())
        toast.success('Programme has been updated.')
        navigate('/')
      })
      .catch((err) => handleError(err))
  }

  return (
    <Container className="my-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Programme title (eg. Tramp programme from 04/09/2023 to 03/03/2023"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && (
            <Form.Text className="text-danger">
              {errors.title.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="Default select example"
            {...register('category', {
              required: 'Category is required',
            })}
          >
            <option value="tramp">Tramp</option>
            <option value="walk">Walk</option>
          </Form.Select>

          {errors.category && (
            <Form.Text className="text-danger">
              {errors.category.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Upload Programme</Form.Label>
          <Form.Control
            data-testid="uploadFile"
            type="file"
            accept="application/pdf,application/vnd.ms-excel"
            {...register('file', {
              required: 'File is required',
            })}
          />
          {errors.file && (
            <Form.Text className="text-danger">{errors.file.message}</Form.Text>
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
