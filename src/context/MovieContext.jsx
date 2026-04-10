import { createContext, useContext, useState, useEffect } from 'react';
import Papa from 'papaparse';

const MovieContext = createContext();

export function useMovies() {
  return useContext(MovieContext);
}

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load custom movies from local storage
    const loadCustomMovies = () => {
      const stored = localStorage.getItem('custom_movies');
      if (stored) {
        return JSON.parse(stored);
      }
      return [];
    };

    // Parse CSV
    Papa.parse('/movies.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const csvMovies = results.data.map(m => ({
          ...m,
          // Extract specific simple fields to ensure consistency
          title: m.title || m.original_title,
          genres: m.genres ? m.genres.split(' ') : [],
          actors: m.cast ? m.cast : '', // Could be JSON or just comma-separated names depending on CSV format
          industry: 'Hollywood/International', // Default for this dataset
        }));
        
        const customMovies = loadCustomMovies();
        
        setMovies([...customMovies, ...csvMovies]);
        setLoading(false);
      },
      error: (err) => {
        console.error("Error parsing movies:", err);
        setLoading(false);
      }
    });
  }, []);

  const addMovie = (newMovie) => {
    const movieWithId = { 
      ...newMovie, 
      id: Date.now().toString(), 
      _isCustom: true 
    };
    
    const customMovies = localStorage.getItem('custom_movies');
    const parsedCustom = customMovies ? JSON.parse(customMovies) : [];
    const updatedCustom = [movieWithId, ...parsedCustom];
    
    localStorage.setItem('custom_movies', JSON.stringify(updatedCustom));
    setMovies(prev => [movieWithId, ...prev]);
  };

  return (
    <MovieContext.Provider value={{ movies, loading, addMovie }}>
      {children}
    </MovieContext.Provider>
  );
}
