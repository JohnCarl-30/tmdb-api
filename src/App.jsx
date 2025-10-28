import { useState } from "react";
import SearchMovies from "../src/components/SearchMovies.jsx";
import MovieList from "./components/MovieList.jsx";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  return (
    <div className="container">
      <h1 className="title">Search Your Favorite Movie</h1>
      <SearchMovies
        setLoading={setLoading}
        setError={setError}
        setMovies={setMovies}
      />
      <MovieList loading={loading} error={error} movies={movies} />
    </div>
  );
}
