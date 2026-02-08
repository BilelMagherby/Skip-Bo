import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { setAvatar, setCardStyle, setWebsiteTheme } from '../store/themeSlice';
import { Palette, User, Layers, Check } from 'lucide-react';

const Themes = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector(state => state.theme);

    const avatars = ['👨‍🚀', '👸', '🧛', '🧙', '🧟', '🦄', '🦁', '🦊', '🐱', '🐶'];
    const cardStyles = [
        { id: 'volcano', name: 'Volcanic Forge', description: 'Molten rock and glowing magma veins' },
        { id: 'tropical', name: 'Sun & Surf', description: 'Bright beach vibes and ocean waves' },
        { id: 'treasure', name: 'Golden Relic', description: 'Ancient stones and glowing gold trim' },
        { id: 'neon', name: 'Cyber Glow', description: 'Holographic neon and digital energy' }
    ];
    const websiteThemes = [
        { id: 'default', name: 'Default Purple', color: '#5B5FC7' },
        { id: 'dark', name: 'Midnight', color: '#1E272E' },
        { id: 'forest', name: 'Deep Forest', color: '#015249' },
        { id: 'sunset', name: 'Sunset Glow', color: '#E84393' },
        { id: 'volcano', name: 'Volcanic Forge', color: '#ff4500' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            background: '#F1F2F6',
            color: '#2F3542'
        }}>
            {/* Header */}
            <section style={{
                background: 'var(--primary-color)',
                padding: '4rem 2rem',
                textAlign: 'center',
                color: 'white',
                transition: 'background 0.5s ease'
            }}>
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1rem' }}
                >
                    Customization
                </motion.h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Express yourself with unique styles</p>
            </section>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '3rem 2rem',
                    display: 'grid',
                    gap: '3rem'
                }}
            >
                {/* Avatar Selection */}
                <motion.section variants={itemVariants}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                        <User size={32} color="#5B5FC7" />
                        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Your Avatar</h2>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                        gap: '1rem',
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '24px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                    }}>
                        {avatars.map(avatar => (
                            <motion.div
                                key={avatar}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => dispatch(setAvatar(avatar))}
                                style={{
                                    fontSize: '3rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '80px',
                                    borderRadius: '16px',
                                    background: currentTheme.avatar === avatar ? '#EDF0FF' : 'transparent',
                                    border: currentTheme.avatar === avatar ? '3px solid #5B5FC7' : '3px solid transparent',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {avatar}
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* AI Avatar Selection */}
                <motion.section variants={itemVariants}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                        <User size={32} color="#FF4757" />
                        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Opponent Avatar</h2>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                        gap: '1rem',
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '24px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                    }}>
                        {avatars.map(avatar => (
                            <motion.div
                                key={avatar}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => dispatch(setAiAvatar(avatar))}
                                style={{
                                    fontSize: '3rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '80px',
                                    borderRadius: '16px',
                                    background: currentTheme.aiAvatar === avatar ? '#FFEDED' : 'transparent',
                                    border: currentTheme.aiAvatar === avatar ? '3px solid #FF4757' : '3px solid transparent',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {avatar}
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Website Theme Selection */}
                <motion.section variants={itemVariants}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                        <Palette size={32} color="#5B5FC7" />
                        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>App Theme</h2>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {websiteThemes.map(theme => (
                            <motion.div
                                key={theme.id}
                                whileHover={{ y: -5 }}
                                onClick={() => dispatch(setWebsiteTheme(theme.id))}
                                style={{
                                    background: 'white',
                                    padding: '1.5rem',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    border: currentTheme.websiteTheme === theme.id ? '3px solid #5B5FC7' : '3px solid transparent',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px'
                                }}
                            >
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    background: theme.color
                                }} />
                                <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{theme.name}</span>
                                {currentTheme.websiteTheme === theme.id && <Check color="#5B5FC7" size={24} style={{ marginLeft: 'auto' }} />}
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Card Style Selection */}
                <motion.section variants={itemVariants}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                        <Layers size={32} color="#5B5FC7" />
                        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Card Style</h2>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '2rem'
                    }}>
                        {cardStyles.map(style => (
                            <motion.div
                                key={style.id}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => dispatch(setCardStyle(style.id))}
                                style={{
                                    background: 'white',
                                    padding: '2rem',
                                    borderRadius: '24px',
                                    cursor: 'pointer',
                                    border: currentTheme.cardStyle === style.id ? '3px solid #5B5FC7' : '3px solid transparent',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem' }}>{style.name}</h3>
                                    <p style={{ opacity: 0.7, marginBottom: '1.5rem', fontSize: '0.9rem' }}>{style.description}</p>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    gap: '12px',
                                    justifyContent: 'center',
                                    padding: '10px',
                                    background: '#F8F9FA',
                                    borderRadius: '16px'
                                }}>
                                    {[1, 12, 'SB', 'back'].map((val, i) => {
                                        let cardStyle = {
                                            width: '50px',
                                            height: '75px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1rem',
                                            fontWeight: '900',
                                            borderRadius: '8px',
                                            background: '#5B5FC7',
                                            color: 'white',
                                            border: '2px solid rgba(255,255,255,0.8)',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        };

                                        // Apply theme-specific preview tweaks
                                        if (style.id === 'volcano') {
                                            cardStyle.background = val === 'back' ? '#1a0505' : (val === 'SB' ? '#ff4500' : '#8b0000');
                                            cardStyle.boxShadow = '0 0 15px #ff4500';
                                            cardStyle.border = '2px solid #ff8c00';
                                        } else if (style.id === 'tropical') {
                                            cardStyle.background = val === 'back' ? '#FAD390' : (val === 'SB' ? '#FF6B6B' : '#4BCFFA');
                                            cardStyle.color = val === 'SB' ? 'white' : '#2F3542';
                                            cardStyle.border = '2px solid white';
                                        } else if (style.id === 'treasure') {
                                            cardStyle.background = val === 'back' ? '#3d2b1f' : (val === 'SB' ? '#FFD700' : '#5d4037');
                                            cardStyle.boxShadow = '0 0 10px #FFD700';
                                            cardStyle.border = '2px solid #FFD700';
                                            cardStyle.color = val === 'SB' ? '#4A00E0' : '#FFD700';
                                        } else if (style.id === 'neon') {
                                            cardStyle.background = val === 'back' ? '#000' : (val === 'SB' ? '#ff00ff' : '#00ffff');
                                            cardStyle.boxShadow = '0 0 10px #00ffff';
                                            cardStyle.border = '2px solid #ff00ff';
                                        }

                                        return (
                                            <div key={i} style={cardStyle}>
                                                {val === 'back' ? '?' : val}
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </motion.div>
        </div>
    );
};

export default Themes;
