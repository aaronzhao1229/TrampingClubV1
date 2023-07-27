import Form from 'react-bootstrap/Form'
import React from 'react'
import { Card, Container, Spinner, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'

import agent from '../../app/apis/agent'

export default function Register() {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    register,
    handleSubmit,

    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
  })

  async function onSubmit(values) {
    try {
      const userInfo = {
        username: values.username,
        password: values.password,
        email: values.email,
      }
      await agent.auth.register(userInfo)
      toast.success('You have registered successfully, please log in.')
      navigate('/login')
    } catch (error) {
      if (!error.response) {
        toast.error('No server response')
      } else if (error.response.status === 400) {
        toast.error('Missing information')
      } else if (error.response.status === 401) {
        toast.error('Unauthorized')
      } else {
        toast.error('Register Failed')
      }
    }
  }
  return (
    <Container fluid style={{ marginTop: 10 }}>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header as="h4" className="text-center">
              Register
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    {...register('username', {
                      required: 'Username is required',
                    })}
                  />
                  {errors.username && (
                    <Form.Text className="text-danger">
                      {errors.username.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
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

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register('password', {
                      required: 'Password is required',
                      pattern: {
                        value:
                          /(?=^.{6,12}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,

                        message:
                          'The password must contain 6 - 12 characters with at least one uppercase letter, at least one lowercase letter, at least a number and at least one special characters',
                      },
                    })}
                  />
                  {errors.password && (
                    <Form.Text className="text-danger">
                      {errors.password.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        'two passwords do not match',
                    })}
                  />
                  {errors.confirmPassword && (
                    <Form.Text className="text-danger">
                      {errors.confirmPassword.message}
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
