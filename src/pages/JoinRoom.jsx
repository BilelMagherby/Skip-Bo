import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Link as LinkIcon, AlertCircle, Loader2 } from 'lucide-react';
import multiplayerService from '../services/MultiplayerService';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setMultiplayerInfo } from '../store/multiplayerSlice';



const JoinRoom = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isMultiplayer, connectedPeerId } = useSelector(state => state.multiplayer);
    const { players, gameStatus } = useSelector(state => state.game);
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        dispatch({ type: 'game/resetGame' });
    }, [dispatch]);

    useEffect(() => {
        // If game starts AND we are connected, navigate
        if (gameStatus === 'playing' && connectedPeerId) {
            console.log("Game started & connected, navigating...");
            // Redundant safety check
            dispatch(setMultiplayerInfo({ isMultiplayer: true }));
            navigate('/game');
        }
    }, [gameStatus, connectedPeerId, dispatch, navigate]);




    const handleJoin = (e) => {
        e.preventDefault();
        if (!roomCode.trim()) {
            setError('Please enter a valid room code! 🎈');
            return;
        }

        try {
            multiplayerService.init();
            multiplayerService.connectToPeer(roomCode.trim());
            // DON'T navigate yet! Wait for connection 'open' and 'START_GAME' sync.
        } catch (err) {
            setError('Could not connect. Make sure the code is correct! 🧐');
        }

    };

    return (
        <div style={{ width: '100%', position: 'relative', minHeight: '100vh' }}>
            {/* Header / Hero */}
            <section style={{
                background: 'linear-gradient(135deg, #FF9F43 0%, #FF9F43 50%, #FF6B6B 50%, #FF6B6B 100%)',
                padding: '4rem 2rem',
                textAlign: 'center',
                color: 'white',
                position: 'relative'
            }}>
                <button
                    onClick={() => navigate('/play-now')}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        background: 'rgba(255,255,255,0.2)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '45px',
                        height: '45px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'white'
                    }}
                >
                    <ArrowLeft size={24} />
                </button>
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔗</div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1rem' }}>Join Friends!</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Enter the magic code to join the game! ✨</p>
            </section>

            {/* Input Form / Lobby */}
            <section style={{ padding: '4rem 2rem', background: 'var(--bg-color)', flex: 1 }}>
                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    background: 'var(--surface-color)',
                    padding: '3rem',
                    borderRadius: '30px',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(10px)',
                    textAlign: 'center'
                }}>
                    {!isMultiplayer ? (
                        <form onSubmit={handleJoin} style={{ display: 'grid', gap: '2rem' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: '800', marginBottom: '15px', fontSize: '1.3rem' }}>
                                    Paste the Room Code Here 🎈
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        placeholder="e.g. 5b2e-9d1a..."
                                        value={roomCode}
                                        onChange={(e) => {
                                            setRoomCode(e.target.value);
                                            setError('');
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '20px 25px',
                                            borderRadius: '20px',
                                            border: '4px solid var(--bg-color)',
                                            fontSize: '1.2rem',
                                            fontWeight: '700',
                                            outline: 'none',
                                            textAlign: 'center',
                                            transition: 'all 0.3s ease',
                                            background: 'white',
                                            color: '#2F3542',
                                            fontFamily: 'monospace'
                                        }}
                                    />
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        color: '#FF4757',
                                        fontWeight: '800',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <AlertCircle size={20} />
                                    {error}
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="btn btn-yellow"
                                style={{
                                    padding: '20px',
                                    fontSize: '1.4rem',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '15px'
                                }}
                            >
                                <Play size={28} />
                                JOIN GAME!
                            </motion.button>
                        </form>
                    ) : (
                        <div style={{ display: 'grid', gap: '2rem' }}>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                style={{ display: 'inline-block' }}
                            >
                                <Loader2 size={60} color="var(--primary-color)" />
                            </motion.div>

                            <div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem' }}>
                                    Connected to Room! 🎉
                                </h3>
                                <p style={{ opacity: 0.8, fontSize: '1.1rem' }}>
                                    Waiting for Host to start the match...
                                </p>
                            </div>

                            <div style={{
                                background: 'var(--bg-color)',
                                padding: '1.5rem',
                                borderRadius: '20px'
                            }}>
                                <label style={{ display: 'block', fontWeight: '800', marginBottom: '15px' }}>
                                    Players in Room
                                </label>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {players.map((p, i) => (
                                        <div
                                            key={p.id}
                                            style={{
                                                background: 'white',
                                                padding: '8px 16px',
                                                borderRadius: '50px',
                                                fontWeight: '800',
                                                border: '2px solid var(--primary-color)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}
                                        >
                                            {i === 0 ? '👑' : '👤'} {p.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}


                    <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.7, fontStyle: 'italic' }}>
                        Ask your friend for the code shown on their "Create Room" page! 🧒🤝👦
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JoinRoom;
