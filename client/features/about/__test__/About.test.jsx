import React from 'react'
import About from '../About'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('<About />', () => {
  it('paragraph has been rendered', () => {
    render(<About />)
    expect(screen.getByText(/origin story/i)).toBeInTheDocument()
  })
})
