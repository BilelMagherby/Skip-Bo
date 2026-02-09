import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'How to Play', path: '/how-to-play' },
    { name: 'Themes', path: '/themes' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'About', path: '/about' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <nav
      class={`navbar ${isOpen ? 'mobile-menu-active' : ''}`}
      style={{
        background: 'var(--primary-color)',
        padding: '0.8rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.5s ease',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        minHeight: '70px',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1001 }}>
        <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '900',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            margin: 0,
            letterSpacing: '0.5px'
          }}>
            Skip-Bo
            <img
              src="/app-icon.svg"
              alt="Logo"
              style={{ width: '32px', height: '32px', marginLeft: '8px' }}
            />
          </h1>

        </Link>
      </div>

      {/* Mobile Toggle */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          zIndex: 1001,
          padding: '8px'
        }}
        className="mobile-toggle desktop-hide"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Navigation Links */}
      <div
        className="nav-menu desktop-nav"
        style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center'
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setIsOpen(false)}
            style={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.95rem',
              transition: 'opacity 0.2s',
              padding: '10px'
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
