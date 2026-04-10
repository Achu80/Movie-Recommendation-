import { useState, useMemo } from 'react';
import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import './Discover.css';

export default function Discover() {
  const { movies, loading } = useMovies();
  
  const [filterGenre, setFilterGenre] = useState('');
  const [filterActor, setFilterActor] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');

  // Extract all unique genres for the dropdown
  const allGenres = useMemo(() => {
    const genres = new Set();
    movies.forEach(m => {
      if (m.genres && Array.isArray(m.genres)) {
        m.genres.forEach(g => {
          if (typeof g === 'string' && g.trim() !== '') genres.add(g.trim());
        });
      }
    });
    return Array.from(genres).sort();
  }, [movies]);

  // Extract all unique industries (from custom movies mostly, fallback for rest)
  const allIndustries = useMemo(() => {
    const industries = new Set();
    movies.forEach(m => {
      if (m.industry) industries.add(m.industry);
    });
    return Array.from(industries).sort();
  }, [movies]);

  const filteredMovies = useMemo(() => {
    return movies.filter(m => {
      let match = true;
      
      if (filterGenre) {
        const hasGenre = m.genres?.some(g => g.toLowerCase() === filterGenre.toLowerCase());
        if (!hasGenre) match = false;
      }
      
      if (filterActor) {
        if (!m.actors || !m.actors.toLowerCase().includes(filterActor.toLowerCase())) {
          match = false;
        }
      }
      
      if (filterIndustry) {
        if (!m.industry || m.industry !== filterIndustry) {
          match = false;
        }
      }
      
      return match;
    }).slice(0, 50); // limit to 50 to avoid lagging the UI
  }, [movies, filterGenre, filterActor, filterIndustry]);

  return (
    <div className="discover-page animate-fade-in">
      <div className="glass-container filters-section">
        <h2>Discover Your Next Favorite Movie</h2>
        <p className="filters-subtitle">Use the parameters below to refine your recommendations</p>
        
        <div className="filters-grid">
          <div className="filter-group">
            <label>Genre</label>
            <select 
              className="input-field" 
              value={filterGenre} 
              onChange={e => setFilterGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              {allGenres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Actor</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Leonardo DiCaprio"
              value={filterActor}
              onChange={e => setFilterActor(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label>Film Industry</label>
            <select 
              className="input-field" 
              value={filterIndustry} 
              onChange={e => setFilterIndustry(e.target.value)}
            >
              <option value="">All Industries</option>
              {allIndustries.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="results-section">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading database...</p>
          </div>
        ) : (
          <>
            <p className="results-count">Showing {filteredMovies.length} recommendations</p>
            <div className="movies-grid">
              {filteredMovies.map((movie, idx) => (
                <MovieCard key={movie.id || idx} movie={movie} />
              ))}
            </div>
            {filteredMovies.length === 0 && (
              <div className="empty-state">
                <p>No movies matched your parameters. Try adjusting the filters!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
