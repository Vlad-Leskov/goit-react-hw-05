import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`,
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDVhYjhjMDgzZmNjOWNiYmZjMTQ2OWU1MzRlNWU1ZSIsInN1YiI6IjY2NTFjNGUwMmYwMzRjYzA5YjIzMTk0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BwUp7SzYwxorhpgtpO_YeL-4YZpp5v7TRSKqQ2Ttao0",
              },
            }
          );
          setResults(response.data.results);
        } catch (error) {
          setError("Failed to fetch search results");
        } finally {
          setIsLoading(false);
        }
      };

      fetchSearchResults();
    }
  }, [query]);

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Search Results for {query}</h1>
      {results.length > 0 ? (
        <ul>
          {results.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default SearchResultsPage;
