import Form from 'react-bootstrap/Form'
import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import agent from '../../app/apis/agent'

export default function ContactUs() {
  const navigate = useNavigate()
  const initState = {
    email: '',
    name: '',
    message: '',
  }

  const {
    register,
    handleSubmit,
    // setError,
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
    return agent.contact
      .contactUs(values)
      .then(() => {
        toast.success(
          'We have received your message and will contact you as soon as we can'
        )
        navigate('/')
      })
      .catch((error) => handleError(error))
  }

  return (
    <Container className="my-4" style={{ marginTop: 50 }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Not a valid email address',
              },
            })}
          />
          {errors.email && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && (
            <Form.Text className="text-danger">{errors.name.message}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Message"
            {...register('message', {
              required: 'Message is required',
            })}
          />
          {errors.message && (
            <Form.Text className="text-danger">
              {errors.message.message}
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
