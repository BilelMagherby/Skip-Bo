import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import themeReducer from './themeSlice';
import multiplayerReducer from './multiplayerSlice';

export const store = configureStore({
    reducer: {
        game: gameReducer,
        theme: themeReducer,
        multiplayer: multiplayerReducer,
    },
});

