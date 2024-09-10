import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { FaRegUserCircle } from 'react-icons/fa';
import Footer from './Footer'; 
import PropTypes from 'prop-types';

const NavBar = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const links = [
    { href: '/', text: 'Accueil' },
    { href: '/modeles', text: 'Modèles' },
    { href: '/mes-signatures', text: 'Mes signatures' },
    { href: '/aide', text: 'Aide' },
  ];

  const toggleAuthMenu = () => {
    setShowAuthMenu(!showAuthMenu);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.navbar')) {
      setIsMenuOpen(false);
      setShowAuthMenu(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen || showAuthMenu) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen, showAuthMenu]);

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src="/Logo.png" alt="Logo de l'entreprise" className="logo-image" />
          </Link>
          <div className={`nav-elements ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-menu">
              {links.map((link, index) => (
                <li key={index} className="nav-item">
                  <Link to={link.href} className="nav-link" onClick={toggleMenu}>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="auth-container">
              <button className="user-icon-button" onClick={toggleAuthMenu} aria-label="Menu d'authentification">
                <FaRegUserCircle className="user-icon" />
              </button>
              {showAuthMenu && (
                <div className="auth-menu">
                  {isAuthenticated ? (
                    <>
                      <Link to="/profile" className="auth-link" onClick={() => { toggleAuthMenu(); toggleMenu(); }}>Profil</Link>
                      <button className="auth-link" onClick={() => { /* logique de déconnexion */ }}>Se déconnecter</button>
                    </>
                  ) : (
                    <>
                      <Link to="/inscription" className="auth-link" onClick={() => { toggleAuthMenu(); toggleMenu(); }}>S'inscrire</Link>
                      <Link to="/connexion" className="auth-link" onClick={() => { toggleAuthMenu(); toggleMenu(); }}>Se connecter</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="menu-icon" onClick={toggleMenu}>
            <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
};

NavBar.propTypes = {
  children: PropTypes.node.isRequired, // Correct propTypes definition
};

export default NavBar;
