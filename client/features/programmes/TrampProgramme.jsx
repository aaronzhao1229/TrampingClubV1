import React from 'react'
import { useSelector } from 'react-redux'

export default function TrampProgramme() {
  const programmes = useSelector((state) => state.programmes)
  let trampProgramme = {
    fileUrl: '',
  }
  if (programmes.programmes.length !== 0) {
    trampProgramme = programmes.programmes.find(
      (p) => p.programmeCategory === 'tramp'
    )
  }

  return (
    <>
      <h1>Tramp Programme</h1>
      <object
        data={trampProgramme.fileUrl}
        type="application/pdf"
        width="100%"
        style={{ height: 'calc(100vh - 43px)' }}
        aria-label="This object displays an PDF file"
      />
    </>
  )
}
