import Form from 'react-bootstrap/Form'
import React from 'react'
import { Card, Container, Spinner, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import agent from '../../app/apis/agent'

export default function ForgetPassword() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,

    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
  })

  async function onSubmit(values) {
    try {
      await agent.auth.forgetPassword(values)
      toast.success('We have sent you an email to reset your password')
      navigate('/')
    } catch (error) {
      if (!error.response) {
        toast.error('No server response')
      } else if (error.response.status === 400) {
        toast.error('Invalid email address')
      } else if (error.response.status === 401) {
        toast.error('Unauthorized')
      } else {
        toast.error('Login Failed')
      }
    }
  }
  return (
    <Container fluid style={{ marginTop: 10 }}>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header as="h5" className="text-center">
              Enter the email address you registered
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="email">
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
