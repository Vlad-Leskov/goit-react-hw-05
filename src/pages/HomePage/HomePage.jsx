import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDVhYjhjMDgzZmNjOWNiYmZjMTQ2OWU1MzRlNWU1ZSIsInN1YiI6IjY2NTFjNGUwMmYwMzRjYzA5YjIzMTk0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BwUp7SzYwxorhpgtpO_YeL-4YZpp5v7TRSKqQ2Ttao0",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        setError("Failed to fetch trending movies");
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
