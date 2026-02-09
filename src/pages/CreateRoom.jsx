import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Settings, Lock, Globe, ArrowLeft, Play, Layout, Copy, Check } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import multiplayerService from '../services/MultiplayerService';
import { addPlayer, startGame } from '../store/gameSlice';
import { store } from '../store';




const CreateRoom = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { peerId } = useSelector(state => state.multiplayer);
    const [roomName, setRoomName] = useState("My Awesome Room");
    const [maxPlayers, setMaxPlayers] = useState(4);
    const [privacy, setPrivacy] = useState("Public");
    const [deckSize, setDeckSize] = useState(30);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        dispatch({ type: 'game/resetGame' });
        multiplayerService.startHosting();
        dispatch(addPlayer('Host (You)'));
    }, [dispatch]);


    const copyToClipboard = () => {
        navigator.clipboard.writeText(peerId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };


    return (
        <div style={{ width: '100%', position: 'relative' }}>
            {/* Header / Hero */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color) 50%, var(--secondary-color) 50%, var(--secondary-color) 100%)',
                padding: '4rem 2rem',
                textAlign: 'center',
                color: 'white'
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
                <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1rem' }}>Create Room 🎮</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Set up your private game and invite friends!</p>
            </section>

            {/* Configuration Form */}
            <section style={{ padding: '4rem 2rem', background: 'var(--bg-color)', minHeight: '60vh' }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    background: 'var(--surface-color)',
                    padding: '3rem',
                    borderRadius: '30px',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {/* Room ID / Sharing */}
                        <div style={{
                            background: 'var(--bg-color)',
                            padding: '1.5rem',
                            borderRadius: '20px',
                            border: '2px dashed var(--primary-color)',
                            textAlign: 'center'
                        }}>
                            <label style={{ display: 'block', fontWeight: '800', marginBottom: '10px', color: 'var(--primary-color)' }}>
                                Share this Room Code with friends! 🎈
                            </label>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '15px'
                            }}>
                                <span style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '900',
                                    letterSpacing: '2px',
                                    fontFamily: 'monospace'
                                }}>
                                    {peerId || 'Generating...'}
                                </span>
                                {peerId && (
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={copyToClipboard}
                                        style={{
                                            background: 'var(--primary-color)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '10px',
                                            padding: '8px 12px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            fontSize: '0.9rem',
                                            fontWeight: '700'
                                        }}
                                    >
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                        {copied ? 'Copied!' : 'Copy'}
                                    </motion.button>
                                )}
                            </div>
                        </div>

                        {/* Joined Players */}
                        <div style={{
                            background: 'var(--bg-color)',
                            padding: '1.5rem',
                            borderRadius: '20px',
                            marginTop: '1rem'
                        }}>
                            <label style={{ display: 'block', fontWeight: '800', marginBottom: '15px' }}>
                                Joined Players 👥
                            </label>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {useSelector(state => state.game.players).map((p, i) => (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        key={p.id}
                                        style={{
                                            background: 'white',
                                            padding: '10px 20px',
                                            borderRadius: '50px',
                                            fontWeight: '800',
                                            border: '2px solid var(--primary-color)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        {i === 0 ? '👑' : '👤'} {p.name}
                                    </motion.div>
                                ))}
                                {useSelector(state => state.game.players).length < 2 && (
                                    <div style={{ opacity: 0.5, fontStyle: 'italic', padding: '10px' }}>
                                        Waiting for friends to join...
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontWeight: '800', marginBottom: '10px', fontSize: '1.1rem' }}>
                                <Layout size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                Room Name
                            </label>
                            <input
                                type="text"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '15px 20px',
                                    borderRadius: '15px',
                                    border: '3px solid var(--bg-color)',
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                            />
                        </div>


                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {/* Max Players */}
                            <div>
                                <label style={{ display: 'block', fontWeight: '800', marginBottom: '10px', fontSize: '1.1rem' }}>
                                    <Users size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                    Max Players
                                </label>
                                <select
                                    value={maxPlayers}
                                    onChange={(e) => setMaxPlayers(Number(e.target.value))}
                                    style={{
                                        width: '100%',
                                        padding: '15px 20px',
                                        borderRadius: '15px',
                                        border: '3px solid var(--bg-color)',
                                        fontSize: '1rem',
                                        fontWeight: '700'
                                    }}
                                >
                                    {[2, 3, 4, 5, 6].map(num => (
                                        <option key={num} value={num}>{num} Players</option>
                                    ))}
                                </select>
                            </div>

                            {/* Deck Size */}
                            <div>
                                <label style={{ display: 'block', fontWeight: '800', marginBottom: '10px', fontSize: '1.1rem' }}>
                                    <Settings size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                    Stock Pile Size
                                </label>
                                <select
                                    value={deckSize}
                                    onChange={(e) => setDeckSize(Number(e.target.value))}
                                    style={{
                                        width: '100%',
                                        padding: '15px 20px',
                                        borderRadius: '15px',
                                        border: '3px solid var(--bg-color)',
                                        fontSize: '1rem',
                                        fontWeight: '700'
                                    }}
                                >
                                    {[10, 20, 30].map(num => (
                                        <option key={num} value={num}>{num} Cards</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Privacy */}
                        <div>
                            <label style={{ display: 'block', fontWeight: '800', marginBottom: '10px', fontSize: '1.1rem' }}>
                                Privacy Setting
                            </label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {['Public', 'Private'].map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => setPrivacy(mode)}
                                        style={{
                                            flex: 1,
                                            padding: '15px',
                                            borderRadius: '15px',
                                            border: 'none',
                                            background: privacy === mode ? 'var(--primary-color)' : 'var(--bg-color)',
                                            color: privacy === mode ? 'white' : 'var(--text-color)',
                                            fontWeight: '800',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {mode === 'Public' ? <Globe size={18} /> : <Lock size={18} />}
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-yellow"
                                onClick={() => {
                                    dispatch(startGame({ stockpileSize: deckSize }));
                                    // Give redux a tiny moment to update state before sending
                                    setTimeout(() => {
                                        const fullState = store.getState().game;
                                        multiplayerService.sendData({ type: 'START_GAME', payload: fullState });
                                        navigate('/game');
                                    }, 100);
                                }}

                                disabled={useSelector(state => state.game.players).length < 2 && privacy === 'Private'}
                                style={{
                                    padding: '20px 60px',
                                    fontSize: '1.3rem',
                                    width: '100%',
                                    opacity: (useSelector(state => state.game.players).length < 2 && privacy === 'Private') ? 0.6 : 1,
                                    cursor: (useSelector(state => state.game.players).length < 2 && privacy === 'Private') ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <Play size={24} />
                                Start Multiplayer Match!
                            </motion.button>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default CreateRoom;
