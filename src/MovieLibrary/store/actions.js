import {LOAD_MOVIES} from '../../actionTypes'
import topRatedMovies from '../mocks/topTatedMovies'

export function fetchTopRatedMovies() {
  return {
    type: LOAD_MOVIES,
    payload: topRatedMovies
  }
}
