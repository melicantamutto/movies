import {FETCH_MOVIES, MOVIE_MODAL, ERASE_MOVIE_MODAL, FILTER_MOVIES} from '../../actionTypes'
import topRatedMovies from '../mocks/topTatedMovies'

export function fetchTopRatedMovies(movies = topRatedMovies) {
  return {
    type: FETCH_MOVIES,
    payload: movies
  }
}

export function setFilteredMovies(movies) {
  return {
    type: FILTER_MOVIES,
    payload: movies
  }
}

export function setMovieModal(movie) {
  return {
    type: MOVIE_MODAL,
    payload: movie,
  }
}

export function eraseMovieModal() {
  return {
    type: ERASE_MOVIE_MODAL,
    payload: {},
  }
}
