import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFruitsAsync } from '../slice/fruitSlice'
import ListGroup from 'react-bootstrap/ListGroup'

export default function Fruits() {
  const fruits = useSelector((state) => state.fruits)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFruitsAsync())
  }, [])
  return (
    <ListGroup as="ol" numbered>
      {fruits.fruits.map((fruit) => (
        <ListGroup.Item as="li" key={fruit}>
          {fruit}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
