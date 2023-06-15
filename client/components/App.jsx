import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFruitsAsync } from '../slice/fruitSlice'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import { Outlet, Link } from 'react-router-dom'
import NavigationBar from './NavigationBar'

function App() {
  const fruits = useSelector((state) => state.fruits)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFruitsAsync())
  }, [])

  return (
    <>
      <div className="app">
        <NavigationBar />
        <h1>Fullstack Boilerplate - with Fruits!</h1>
        <ListGroup as="ol" numbered>
          {fruits.fruits.map((fruit) => (
            <ListGroup.Item as="li" key={fruit}>
              {fruit}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Link to="/about">
          <Button>about</Button>
        </Link>

        <Container>
          <Outlet />
        </Container>
      </div>
    </>
  )
}

export default App
