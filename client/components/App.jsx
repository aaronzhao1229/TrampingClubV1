import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFruitsAsync } from '../slice/fruitSlice'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

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
      </div>
    </>
  )
}

export default App
