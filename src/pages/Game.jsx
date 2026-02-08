import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer, startGame, drawCards, playCardToBuildingPile, discardAndEndTurn, executeSingleAiAction } from '../store/gameSlice';

const Game = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const gameState = useSelector((state) => state.game);
    const theme = useSelector((state) => state.theme);
    const [selectedCard, setSelectedCard] = useState(null);
    const [handAnim, setHandAnim] = useState({ show: false, x: 0, y: 0 });

    const triggerHandAnim = (x, y) => {
        setHandAnim({ show: true, x, y });
        setTimeout(() => setHandAnim({ show: false, x: 0, y: 0 }), 1000);
    };

    useEffect(() => {
        // Initialize game with player and AI
        if (gameState.gameStatus === 'lobby' && (gameState.players.length === 0 || !gameState.players)) {
            dispatch(addPlayer('You'));
            dispatch(addPlayer('AI Opponent'));
            setTimeout(() => {
                dispatch(startGame());
            }, 100);
        }
    }, [dispatch, gameState.gameStatus, gameState.players]);

    useEffect(() => {
        // AI Turn logic: Execute one action at a time with a delay
        let timer;
        // ONLY run if it is AI turn (index 1)
        if (gameState.gameStatus === 'playing' && gameState.currentPlayerIndex === 1) {
            timer = setTimeout(() => {
                dispatch(executeSingleAiAction());
            }, 3000); // 3s delay for deliberate moves
        }
        return () => clearTimeout(timer);
    }, [gameState.currentPlayerIndex, gameState.gameStatus, gameState.aiStatus, gameState.players, gameState.buildingPiles, dispatch]);

    useEffect(() => {
        // Hand refill logic: Draw 5 more only IF hand is empty
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        if (gameState.gameStatus === 'playing' && currentPlayer && currentPlayer.hand.length === 0) {
            // Short delay before drawing to let player see they empty their hand
            const timer = setTimeout(() => {
                dispatch(drawCards());
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [gameState.currentPlayerIndex, gameState.gameStatus, gameState.players, dispatch]);

    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const isPlayerTurn = gameState.currentPlayerIndex === 0;

    const canPlayStockpile = isPlayerTurn && gameState.players[0]?.stockpileTop && gameState.buildingPiles.some(pile => {
        const expectedValue = pile.length + 1;
        const topStockCard = gameState.players[0].stockpileTop;
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

        dispatch(playCardToBuildingPile({
            cardId: selectedCard.card.id,
            pileIndex,
            source: selectedCard.source
        }));
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

        dispatch(discardAndEndTurn({
            cardId: selectedCard.card.id,
            pileIndex
        }));
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

            {/* Sidebar Avatars */}
            <div style={{
                position: 'fixed',
                bottom: '40px',
                left: '40px',
                display: 'flex',
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
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Playing...</div>
                </div>
            </div>

            <div style={{
                position: 'fixed',
                top: '100px',
                right: '40px',
                display: 'flex',
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
                    {theme.aiAvatar}
                </motion.div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '900', fontSize: '1.2rem' }}>AI</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Opponent</div>
                </div>
            </div>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                background: 'rgba(255,255,255,0.15)',
                padding: '1rem 2rem',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)'
            }}>
                <button
                    className="btn btn-red"
                    onClick={() => navigate('/play-now')}
                    style={{ fontSize: '1rem', padding: '10px 20px' }}
                >
                    <ArrowLeft size={18} />
                    Leave Game
                </button>

                <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <motion.div
                        key={gameState.currentPlayerIndex}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        {isPlayerTurn ? "Your Turn" : "AI's Turn"}
                    </motion.div>
                    {!isPlayerTurn && gameState.aiStatus && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                fontSize: '0.9rem',
                                color: '#FFD93D',
                                marginTop: '0.3rem',
                                fontStyle: 'italic',
                                fontWeight: '700'
                            }}
                        >
                            {gameState.aiStatus}
                        </motion.div>
                    )}
                </div>

                <button
                    className="btn btn-yellow"
                    onClick={() => {
                        dispatch({ type: 'game/resetGame' });
                        window.location.reload();
                    }}
                    style={{ fontSize: '1rem', padding: '10px 20px' }}
                >
                    <RotateCcw size={18} />
                    Restart
                </button>
            </div>

            {/* Game Board */}
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'grid',
                gap: '2rem'
            }}>

                {/* Opponent (AI) Area */}
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
                        <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>
                            🤖 AI Opponent
                        </h3>
                        <div style={{ fontSize: '1rem', opacity: 0.9 }}>
                            Points: {gameState.players[1]?.score || 0}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                        {/* AI Stockpile */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'white', fontSize: '0.8rem', marginBottom: '5px', fontWeight: '700' }}>STOCKPILE ({gameState.players[1]?.stockpile.length})</div>
                            {gameState.players[1]?.stockpileTop && (
                                <Card card={gameState.players[1].stockpileTop} size="normal" />
                            )}
                        </div>

                        {/* AI Hand (Face down but using Card for animations) */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'white', fontSize: '0.8rem', marginBottom: '5px', fontWeight: '700' }}>HAND</div>
                            <div style={{ display: 'flex', gap: '5px', maxWidth: '250px', justifyContent: 'center' }}>
                                {gameState.players[1]?.hand.map((card, i) => (
                                    <Card key={card.id || i} card={card} size="small" isFaceDown={true} />
                                ))}
                            </div>
                        </div>

                        {/* AI Discard Piles */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'white', fontSize: '0.8rem', marginBottom: '5px', fontWeight: '700' }}>DISCARDS</div>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                {gameState.players[1]?.discardPiles.map((pile, i) => (
                                    <div key={i} style={{
                                        width: '50px',
                                        height: '70px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '5px',
                                        border: '1px dashed white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {pile.length > 0 && <Card card={pile[pile.length - 1]} size="small" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center - Building Piles */}
                <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    padding: '2rem',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        color: 'white',
                        marginBottom: '1.5rem',
                        textAlign: 'center'
                    }}>
                        Building Piles (1-12)
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1.5rem',
                        justifyItems: 'center'
                    }}>
                        {gameState.buildingPiles.map((pile, index) => (
                            <div
                                key={index}
                                className="building-pile"
                                onClick={() => handleBuildingPileClick(index)}
                                style={{
                                    width: '100px',
                                    height: '140px',
                                    background: pile.length > 0 ? '#0BE881' : 'rgba(255,255,255,0.3)',
                                    borderRadius: '12px',
                                    border: '3px dashed white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2.5rem',
                                    fontWeight: '900',
                                    color: 'white',
                                    cursor: selectedCard ? 'pointer' : 'default',
                                    transition: 'all 0.2s',
                                    position: 'relative',
                                    boxShadow: pile.length > 0 ? '0 8px 15px rgba(0,0,0,0.2)' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedCard) e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                {pile.length > 0 ? (
                                    <Card card={pile[pile.length - 1]} size="large" />
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
                        <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>
                            👤 You
                        </h3>
                        <div style={{ fontSize: '1rem', opacity: 0.9 }}>
                            Discard to end turn
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                        {/* Player Stockpile */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'white', fontSize: '0.9rem', marginBottom: '8px', fontWeight: '700' }}>STOCKPILE ({gameState.players[0]?.stockpile.length})</div>
                            {gameState.players[0]?.stockpileTop && (
                                <Card
                                    card={gameState.players[0].stockpileTop}
                                    size="large"
                                    onClick={() => handleCardClick(gameState.players[0].stockpileTop, 'stockpile')}
                                    isSelected={selectedCard?.card.id === gameState.players[0].stockpileTop.id && selectedCard.source === 'stockpile'}
                                />
                            )}
                        </div>

                        {/* Player Hand */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'white', fontSize: '0.9rem', marginBottom: '8px', fontWeight: '700' }}>YOUR HAND</div>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {gameState.players[0]?.hand.map((card, index) => (
                                    <Card
                                        key={card.id}
                                        card={card}
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
                                fontSize: '0.9rem',
                                marginBottom: '8px',
                                fontWeight: '700',
                                color: canPlayStockpile ? '#FFD93D' : 'white'
                            }}>
                                DISCARD PILES
                                {canPlayStockpile && (
                                    <div style={{ fontSize: '0.7rem', color: '#FF6B6B', marginTop: '4px' }}>
                                        ⚠ MUST PLAY FROM STOCKPILE FIRST
                                    </div>
                                )}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                                {gameState.players[0]?.discardPiles.map((pile, index) => (
                                    <div
                                        key={index}
                                        className="discard-pile"
                                        onClick={() => {
                                            if (selectedCard && selectedCard.source === 'hand') {
                                                handleDiscard(index);
                                            } else if (pile.length > 0) {
                                                handleCardClick(pile[pile.length - 1], `discard-${index}`);
                                            }
                                        }}
                                        style={{
                                            minHeight: '115px',
                                            background: 'rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            border: '2px dashed white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            position: 'relative'
                                        }}
                                    >
                                        {pile.length > 0 && (
                                            <Card
                                                card={pile[pile.length - 1]}
                                                size="normal"
                                                isSelected={selectedCard?.card.id === pile[pile.length - 1].id && selectedCard.source === `discard-${index}`}
                                            />
                                        )}
                                        {pile.length === 0 && <Plus size={24} color="white" style={{ opacity: 0.3 }} />}
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
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0,0,0,0.8)',
                        color: 'white',
                        padding: '1rem 2rem',
                        borderRadius: '15px',
                        zIndex: 100,
                        backdropFilter: 'blur(5px)',
                        textAlign: 'center',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        border: '2px solid #FFD93D'
                    }}
                >
                    <div style={{ fontWeight: '800', color: '#FFD93D', marginBottom: '5px' }}>CARD SELECTED!</div>
                    <div style={{ fontSize: '0.9rem' }}>
                        Click a <b>Building Pile</b> to Play <br />
                        {selectedCard.source === 'hand' && <span>or a <b>Discard Pile</b> to end turn</span>}
                    </div>
                    <button
                        onClick={() => setSelectedCard(null)}
                        style={{
                            marginTop: '10px',
                            background: '#FF4757',
                            border: 'none',
                            color: 'white',
                            padding: '5px 15px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: '700'
                        }}
                    >
                        CANCEL
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default Game;
