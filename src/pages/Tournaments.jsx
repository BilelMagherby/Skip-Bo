import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Calendar, Award } from 'lucide-react';

const Tournaments = () => {
    const upcomingTournaments = [
        {
            name: 'Weekly Championship',
            date: 'Every Saturday',
            prize: '1,000 Points',
            players: '50+ Players',
            status: 'Open'
        },
        {
            name: 'Monthly Masters',
            date: 'First Sunday',
            prize: '5,000 Points',
            players: '100+ Players',
            status: 'Open'
        },
        {
            name: 'Grand Tournament',
            date: 'March 15, 2026',
            prize: '10,000 Points',
            players: '200+ Players',
            status: 'Registration Open'
        }
    ];

    const pastWinners = [
        { rank: 1, name: 'CardMaster', tournament: 'February Masters', points: '15,450' },
        { rank: 2, name: 'SkipKing', tournament: 'January Championship', points: '14,280' },
        { rank: 3, name: 'ProPlayer99', tournament: 'Weekly Finals', points: '12,890' }
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
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        style={{ fontSize: '5rem', marginBottom: '1rem' }}
                    >
                        🏆
                    </motion.div>
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
                        Tournaments
                    </motion.h1>
                    <p style={{
                        fontSize: '1.4rem',
                        color: 'white',
                        maxWidth: '600px',
                        margin: '0 auto',
                        opacity: 0.95
                    }}>
                        Compete with the best players and win amazing prizes!
                    </p>
                </div>
            </section>

            {/* Upcoming Tournaments Section */}
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
                        Upcoming Tournaments
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '2rem'
                    }}>
                        {upcomingTournaments.map((tournament, index) => (
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
                                    position: 'relative',
                                    overflow: 'hidden',
                                    color: 'var(--text-color)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: '#0BE881',
                                    padding: '5px 15px',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: '800'
                                }}>
                                    {tournament.status}
                                </div>

                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                    <Trophy size={50} />
                                </div>

                                <h3 style={{
                                    fontSize: '1.8rem',
                                    fontWeight: '800',
                                    marginBottom: '1rem'
                                }}>
                                    {tournament.name}
                                </h3>

                                <div style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Calendar size={20} />
                                    <span style={{ fontSize: '1rem', opacity: 0.9 }}>{tournament.date}</span>
                                </div>

                                <div style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Award size={20} />
                                    <span style={{ fontSize: '1rem', opacity: 0.9 }}>Prize: {tournament.prize}</span>
                                </div>

                                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Users size={20} />
                                    <span style={{ fontSize: '1rem', opacity: 0.9 }}>{tournament.players}</span>
                                </div>

                                <button className="btn btn-yellow" style={{
                                    width: '100%',
                                    fontSize: '1rem',
                                    padding: '12px'
                                }}>
                                    Register Now
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Past Winners Section */}
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
                        Hall of Champions
                    </h2>

                    <div style={{
                        background: 'var(--surface-color)',
                        borderRadius: '20px',
                        padding: '2.5rem',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.5s ease'
                    }}>
                        {pastWinners.map((winner, index) => (
                            <div key={index} style={{
                                display: 'grid',
                                gridTemplateColumns: '80px 1fr 1fr 150px',
                                alignItems: 'center',
                                padding: '1.5rem',
                                background: index % 2 === 0 ? 'rgba(255,255,255,0.1)' : 'transparent',
                                borderRadius: '10px',
                                marginBottom: index < pastWinners.length - 1 ? '1rem' : '0'
                            }}>
                                <div style={{
                                    fontSize: '2rem',
                                    fontWeight: '900',
                                    color: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'
                                }}>
                                    #{winner.rank}
                                </div>
                                <div style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '800'
                                }}>
                                    {winner.name}
                                </div>
                                <div style={{
                                    fontSize: '1rem',
                                    opacity: 0.9
                                }}>
                                    {winner.tournament}
                                </div>
                                <div style={{
                                    fontSize: '1.2rem',
                                    fontWeight: '800',
                                    color: '#FFD93D',
                                    textAlign: 'right'
                                }}>
                                    {winner.points} PTS
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        textAlign: 'center',
                        marginTop: '3rem'
                    }}>
                        <button className="btn btn-red" style={{
                            fontSize: '1.1rem',
                            padding: '16px 40px'
                        }}>
                            View All Winners
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Tournaments;
