import { createSlice } from "@reduxjs/toolkit";

const signedInUserSlice = createSlice({
  name: "signedInUserSlice",
  initialState: {
    user: null,
    profile: null,
  },
  reducers: {
    setSignedInUser(state, action) {
      state.user = action.payload;
    },
    setSignedInUserProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

export const { setSignedInUser, setSignedInUserProfile } =
  signedInUserSlice.actions;
export const signedInUserReducer = signedInUserSlice.reducer;
