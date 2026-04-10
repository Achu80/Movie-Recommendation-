import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { MovieProvider } from './context/MovieContext';

import Discover from './pages/Discover';
import SearchSimilar from './pages/SearchSimilar';
import AddMovie from './pages/AddMovie';

function Home() {
  return (
    <div className="glass-container animate-fade-in" style={{ padding: '60px 20px' }}>
      <h1 style={{textAlign:'center', fontSize: '3rem', marginBottom: '16px'}}>Welcome to MovieRealm</h1>
      <p style={{textAlign:'center', fontSize: '1.2rem', color: 'var(--color-text-light)'}}>
        Explore, Discover, and Recommend Your Favorite Movies
      </p>
    </div>
  );
}

function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="app-layout">
          <div className="main-content">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/search-similar" element={<SearchSimilar />} />
              <Route path="/add-movie" element={<AddMovie />} />
            </Routes>
          </div>
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
