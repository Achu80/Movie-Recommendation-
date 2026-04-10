import { Link, useLocation } from 'react-router-dom';
import { Film, Compass, Search, PlusCircle } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="glass-container navbar animate-fade-in">
      <div className="navbar-brand">
        <Film className="navbar-icon" size={28} />
        <Link to="/" className="navbar-logo">MovieRealm</Link>
      </div>
      
      <div className="navbar-links">
        <Link to="/discover" className={`nav-link ${isActive('/discover')}`}>
          <Compass size={20} />
          <span>Discover</span>
        </Link>
        <Link to="/search-similar" className={`nav-link ${isActive('/search-similar')}`}>
          <Search size={20} />
          <span>Search Similar</span>
        </Link>
        <Link to="/add-movie" className={`nav-link ${isActive('/add-movie')}`}>
          <PlusCircle size={20} />
          <span>Add Movie</span>
        </Link>
      </div>
    </nav>
  );
}
