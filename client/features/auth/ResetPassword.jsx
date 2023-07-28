import Form from 'react-bootstrap/Form'
import React from 'react'
import { Card, Container, Spinner, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'

import agent from '../../app/apis/agent'

export default function ResetPassword() {
  const navigate = useNavigate()
  let [searchParams] = useSearchParams()

  const email = searchParams.get('email')

  const token = searchParams.get('token')
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
        token: token,
        password: values.password,
        email: email,
      }
      await agent.auth.resetPassword(userInfo)
      toast.success('You have reset your password, please log in.')
      navigate('/login')
    } catch (error) {
      if (!error.response) {
        toast.error('No server response')
      } else if (error.response.status === 489) {
        toast.error('Token expired')
      } else if (error.response.status === 404) {
        toast.error('Invalid email or token')
      } else {
        toast.error('Reset Failed')
      }
    }
  }
  return (
    <Container fluid style={{ marginTop: 10 }}>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header as="h4" className="text-center">
              Reset Password
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
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
