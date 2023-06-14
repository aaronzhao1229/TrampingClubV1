import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFruitsAsync } from '../slice/fruitSlice'

function App() {
  const fruits = useSelector((state) => state.fruits)
  console.log(fruits)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFruitsAsync())
  }, [])

  return (
    <>
      <div className="app">
        <h1>Fullstack Boilerplate - with Fruits!</h1>
        <ul>
          {fruits.fruits.map((fruit) => (
            <li key={fruit}>{fruit}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
