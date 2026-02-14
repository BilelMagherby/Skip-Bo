import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Plus, Share2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer, startGame, startAiGame, drawCards, playCardToBuildingPile, discardAndEndTurn, executeSingleAiAction } from '../store/gameSlice';
import multiplayerService from '../services/MultiplayerService';
import { store } from '../store';

const Game = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const gameState = useSelector((state) => state.game);
    const theme = useSelector((state) => state.theme);
    const multiplayer = useSelector((state) => state.multiplayer);
    const [selectedCard, setSelectedCard] = useState(null);

    // PERSPECTIVE & TURN LOGIC (Must be before useEffects)
    const localPlayerIndex = multiplayer.isMultiplayer
        ? (multiplayer.isHost ? 0 : 1)
        : 0;
    const remotePlayerIndex = localPlayerIndex === 0 ? 1 : 0;

    const isLocalPlayerTurn = multiplayer.isMultiplayer
        ? (multiplayer.isHost ? gameState.currentPlayerIndex === 0 : gameState.currentPlayerIndex === 1)
        : gameState.currentPlayerIndex === 0;

    const isPlayerTurn = isLocalPlayerTurn;

    const otherPlayerName = multiplayer.isMultiplayer
        ? (gameState.players[remotePlayerIndex]?.name || 'Friend')
        : 'AI';

    const currentPlayer = gameState.players[gameState.currentPlayerIndex];

    // If for some reason we navigate here but the game isn't rolling or data is missing, show a loader
    if (!gameState.players || gameState.gameStatus === 'lobby' || gameState.players.length < 2) {

        return (
            <div style={{
                width: '100vw',
                height: '100vh',
                background: 'var(--primary-color)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                gap: '2rem'
            }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                    <RotateCcw size={80} />
                </motion.div>
                <h2 style={{ fontSize: '2rem', fontWeight: '900' }}>Initializing Game...</h2>
                <p style={{ opacity: 0.8 }}>Dealing the cards, please wait! 🃏</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {multiplayer.isMultiplayer && (
                        <button
                            onClick={() => {
                                multiplayerService.sendData({ type: 'REQUEST_SYNC' });
                            }}
                            style={{ background: 'var(--accent-color)', color: 'black', border: 'none', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Sync Now ✨
                        </button>
                    )}
                    <button
                        onClick={() => navigate('/')}
                        style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer' }}
                    >
                        Back to Menu
                    </button>
                </div>

            </div>
        );
    }

    const [handAnim, setHandAnim] = useState({ show: false, x: 0, y: 0 });


    const triggerHandAnim = (x, y) => {
        setHandAnim({ show: true, x, y });
        setTimeout(() => setHandAnim({ show: false, x: 0, y: 0 }), 1000);
    };

    // AI TURN LOGIC
    useEffect(() => {
        // AI Turn logic: ONLY for local games
        if (multiplayer.isMultiplayer) return;

        let timer;
        if (gameState.gameStatus === 'playing' && gameState.currentPlayerIndex === 1) {
            timer = setTimeout(() => {
                dispatch(executeSingleAiAction());
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [gameState.currentPlayerIndex, gameState.gameStatus, gameState.aiStatus, multiplayer.isMultiplayer]);


    useEffect(() => {
        // Hand refill logic: 
        // 1. At the START of the turn, refill to 5
        // 2. During the turn, if hand is EMPTY, refill to 5
        if (gameState.gameStatus === 'playing' && isLocalPlayerTurn && currentPlayer) {
            if (currentPlayer.hand.length === 0 || (gameState.currentPlayerIndex === (multiplayer.isHost ? 0 : 1) && !gameState.handRefilledThisTurn)) {
                const timer = setTimeout(() => {
                    dispatch(drawCards());
                    if (multiplayer.isMultiplayer) {
                        multiplayerService.sendData({ type: 'DRAW_CARDS' });
                        // Also sync full state to be safe
                        setTimeout(() => {
                            multiplayerService.sendData({ type: 'SYNC_STATE', payload: store.getState().game });
                        }, 200);
                    }
                }, 400);
                return () => clearTimeout(timer);
            }
        }
    }, [gameState.currentPlayerIndex, gameState.gameStatus, gameState.players, dispatch, isLocalPlayerTurn, multiplayer.isMultiplayer, multiplayer.isHost]);






    const canPlayStockpile = isPlayerTurn && gameState.players[gameState.currentPlayerIndex]?.stockpileTop && (gameState.buildingPiles || []).some(pile => {
        if (!pile) return false;
        const expectedValue = pile.length + 1;
        const topStockCard = gameState.players[gameState.currentPlayerIndex]?.stockpileTop;
        if (!topStockCard) return false;
        return topStockCard.type === 'skipbo' || topStockCard.value === expectedValue;
    });



    const handleCardClick = (card, source) => {
        if (!isPlayerTurn) return;
        setSelectedCard({ card, source });
    };

    const handleBuildingPileClick = (pileIndex) => {
        if (!selectedCard || !isPlayerTurn) return;

        // Trigger hand animation
        const rects = document.querySelectorAll('.building-pile');
        if (rects[pileIndex]) {
            const rect = rects[pileIndex].getBoundingClientRect();
            triggerHandAnim(rect.left, rect.top);
        }

        const movePayload = {
            cardId: selectedCard.card.id,
            pileIndex,
            source: selectedCard.source
        };

        dispatch(playCardToBuildingPile(movePayload));

        if (multiplayer.isMultiplayer) {
            multiplayerService.sendData({ type: 'PLAY_CARD', payload: movePayload });
        }

        setSelectedCard(null);
    };

    const handleDiscard = (pileIndex) => {
        if (!selectedCard || !isPlayerTurn || selectedCard.source !== 'hand') return;

        // Trigger hand animation
        const rects = document.querySelectorAll('.discard-pile');
        if (rects[pileIndex]) {
            const rect = rects[pileIndex].getBoundingClientRect();
            triggerHandAnim(rect.left, rect.top);
        }

        const discardPayload = {
            cardId: selectedCard.card.id,
            pileIndex
        };

        dispatch(discardAndEndTurn(discardPayload));

        if (multiplayer.isMultiplayer) {
            multiplayerService.sendData({ type: 'DISCARD', payload: discardPayload });
        }

        setSelectedCard(null);
    };


    // AI Hand animation trigger
    useEffect(() => {
        if (gameState.currentPlayerIndex === 1 && gameState.aiStatus) {
            if (gameState.aiStatus.includes('Playing') || gameState.aiStatus.includes('Stockpile')) {
                triggerHandAnim(window.innerWidth / 2, 300);
            } else if (gameState.aiStatus.includes('Discarding')) {
                triggerHandAnim(window.innerWidth - 200, 300);
            }
        }
    }, [gameState.aiStatus, gameState.currentPlayerIndex]);

    const Card = ({ card, onClick, isSelected, size = 'normal', isFaceDown = false }) => {
        const sizes = {
            small: { width: '50px', height: '70px', fontSize: '1rem' },
            normal: { width: '80px', height: '115px', fontSize: '2rem' },
            large: { width: '100px', height: '140px', fontSize: '2.5rem' }
        };

        const cardSize = sizes[size];

        const getColors = () => {
            const styles = {
                volcano: {
                    1: 'linear-gradient(135deg, #1a0505 0%, #4a0000 100%)',
                    2: 'linear-gradient(135deg, #2D142C 0%, #510A32 100%)',
                    3: 'linear-gradient(135deg, #2b1010 0%, #800000 100%)',
                    4: 'linear-gradient(135deg, #1f0101 0%, #ae0001 100%)',
                    5: 'linear-gradient(135deg, #300101 0%, #750000 100%)',
                    6: 'linear-gradient(135deg, #1a0808 0%, #ff4500 100%)',
                    7: 'linear-gradient(135deg, #240b0b 0%, #ff8c00 100%)',
                    8: 'linear-gradient(135deg, #1a0505 0%, #ff0000 100%)',
                    9: 'linear-gradient(135deg, #2b0000 0%, #ffd700 100%)',
                    10: 'linear-gradient(135deg, #000000 0%, #4a0000 100%)',
                    11: 'linear-gradient(135deg, #1a0000 0%, #ff4d00 100%)',
                    12: 'linear-gradient(135deg, #000000 0%, #8b0000 100%)',
                    skipbo: 'radial-gradient(circle, #ff4500 0%, #ff8c00 50%, #000000 100%)',
                    back: 'repeating-linear-gradient(45deg, #1a0505, #1a0505 10px, #2b0000 10px, #2b0000 20px)'
                },
                tropical: {
                    1: '#4BCFFA', 2: '#0BE881', 3: '#FFD93D', 4: '#FF6B6B', 5: '#FBC531',
                    6: '#485460', 7: '#1DD1A1', 8: '#54A0FF', 9: '#FF9FF3', 10: '#00D2D3',
                    11: '#FECA57', 12: '#48DBFB', skipbo: '#FF4757', back: '#FAD390'
                },
                treasure: {
                    1: '#5d4037', 2: '#4e342e', 3: '#3e2723', 4: '#212121', 5: '#3e2723',
                    6: '#5d4037', 7: '#4e342e', 8: '#3e2723', 9: '#212121', 10: '#3e2723',
                    11: '#5d4037', 12: '#4e342e', skipbo: '#FFD700', back: '#3d2b1f'
                },
                neon: {
                    1: '#ff00ff', 2: '#00ffff', 3: '#00ff00', 4: '#ffff00', 5: '#ff0000',
                    6: '#0000ff', 7: '#ff8000', 8: '#8000ff', 9: '#ff0080', 10: '#00ff80',
                    11: '#80ff00', 12: '#ff0055', skipbo: '#f0f', back: '#000'
                }
            };
            return styles[theme.cardStyle] || {
                1: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                2: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
                3: 'linear-gradient(135deg, #A8E6CF 0%, #56CCF2 100%)',
                4: 'linear-gradient(135deg, #FFD93D 0%, #FFA502 100%)',
                5: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)',
                6: 'linear-gradient(135deg, #FF6B9D 0%, #C44569 100%)',
                7: 'linear-gradient(135deg, #0BE881 0%, #05C46B 100%)',
                8: 'linear-gradient(135deg, #4BCFFA 0%, #0FBCF9 100%)',
                9: 'linear-gradient(135deg, #FD79A8 0%, #E84393 100%)',
                10: 'linear-gradient(135deg, #FDCB6E 0%, #E17055 100%)',
                11: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)',
                12: 'linear-gradient(135deg, #00B894 0%, #00CEC9 100%)',
                skipbo: 'linear-gradient(135deg, #FF9F43 0%, #FF6B6B 50%, #9B59B6 100%)',
                back: 'linear-gradient(135deg, #5B5FC7 0%, #2D3436 100%)'
            };
        };

        const numberColors = getColors();

        const cardBackground = isFaceDown
            ? numberColors.back
            : (card.type === 'skipbo' ? numberColors.skipbo : numberColors[card.value] || numberColors[1]);

        // Theme specific styles
        const getCardStyles = () => {
            let base = {
                width: cardSize.width,
                height: cardSize.height,
                background: cardBackground,
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: cardSize.fontSize,
                fontWeight: '900',
                color: 'white',
                cursor: isFaceDown ? 'default' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
                transition: 'all 0.3s ease',
                willChange: 'transform'
            };

            switch (theme.cardStyle) {
                case 'volcano':
                    base.boxShadow = isSelected
                        ? '0 0 15px #ff4500, 0 8px 30px rgba(0,0,0,0.6)'
                        : '0 8px 25px rgba(0,0,0,0.8)';
                    base.border = '3px solid #ff4500';
                    base.color = '#ffda44';
                    base.textShadow = '0 0 8px #ff4500';
                    break;
                case 'tropical':
                    base.borderRadius = '24px';
                    base.border = '4px solid white';
                    base.boxShadow = isSelected
                        ? '0 0 20px #4BCFFA, 0 10px 25px rgba(0,0,0,0.2)'
                        : '0 8px 20px rgba(75, 207, 250, 0.3)';
                    base.color = card.type === 'skipbo' ? 'white' : '#2F3542';
                    break;
                case 'treasure':
                    base.border = '3px solid #FFD700';
                    base.borderRadius = '8px';
                    base.boxShadow = isSelected
                        ? '0 0 20px #FFD700, 0 10px 25px rgba(0,0,0,0.4)'
                        : '0 8px 20px rgba(0,0,0,0.4)';
                    base.color = '#FFD700';
                    base.textShadow = '0 0 10px rgba(255,215,0,0.5)';
                    break;
                case 'neon':
                    base.border = '2px solid #ff00ff';
                    base.boxShadow = isSelected
                        ? '0 0 20px #ff00ff, 0 0 20px #00ffff'
                        : '0 0 10px rgba(0, 255, 255, 0.3)';
                    base.textShadow = '0 0 8px #00ffff';
                    base.color = '#fff';
                    break;
                default:
                    base.boxShadow = isSelected
                        ? '0 0 0 4px #FFD93D, 0 8px 30px rgba(0,0,0,0.4)'
                        : '0 6px 15px rgba(0,0,0,0.3)';
                    base.border = '4px solid rgba(255,255,255,0.8)';
            }
            return base;
        };

        return (
            <motion.div
                animate={{
                    scale: 1,
                    opacity: 1,
                    y: isSelected ? -20 : 0
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                }}
                whileHover={{ scale: isFaceDown ? 1 : 1.05, zIndex: 100 }}
                whileTap={{ scale: isFaceDown ? 1 : 0.98 }}
                onClick={onClick}
                style={getCardStyles()}
            >
                {/* Sparkle effect */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        fontSize: '0.8rem'
                    }}
                >
                    ✨
                </motion.div>

                {!isFaceDown && (
                    <motion.div
                        style={{
                            fontSize: cardSize.fontSize,
                            fontWeight: '900',
                            textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
                            filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))'
                        }}
                    >
                        {card.type === 'skipbo' ? (card.effectiveValue || 'SB') : card.value}
                    </motion.div>
                )}
                {isFaceDown && (
                    <div style={{ fontSize: '1.2rem', opacity: 0.5, fontWeight: '800', fontStyle: 'italic' }}>
                        Skip-Bo
                    </div>
                )}

                {/* Sub-label for Skip-Bo */}
                {card.type === 'skipbo' && (
                    <div style={{
                        fontSize: '0.7rem',
                        position: 'absolute',
                        bottom: '8px',
                        background: 'rgba(0,0,0,0.2)',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: '800'
                    }}>
                        Skip-Bo
                    </div>
                )}

                {/* Bottom corner decoration */}
                <div style={{
                    position: 'absolute',
                    bottom: '3px',
                    left: '3px',
                    fontSize: '0.6rem',
                    opacity: 0.7,
                    fontWeight: '800'
                }}>
                    {card.type === 'skipbo' ? '⭐' : card.value}
                </div>

                {/* Shine effect */}
                <motion.div
                    animate={{
                        x: ['-100%', '200%']
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 2
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '30%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                        transform: 'skewX(-20deg)'
                    }}
                />
            </motion.div>
        );
    };

    if (gameState.gameStatus === 'lobby' || !currentPlayer) {
        return (
            <div style={{
                width: '100%',
                minHeight: '100vh',
                background: '#5B5FC7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎮</div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Loading Game...</h2>
                </div>
            </div>
        );
    }

    if (gameState.gameStatus === 'finished') {
        const winner = gameState.players.find(p => p.id === gameState.winner);
        return (
            <div style={{
                width: '100%',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #FFC048 0%, #6DCCDD 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                padding: '2rem'
            }}>
                <div style={{
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: '30px',
                    padding: '4rem',
                    backdropFilter: 'blur(10px)',
                    textAlign: 'center',
                    maxWidth: '600px'
                }}>
                    <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🏆</div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem' }}>
                        {winner?.name} Wins!
                    </h1>
                    <p style={{ fontSize: '1.3rem', marginBottom: '2rem', opacity: 0.9 }}>
                        Congratulations on emptying your stockpile!
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            className="btn btn-yellow"
                            onClick={() => {
                                dispatch({ type: 'game/resetGame' });
                                navigate('/play-now');
                            }}
                            style={{ fontSize: '1.1rem', padding: '14px 32px' }}
                        >
                            <RotateCcw size={20} />
                            Play Again
                        </button>
                        <button
                            className="btn btn-red"
                            onClick={() => navigate('/')}
                            style={{ fontSize: '1.1rem', padding: '14px 32px' }}
                        >
                            <ArrowLeft size={20} />
                            Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            background: 'var(--primary-color)',
            padding: '2rem',
            position: 'relative',
            overflowX: 'hidden',
            transition: 'background 0.5s ease',
            color: 'white'
        }}>
            {/* Hand Put Animation */}
            {handAnim.show && (
                <motion.div
                    initial={{ y: 800, x: handAnim.x, opacity: 0, rotate: -20 }}
                    animate={{ y: handAnim.y + 50, x: handAnim.x + 50, opacity: 1, rotate: 0 }}
                    style={{
                        position: 'fixed',
                        zIndex: 2000,
                        fontSize: '8rem',
                        pointerEvents: 'none',
                    }}
                >
                    ✋
                </motion.div>
            )}

            {/* Sidebar Avatars - Responsive */}
            <div style={{
                position: window.innerWidth > 768 ? 'fixed' : 'static',
                bottom: '40px',
                left: '40px',
                display: window.innerWidth > 768 ? 'flex' : 'none',
                alignItems: 'center',
                gap: '15px',
                zIndex: 100,
                background: 'rgba(0,0,0,0.3)',
                padding: '10px 20px',
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
                border: isPlayerTurn ? '3px solid #0BE881' : '1px solid rgba(255,255,255,0.2)'
            }}>
                <motion.div
                    animate={{ scale: isPlayerTurn ? [1, 1.1, 1] : 1 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ fontSize: '3.5rem' }}
                >
                    {theme.avatar}
                </motion.div>
                <div>
                    <div style={{ fontWeight: '900', fontSize: '1.2rem' }}>YOU</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                        {isPlayerTurn ? 'Your Turn' : 'Waiting...'}
                    </div>
                </div>
            </div>

            <div style={{
                position: window.innerWidth > 768 ? 'fixed' : 'static',
                top: '100px',
                right: '40px',
                display: window.innerWidth > 768 ? 'flex' : 'none',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                gap: '15px',
                zIndex: 100,
                background: 'rgba(0,0,0,0.3)',
                padding: '10px 20px',
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
                border: !isPlayerTurn ? '3px solid #FFD93D' : '1px solid rgba(255,255,255,0.2)'
            }}>
                <motion.div
                    animate={{ scale: !isPlayerTurn ? [1, 1.1, 1] : 1 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ fontSize: '3.5rem' }}
                >
                    {multiplayer.isMultiplayer ? '🧒' : theme.aiAvatar}
                </motion.div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '900', fontSize: '1.2rem' }}>
                        {otherPlayerName}
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                        {!isPlayerTurn ? 'Playing...' : 'Thinking...'}
                    </div>
                </div>
            </div>

            {/* Mobile Header Avatars */}
            <div style={{
                display: window.innerWidth <= 768 ? 'flex' : 'none',
                justifyContent: 'space-between',
                padding: '0.5rem 1rem',
                marginBottom: '1rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '15px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontSize: '2rem' }}>{theme.avatar}</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '800', color: isPlayerTurn ? '#0BE881' : 'white' }}>YOU</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row-reverse' }}>
                    <div style={{ fontSize: '2rem' }}>{multiplayer.isMultiplayer ? '🧒' : theme.aiAvatar}</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: '800', color: !isPlayerTurn ? '#FFD93D' : 'white' }}>
                        {otherPlayerName}
                    </div>
                </div>
            </div>


            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: window.innerWidth <= 600 ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                background: 'rgba(255,255,255,0.15)',
                padding: '1rem',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)'
            }}>
                <button
                    className="btn btn-red"
                    onClick={() => navigate('/play-now')}
                    style={{ fontSize: '0.9rem', padding: '8px 16px', width: window.innerWidth <= 600 ? '100%' : 'auto' }}
                >
                    <ArrowLeft size={16} />
                    Leave
                </button>

                <div style={{
                    fontSize: '1.2rem',
                    fontWeight: '800',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <motion.div
                        key={gameState.currentPlayerIndex}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        {isPlayerTurn ? "Your Turn" : `${gameState.players[gameState.currentPlayerIndex]?.name || otherPlayerName}'s Turn`}
                    </motion.div>
                </div>

                <button
                    className="btn btn-yellow"
                    onClick={() => {
                        if (multiplayer.isMultiplayer) {
                            multiplayerService.sendData({ type: 'RESTART_GAME' });
                        }
                        dispatch({ type: 'game/resetGame' });
                        window.location.reload();
                    }}
                    style={{ fontSize: '0.9rem', padding: '8px 16px', width: window.innerWidth <= 600 ? '100%' : 'auto' }}
                >
                    <RotateCcw size={16} />
                    Restart
                </button>
            </div>

            {/* Game Board */}
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'grid',
                gap: '1.5rem'
            }}>

                {/* Opponent (AI) Area */}
                <div style={{
                    background: 'rgba(91,95,199,0.3)',
                    borderRadius: '20px',
                    padding: '1rem',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: 'white',
                        marginBottom: '1rem'
                    }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0 }}>
                            {multiplayer.isMultiplayer ? '👤' : '🤖'} {otherPlayerName}
                        </h3>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Score: {gameState.players[remotePlayerIndex]?.score || 0}</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'white', fontSize: '0.7rem', marginBottom: '4px', fontWeight: '700' }}>STOCK ({gameState.players[remotePlayerIndex]?.stockpile?.length || 0})</div>
                            {gameState.players[remotePlayerIndex]?.stockpileTop && (
                                <Card card={gameState.players[remotePlayerIndex].stockpileTop} size="small" />
                            )}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'white', fontSize: '0.7rem', marginBottom: '4px', fontWeight: '700' }}>HAND</div>
                            <div style={{ display: 'flex', gap: '2px', maxWidth: '200px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                {gameState.players[remotePlayerIndex]?.hand?.map((card, i) => (
                                    <Card key={card.id || i} card={card} size="small" isFaceDown={true} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center - Building Piles */}
                <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: '800',
                        color: 'white',
                        marginBottom: '1rem',
                        textAlign: 'center'
                    }}>Building Piles</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: window.innerWidth <= 500 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                        gap: '1rem',
                        justifyItems: 'center'
                    }}>
                        {gameState.buildingPiles.map((pile, index) => (
                            <div
                                key={index}
                                onClick={() => handleBuildingPileClick(index)}
                                style={{
                                    width: window.innerWidth <= 500 ? '70px' : '90px',
                                    height: window.innerWidth <= 500 ? '100px' : '130px',
                                    background: pile.length > 0 ? '#0BE881' : 'rgba(255,255,255,0.3)',
                                    borderRadius: '10px',
                                    border: '2px dashed white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    cursor: selectedCard ? 'pointer' : 'default',
                                    transition: 'all 0.2s',
                                    position: 'relative'
                                }}
                            >
                                {pile.length > 0 ? (
                                    <Card card={pile[pile.length - 1]} size={window.innerWidth <= 500 ? 'small' : 'normal'} />
                                ) : (
                                    <div style={{ opacity: 0.5 }}>{index + 1}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Player Area */}
                <div style={{
                    background: 'rgba(91,95,199,0.3)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: 'white',
                        marginBottom: '1rem'
                    }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0 }}>👤 YOU</h3>
                        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Stock: {gameState.players[localPlayerIndex]?.stockpile?.length || 0}</div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '140px 1fr 1fr',
                        gap: '1.5rem'
                    }}>
                        {/* Player Stockpile */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'white', fontSize: '0.75rem', marginBottom: '8px', fontWeight: '700' }}>STOCKPILE</div>
                            {gameState.players[localPlayerIndex]?.stockpileTop && (
                                <Card
                                    card={gameState.players[localPlayerIndex].stockpileTop}
                                    size="normal"
                                    onClick={() => handleCardClick(gameState.players[localPlayerIndex].stockpileTop, 'stockpile')}
                                    isSelected={selectedCard?.card.id === gameState.players[localPlayerIndex].stockpileTop.id && selectedCard.source === 'stockpile'}
                                />
                            )}
                        </div>

                        {/* Player Hand */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'white', fontSize: '0.75rem', marginBottom: '8px', fontWeight: '700' }}>YOUR HAND</div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {gameState.players[localPlayerIndex]?.hand?.map((card, index) => (
                                    <Card
                                        key={card.id}
                                        card={card}
                                        size="normal"
                                        onClick={() => handleCardClick(card, 'hand')}
                                        isSelected={selectedCard?.card.id === card.id && selectedCard.source === 'hand'}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Player Discard Piles */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                color: 'white',
                                fontSize: '0.75rem',
                                marginBottom: '8px',
                                fontWeight: '700'
                            }}>DISCARDS</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                                {gameState.players[localPlayerIndex]?.discardPiles?.map((pile, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            if (selectedCard && selectedCard.source === 'hand') handleDiscard(index);
                                            else if (pile && pile.length > 0) handleCardClick(pile[pile.length - 1], `discard-${index}`);
                                        }}
                                        style={{
                                            height: '90px',
                                            background: 'rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            border: '2px dashed white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            position: 'relative'
                                        }}
                                    >
                                        {pile.length > 0 && (
                                            <Card
                                                card={pile[pile.length - 1]}
                                                size="small"
                                                isSelected={selectedCard?.card.id === pile[pile.length - 1].id && selectedCard.source === `discard-${index}`}
                                            />
                                        )}
                                        {pile.length === 0 && <Plus size={20} color="white" style={{ opacity: 0.3 }} />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Instructions Overlay */}
            {selectedCard && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: '-50%' }}
                    animate={{ opacity: 1, scale: 1, x: '-50%' }}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '50%',
                        background: 'rgba(0,0,0,0.9)',
                        color: 'white',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '12px',
                        zIndex: 100,
                        backdropFilter: 'blur(5px)',
                        textAlign: 'center',
                        width: '90%',
                        maxWidth: '400px',
                        border: '2px solid var(--accent-color)'
                    }}
                >
                    <div style={{ fontWeight: '800', color: 'var(--accent-color)', fontSize: '0.9rem' }}>CARD SELECTED</div>
                    <div style={{ fontSize: '0.8rem' }}>Click a Building Pile or Discard</div>
                    <button
                        onClick={() => setSelectedCard(null)}
                        style={{ marginTop: '8px', background: '#FF4757', border: 'none', color: 'white', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem' }}
                    >CANCEL</button>
                </motion.div>
            )}
        </div>
    );
};

export default Game;
