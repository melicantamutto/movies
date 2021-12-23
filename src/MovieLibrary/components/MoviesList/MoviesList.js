import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMovieModal, setFilteredMovies } from "../../store/actions";
import { List, Card, Select } from "antd";
import "./MoviesList.sass";
import { filterData, POSTER_URL } from "../../utils/utils";

const { Meta } = Card;
const { Option } = Select;

export default function MoviesList({ movies }) {
  const dispatch = useDispatch();
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [sortingType, setSortingType] = useState("");

  const handleSortingChange = (value) => {
    setSortingType(value);
  };

  useEffect(() => {
    setLoadingMovies(true);
    if (sortingType !== "") {
      const moviesSorted = filterData(sortingType, movies);
      dispatch(setFilteredMovies(moviesSorted));
    }
    setLoadingMovies(false);
  }, [sortingType]);

  return (
    <div className="list-container">
      <div className="list-container__sort">
        <span>Sort: </span>
        <Select
          defaultValue=""
          style={{ width: 200 }}
          onChange={handleSortingChange}
          loading={loadingMovies}
        >
          <Option value=""></Option>
          <Option value="name_asc">A to Z</Option>
          <Option value="name_desc">Z to A</Option>
          <Option value="rating">Rating</Option>
          <Option value="date_asc">Newer</Option>
          <Option value="date_desc">Older</Option>
        </Select>
      </div>
      <List
        dataSource={movies}
        grid={{
          gutter: 2,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 6,
        }}
        className="list"
        renderItem={(movie) => (
          <List.Item>
            <MovieListItem movie={movie} />
          </List.Item>
        )}
      />
    </div>
  );
}

function MovieListItem({ movie }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setMovieModal(movie));
  };
  const { title, vote_average, poster_path } = movie;
  return (
    <Card
      hoverable
      style={{ width: 235 }}
      cover={
        <img alt={title} src={POSTER_URL + poster_path} onClick={handleClick} />
      }
    >
      <Meta title={title} description={vote_average} />
    </Card>
  );
}
