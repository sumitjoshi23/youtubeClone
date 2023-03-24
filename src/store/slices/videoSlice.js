import { createSlice } from "@reduxjs/toolkit";

let videoSlice = createSlice({
  name: "Video",
  initialState: {
    videos: [],
  },
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    // filterData: (state, action) => {
    //   state.video = [
    //     ...state.filter((s) =>
    //       s?.snippet.title.toLowerCase()?.includes(action.payload.toLowerCase())
    //     ),
    //   ];
    // },
  },
});

export const { setVideos, filterData } = videoSlice.actions;
export default videoSlice.reducer;
