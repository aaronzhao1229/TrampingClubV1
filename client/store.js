// import { createStore, applyMiddleware, compose } from 'redux'
// import reducers from './reducers'
// import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { fruitSlice } from './slice/fruitSlice'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

const store = configureStore({
  reducer: {
    fruits: fruitSlice.reducer,
  },
})

export default store
