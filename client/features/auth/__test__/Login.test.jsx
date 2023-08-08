import React from 'react'
import Login from '../Login'
import ForgetPassword from '../ForgetPassword'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { toast } from 'react-toastify'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

// import * as router from 'react-router-dom'
import { useDispatch } from 'react-redux'

import agent from '../../../app/apis/agent'
import ErrorTest from '../../../app/model/errorTest'

const mockNavigate = jest.fn()
const mockLocation = jest.fn()

jest.mock('react-redux')
jest.mock('../../../app/apis/agent')
jest.spyOn(toast, 'error')

jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom')
  return {
    ...original,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
  }
})

beforeEach(() => {
  jest.clearAllMocks()
})

const fakeDispatch = jest.fn()
useDispatch.mockReturnValue(fakeDispatch)
// useNavigate.mockImplementation(() => navigate)

// useLocation.mockReturnValue(fakeLocation)

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
    expect(mockNavigate).toHaveBeenCalled()
    expect(fakeDispatch).toHaveBeenCalled()
  })

  it('Click the submit button and failure', async () => {
    render(<Login />)
    agent.auth.login.mockImplementation(() =>
      Promise.reject(new ErrorTest({ status: 401 }))
    )

    await userEvent.type(screen.getByLabelText(/username/i), 'test')
    await userEvent.type(screen.getByLabelText(/password/i), 'test')

    await userEvent.click(screen.getByRole('button'))
    expect(toast.error).toHaveBeenCalledWith('Unauthorized')
  })

  // it('Click the forget password link', async () => {
  //   render(
  //     <MemoryRouter initialEntries={['/']}>
  //       <Routes>
  //         <Route path="/" element={<Login />} />
  //         <Route path="/forgetPassword" element={<ForgetPassword />} />
  //       </Routes>
  //     </MemoryRouter>
  //   )

  //   const link = screen.getByText(/forget/i)
  //   await userEvent.click(link)
  //   expect(screen.getByText(/Enter the email address/i)).toBeInTheDocument()
  // })
})
