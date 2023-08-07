import React from 'react'
import CreateProgramme from '../CreateProgramme'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { useDispatch } from 'react-redux'
// import { setProgrammes } from '../programmeSlice'
import { useNavigate } from 'react-router-dom'
import agentPrivate from '../../../app/apis/agentPrivate'
import { toast } from 'react-toastify'

jest.mock('react-redux')
jest.mock('react-router-dom')
jest.mock('../../../app/apis/agentPrivate')
jest.spyOn(toast, 'success')
jest.spyOn(toast, 'error')

const navigate = jest.fn()
const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

useNavigate.mockImplementation(() => navigate)
useDispatch.mockReturnValue(fakeDispatch)

const file = new File(['random'], 'values.pdf', {
  type: 'application/pdf',
})

describe('<CreateProgramme />', () => {
  it('render form title', () => {
    render(<CreateProgramme />)
    expect(screen.getByText(/title/i)).toBeInTheDocument()
  })

  it('Button is clickable', async () => {
    render(<CreateProgramme />)
    await userEvent.type(screen.getByLabelText(/title/i), 'Peak Hill')
    await userEvent.selectOptions(screen.getByLabelText(/category/i), 'Tramp')
    await userEvent.upload(screen.getByTestId('uploadFile'), file)

    expect(screen.getByTestId('uploadFile').files).toHaveLength(1)
    expect(screen.getByRole('button').disabled).toBeFalsy()
  })

  it('Click the submit button and create programme successfully', async () => {
    render(<CreateProgramme />)
    agentPrivate.programmes.uploadProgramme.mockImplementation(() =>
      Promise.resolve()
    )
    toast.success.mockImplementation(() => {})
    await userEvent.type(screen.getByLabelText(/title/i), 'Peak Hill')
    await userEvent.selectOptions(screen.getByLabelText(/category/i), 'Tramp')
    await userEvent.upload(screen.getByTestId('uploadFile'), file)
    await userEvent.click(screen.getByRole('button'))

    expect(fakeDispatch).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalled()
    expect(toast.success).toHaveBeenCalled()
  })

  it('Click the submit button and failure', async () => {
    render(<CreateProgramme />)
    agentPrivate.programmes.uploadProgramme.mockImplementation(() =>
      Promise.reject()
    )
    toast.error.mockImplementation(() => {})
    await userEvent.type(screen.getByLabelText(/title/i), 'Peak Hill')
    await userEvent.selectOptions(screen.getByLabelText(/category/i), 'Tramp')
    await userEvent.upload(screen.getByTestId('uploadFile'), file)
    await userEvent.click(screen.getByRole('button'))

    expect(toast.error).toHaveBeenCalled()
    expect(toast.error).toHaveBeenCalledWith(
      'Something wrong with the server. Please try later.'
    )
  })
})
