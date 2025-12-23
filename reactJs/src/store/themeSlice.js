import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        currentTheme: getInitialTheme(),
    },
    reducers: {
        toggleTheme: (state) => {
            state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.currentTheme);
            document.documentElement.setAttribute('data-theme', state.currentTheme);
        },
        setTheme: (state, action) => {
            state.currentTheme = action.payload;
            localStorage.setItem('theme', state.currentTheme);
            document.documentElement.setAttribute('data-theme', state.currentTheme);
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
