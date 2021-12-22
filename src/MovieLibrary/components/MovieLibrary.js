import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {eraseMovieModal, fetchTopRatedMovies} from '../store/actions'
import logo from './logo.svg'
import './MovieLibrary.css'
import { getMovies, getMovieModal } from '../store/selectors'
import MoviesList from './MoviesList'
import ModalMovie from './ModalMovie'

export default function MovieLibrary() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTopRatedMovies())
  }, [])
  const movieModal = useSelector(getMovieModal);
  const movies = useSelector(getMovies)

  const handleCloseModal = () =>{
    dispatch(eraseMovieModal())
  }

  return(
    <div className="MovieLibrary">
      <header className="ML-header">
        <img src={logo} className="ML-logo" alt="logo" />
        <h1 className="ML-title">Movies</h1>
      </header>
      <div className="ML-intro">
        { movies.length && <MoviesList movies={movies}/> }
      </div>
      {movieModal.title && <ModalMovie movie={movieModal}/>}
    </div>)
}
