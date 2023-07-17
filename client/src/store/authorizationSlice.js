import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    licaKey: false,
    melissaKey: false,
};

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        login: (state, action) => {
            const { licaKey, melissaKey } = action.payload;
            state.licaKey = { licaKey };
            state.melissaKey = { melissaKey };
        },
        logout: (state) => {
            state.licaKey = false;
            state.melissaKey = false;
        },
    },
});

export const { login, logout } = authorizationSlice.actions;
export default authorizationSlice.reducer;