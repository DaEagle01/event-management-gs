import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: null,
        loading: false
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload; 
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("accessToken");
        }
    },
});

export const { setLoading, setUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;
