import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function LoadingComponent({ message = 'Loading...' }) {
  return (
    <div className="text-center" style={{ marginTop: 200, marginBottom: 200 }}>
      <Spinner animation="border" role="status">
        <span className="sr-only">{message}</span>
      </Spinner>
      <h4>{message}</h4>
    </div>
  )
}
