import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function WalkProgramme() {
  const programmes = useSelector((state) => state.programmes)
  let walkProgramme = {
    title: '',
    fileUrl: '',
  }
  if (programmes.programmes.length !== 0) {
    walkProgramme = programmes.programmes.find(
      (p) => p.programmeCategory === 'walk'
    )
  }

  return (
    <Container style={{ marginTop: 50 }}>
      <h4 className="text-justify">{walkProgramme.title}</h4>
      <object
        data={walkProgramme.fileUrl}
        type="application/pdf"
        width="100%"
        style={{ height: 'calc(100vh - 43px)', marginTop: 30 }}
        aria-label="This object displays an PDF file"
        data-testid="walk-pdf"
      />
    </Container>
  )
}
