import React from 'react';
import { motion } from 'framer-motion';

const HowToPlay = () => {
    const rules = [
        {
            title: 'Game Objective',
            description: 'Be the first player to play all cards from your stockpile by building sequences from 1 to 12.',
            icon: '🎯'
        },
        {
            title: 'Setup',
            description: 'Each player gets 30 cards in their stockpile. The remaining cards form the draw pile.',
            icon: '🃏'
        },
        {
            title: 'Building Piles',
            description: 'Create sequences in the center from 1-12. When a pile reaches 12, it gets cleared.',
            icon: '📚'
        },
        {
            title: 'Skip-Bo Cards',
            description: 'Wild cards that can be played as any number to help complete your sequences.',
            icon: '⭐'
        },
        {
            title: 'Your Turn',
            description: 'Draw cards, play from your stockpile or hand, and discard one card to end your turn.',
            icon: '🔄'
        },
        {
            title: 'Winning',
            description: 'The first player to empty their stockpile wins the game!',
            icon: '🏆'
        }
    ];

    return (
        <div style={{ width: '100%', position: 'relative' }}>

            {/* Floating decorative pills */}
            <div className="floating-pill" style={{
                position: 'fixed',
                top: '15%',
                left: '5%',
                width: '60px',
                height: '100px',
                background: '#FF6B6B',
                animationDelay: '0s',
                zIndex: 0
            }} />
            <div className="floating-pill" style={{
                position: 'fixed',
                top: '60%',
                left: '3%',
                width: '55px',
                height: '95px',
                background: '#4ECDC4',
                animationDelay: '1.5s',
                zIndex: 0
            }} />
            <div className="floating-pill" style={{
                position: 'fixed',
                top: '25%',
                right: '5%',
                width: '65px',
                height: '105px',
                background: '#FFE66D',
                animationDelay: '0.8s',
                zIndex: 0
            }} />
            <div className="floating-pill" style={{
                position: 'fixed',
                bottom: '15%',
                right: '4%',
                width: '60px',
                height: '100px',
                background: '#95E1D3',
                animationDelay: '2s',
                zIndex: 0
            }} />

            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color) 50%, var(--secondary-color) 50%, var(--secondary-color) 100%)',
                padding: '5rem 3rem',
                position: 'relative',
                minHeight: '350px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.5s ease'
            }}>
                <div style={{ textAlign: 'center', zIndex: 2 }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            fontSize: '4.5rem',
                            fontWeight: '900',
                            color: 'white',
                            marginBottom: '1rem',
                            textShadow: '3px 3px 6px rgba(0,0,0,0.1)'
                        }}
                    >
                        How to Play
                    </motion.h1>
                    <p style={{
                        fontSize: '1.4rem',
                        color: 'white',
                        maxWidth: '600px',
                        margin: '0 auto',
                        opacity: 0.95
                    }}>
                        Learn the rules and master Skip-Bo in minutes!
                    </p>
                </div>
            </section>

            {/* Rules Grid Section */}
            <section style={{
                background: 'var(--bg-color)',
                padding: '4rem 3rem',
                color: 'var(--text-color)',
                transition: 'all 0.5s ease'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        marginBottom: '3rem',
                        textAlign: 'center'
                    }}>
                        Game Rules & Instructions
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '2rem'
                    }}>
                        {rules.map((rule, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    background: 'var(--surface-color)',
                                    borderRadius: '20px',
                                    padding: '2rem',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    transition: 'all 0.3s ease',
                                    color: 'var(--text-color)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '1rem'
                                }}>
                                    {rule.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '800',
                                    marginBottom: '0.8rem'
                                }}>
                                    {rule.title}
                                </h3>
                                <p style={{
                                    opacity: 0.9,
                                    lineHeight: 1.6,
                                    fontSize: '1rem'
                                }}>
                                    {rule.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{
                        textAlign: 'center',
                        marginTop: '3rem'
                    }}>
                        <button className="btn btn-yellow" style={{
                            fontSize: '1.1rem',
                            padding: '16px 40px'
                        }}>
                            Start Playing Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Quick Tips Section */}
            <section style={{
                background: 'var(--primary-color)',
                padding: '4rem 3rem',
                color: 'white',
                transition: 'all 0.5s ease'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        marginBottom: '2rem'
                    }}>
                        Pro Tips
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '2rem',
                        marginTop: '2rem'
                    }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.15)',
                            padding: '2rem',
                            borderRadius: '15px',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💡</div>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                                Save Skip-Bo Cards
                            </h4>
                            <p style={{ opacity: 0.9 }}>
                                Use wild cards strategically when you're stuck
                            </p>
                        </div>
                        <div style={{
                            background: 'rgba(255,255,255,0.15)',
                            padding: '2rem',
                            borderRadius: '15px',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎲</div>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                                Manage Discard Piles
                            </h4>
                            <p style={{ opacity: 0.9 }}>
                                Organize your discards to maximize future plays
                            </p>
                        </div>
                        <div style={{
                            background: 'rgba(255,255,255,0.15)',
                            padding: '2rem',
                            borderRadius: '15px',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</div>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                                Focus on Stockpile
                            </h4>
                            <p style={{ opacity: 0.9 }}>
                                Always prioritize playing from your stockpile
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HowToPlay;
