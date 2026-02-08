import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HowToPlay from './pages/HowToPlay';
import Tournaments from './pages/Tournaments';
import About from './pages/About';
import Settings from './pages/Settings';
import PlayNow from './pages/PlayNow';
import Game from './pages/Game';
import Themes from './pages/Themes';

import { useSelector } from 'react-redux';

const App = () => {
  const currentTheme = useSelector(state => state.theme.websiteTheme);

  const themeConfigs = {
    default: {
      primary: '#5B5FC7',
      secondary: '#7175D8',
      bg: '#F1F2F6',
      text: '#2F3542',
      accent: '#FFD93D',
      surface: 'rgba(255, 255, 255, 0.8)',
    },
    dark: {
      primary: '#1E272E',
      secondary: '#2F3542',
      bg: '#0F1419',
      text: '#FFFFFF',
      accent: '#0BE881',
      surface: 'rgba(255, 255, 255, 0.1)',
    },
    forest: {
      primary: '#015249',
      secondary: '#013A34',
      bg: '#002C27',
      text: '#E0F2F1',
      accent: '#81C784',
      surface: 'rgba(0, 0, 0, 0.2)',
    },
    sunset: {
      primary: '#E84393',
      secondary: '#D63031',
      bg: '#1A0B2E',
      text: '#FFEAA7',
      accent: '#FDCB6E',
      surface: 'rgba(255, 255, 255, 0.15)',
    },
    volcano: {
      primary: '#4a0000',
      secondary: '#8b0000',
      bg: '#0a0404',
      text: '#ffda44',
      accent: '#ff4500',
      surface: 'rgba(255, 69, 0, 0.1)',
    }
  };

  const activeTheme = themeConfigs[currentTheme] || themeConfigs.default;

  return (
    <div style={{
      '--primary-color': activeTheme.primary,
      '--secondary-color': activeTheme.secondary,
      '--bg-color': activeTheme.bg,
      '--text-color': activeTheme.text,
      '--accent-color': activeTheme.accent,
      '--surface-color': activeTheme.surface,
      minHeight: '100vh',
      background: 'var(--bg-color)',
      color: 'var(--text-color)',
      transition: 'all 0.5s ease',
      fontFamily: "'Inter', sans-serif"
    }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/themes" element={<Themes />} />
        <Route path="/play-now" element={<PlayNow />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
};

export default App;
