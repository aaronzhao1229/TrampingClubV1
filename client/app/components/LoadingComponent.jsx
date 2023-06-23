import React from 'react'
import { Spinner, Modal } from 'react-bootstrap'

export default function LoadingComponent({ message = 'Loadin...' }) {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{message}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Spinner
            as="span"
            animation="border"
            size="lg"
            role="status"
            aria-hidden="true"
          />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  )
}
