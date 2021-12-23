import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRatedMovies } from "../store/actions";
import logo from "./logo.svg";
import "./MovieLibrary.sass";
import { getMovies, getMovieModal } from "../store/selectors";
import MoviesList from "./MoviesList";
import ModalMovie from "./ModalMovie";
import MoviesSlider from "./MoviesSlider";
import { BASE_URL, API_KEY, fetchFromUrl } from "../utils/utils";

export default function MovieLibrary() {
  const [page, setPage] = useState(3);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchFromUrl(`${BASE_URL}${API_KEY}&language=en-EN&page=1`).then((movies) =>
      dispatch(fetchTopRatedMovies(movies.data.results))
    );
    fetchFromUrl(`${BASE_URL}${API_KEY}&language=en-EN&page=2`).then((movies) =>
      dispatch(fetchTopRatedMovies(movies.data.results))
    );
    fetchFromUrl(`${BASE_URL}${API_KEY}&language=en-EN&page=3`).then((movies) =>
      dispatch(fetchTopRatedMovies(movies.data.results))
    );

    // for (page; page < 4; setPage(page++)) {
    //     fetchFromUrl(`${BASE_URL}${API_KEY}&language=en-EN&page=${page}`).then(movies =>dispatch(fetchTopRatedMovies(movies.data.results)))
    //   }
  }, []);

  const movieModal = useSelector(getMovieModal);
  const movies = useSelector(getMovies);

  return (
    <div className="MovieLibrary">
      <header className="ML-header">
        <img src={logo} className="ML-logo" alt="logo" />
        <h1 className="ML-title">Movies</h1>
      </header>
      <div className="slider-container">
        <MoviesSlider movies={movies} />
      </div>
      <div className="ML-intro">
        {movies.length && <MoviesList movies={movies} />}
      </div>
      {movieModal.title && <ModalMovie movie={movieModal} />}
    </div>
  );
}
