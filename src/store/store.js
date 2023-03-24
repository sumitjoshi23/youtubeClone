import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import chatSlice from "./slices/chatSlice";
import searchSlice from "./slices/searchSlice";
import { signedInUserReducer } from "./slices/signedInUserSlice";
import videoSlice from "./slices/videoSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlice,
    video: videoSlice,
    chat: chatSlice,
    signedInUser: signedInUserReducer,
  },
});
export default store;
