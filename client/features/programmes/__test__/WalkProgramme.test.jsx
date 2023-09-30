import React from 'react'
import WalkProgramme from '../WalkProgramme'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSelector } from 'react-redux'

jest.mock('react-redux')

describe('<TrampProgramme />', () => {
  it('render title', () => {
    useSelector.mockReturnValue({
      programmes: [
        {
          programmeCategory: 'walk',
          title: 'Hooker Valley Track',
          fileUrl: 'https://www.google.co.nz',
        },
      ],
    })
    render(<WalkProgramme />)
    expect(screen.getByText(/Hooker valley/i)).toBeInTheDocument()
    expect(screen.getByTestId('walk-pdf')).toHaveAttribute(
      'data',
      'https://www.google.co.nz'
    )
  })
})
