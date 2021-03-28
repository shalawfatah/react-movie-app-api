import React, {useState, useEffect} from 'react'
import './App.css';
import Movie from './components/Movie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="

function App() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  useEffect(()=> {
    fetchApi()
  }, [])
  const fetchApi = async () => {
    try {
      const response = await fetch(FEATURED_API)
      const result = await response.json()
      const moviesResult = await result.results
      setMovies(moviesResult)
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const searchApi = async () => {
      try {
        const response = await fetch(SEARCH_API+search)
        const result = await response.json()
        const moviesResult = await result.results
        setMovies(moviesResult)
        setSearch('')
      } catch (error) {
        console.log(error.message)
      }
    }
    searchApi()
  }
  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
        <input className="search" type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </form>
      </header>
    <div className="movie-container">
    {movies.map((movie)=> {
       return <Movie key={movie.id} {...movie} />
    })}
    </div>
    </>
  );
}

export default App;
