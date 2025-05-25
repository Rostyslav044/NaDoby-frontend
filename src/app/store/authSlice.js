
import { createSlice } from '@reduxjs/toolkit';
import { signIn, signOut, useSession } from "next-auth/react"
const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
    //   state.user = action.payload;
      localStorage.setItem('auth_token', action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      signOut();
      localStorage.removeItem('auth_token');
    },
    loadFromStorage(state) {
      const stored = localStorage.getItem('auth_token');
      if (stored) {
        state.isAuthenticated = true;
        // state.user = JSON.parse(stored);
      }
    },
  },
});

export const { login, logout, loadFromStorage } = authSlice.actions;

export default authSlice.reducer;
