import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import moviesReducer from './MovieLibrary/store/reducers/moviesReducer'
import MovieLibrary from './MovieLibrary/components/MovieLibrary'

const store = configureStore({
  reducer: {
    movies: moviesReducer
  }
})

export default function App() {
  return (
    <Provider store={store}>
      <MovieLibrary />
    </Provider>)
}
