import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRatedMovies } from "../store/actions";
import { getMovies, getMovieModal } from "../store/selectors";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton, Divider, Button } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import logo from "./logo.svg";
import "./MovieLibrary.sass";
import MoviesList from "./MoviesList/MoviesList";
import ModalMovie from "./ModalMovie/ModalMovie";
import MoviesSlider from "./MoviesSlider/MoviesSlider";
import { BASE_URL, API_KEY, fetchFromUrl } from "../utils/utils";

export default function MovieLibrary() {
  const dispatch = useDispatch();
  const [loadingMovies, setLoadingMovies] = useState(false);
  const movieModal = useSelector(getMovieModal);
  const movies = useSelector(getMovies);

  const [page, setPage] = useState(1);

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      setPage(page + 1);
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
    setLoadingMovies(true);
    setPage(page + 1);
  };

  return (
    <div className="MovieLibrary" id="scrollableDiv">
      <InfiniteScroll
        dataLength={movies.length}
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
      <ScrollToTopButton />
    </div>
  );
}

const ScrollToTopButton = () => (
  <Button
    type="primary"
    icon={<ArrowUpOutlined />}
    size="large"
    shape="circle"
    className="up-button"
    onClick={() =>
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  />
);
