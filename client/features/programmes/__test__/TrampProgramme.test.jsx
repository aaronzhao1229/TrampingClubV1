import React from 'react'
import TrampProgramme from '../TrampProgramme'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSelector } from 'react-redux'

jest.mock('react-redux')

describe('<TrampProgramme />', () => {
  it('render title', () => {
    useSelector.mockReturnValue({
      programmes: [
        {
          programmeCategory: 'tramp',
          title: 'Arthurs Pass',
          fileUrl: 'https://www.google.co.nz',
        },
      ],
    })
    render(<TrampProgramme />)
    expect(screen.getByText(/Arthurs Pass/i)).toBeInTheDocument()
    expect(screen.getByTestId('tramp-pdf')).toHaveAttribute(
      'data',
      'https://www.google.co.nz'
    )
  })
})
