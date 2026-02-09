import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isHost: false,
    peerId: null,
    connectedPeerId: null,
    isMultiplayer: false,
};

const multiplayerSlice = createSlice({
    name: 'multiplayer',
    initialState,
    reducers: {
        setMultiplayerInfo: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetMultiplayer: () => initialState,
    },
});

export const { setMultiplayerInfo, resetMultiplayer } = multiplayerSlice.actions;
export default multiplayerSlice.reducer;
