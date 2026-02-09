import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HowToPlay from './pages/HowToPlay';
import Tournaments from './pages/Tournaments';
import About from './pages/About';
import Settings from './pages/Settings';
import PlayNow from './pages/PlayNow';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import Game from './pages/Game';

import Themes from './pages/Themes';

import Footer from './components/Footer';

import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

const App = () => {
  const currentTheme = useSelector(state => state.theme.websiteTheme);
  const soundEnabled = useSelector(state => state.theme.soundEnabled);
  const audioRef = useRef(null);

  useEffect(() => {
    const playSound = () => {
      if (soundEnabled && audioRef.current) {
        audioRef.current.play().catch(e => console.log('Autoplay blocked', e));
      }
      window.removeEventListener('click', playSound);
    };

    window.addEventListener('click', playSound);
    playSound();

    return () => window.removeEventListener('click', playSound);
  }, [soundEnabled]);

  const themeConfigs = {
    default: {
      primary: '#5B5FC7',
      secondary: '#7175D8',
      bg: '#F1F2F6',
      text: '#2F3542',
      accent: '#FFD93D',
      surface: '#5b5fc7',
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
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'white',
      color: 'var(--text-color)',
      transition: 'all 0.5s ease',
      fontFamily: "'Inter', sans-serif"
    }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/play-now" element={<PlayNow />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/join-room" element={<JoinRoom />} />
          <Route path="/game" element={<Game />} />


        </Routes>
      </div>
      <Footer />
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/1072/1072-preview.mp3"
      />
    </div>
  );
};

export default App;

