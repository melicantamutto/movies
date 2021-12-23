import axios from "axios";
import moment from "moment";

export const BASE_URL = "https://api.themoviedb.org/3/movie/now_playing";
export const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
export const POSTER_URL = " https://image.tmdb.org/t/p/w500/";
export const BACKDROP_URL = "https://image.tmdb.org/t/p/original/";

export const fetchFromUrl = async (url) => {
  const resp = await axios.get(url);
  return resp.data.results;
};
export const filterData = (type, data) =>
  [...data].sort((a, b) => {
    if (type === "name_asc") {
      if (a.title > b.title) return 1;
      else if (a.title < b.title) return -1;
      else return 0;
    } else if (type === "name_desc") {
      if (a.title < b.title) return 1;
      else if (a.title > b.title) return -1;
      else return 0;
    } else if (type === "rating") {
      return b.vote_average - a.vote_average;
    } else if (type === "date_asc") {
      if (moment(a.release_date).isBefore(moment(b.release_date))) return 1;
      if (moment(a.release_date).isAfter(moment(b.release_date))) return -1;
      if (moment(a.release_date).isSame(moment(b.release_date))) return 0;
    } else if (type === "date_desc") {
      if (moment(a.release_date).isAfter(moment(b.release_date))) return 1;
      if (moment(a.release_date).isBefore(moment(b.release_date))) return -1;
      if (moment(a.release_date).isSame(moment(b.release_date))) return 0;
    }
  });
