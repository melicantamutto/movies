import React, { useState } from "react";
import TMDBImage from "./TMDBImage";
import { List, Button, Card } from "antd";
import "./MoviesList.sass";
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/";

const { Meta } = Card;

export default function MoviesList({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortingType, setSortingType] = useState("");
  const handleSelectMovie = (movie) => setSelectedMovie(movie);
  const handleSortingChange = (event) => {
    setSortingType(event.target.value);
  };

  return (
    <div className="list-container">
      <List
        // loading
        grid={{
          gutter: 3,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 8,
          xxl: 8,
        }}
        dataSource={movies}
        renderItem={(movie) => (
          <List.Item>
            <MovieListItem movie={movie} />
          </List.Item>
        )}
      />
    </div>
  );
}

// const ExpandedMovieItem = ({movie: {title, original_title, poster_path, overview, vote_average, vote_count}}) => (
//   <div className="expanded-movie-item">
//     <TMDBImage src={poster_path} className="poster" />
//     <div className="description">
//       <h2>{title}({original_title})</h2>
//       <div><h4>Rank(votes count)</h4>: <span>{vote_average}({vote_count})</span></div>
//       <span>{overview}</span>
//     </div>
//   </div>
// )

function MovieListItem({ movie, isSelected, onSelect }) {
  const handleClick = () => onSelect(movie);
  const { title, vote_average, poster_path } = movie;
  const className = `movie-list-item ${isSelected ? "selected" : ""}`;
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={title} src={IMAGE_PATH + poster_path} />}
    >
      <Meta title={title} description={vote_average} />
    </Card>
    // <div className={className} onClick={handleClick}>{title}({vote_average})</div>
  );
}

// function SortingOptions ({ selectedOption, onChange }) {

//   return (
//     <select value={selectedOption} onChange={onChange}>
//       <option value=""></option>
//       <option value="name_asc">A to Z</option>
//       <option value="name_desc">Z to A</option>
//       <option value="rating">Rating</option>
//     </select>
//   )
// }
