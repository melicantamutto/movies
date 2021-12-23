import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRatedMovies, setOneMorePage } from "../store/actions";
import { Skeleton, Divider } from "antd";
import logo from "./logo.svg";
import "./MovieLibrary.sass";
import { getMovies, getMovieModal, getPage } from "../store/selectors";
import MoviesList from "./MoviesList";
import ModalMovie from "./ModalMovie";
import MoviesSlider from "./MoviesSlider";
import { BASE_URL, API_KEY, fetchFromUrl } from "../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";

export default function MovieLibrary() {
  const dispatch = useDispatch();
  const [loadingMovies, setLoadingMovies] = useState(false);
  const movieModal = useSelector(getMovieModal);
  const movies = useSelector(getMovies);
  // const page = useSelector(getPage);
  const [page, setPage] = useState(1);

  useEffect(() => {
    for (let i = 1; i < 4; i++) {
     setPage(page + 1)
    }
  }, []);

  useEffect(() => {
    fetchFromUrl(`${BASE_URL}${API_KEY}&language=en-EN&page=${page}`).then(
      (movies) => {
        dispatch(fetchTopRatedMovies(movies));
        setLoadingMovies(false);
      }
    );
  }, [page]);

  const loadMoreData = () => {
    if (loadingMovies) return;
    dispatch(setOneMorePage());
    console.log("ENTRE A LA FUNCION!!!!!");
    setLoadingMovies(true);
    setPage(page + 1);
  };

  return (
    <div className="MovieLibrary" id="scrollableDiv">
      <InfiniteScroll
        dataLength={movies.length} //This is important field to render the next data
        next={loadMoreData}
        hasMore={true}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
      >
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
      </InfiniteScroll>
    </div>
  );
}
