import React, { useState } from 'react'
import TMDBImage from './TMDBImage'
import './MoviesList.css'

export default function MoviesList ({ movies }){


  const [selectedMovie, setSelectedMovie] = useState(null)
  const [sortingType, setSortingType] = useState('')
  const handleSelectMovie = movie => setSelectedMovie(movie)
  const handleSortingChange = event => {
    setSortingType(event.target.value)
  }

  return(<div className="movies-list">
    <div className="items">
      <div>
        <span>Sort by:</span>
        <SortingOptions selectedOption={sortingType} onChange={handleSortingChange}/>
      </div>
      {
        movies.map(movie =>
          <MovieListItem key={movie.id} movie={movie} isSelected={selectedMovie===movie} onSelect={handleSelectMovie}/>
        )
      }
    </div>
    {
      selectedMovie && (
        <ExpandedMovieItem movie={selectedMovie} />
      )
    }
  </div>)

  
}

const ExpandedMovieItem = ({movie: {title, original_title, poster_path, overview, vote_average, vote_count}}) => (
  <div className="expanded-movie-item">
    <TMDBImage src={poster_path} className="poster" />
    <div className="description">
      <h2>{title}({original_title})</h2>
      <div><h4>Rank(votes count)</h4>: <span>{vote_average}({vote_count})</span></div>
      <span>{overview}</span>
    </div>
  </div>
)

function MovieListItem ({movie, isSelected, onSelect}) {
  const handleClick = () => onSelect(movie)
  const { title, vote_average } = movie
  const className = `movie-list-item ${isSelected ? 'selected' : ''}`
  return(<div className={className} onClick={handleClick}>{title}({vote_average})</div>)
}

function SortingOptions ({ selectedOption, onChange }) {

  return (
    <select value={selectedOption} onChange={onChange}>
      <option value=""></option>
      <option value="name_asc">A to Z</option>
      <option value="name_desc">Z to A</option>
      <option value="rating">Rating</option>
    </select>
  )
}

