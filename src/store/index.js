import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
    reducer: {
        game: gameReducer,
        theme: themeReducer,
    },
});
