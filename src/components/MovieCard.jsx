import { useState, useEffect } from 'react';
import { Film } from 'lucide-react';
import './MovieCard.css';

export default function MovieCard({ movie }) {
  const [posterUrl, setPosterUrl] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // If the poster is already available in the data, use it directly
    if (movie.poster_path) {
      setPosterUrl(`https://image.tmdb.org/t/p/w500${movie.poster_path}`);
      return;
    }

    // Only fetch for movies originating from the TMDB dataset, ignoring custom added ones
    if (movie.id && !movie._isCustom) {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`)
        .then(res => res.json())
        .then(data => {
          if (data.poster_path) {
            setPosterUrl(`https://image.tmdb.org/t/p/w500${data.poster_path}`);
          } else {
            setHasError(true);
          }
        })
        .catch(() => setHasError(true));
    }
  }, [movie]);

  // Generate a distinct gradient based on the movie title
  const getGradient = (text) => {
    let hash = 0;
    const str = text || 'Movie';
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    return `linear-gradient(135deg, hsl(${h}, 70%, 25%), hsl(${(h + 40) % 360}, 80%, 15%))`;
  };

  return (
    <div className="movie-card animate-fade-in">
      <div className="movie-poster">
        {posterUrl && !hasError ? (
          <img src={posterUrl} alt={movie.title} onError={() => setHasError(true)} />
        ) : (
          <div className="movie-poster-fallback" style={{ background: getGradient(movie.title) }}>
            <div className="fallback-text">
              {movie.title}
            </div>
          </div>
        )}
        <div className="movie-overlay">
          <p className="movie-overview">{movie.overview?.substring(0, 120)}...</p>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="movie-meta">
          <span>{movie.release_date?.substring(0, 4)}</span>
          {movie.vote_average && <span className="rating">⭐ {parseFloat(movie.vote_average).toFixed(1)}</span>}
        </p>
        <div className="movie-genres">
          {movie.genres?.slice(0, 3).map((g, i) => (
            <span key={i} className="genre-tag">{typeof g === 'object' ? g.name : g}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
