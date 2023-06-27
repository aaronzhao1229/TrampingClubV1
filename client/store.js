// import { createStore, applyMiddleware, compose } from 'redux'
// import reducers from './reducers'
// import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'

import { albumSlice } from './features/admin/albumSlice'
import { photosSlice } from './features/admin/photosSlice'
import { programmesSlice } from './features/programmes/programmeSlice'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

const store = configureStore({
  reducer: {
    album: albumSlice.reducer,
    photos: photosSlice.reducer,
    programmes: programmesSlice.reducer,
  },
})

export default store
