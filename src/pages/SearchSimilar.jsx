import { useState, useMemo } from 'react';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function SearchSimilar() {
  const { movies, loading } = useMovies();
  const [searchInput, setSearchInput] = useState('');
  const [searchedMovie, setSearchedMovie] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    // Find first exact or partial match
    const found = movies.find(m => 
      m.title && m.title.toLowerCase().includes(searchInput.trim().toLowerCase())
    );
    
    setSearchedMovie(found || 'NOT_FOUND');
  };

  const similarMovies = useMemo(() => {
    if (!searchedMovie || searchedMovie === 'NOT_FOUND') return [];
    
    const targetGenres = searchedMovie.genres || [];
    const targetActors = searchedMovie.actors ? searchedMovie.actors.toLowerCase() : '';
    
    return movies
      .filter(m => m.id !== searchedMovie.id && m.id) // exclude self
      .map(m => {
        let score = 0;
        // matching genres
        const mGenres = m.genres || [];
        targetGenres.forEach(g => {
          if (mGenres.includes(g)) score += 1;
        });

        // matching actors (simple overlap logic)
        // If they share actors, give a boost
        if (m.actors && targetActors) {
            // Very naive check: if the other movie's actors string contains any of our actor's terms
            // To be more precise, we could split by space, but names usually overlap by first or last names.
            const actorsArr = targetActors.split(' ').filter(a => a.length > 3);
            actorsArr.forEach(actorFrag => {
                if(m.actors.toLowerCase().includes(actorFrag)) {
                    score += 2;
                }
            });
        }

        return { ...m, similarityScore: score };
      })
      .filter(m => m.similarityScore > 0)
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, 20); // Top 20 similar
  }, [searchedMovie, movies]);

  return (
    <div className="glass-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Find Similar Movies</h2>
        <p style={{ color: 'var(--color-text-light)', marginBottom: '24px' }}>
          Enter a movie you love, and we'll recommend similar ones based on genre and actors.
        </p>
        
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', maxWidth: '600px', margin: '0 auto' }}>
          <input 
            type="text"
            className="input-field"
            placeholder="Search for a movie (e.g. Inception)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Find Matches'}
          </button>
        </form>
      </div>

      {searchedMovie === 'NOT_FOUND' && (
        <div style={{ textAlign: 'center', color: 'var(--color-maroon)' }}>
          <h3>Sorry, we couldn't find that movie in our database.</h3>
        </div>
      )}

      {searchedMovie && searchedMovie !== 'NOT_FOUND' && (
        <div>
          <h3 style={{ marginBottom: '16px', color: 'var(--color-maroon-dark)' }}>
            Because you searched for: {searchedMovie.title}
          </h3>
          <div className="movies-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
            {similarMovies.map((movie, idx) => (
              <MovieCard key={movie.id || idx} movie={movie} />
            ))}
          </div>
          {similarMovies.length === 0 && (
            <p>No similar movies found. Try another one!</p>
          )}
        </div>
      )}
    </div>
  );
}
