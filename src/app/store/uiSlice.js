import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openUserMenu(state) {
      state.isUserMenuOpen = true;
    },
    closeUserMenu(state) {
      state.isUserMenuOpen = false;
    },
    toggleUserMenu(state) {
      state.isUserMenuOpen = !state.isUserMenuOpen;
    },
  },
});

export const { openUserMenu, closeUserMenu, toggleUserMenu } = uiSlice.actions;
export default uiSlice.reducer;