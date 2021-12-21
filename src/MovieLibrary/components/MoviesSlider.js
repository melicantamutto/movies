import React, { useState } from "react";
import { Carousel, Button } from "antd";
import "./MoviesSlider.sass";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/";

export default function MoviesList({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortingType, setSortingType] = useState("");
  const handleSelectMovie = (movie) => setSelectedMovie(movie);
  const handleSortingChange = (event) => {
    setSortingType(event.target.value);
  };

  return (
    <Carousel autoplay>
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.id} />
      ))}
    </Carousel>
  );
}

const Movie = ({
  movie: { id, backdrop_path: backdropPath, title, overview },
}) => {
  return (
    <div
      className="slider__movie"
      style={{ backgroundImage: `url("${IMAGE_PATH + backdropPath}")` }}
    >
      <div className="slider__movie-data">
        <div>
          <h2>{title}</h2>
          <p>{overview}</p>
          {/* <Link to={`/movie/${id}`}> */}
          <Button type="primary">Ver mas... </Button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};
