import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieCast = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDVhYjhjMDgzZmNjOWNiYmZjMTQ2OWU1MzRlNWU1ZSIsInN1YiI6IjY2NTFjNGUwMmYwMzRjYzA5YjIzMTk0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BwUp7SzYwxorhpgtpO_YeL-4YZpp5v7TRSKqQ2Ttao0",
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        setError("Failed to fetch movie cast");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
