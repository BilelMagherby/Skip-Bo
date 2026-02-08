import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'How to Play', path: '/how-to-play' },
    { name: 'Themes', path: '/themes' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'About', path: '/about' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <nav style={{
      background: 'var(--primary-color)',
      padding: '1.2rem 3rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.5s ease',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: '900',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            letterSpacing: '0.5px'
          }}>
            Skip-Bo
            <span style={{
              background: '#FF3B3F',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              display: 'inline-block',
              marginLeft: '2px'
            }}></span>
          </h1>
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            style={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'opacity 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            {item.name}
          </Link>
        ))}
      </div>


    </nav>
  );
};

export default Navbar;
