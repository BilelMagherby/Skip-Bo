import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Play, Clock, Trophy, Link as LinkIcon } from 'lucide-react';
import multiplayerService from '../services/MultiplayerService';

const PlayNow = () => {
    const navigate = useNavigate();
    const [selectedMode, setSelectedMode] = useState(null);

    const handleJoinRoom = () => {
        const code = prompt("Enter the Room Code from your friend:");
        if (code) {
            multiplayerService.init();
            multiplayerService.connectToPeer(code);
            navigate('/game');
        }
    };


    const gameModes = [
        {
            id: 'offline',
            title: 'Play vs AI',
            description: 'Practice offline against computer opponents',
            icon: '🤖',
            players: '1 Player + AI',
            time: '10-15 min',
            color: '#9B59B6'
        },
        {
            id: 'create',
            title: 'Create Room',
            description: 'Create a private room and invite your friends',
            icon: '🎮',
            players: '2-6 Players',
            time: 'Custom',
            color: '#4ECDC4'
        },
        {
            id: 'join',
            title: 'Join Room',
            description: 'Join a room using a code from your friend',
            icon: '🔗',
            players: 'Guest',
            time: 'Instant',
            color: '#FF9F43'
        }
    ];



    const activeRooms = [
        { id: 1, name: "Pro Players Only", host: "CardMaster", players: "3/4", status: "Waiting" },
        { id: 2, name: "Beginners Welcome", host: "NewbieFriend", players: "2/4", status: "Waiting" },
        { id: 3, name: "Speed Round", host: "FastPlayer", players: "1/2", status: "Open" },
        { id: 4, name: "Casual Fun", host: "ChillGamer", players: "2/6", status: "Open" },
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
                        🎮
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
                        Let's Play!
                    </motion.h1>
                    <p style={{
                        fontSize: '1.4rem',
                        color: 'white',
                        maxWidth: '600px',
                        margin: '0 auto',
                        opacity: 0.95
                    }}>
                        Choose your game mode and start your Skip-Bo adventure
                    </p>
                </div>
            </section>

            {/* Game Modes Section */}
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
                        Select Game Mode
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2rem',
                        marginBottom: '4rem'
                    }}>
                        {gameModes.map((mode, index) => (
                            <motion.div
                                key={mode.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedMode(mode.id)}
                                style={{
                                    background: selectedMode === mode.id
                                        ? 'var(--secondary-color)'
                                        : 'var(--surface-color)',
                                    borderRadius: '20px',
                                    padding: '2.5rem',
                                    backdropFilter: 'blur(10px)',
                                    border: selectedMode === mode.id
                                        ? '3px solid var(--accent-color)'
                                        : '1px solid rgba(255,255,255,0.1)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    color: selectedMode === mode.id ? 'white' : 'var(--text-color)'
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedMode !== mode.id) {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div style={{
                                    fontSize: '4rem',
                                    marginBottom: '1rem'
                                }}>
                                    {mode.icon}
                                </div>

                                <h3 style={{
                                    fontSize: '1.8rem',
                                    fontWeight: '800',
                                    marginBottom: '0.8rem'
                                }}>
                                    {mode.title}
                                </h3>

                                <p style={{
                                    opacity: 0.9,
                                    marginBottom: '1.5rem',
                                    lineHeight: 1.6
                                }}>
                                    {mode.description}
                                </p>

                                <div style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    marginBottom: '1.5rem',
                                    fontSize: '0.9rem',
                                    opacity: 0.9
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Users size={16} />
                                        {mode.players}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Clock size={16} />
                                        {mode.time}
                                    </div>
                                </div>

                                {selectedMode === mode.id && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            background: '#0BE881',
                                            borderRadius: '50%',
                                            width: '30px',
                                            height: '30px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.2rem'
                                        }}
                                    >
                                        ✓
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {selectedMode && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                textAlign: 'center'
                            }}
                        >
                            <button
                                className="btn btn-yellow"
                                onClick={() => {
                                    if (selectedMode === 'offline') {
                                        navigate('/game');
                                    } else if (selectedMode === 'create') {
                                        navigate('/create-room');
                                    } else if (selectedMode === 'join') {
                                        navigate('/join-room');
                                    }

                                }}


                                style={{
                                    fontSize: '1.2rem',
                                    padding: '18px 50px'
                                }}
                            >
                                <Play size={24} />
                                {selectedMode === 'offline' ? 'Start Playing' : 'Start Game'}
                            </button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Active Rooms Section */}
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
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2rem'
                    }}>
                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: '900'
                        }}>
                            Active Rooms
                        </h2>
                        <button className="btn btn-red" style={{
                            fontSize: '1rem',
                            padding: '12px 28px'
                        }}>
                            <Plus size={20} />
                            Create Room
                        </button>
                    </div>

                    <div style={{
                        background: 'var(--surface-color)',
                        borderRadius: '20px',
                        padding: '2rem',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.5s ease'
                    }}>
                        <div style={{
                            display: 'grid',
                            gap: '1rem'
                        }}>
                            {activeRooms.map((room) => (
                                <div key={room.id} style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    padding: '1.5rem',
                                    display: 'grid',
                                    gridTemplateColumns: '2fr 1fr 1fr 1fr 150px',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                                        e.currentTarget.style.transform = 'translateX(5px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}
                                >
                                    <div>
                                        <div style={{
                                            fontSize: '1.2rem',
                                            fontWeight: '800',
                                            marginBottom: '0.3rem'
                                        }}>
                                            {room.name}
                                        </div>
                                        <div style={{
                                            fontSize: '0.9rem',
                                            opacity: 0.8
                                        }}>
                                            Host: {room.host}
                                        </div>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontSize: '1rem'
                                    }}>
                                        <Users size={18} />
                                        {room.players}
                                    </div>

                                    <div style={{
                                        background: room.status === 'Open' ? '#0BE881' : '#FFD93D',
                                        padding: '5px 15px',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        fontWeight: '800',
                                        textAlign: 'center',
                                        color: '#2F3542'
                                    }}>
                                        {room.status}
                                    </div>

                                    <div></div>

                                    <button className="btn btn-yellow" style={{
                                        fontSize: '0.9rem',
                                        padding: '10px 20px',
                                        width: '100%'
                                    }}>
                                        Join
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default PlayNow;
