import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Zap } from 'lucide-react';

const About = () => {
    const features = [
        {
            icon: <Heart size={40} />,
            title: 'Made with Love',
            description: 'Created by passionate game developers who love card games'
        },
        {
            icon: <Users size={40} />,
            title: 'Community Driven',
            description: 'Built for players, by players. Your feedback shapes our game'
        },
        {
            icon: <Target size={40} />,
            title: 'Fair Play',
            description: 'Advanced anti-cheat system ensures everyone plays fair'
        },
        {
            icon: <Zap size={40} />,
            title: 'Fast & Fun',
            description: 'Optimized for smooth gameplay on all devices'
        }
    ];

    const stats = [
        { number: '50K+', label: 'Active Players' },
        { number: '1M+', label: 'Games Played' },
        { number: '500+', label: 'Daily Tournaments' },
        { number: '4.8★', label: 'User Rating' }
    ];

    return (
        <div style={{ width: '100%', position: 'relative' }}>

            {/* Floating decorative pills */}
            <div className="floating-pill" style={{
                position: 'fixed',
                top: '20%',
                left: '5%',
                width: '60px',
                height: '100px',
                background: '#FF6B6B',
                animationDelay: '0s',
                zIndex: 0
            }} />
            <div className="floating-pill" style={{
                position: 'fixed',
                bottom: '20%',
                left: '3%',
                width: '55px',
                height: '95px',
                background: '#4ECDC4',
                animationDelay: '1.5s',
                zIndex: 0
            }} />
            <div className="floating-pill" style={{
                position: 'fixed',
                top: '15%',
                right: '5%',
                width: '65px',
                height: '105px',
                background: '#FFE66D',
                animationDelay: '0.8s',
                zIndex: 0
            }} />
            <div className="floating-pill" style={{
                position: 'fixed',
                bottom: '25%',
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
                        About Skip-Bo
                    </motion.h1>
                    <p style={{
                        fontSize: '1.4rem',
                        color: 'white',
                        maxWidth: '700px',
                        margin: '0 auto',
                        opacity: 0.95,
                        lineHeight: 1.6
                    }}>
                        The ultimate online card game experience bringing players together from around the world
                    </p>
                </div>
            </section>

            {/* Story Section */}
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
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '4rem',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h2 style={{
                                fontSize: '2.5rem',
                                fontWeight: '900',
                                marginBottom: '1.5rem'
                            }}>
                                Our Story
                            </h2>
                            <p style={{
                                fontSize: '1.1rem',
                                lineHeight: 1.8,
                                opacity: 0.95,
                                marginBottom: '1.5rem'
                            }}>
                                Skip-Bo has been bringing joy to families and friends for decades. We've taken this beloved classic and brought it into the digital age, making it easier than ever to play with people around the world.
                            </p>
                            <p style={{
                                fontSize: '1.1rem',
                                lineHeight: 1.8,
                                opacity: 0.95,
                                marginBottom: '1.5rem'
                            }}>
                                Our mission is simple: create the best online Skip-Bo experience possible. Whether you're a seasoned pro or just learning the game, we've built features that make every match exciting and fair.
                            </p>
                            <button className="btn btn-yellow" style={{
                                fontSize: '1rem',
                                padding: '14px 32px'
                            }}>
                                Join Our Community
                            </button>
                        </div>

                        <div style={{
                            background: 'var(--surface-color)',
                            borderRadius: '20px',
                            padding: '3rem',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            transition: 'all 0.5s ease'
                        }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '2rem'
                            }}>
                                {stats.map((stat, index) => (
                                    <div key={index} style={{ textAlign: 'center' }}>
                                        <div style={{
                                            fontSize: '3rem',
                                            fontWeight: '900',
                                            color: '#FFD93D',
                                            marginBottom: '0.5rem'
                                        }}>
                                            {stat.number}
                                        </div>
                                        <div style={{
                                            fontSize: '1rem',
                                            opacity: 0.9
                                        }}>
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{
                background: 'var(--primary-color)',
                padding: '4rem 3rem',
                color: 'white',
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
                        What Makes Us Special
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    background: 'var(--surface-color)',
                                    borderRadius: '20px',
                                    padding: '2.5rem',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease',
                                    color: 'var(--text-color)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{
                                    marginBottom: '1.5rem',
                                    color: '#FFD93D'
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '800',
                                    marginBottom: '1rem'
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    opacity: 0.9,
                                    lineHeight: 1.6
                                }}>
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section style={{
                background: 'var(--bg-color)',
                padding: '4rem 3rem',
                color: 'var(--text-color)',
                transition: 'all 0.5s ease'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        marginBottom: '1.5rem'
                    }}>
                        Get in Touch
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        opacity: 0.9,
                        marginBottom: '2rem',
                        lineHeight: 1.6
                    }}>
                        Have questions or feedback? We'd love to hear from you!
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <button className="btn btn-yellow" style={{
                            fontSize: '1rem',
                            padding: '14px 32px'
                        }}>
                            Contact Support
                        </button>
                        <button className="btn btn-red" style={{
                            fontSize: '1rem',
                            padding: '14px 32px'
                        }}>
                            Join Discord
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;
