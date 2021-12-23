import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import moviesReducer from './MovieLibrary/store/reducers/moviesReducer'
import movieModalReducer from './MovieLibrary/store/reducers/movieModalReducer'
import MovieLibrary from './MovieLibrary/components/MovieLibrary'
import './App.css'

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieModal: movieModalReducer
  }
})


export default function App() {
  return (
    <Provider store={store}>
      <MovieLibrary />
    </Provider>)
}
