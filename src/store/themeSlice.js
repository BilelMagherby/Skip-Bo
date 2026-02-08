import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    avatar: '👨‍🚀', // Default avatar
    aiAvatar: '🤖',
    cardStyle: 'classic', // 'classic', 'modern', 'neon'
    websiteTheme: 'default', // 'default', 'dark', 'forest', 'sunset'
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        setAiAvatar: (state, action) => {
            state.aiAvatar = action.payload;
        },
        setCardStyle: (state, action) => {
            state.cardStyle = action.payload;
        },
        setWebsiteTheme: (state, action) => {
            state.websiteTheme = action.payload;
        },
    },
});

export const { setAvatar, setAiAvatar, setCardStyle, setWebsiteTheme } = themeSlice.actions;
export default themeSlice.reducer;
