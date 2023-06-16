import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <p>Home</p>
      <Link to="/about">
        <Button>about</Button>
      </Link>
    </>
  )
}
