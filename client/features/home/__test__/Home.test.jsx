import React from 'react'
import Home from '../Home'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'

jest.mock('react-router-dom')

let windowSpy

beforeEach(() => {
  jest.clearAllMocks()
  windowSpy = jest.spyOn(window, 'open')
})

afterEach(() => {
  windowSpy.mockRestore()
})

const navigate = jest.fn()
// beforeEach(() => {
//   jest.clearAllMocks()
// })
useNavigate.mockImplementation(() => navigate)

describe('<Home />', () => {
  it('render home text', () => {
    render(<Home />)
    expect(
      screen.getByText(/Lambda Trampers and Lambda Latte Walkers/i)
    ).toBeInTheDocument()
  })

  it('render images', () => {
    render(<Home />)
    expect(screen.getAllByRole('presentation')[0]).toHaveAttribute(
      'src',
      '/img/slide1.jpeg'
    )
  })

  it('click message button and navigate to contact us page', async () => {
    render(<Home />)
    const messageIcon = screen.getByTestId('message-icon')
    await userEvent.click(messageIcon)
    expect(navigate).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/contactus')
  })

  it('click on the facebook icon', async () => {
    windowSpy.mockImplementation(() => ({}))

    render(<Home />)

    const facebookIcon = screen.getByTestId('facebook-icon')

    await userEvent.click(facebookIcon)
    expect(window.open).toHaveBeenCalled()
    expect(window.open).toHaveBeenCalledWith(
      'https://www.facebook.com/groups/lambdatrampers'
    )
  })
})
