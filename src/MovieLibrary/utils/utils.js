import axios from "axios";

export const BASE_URL = 'https://api.themoviedb.org/3/movie/now_playing';
export const API_KEY = process.env.REACT_APP_TMDB_API_KEY
export const POSTER_URL =' https://image.tmdb.org/t/p/w500/'
export const BACKDROP_URL = 'https://image.tmdb.org/t/p/original/'

export const fetchFromUrl = async (url) =>{
    const resp = await axios.get(url)
    return resp
}