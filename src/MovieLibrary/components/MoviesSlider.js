import React from "react";
import { Carousel, Button } from "antd";
import "./MoviesSlider.sass";
import { BACKDROP_URL} from '../utils/utils';
import { useDispatch } from "react-redux";
import { setMovieModal } from "../store/actions";

export default function MoviesList({ movies }) {
  const moviesReduced = [...movies]
  moviesReduced.length = 8
  return (
    <Carousel autoplay>
      {moviesReduced.map((movie) => (
        <Movie movie={movie} key={movie.id} />
      ))}
    </Carousel>
  );
}

const Movie = ({ movie }) => {
  const { id, backdrop_path: backdropPath, title, overview } = movie;
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setMovieModal(movie));
  };
  return (
    <div
      className="slider__movie"
      style={{ backgroundImage: `url("${BACKDROP_URL + backdropPath}")` }}
    >
      <div className="slider__movie-data">
        <div>
          <h2>{title}</h2>
          <p>{overview}</p>
          <Button type="primary" onClick={handleClick}>
            More info
          </Button>
        </div>
      </div>
    </div>
  );
};
