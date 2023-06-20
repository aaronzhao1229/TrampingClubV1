import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export default function ContactUs() {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    setForm({ ...form, [field]: value })
    // Check and see if errors exist, and remove them from the error object:
    if (!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      })
  }

  function findFormErrors() {
    const { name, email } = form
    const newErrors = {}
    // name errors
    if (!name || name === '') newErrors.name = 'Name is required'
    // food errors
    if (!email || email === '') newErrors.email = 'Email is required'
    // rating errors
    return newErrors
  }

  function handleSubmit(event) {
    event.preventDefault()
    // get our new errors
    const newErrors = findFormErrors()
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors)
    } else {
      // No errors! Put any logic here for the form submission!
      alert('Thank you for your feedback!')
    }
  }

  return (
    <Container>
      <h3>Contact us</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Your name (required)</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => handleChange('name', e.target.value)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address (required)</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="name@example.com"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => handleChange('message', e.target.value)}
          />
        </Form.Group>
        <Button type="submit" style={{ marginTop: '2rem' }}>
          Submit Form
        </Button>
      </Form>
    </Container>
  )
}
