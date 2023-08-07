import React from 'react'
import ContactUs from '../ContactUs'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import agent from '../../../app/apis/agent'

jest.mock('react-router-dom')
jest.mock('../../../app/apis/agent')
jest.spyOn(toast, 'success')
jest.spyOn(toast, 'error')

const navigate = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

useNavigate.mockImplementation(() => navigate)

describe('<ContactUs />', () => {
  it('render the form', () => {
    render(<ContactUs />)
    expect(screen.getByText(/message/i)).toBeInTheDocument()
  })

  it('Button is clickable', async () => {
    render(<ContactUs />)
    await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
    await userEvent.type(screen.getByLabelText(/name/i), 'Tramp')
    await userEvent.type(screen.getByLabelText(/message/i), 'Tramp')
    expect(screen.getByRole('button').disabled).toBeFalsy()
  })

  it('Email validation message shown and button is not clickable', async () => {
    render(<ContactUs />)
    await userEvent.type(screen.getByLabelText(/email/i), 'test')
    await userEvent.type(screen.getByLabelText(/name/i), 'Tramp')
    await userEvent.type(screen.getByLabelText(/message/i), 'Tramp')
    expect(screen.getByText(/Not a valid email address/i)).toBeInTheDocument()
    expect(screen.getByRole('button').disabled).toBeTruthy()
  })

  it('click the button and message has been sent', async () => {
    render(<ContactUs />)
    agent.contact.contactUs.mockImplementation(() => Promise.resolve())
    await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
    await userEvent.type(screen.getByLabelText(/name/i), 'Tramp')
    await userEvent.type(screen.getByLabelText(/message/i), 'Tramp')
    await userEvent.click(screen.getByRole('button'))
    expect(navigate).toHaveBeenCalled()
    expect(toast.success).toHaveBeenCalledWith(
      'We have received your message and will contact you as soon as we can'
    )
  })

  it('Click the submit button and failure', async () => {
    render(<ContactUs />)
    agent.contact.contactUs.mockImplementation(() => Promise.reject())
    toast.error.mockImplementation(() => {})
    await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
    await userEvent.type(screen.getByLabelText(/name/i), 'Tramp')
    await userEvent.type(screen.getByLabelText(/message/i), 'Tramp')
    await userEvent.click(screen.getByRole('button'))

    expect(toast.error).toHaveBeenCalledWith(
      'Something wrong with the server. Please try later.'
    )
  })
})
