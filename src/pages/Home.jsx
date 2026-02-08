import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const navigate = useNavigate();
    const cardStyle = useSelector(state => state.theme.cardStyle);

    const getHeroCardStyle = (i, card) => {
        const base = {
            width: '110px',
            height: '155px',
            borderRadius: '15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: '900',
            transform: `rotate(${card.rotate}deg)`,
            marginLeft: i > 0 ? i === 1 ? '-40px' : '-50px' : '0',
            zIndex: i,
            position: 'relative',
            willChange: 'transform',
            transition: 'all 0.3s ease'
        };

        const themes = {
            volcano: {
                background: i === 0 ? 'linear-gradient(135deg, #1a0505 0%, #ae0001 100%)' :
                    i === 1 ? 'radial-gradient(circle, #ff8c00 0%, #8b0000 100%)' :
                        i === 2 ? 'linear-gradient(135deg, #2b1010 0%, #ff4500 100%)' :
                            'linear-gradient(135deg, #000 0%, #4a0000 100%)',
                border: `2px solid #ff4500`,
                color: '#ffda44',
                textShadow: '0 0 10px #ff4500',
                boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
            },
            tropical: {
                background: i === 0 ? '#4BCFFA' : i === 1 ? '#FF6B6B' : i === 2 ? '#0BE881' : '#FAD390',
                border: '4px solid white',
                borderRadius: '24px',
                color: i === 1 ? 'white' : '#2F3542',
                boxShadow: '0 8px 20px rgba(75, 207, 250, 0.3)'
            },
            treasure: {
                background: i === 1 ? '#FFD700' : 'linear-gradient(135deg, #3d2b1f, #5d4037)',
                border: '3px solid #FFD700',
                color: '#FFD700',
                textShadow: '0 0 10px rgba(255,215,0,0.5)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
            },
            neon: {
                background: i === 1 ? '#000' : 'linear-gradient(135deg, #ff00ff, #00ffff)',
                border: '2px solid #ff00ff',
                color: '#fff',
                textShadow: '0 0 10px #00ffff',
                boxShadow: '0 0 20px #ff00ff'
            }
        };

        const activeTheme = themes[cardStyle] || themes.volcano;
        return { ...base, ...activeTheme };
    };

    const getHeroCardContent = (i) => {
        const cards = [
            { num: '10', suit: cardStyle === 'volcano' ? '🔥' : '♥' },
            { num: 'SB', suit: cardStyle === 'volcano' ? '🌋' : '👑' },
            { num: '4', suit: cardStyle === 'volcano' ? '🔥' : '♠' },
            { num: '7', suit: cardStyle === 'volcano' ? '✨' : '♦' }
        ];
        return cards[i];
    };

    return (
        <div style={{ width: '100%', position: 'relative' }}>

            {/* Floating decorative pills outside the main card */}
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
                top: '50%',
                left: '8%',
                width: '50px',
                height: '90px',
                background: '#4ECDC4',
                animationDelay: '1s',
                zIndex: 0
            }} />
            <div className="floating-pill" style={{
                position: 'fixed',
                top: '70%',
                left: '3%',
                width: '55px',
                height: '95px',
                background: '#FFE66D',
                animationDelay: '2s',
                zIndex: 0
            }} />
            <div className="floating-pill" style={{
                position: 'fixed',
                top: '20%',
                right: '5%',
                width: '65px',
                height: '105px',
                background: '#0BE881',
                animationDelay: '0.5s',
                zIndex: 0
            }} />
            <div className="floating-pill" style={{
                position: 'fixed',
                top: '45%',
                right: '8%',
                width: '70px',
                height: '110px',
                background: '#4BCFFA',
                animationDelay: '1.5s',
                zIndex: 0
            }} />
            <div className="floating-pill" style={{
                position: 'fixed',
                top: '75%',
                right: '4%',
                width: '60px',
                height: '100px',
                background: '#FF9F43',
                animationDelay: '2.5s',
                zIndex: 0
            }} />

            {/* Hero Section with diagonal split */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color) 50%, var(--secondary-color) 50%, var(--secondary-color) 100%)',
                padding: '4rem 3rem',
                position: 'relative',
                minHeight: '500px',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.5s ease'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4rem',
                    alignItems: 'center'
                }}>

                    {/* Left side - Text content */}
                    <div style={{ zIndex: 2 }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                fontSize: '4.5rem',
                                fontWeight: '900',
                                color: 'white',
                                marginBottom: '1.5rem',
                                lineHeight: 1.1,
                                textShadow: '3px 3px 6px rgba(0,0,0,0.1)'
                            }}
                        >
                            Skip-Bo
                        </motion.h1>
                        <p style={{
                            fontSize: '1.3rem',
                            color: 'white',
                            marginBottom: '2.5rem',
                            lineHeight: 1.5,
                            maxWidth: '450px',
                            opacity: 0.95
                        }}>
                            A Skip-Bo anes white ing where first stite the and hames drodge toil arot hor the game paynot trerest by ivth attip age.
                        </p>

                        <button
                            className="btn btn-red"
                            onClick={() => navigate('/play-now')}
                            style={{
                                fontSize: '1.1rem',
                                padding: '16px 40px'
                            }}
                        >
                            Start Now
                        </button>
                    </div>

                    {/* Right side - Game illustration */}
                    <div style={{
                        position: 'relative',
                        height: '400px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2
                    }}>
                        {/* Emoji characters */}
                        <div style={{
                            position: 'absolute',
                            top: '10%',
                            left: '20%',
                            display: 'flex',
                            gap: '10px',
                            zIndex: 3
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: '#FFD93D',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                            }}>😊</div>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: '#FFD93D',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                            }}>😄</div>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: '#FFD93D',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                            }}>😃</div>
                        </div>

                        {/* Playing cards - Dynamic Design */}
                        <div style={{
                            position: 'absolute',
                            bottom: '15%',
                            left: '5%',
                            display: 'flex',
                            gap: '-25px',
                            zIndex: 4
                        }}>
                            {[
                                { rotate: -15 },
                                { rotate: -5 },
                                { rotate: 5 },
                                { rotate: 15 }
                            ].map((card, i) => {
                                const cardContent = getHeroCardContent(i);
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8, x: -50 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            x: 0,
                                            y: [0, -8, 0]
                                        }}
                                        transition={{
                                            delay: 0.5 + (i * 0.1),
                                            y: {
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }
                                        }}
                                        style={getHeroCardStyle(i, card)}
                                    >
                                        <div style={{ fontSize: cardStyle === 'volcano' ? '2.8rem' : '3.2rem' }}>{cardContent.num}</div>
                                        <div style={{ fontSize: '1.8rem' }}>{cardContent.suit}</div>
                                        {/* Molten shine effect */}
                                        <div style={{
                                            position: 'absolute',
                                            top: 0, left: 0, right: 0, height: '50%',
                                            background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%)',
                                            borderRadius: cardStyle === 'tropical' ? '24px 24px 0 0' : '15px 15px 0 0'
                                        }} />
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Dice */}
                        <div style={{
                            position: 'absolute',
                            bottom: '25%',
                            right: '15%',
                            display: 'flex',
                            gap: '10px',
                            zIndex: 3
                        }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: '#FFB3D9',
                                borderRadius: '10px',
                                boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.8rem',
                                fontWeight: '900',
                                color: 'white',
                                transform: 'rotate(-15deg)'
                            }}>⚄</div>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: '#FFD93D',
                                borderRadius: '10px',
                                boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.8rem',
                                fontWeight: '900',
                                color: 'white',
                                transform: 'rotate(10deg)'
                            }}>⚂</div>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: '#0BE881',
                                borderRadius: '10px',
                                boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.8rem',
                                fontWeight: '900',
                                color: 'white',
                                transform: 'rotate(5deg)'
                            }}>⚃</div>
                        </div>

                        {/* Small card top right - Dynamic */}
                        <motion.div
                            initial={{ opacity: 0, rotate: 0 }}
                            animate={{ opacity: 1, rotate: 20 }}
                            transition={{ delay: 1 }}
                            style={{
                                position: 'absolute',
                                top: '12%',
                                right: '8%',
                                width: '75px',
                                height: '105px',
                                background: cardStyle === 'volcano' ? 'linear-gradient(45deg, #1a0505, #8b0000)' :
                                    cardStyle === 'treasure' ? '#FFD700' :
                                        cardStyle === 'neon' ? '#000' : '#fff',
                                borderRadius: cardStyle === 'tropical' ? '15px' : '10px',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                                border: `2px solid ${cardStyle === 'volcano' ? '#ff4500' :
                                    cardStyle === 'treasure' ? '#FFD700' :
                                        cardStyle === 'neon' ? '#ff00ff' : 'white'}`,
                                transform: 'rotate(20deg)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                fontWeight: '900',
                                zIndex: 2,
                                color: cardStyle === 'volcano' || cardStyle === 'treasure' ? '#ffda44' :
                                    cardStyle === 'neon' ? '#fff' : '#2F3542',
                                textShadow: cardStyle === 'volcano' ? '0 0 5px #ff4500' :
                                    cardStyle === 'neon' ? '0 0 5px #00ffff' : 'none'
                            }}>
                            <div>J</div>
                            <div style={{ fontSize: '1.4rem' }}>{cardStyle === 'volcano' ? '🔥' : '♦'}</div>
                        </motion.div>

                        {/* Emoji bottom right */}
                        <div style={{
                            position: 'absolute',
                            top: '20%',
                            right: '5%',
                            width: '55px',
                            height: '55px',
                            borderRadius: '50%',
                            background: 'var(--accent-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.8rem',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                            zIndex: 2,
                            transition: 'all 0.5s ease'
                        }}>😊</div>
                    </div>
                </div>
            </section>

            {/* Bottom Section - Themed */}
            <section style={{
                background: 'var(--primary-color)',
                padding: '3rem 3rem',
                color: 'white',
                transition: 'all 0.5s ease'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr',
                    gap: '4rem'
                }}>

                    {/* Left - Game Rules */}
                    <div>
                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: '900',
                            marginBottom: '2rem'
                        }}>
                            White owed ith age!
                        </h2>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{
                                fontSize: '1.3rem',
                                fontWeight: '800',
                                marginBottom: '1.5rem'
                            }}>
                                Game rules
                            </h3>

                            <div style={{ display: 'flex', gap: '3rem' }}>
                                <div>
                                    <div style={{
                                        display: 'flex',
                                        gap: '10px',
                                        marginBottom: '1.5rem'
                                    }}>
                                        <span style={{ fontWeight: '800' }}>•</span>
                                        <div>
                                            <div style={{ fontWeight: '700', marginBottom: '0.3rem' }}>Skipbo tios</div>
                                            <div style={{ opacity: 0.9, fontSize: '0.95rem' }}>
                                                the gowing<br />
                                                gamets sies.
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        gap: '10px'
                                    }}>
                                        <span style={{ fontWeight: '800' }}>•</span>
                                        <div>
                                            <div style={{ fontWeight: '700', marginBottom: '0.3rem' }}>True riles</div>
                                            <div style={{ opacity: 0.9, fontSize: '0.95rem' }}>
                                                Citcer gich the bicather to ur fasiting<br />
                                                cans.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div style={{ opacity: 0.9, fontSize: '0.95rem', lineHeight: 1.6 }}>
                                        Vey me rest the skipbo desing sing this<br />
                                        Skip are Dimoter chate anall can mate<br />
                                        en tity oecns.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Join Section */}
                    <div style={{
                        background: 'var(--surface-color)',
                        borderRadius: '20px',
                        padding: '2.5rem',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.5s ease'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            fontSize: '2rem',
                            fontWeight: '900',
                            color: 'var(--primary-color)'
                        }}>
                            SB
                        </div>

                        <h3 style={{
                            fontSize: '1.8rem',
                            fontWeight: '800',
                            marginBottom: '0.5rem'
                        }}>
                            Joint Thu new Game
                        </h3>
                        <h4 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            marginBottom: '1rem',
                            opacity: 0.95
                        }}>
                            Join You existing our ages
                        </h4>

                        <p style={{
                            opacity: 0.9,
                            lineHeight: 1.6,
                            fontSize: '0.95rem'
                        }}>
                            Out the rite ther to usecpoptal the<br />
                            sme daners to tte our bisontis.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
