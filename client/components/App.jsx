import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFruitsAsync } from '../slice/fruitSlice'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
// import Container from 'react-bootstrap/Container'
// import { Outlet } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import About from './About'
import Home from './Home'

function App() {
  const fruits = useSelector((state) => state.fruits)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFruitsAsync())
  }, [])

  return (
    <>
      <div className="app">
        <h1>Fullstack Boilerplate - with Fruits!</h1>
        <ListGroup as="ol" numbered>
          {fruits.fruits.map((fruit) => (
            <ListGroup.Item as="li" key={fruit}>
              {fruit}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Button variant="primary">Primary</Button>

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
