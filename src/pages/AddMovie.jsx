import { useState } from 'react';
import { useMovies } from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';

export default function AddMovie() {
  const { addMovie } = useMovies();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    genres: '',
    industry: '',
    actors: '',
    overview: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    // Convert comma/space separated genres to array
    const genreArray = formData.genres.split(/[, ]+/).filter(g => g.trim() !== '');

    addMovie({
      ...formData,
      genres: genreArray,
      release_date: new Date().toISOString(), // stub
    });

    navigate('/discover'); // redirect to discover page to see it
  };

  return (
    <div className="glass-container animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Add a New Movie</h2>
      <p style={{ textAlign: 'center', color: 'var(--color-text-light)', marginBottom: '32px' }}>
        Provide the details below to add a movie to your local recommend list.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontWeight: 600, color: 'var(--color-maroon-dark)' }}>Movie Title*</label>
          <input 
            type="text" 
            className="input-field" 
            required 
            placeholder="e.g. Parasite"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontWeight: 600, color: 'var(--color-maroon-dark)' }}>Genres</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="e.g. Thriller Drama (space or comma separated)"
            value={formData.genres}
            onChange={(e) => setFormData({...formData, genres: e.target.value})}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontWeight: 600, color: 'var(--color-maroon-dark)' }}>Film Industry</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="e.g. Hollywood, Bollywood, Korean"
            value={formData.industry}
            onChange={(e) => setFormData({...formData, industry: e.target.value})}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontWeight: 600, color: 'var(--color-maroon-dark)' }}>Key Actors</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="e.g. Song Kang-ho, Lee Sun-kyun"
            value={formData.actors}
            onChange={(e) => setFormData({...formData, actors: e.target.value})}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontWeight: 600, color: 'var(--color-maroon-dark)' }}>Quick Overview / Description</label>
          <textarea 
            className="input-field" 
            rows="3"
            placeholder="Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan."
            value={formData.overview}
            onChange={(e) => setFormData({...formData, overview: e.target.value})}
          ></textarea>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '12px' }}>
          Add Movie to Collection
        </button>
      </form>
    </div>
  );
}
