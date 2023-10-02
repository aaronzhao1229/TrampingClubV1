import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function TrampProgramme() {
  const programmes = useSelector((state) => state.programmes)
  let trampProgramme = {
    title: '',
    fileUrl: '',
  }
  if (programmes.programmes.length !== 0) {
    trampProgramme = programmes.programmes.find(
      (p) => p.programmeCategory === 'tramp'
    )
  }

  return (
    <Container style={{ marginTop: 50 }}>
      <p className="text-justify">
        <b>
          It is imperative that you contact the leader if you have not tramped
          with us before, or to discuss whether your capability is suited for a
          particular tramp – please do not participate in tramps beyond your
          ability as that can create risk for yourself and the group.
        </b>
      </p>
      <p className="text-justify">
        Bring lunch, plenty of water, appropriate clothing (woollen or
        polypropylene), gloves, hats and sunscreen. Strong footwear and a
        waterproof jacket are essential, also bring any personal medical items.
        It is a condition of tramping with us that you are properly equipped,
        because if you are inadequately prepared you put everyone, not just
        yourself, at risk.
      </p>
      <p className="text-justify">
        If you have any cold or flu-like symptoms, please do not attend.
      </p>
      <h4 className="text-justify">{trampProgramme.title}</h4>
      <object
        data={trampProgramme.fileUrl}
        type="application/pdf"
        width="100%"
        style={{ height: 'calc(100vh - 43px)', marginTop: 30 }}
        aria-label="This object displays an PDF file"
        data-testid="tramp-pdf"
      />
    </Container>
  )
}
