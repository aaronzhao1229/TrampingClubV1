// import { createStore, applyMiddleware, compose } from 'redux'
// import reducers from './reducers'
// import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'

import { albumSlice } from './features/admin/albumSlice'
import { photosSlice } from './features/admin/photosSlice'
import { videoSlice } from './features/videos/videoSlice'
import { programmesSlice } from './features/programmes/programmeSlice'
import { authSlice } from './features/auth/authSlice'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

const store = configureStore({
  reducer: {
    album: albumSlice.reducer,
    photos: photosSlice.reducer,
    programmes: programmesSlice.reducer,
    auth: authSlice.reducer,
    videos: videoSlice.reducer,
  },
  devTools: false,
})

export default store
