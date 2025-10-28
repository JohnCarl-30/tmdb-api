import { useState } from "react";

export default function SearchMovies({ setLoading, setMovies, setError }) {
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    // Update search history - avoid duplicates
    setSearchHistory((prev) => {
      const filtered = prev.filter((term) => term !== query);
      return [query, ...filtered].slice(0, 5); // Keep last 5
    });

    setLoading(true);
    setError(null);

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
      query
    )}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      setError("Failed to fetch movies.");

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (term) => {
    setQuery(term);
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSearch}>
        <label className="label" htmlFor="query">
          MOVIE NAME
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="e.g. Jurassic Park"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>

      {searchHistory.length > 0 && (
        <div className="search-history">
          <div className="history-header">
            <span className="recent-btn">Recent searches:</span>
            <button
              className="clear-button"
              onClick={clearHistory}
              type="button"
            >
              Clear
            </button>
          </div>
          <div className="history-tags">
            {searchHistory.map((term, i) => (
              <button
                key={i}
                className="history-tag"
                onClick={() => handleHistoryClick(term)}
                type="button"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
