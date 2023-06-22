// import { createStore, applyMiddleware, compose } from 'redux'
// import reducers from './reducers'
// import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { fruitSlice } from './slice/fruitSlice'
import { albumSlice } from './slice/albumSlice'
import { photosSlice } from './slice/photosSlice'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

const store = configureStore({
  reducer: {
    fruits: fruitSlice.reducer,
    album: albumSlice.reducer,
    photos: photosSlice.reducer,
  },
})

export default store
