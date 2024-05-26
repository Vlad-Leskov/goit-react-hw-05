import { useState } from "react";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (newQuery, newPage) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${newQuery}&page=${newPage}&include_adult=false&language=en-US`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDVhYjhjMDgzZmNjOWNiYmZjMTQ2OWU1MzRlNWU1ZSIsInN1YiI6IjY2NTFjNGUwMmYwMzRjYzA5YjIzMTk0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BwUp7SzYwxorhpgtpO_YeL-4YZpp5v7TRSKqQ2Ttao0",
          },
        }
      );
      if (newPage === 1) {
        setMovies(response.data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      }
    } catch (error) {
      setError("Failed to fetch movies");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    fetchMovies(searchQuery, 1);
  };

  const handleLoadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchMovies(query, newPage);
  };

  return (
    <div>
      <h1>Movies</h1>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <MovieList movies={movies} onClick={() => {}} />
      {isLoading && <Loader />}
      {movies.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
}

export default MoviesPage;
