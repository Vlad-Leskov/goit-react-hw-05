import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDVhYjhjMDgzZmNjOWNiYmZjMTQ2OWU1MzRlNWU1ZSIsInN1YiI6IjY2NTFjNGUwMmYwMzRjYzA5YjIzMTk0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BwUp7SzYwxorhpgtpO_YeL-4YZpp5v7TRSKqQ2Ttao0",
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        setError("Failed to fetch reviews");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 && <p>No reviews found</p>}
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>Author: {review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviews;
