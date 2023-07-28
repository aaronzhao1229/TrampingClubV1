import React from 'react'
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
    <>
      <h1>{walkProgramme.title}</h1>
      <object
        data={walkProgramme.fileUrl}
        type="application/pdf"
        width="100%"
        style={{ height: 'calc(100vh - 43px)' }}
        aria-label="This object displays an PDF file"
      />
    </>
  )
}
