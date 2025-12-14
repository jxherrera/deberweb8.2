import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    return (
        <nav className="nav-glass">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 transition-colors">
                        Mi Portafolio
                    </Link>
                    
                    <div className="flex items-center gap-6">
                        <div className="flex gap-6">
                            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}>CV</Link>
                            <Link to="/posts" className={`nav-link ${location.pathname === '/posts' ? 'nav-link-active' : ''}`}>Blog</Link>
                        </div>
                        
                        <button onClick={toggleTheme} className="btn-icon" aria-label="Cambiar tema">
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;