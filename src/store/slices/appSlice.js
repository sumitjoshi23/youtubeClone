import { createSlice } from "@reduxjs/toolkit";

let appSlice = createSlice({
  name: "App",
  initialState: {
    isMenuOpen: true,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
  },
});

export const { toggleMenu, closeMenu } = appSlice.actions;
export default appSlice.reducer;
