import React from 'react'
import Login from '../Login'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import agent from '../../../app/apis/agent'

jest.mock('react-router-dom')
jest.mock('react-redux')
jest.mock('../../../app/apis/agent')

jest.spyOn(toast, 'error')
const navigate = jest.fn()
const fakeDispatch = jest.fn()
const fakeLocation = jest.fn()

useNavigate.mockImplementation(() => navigate)
useDispatch.mockReturnValue(fakeDispatch)
useLocation.mockReturnValue(fakeLocation)

describe('<Login />', () => {
  it('render the form', () => {
    render(<Login />)
    expect(screen.getAllByRole('textbox')).toHaveLength(2)
  })

  it('Button is clickable', async () => {
    render(<Login />)
    await userEvent.type(screen.getByLabelText(/username/i), 'test')
    await userEvent.type(screen.getByLabelText(/password/i), 'test')

    expect(screen.getByRole('button').disabled).toBeFalsy()
  })

  it('password is required error shown and button is not clickable', async () => {
    render(<Login />)
    await userEvent.type(screen.getByLabelText(/username/i), 'test')
    await userEvent.type(screen.getByLabelText(/password/i), 'test')
    await userEvent.clear(screen.getByLabelText(/password/i))
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
    expect(screen.getByRole('button').disabled).toBeTruthy()
  })

  it('click the button and login', async () => {
    render(<Login />)
    agent.auth.login.mockImplementation(() => Promise.resolve())
    await userEvent.type(screen.getByLabelText(/username/i), 'test')
    await userEvent.type(screen.getByLabelText(/password/i), 'test')

    await userEvent.click(screen.getByRole('button'))
    expect(navigate).toHaveBeenCalled()
    expect(fakeDispatch).toHaveBeenCalled()
  })

  it('Click the submit button and failure', async () => {
    render(<Login />)
    agent.auth.login.mockImplementation(() =>
      Promise.reject(new Error({ response: 'fail' }))
    )
    await userEvent.type(screen.getByLabelText(/username/i), 'test')
    await userEvent.type(screen.getByLabelText(/password/i), 'test')

    await userEvent.click(screen.getByRole('button'))
    expect(toast.error).toHaveBeenCalledWith('No server response')
  })
})
