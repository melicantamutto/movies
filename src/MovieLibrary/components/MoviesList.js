import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTopRatedMovies, setMovieModal } from "../store/actions";
import { List, Card, Select } from "antd";
import "./MoviesList.sass";
import { getMovies } from "../store/selectors";
// import InfiniteScroll from 'react-infinite-scroll-component';

const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/";
const { Meta } = Card;
const { Option } = Select;

export default function MoviesList({ movies }) {
  const dispatch = useDispatch();
  const [sortingType, setSortingType] = useState("");
  const [loadingMovies, setLoadingMovies] = useState(false);

  const handleSortingChange = (value) => {
    setSortingType(value);
  };

  useEffect(() => {
    setLoadingMovies(true)
    if (sortingType !== "") {
      const moviesSorted = [...movies].sort((a, b) => {
        if (sortingType === "name_asc") {
          if (a.title > b.title) return 1;
          else if (a.title < b.title) return -1;
          else return 0;
        } else if (sortingType === "name_desc") {
          if (a.title < b.title) return 1;
          else if (a.title > b.title) return -1;
          else return 0;
        } else if (sortingType === "rating") {
          return b.vote_average - a.vote_average;
        }
      });
      dispatch(fetchTopRatedMovies(moviesSorted));
    }
    setLoadingMovies(false)
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
        </Select>
      </div>
      <List
        loading={loadingMovies}
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

function MovieListItem({ movie, isSelected, onSelect }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setMovieModal(movie));
  };
  const { title, vote_average, poster_path } = movie;
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img alt={title} src={IMAGE_PATH + poster_path} onClick={handleClick} />
      }
    >
      <Meta title={title} description={vote_average} />
    </Card>
  );
}

// const [loading, setLoading] = useState(false);
// const [data, setData] = useState([]);

// const loadMoreData = () => {
//   if (loading) {
//     return;
//   }
//   setLoading(true);
//   fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
//     .then(res => res.json())
//     .then(body => {
//       setData([...data, ...body.results]);
//       setLoading(false);
//     })
//     .catch(() => {
//       setLoading(false);
//     });
// };

// useEffect(() => {
//   loadMoreData();
// }, []);

// return (
//   <div
//     id="scrollableDiv"
//     style={{
//       height: 400,
//       overflow: 'auto',
//       padding: '0 16px',
//       border: '1px solid rgba(140, 140, 140, 0.35)',
//     }}
//   >
//     <InfiniteScroll
//       dataLength={data.length}
//       next={loadMoreData}
//       hasMore={data.length < 50}
//       loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
//       endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
//       scrollableTarget="scrollableDiv"
//     >
//       <List
//         dataSource={data}
//         renderItem={item => (
//           <List.Item key={item.id}>
//             <List.Item.Meta
//               avatar={<Avatar src={item.picture.large} />}
//               title={<a href="https://ant.design">{item.name.last}</a>}
//               description={item.email}
//             />
//             <div>Content</div>
//           </List.Item>
//         )}
//       />
//     </InfiniteScroll>
