import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    avatar: '👨‍🚀',
    aiAvatar: '🤖',
    cardStyle: 'classic',
    websiteTheme: 'default',
    soundEnabled: true,
    musicEnabled: true,
    notificationsEnabled: true,
    tournamentAlertsEnabled: true,
    language: 'English',
    username: 'Player123',
    email: 'player@skipbo.com',
    profileVisibility: 'Public',
    showOnlineStatus: true,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setAvatar: (state, action) => { state.avatar = action.payload; },
        setAiAvatar: (state, action) => { state.aiAvatar = action.payload; },
        setCardStyle: (state, action) => { state.cardStyle = action.payload; },
        setWebsiteTheme: (state, action) => { state.websiteTheme = action.payload; },
        setSoundEnabled: (state, action) => { state.soundEnabled = action.payload; },
        setMusicEnabled: (state, action) => { state.musicEnabled = action.payload; },
        setNotificationsEnabled: (state, action) => { state.notificationsEnabled = action.payload; },
        setTournamentAlertsEnabled: (state, action) => { state.tournamentAlertsEnabled = action.payload; },
        setLanguage: (state, action) => { state.language = action.payload; },
        setUsername: (state, action) => { state.username = action.payload; },
        setEmail: (state, action) => { state.email = action.payload; },
        setProfileVisibility: (state, action) => { state.profileVisibility = action.payload; },
        setShowOnlineStatus: (state, action) => { state.showOnlineStatus = action.payload; },
        resetSettings: () => initialState,
    },
});

export const {
    setAvatar, setAiAvatar, setCardStyle, setWebsiteTheme,
    setSoundEnabled, setMusicEnabled, setNotificationsEnabled,
    setTournamentAlertsEnabled, setLanguage, setUsername,
    setEmail, setProfileVisibility, setShowOnlineStatus,
    resetSettings
} = themeSlice.actions;

export default themeSlice.reducer;

