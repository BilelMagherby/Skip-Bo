import { createSlice } from '@reduxjs/toolkit';

// Helper to shuffle deck
const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const createDeck = () => {
    // 12 sets of cards 1-12 (144 cards) + 18 Skip-Bo cards (total 162)
    const cards = [];
    for (let i = 0; i < 12; i++) {
        for (let num = 1; num <= 12; num++) {
            cards.push({ type: 'number', value: num, id: generateId() });
        }
    }
    for (let i = 0; i < 18; i++) {
        cards.push({ type: 'skipbo', value: 'SB', id: generateId() });
    }
    return cards.sort(() => Math.random() - 0.5);
};


const initialState = {
    gameStatus: 'lobby', // 'lobby', 'playing', 'finished'
    players: [], // { id, name, hand: [], stockpile: [], discardPiles: [[], [], [], []] }
    currentPlayerIndex: 0,
    drawPile: [],
    buildingPiles: [[], [], [], []], // 4 piles in the center
    winner: null,
    messages: [], // Chat/Game logs
    aiStatus: '', // 'Thinking...', 'Drawing...', 'Playing...', etc.
    handRefilledThisTurn: false,
    completedPiles: [],
};


const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        addPlayer: (state, action) => {
            if (state.gameStatus !== 'lobby') return;
            const newPlayer = {
                id: generateId(),
                name: action.payload,

                hand: [],
                stockpile: [],
                discardPiles: [[], [], [], []],
            };
            state.players.push(newPlayer);
        },
        startGame: (state, action) => {
            if (state.players.length < 2) return;

            // Create and shuffle deck
            let deck = createDeck();

            // Deal stockpiles based on player count or custom payload
            const stockpileSize = action.payload?.stockpileSize || (state.players.length <= 4 ? 30 : 20);

            state.players.forEach(player => {
                const stock = deck.splice(0, stockpileSize);
                player.stockpile = stock;
                player.stockpileTop = stock.length > 0 ? stock[0] : null;
                // NEW: Deal 5 cards to each player's hand at start
                player.hand = deck.splice(0, 5);
            });


            // Set remaining deck as draw pile
            state.drawPile = deck;
            state.gameStatus = 'playing';
            state.currentPlayerIndex = 0;
            state.buildingPiles = [[], [], [], []];
            state.winner = null;
            state.completedPiles = []; // Store completed piles for reshuffling
        },
        startAiGame: (state) => {
            // Reset and add players
            state.players = [
                {
                    id: generateId(),
                    name: 'You',
                    hand: [],
                    stockpile: [],
                    discardPiles: [[], [], [], []],
                },
                {
                    id: generateId(),
                    name: 'AI Opponent',
                    hand: [],
                    stockpile: [],
                    discardPiles: [[], [], [], []],
                }
            ];

            // Create and shuffle deck
            let deck = createDeck();
            const stockpileSize = 30;

            state.players.forEach(player => {
                const stock = deck.splice(0, stockpileSize);
                player.stockpile = stock;
                player.stockpileTop = stock.length > 0 ? stock[0] : null;
                player.hand = deck.splice(0, 5);
            });

            state.drawPile = deck;
            state.gameStatus = 'playing';
            state.currentPlayerIndex = 0;
            state.buildingPiles = [[], [], [], []];
            state.winner = null;
            state.completedPiles = [];
            state.aiStatus = '';
        },
        drawCards: (state) => {
            const player = state.players[state.currentPlayerIndex];
            if (!player || !player.hand) return;
            const cardsNeeded = 5 - player.hand.length;

            if (cardsNeeded > 0) {
                // If draw pile is empty, reshuffle completed piles
                if ((!state.drawPile || state.drawPile.length === 0) && (state.completedPiles && state.completedPiles.length > 0)) {
                    state.drawPile = state.completedPiles.sort(() => Math.random() - 0.5);
                    state.completedPiles = [];
                }

                if (state.drawPile && state.drawPile.length > 0) {
                    const drawn = state.drawPile.splice(0, Math.min(cardsNeeded, state.drawPile.length));
                    player.hand.push(...drawn);
                }
            }
            state.handRefilledThisTurn = true;
        },

        playCardToBuildingPile: (state, action) => {
            const { cardId, pileIndex, source } = action.payload; // source: 'hand', 'stockpile', 'discard-0', etc.
            const player = state.players[state.currentPlayerIndex];
            const pile = state.buildingPiles[pileIndex];

            let card;
            let sourceList;

            if (source === 'hand') {
                sourceList = player.hand;
            } else if (source === 'stockpile') {
                sourceList = player.stockpile;
                // Rule: only play top card of stockpile (index 0)
                if (sourceList[0].id !== cardId) return;
            } else if (source.startsWith('discard-')) {
                const discardIndex = parseInt(source.split('-')[1]);
                sourceList = player.discardPiles ? player.discardPiles[discardIndex] : null;
                // Rule: only play top card of discard pile (last index)
                if (!sourceList || sourceList.length === 0 || sourceList[sourceList.length - 1].id !== cardId) return;
            } else {
                return;
            }


            const cardIndex = sourceList.findIndex(c => c.id === cardId);
            if (cardIndex === -1) return;
            card = sourceList[cardIndex];

            const currentPileCount = pile.length;
            const expectedValue = currentPileCount + 1; // 1 to 12

            let valid = false;
            if (card.type === 'skipbo') valid = true;
            else if (card.value === expectedValue) valid = true;

            if (valid) {
                // Remove from source
                sourceList.splice(cardIndex, 1);

                // If it was stockpile, update top card
                if (source === 'stockpile') {
                    player.stockpileTop = player.stockpile.length > 0 ? player.stockpile[0] : null;
                }

                // Add to pile
                pile.push({ ...card, effectiveValue: expectedValue });

                // Rule: Clear pile if it reaches 12
                if (expectedValue === 12) {
                    if (!state.completedPiles) state.completedPiles = [];
                    state.completedPiles.push(...state.buildingPiles[pileIndex]);
                    state.buildingPiles[pileIndex] = [];
                }


                // Rule: If hand is empty after playing to building pile, draw 5 more immediately
                if (source === 'hand' && player.hand.length === 0) {
                    if (state.currentPlayerIndex === 1) {
                        state.aiStatus = 'Hand empty! Drawing 5 more...';
                    }
                    gameSlice.caseReducers.drawCards(state);
                }

                // Check win condition
                if (player.stockpile.length === 0) {
                    state.winner = player.id;
                    state.gameStatus = 'finished';
                }
            }
        },
        discardAndEndTurn: (state, action) => {
            const { cardId, pileIndex } = action.payload;
            const playerIndex = state.currentPlayerIndex;
            const player = state.players[playerIndex];

            // Mandatory stockpile play rule - enforce for all human players
            // skip if 'force' is true (multiplayer sync)
            if (state.gameStatus === 'playing' && !action.payload.force) {
                const topStockCard = player.stockpile ? player.stockpile[0] : null;
                if (topStockCard) {
                    const canPlayStockpile = state.buildingPiles && state.buildingPiles.some(pile => {
                        if (!pile) return false;
                        const expectedValue = pile.length + 1;
                        return topStockCard.type === 'skipbo' || topStockCard.value === expectedValue;
                    });


                    if (canPlayStockpile) {
                        return; // Block local user from discarding if they have a stockpile play
                    }
                }
            }

            const cardIndex = player.hand.findIndex(c => c.id === cardId);
            if (cardIndex !== -1) {
                const card = player.hand.splice(cardIndex, 1)[0];
                player.discardPiles[pileIndex].push(card);

                // Next player
                state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
                state.aiStatus = state.currentPlayerIndex === 1 ? 'Thinking...' : '';
                state.handRefilledThisTurn = false;
            }
        },
        executeSingleAiAction: (state) => {
            const player = state.players ? state.players[state.currentPlayerIndex] : null;
            if (state.gameStatus !== 'playing' || state.currentPlayerIndex !== 1) return;
            if (!player) return;
            if (!player.hand) player.hand = [];
            if (!player.stockpile) player.stockpile = [];
            if (!player.discardPiles) player.discardPiles = [[], [], [], []];
            if (!state.buildingPiles || state.buildingPiles.length !== 4) state.buildingPiles = [[], [], [], []];

            // 0. Refill hand if it's empty (drawCards also handles reshuffling completed piles)
            if (player.hand.length === 0) {
                state.aiStatus = 'Refilling hand...';
                gameSlice.caseReducers.drawCards(state);
                // If we still couldn't draw anything, immediately end turn.
                if (player.hand.length === 0) {
                    state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
                    state.aiStatus = '';
                    state.handRefilledThisTurn = false;
                }
                return;
            }

            // 1. Try to play from stockpile (Priority)
            for (let i = 0; i < 4; i++) {
                const expectedValue = state.buildingPiles[i].length + 1;
                const topCard = player.stockpile[0];
                if (topCard && (topCard.type === 'skipbo' || topCard.value === expectedValue)) {
                    state.aiStatus = 'Playing stockpile...';
                    gameSlice.caseReducers.playCardToBuildingPile(state, {
                        payload: { cardId: topCard.id, pileIndex: i, source: 'stockpile' }
                    });
                    return;
                }
            }

            // 2. Try to play from hand
            for (let i = 0; i < 4; i++) {
                const expectedValue = state.buildingPiles[i].length + 1;
                const handCard = player.hand.find(c => c.type === 'skipbo' || c.value === expectedValue);
                if (handCard) {
                    state.aiStatus = 'Playing from hand...';
                    gameSlice.caseReducers.playCardToBuildingPile(state, {
                        payload: { cardId: handCard.id, pileIndex: i, source: 'hand' }
                    });
                    return;
                }
            }

            // 3. Try to play from discard piles
            for (let i = 0; i < 4; i++) {
                const expectedValue = state.buildingPiles[i].length + 1;
                for (let d = 0; d < 4; d++) {
                    const discardPile = player.discardPiles[d];
                    const discardCard = discardPile[discardPile.length - 1];
                    if (discardCard && (discardCard.type === 'skipbo' || discardCard.value === expectedValue)) {
                        state.aiStatus = 'Playing from discard...';
                        gameSlice.caseReducers.playCardToBuildingPile(state, {
                            payload: { cardId: discardCard.id, pileIndex: i, source: `discard-${d}` }
                        });
                        return;
                    }
                }
            }

            // 4. End turn by discarding
            state.aiStatus = 'Discarding...';
            const firstEmptyDiscard = player.discardPiles.findIndex(p => !p || p.length === 0);
            const discardPileIndex = firstEmptyDiscard !== -1 ? firstEmptyDiscard : 0;

            if (player.hand.length > 0) {
                const cardIndex = 0; // Always discard first card in hand
                const card = player.hand.splice(cardIndex, 1)[0];
                player.discardPiles[discardPileIndex].push(card);

                // End turn explicitly
                state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
                state.aiStatus = '';
                state.handRefilledThisTurn = false;
            } else {
                state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
                state.aiStatus = '';
                state.handRefilledThisTurn = false;
            }
        },
        resetGame: (state) => {
            Object.assign(state, initialState);
        },
        syncPlayers: (state, action) => {
            state.players = action.payload;
        },
        syncState: (state, action) => {
            return action.payload;
        }
    },
});



export const { addPlayer, startGame, startAiGame, drawCards, playCardToBuildingPile, discardAndEndTurn, executeSingleAiAction, resetGame, syncPlayers, syncState } = gameSlice.actions;


export default gameSlice.reducer;
