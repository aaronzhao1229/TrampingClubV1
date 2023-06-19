import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

export default function ContactUs() {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

    function handleChange(event) {
      setForm({ ...form, [event.target.name]: event.target.value })
    }
  

  return (
    <Container as="paper">
      <h3>Contact us</h3>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Your name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button type="submit" style={{ marginTop: '2rem' }}>
          Submit Form
        </Button>
      </Form>
    </Container>
  )
}
