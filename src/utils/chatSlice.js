import { createSlice } from "@reduxjs/toolkit";
import { LIVECHAT_OFFSET } from "./constants";

let chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.splice(LIVECHAT_OFFSET, 1);

      state.messages.unshift(action.payload);
    },
  },
});
export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
