import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Register from '../Register'
import agent from '../../../app/apis/agent'
import { useNavigate } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import ErrorTest from '../../../app/model/errorTest'
import { toast } from 'react-toastify'

jest.mock('react-router-dom')
jest.mock('../../../app/apis/agent')
jest.spyOn(toast, 'error')

const mockNavigate = jest.fn()
useNavigate.mockReturnValue(mockNavigate)

beforeEach(() => {
  jest.clearAllMocks()
})

describe('<Register />', () => {
  it('render the form', () => {
    render(<Register />)
    expect(screen.getAllByRole('textbox')).toHaveLength(4)
  })

  it('Button is clickable', async () => {
    render(<Register />)
    await userEvent.type(screen.getByLabelText(/username/i), 'test')
    await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
    await userEvent.type(screen.getAllByLabelText(/password/i)[0], 'Pa$$w0rd')
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'Pa$$w0rd')

    expect(screen.getByRole('button').disabled).toBeFalsy()
  })

  it('password validation error shown and button is not clickable', async () => {
    render(<Register />)
    await userEvent.type(screen.getByLabelText(/username/i), 'test')
    await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
    await userEvent.type(screen.getAllByLabelText(/password/i)[0], 'test')
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'test')
    expect(screen.getByText(/password must contain/i)).toBeInTheDocument()
    expect(screen.getByRole('button').disabled).toBeTruthy()
  })

  it('click the button and register', async () => {
    agent.auth.register.mockImplementation(() => Promise.resolve())
    render(<Register />)

    await userEvent.type(screen.getByLabelText(/username/i), 'test')
    await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
    await userEvent.type(screen.getAllByLabelText(/password/i)[0], 'Pa$$w0rd')
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'Pa$$w0rd')
    await userEvent.click(screen.getByRole('button'))
    expect(mockNavigate).toHaveBeenCalled()
  })

  it('Click the submit button and failure', async () => {
    render(<Register />)
    agent.auth.register.mockImplementation(() =>
      Promise.reject(new ErrorTest({ status: 401 }))
    )
    await userEvent.type(screen.getByLabelText(/username/i), 'test')
    await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
    await userEvent.type(screen.getAllByLabelText(/password/i)[0], 'Pa$$w0rd')
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'Pa$$w0rd')
    await userEvent.click(screen.getByRole('button'))
    expect(toast.error).toHaveBeenCalledWith('Unauthorized')
  })
})
