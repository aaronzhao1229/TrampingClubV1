import React from 'react'
import ForgetPassword from '../ForgetPassword'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import agent from '../../../app/apis/agent'
import ErrorTest from '../../../app/model/errorTest'

jest.mock('react-router-dom')
jest.mock('../../../app/apis/agent')
jest.spyOn(toast, 'error')
jest.spyOn(toast, 'success')

const mockNavigate = jest.fn()

useNavigate.mockReturnValue(mockNavigate)

beforeEach(() => {
  jest.clearAllMocks()
})

describe('<Login />', () => {
  it('render the form', () => {
    render(<ForgetPassword />)
    expect(screen.getAllByRole('textbox')).toHaveLength(1)
  })

  it('button is clickable', async () => {
    render(<ForgetPassword />)
    await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
    expect(screen.getByRole('button').disabled).toBeFalsy()
  })

  it('email validation error shown', async () => {
    render(<ForgetPassword />)
    await userEvent.type(screen.getByLabelText(/email/i), 'test')
    expect(screen.getByText(/Not a valid email address/i)).toBeInTheDocument()
    expect(screen.getByRole('button').disabled).toBeTruthy()
  })

  it('click the button and email sent', async () => {
    agent.auth.forgetPassword.mockImplementation(() => Promise.resolve())
    render(<ForgetPassword />)
    await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
    await userEvent.click(screen.getByRole('button'))
    expect(mockNavigate).toHaveBeenCalled()
    expect(toast.success).toHaveBeenCalledWith(
      'We have sent you an email to reset your password'
    )
  })

  it('click the button and error occurs', async () => {
    agent.auth.forgetPassword.mockImplementation(() =>
      Promise.reject(new ErrorTest({ status: 404 }))
    )
    render(<ForgetPassword />)
    await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
    await userEvent.click(screen.getByRole('button'))

    expect(toast.error).toHaveBeenCalledWith('Invalid email address')
  })
})
