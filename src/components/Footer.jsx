import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            background: 'white',
            borderTop: '8px solid var(--accent-color)',
            padding: '4rem 2rem 2rem',
            position: 'relative',
            overflow: 'hidden',
            marginTop: 'auto'
        }}>
            {/* Playful Floating Circles */}
            <div style={{
                position: 'absolute',
                top: '-20px',
                left: '10%',
                width: '40px',
                height: '40px',
                background: '#FF6B6B',
                borderRadius: '50%',
                opacity: 0.2
            }} />
            <div style={{
                position: 'absolute',
                top: '40px',
                right: '5%',
                width: '60px',
                height: '60px',
                background: '#4ECDC4',
                borderRadius: '50%',
                opacity: 0.15
            }} />
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '5%',
                width: '30px',
                height: '30px',
                background: '#FFE66D',
                borderRadius: '50%',
                opacity: 0.3
            }} />

            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '3rem',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Branding Section */}
                <div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}
                    >
                        <div style={{
                            width: '50px',
                            height: '50px',
                            background: 'var(--primary-color)',
                            borderRadius: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            fontWeight: '900',
                            color: 'white',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                        }}>SB</div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-color)' }}>
                            Skip-Bo <span style={{ color: 'var(--color-red)' }}>Fun!</span>
                        </h2>
                    </motion.div>
                    <p style={{ color: 'var(--text-color)', opacity: 0.7, lineHeight: 1.6, fontSize: '1.05rem' }}>
                        The ultimate card game adventure for kids and families! Let's play together and have the best time ever! 🎈✨
                    </p>
                </div>

                {/* Fun Links */}
                <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
                        Fun stuff! 🚀
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {['Home', 'How to Play', 'Themes', 'Tournaments'].map((item) => (
                            <li key={item}>
                                <Link
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'var(--text-color)',
                                        fontWeight: '700',
                                        fontSize: '1.1rem',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                    className="footer-link"
                                >
                                    <span style={{ fontSize: '1.2rem' }}>👉</span> {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Fun Stats/Extra */}
                <div style={{
                    background: 'var(--bg-color)',
                    padding: '1.5rem',
                    borderRadius: '25px',
                    textAlign: 'center',
                    border: '3px dashed var(--accent-color)'
                }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌈</div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Join the Party!</h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Over 10,000 games played today! You're the best! 🌟</p>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            marginTop: '1rem',
                            background: 'var(--color-red)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '50px',
                            fontWeight: '800',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        Say Hello! 👋
                    </motion.button>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                marginTop: '3rem',
                paddingTop: '2rem',
                borderTop: '2px solid var(--bg-color)',
                textAlign: 'center',
                color: 'var(--text-color)',
                opacity: 0.5,
                fontSize: '0.9rem',
                fontWeight: '700'
            }}>
                Made with ❤️ and 🍭 for everyone! | 2026 Skip-Bo Fun Edition
            </div>

            <style>{`
                .footer-link:hover {
                    color: var(--color-red) !important;
                    transform: translateX(8px);
                }
            `}</style>
        </footer>
    );
};

export default Footer;
