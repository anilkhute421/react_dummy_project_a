// This file will store the Realtime messages.
import { createSlice } from "@reduxjs/toolkit";

export const pusherRealtimeSlice = createSlice({
  name: "pusherRealtime",
  initialState: {
    data: [],
    unReadCount: 0,
  },
  //This is pusher real time reducers.
  reducers: {
    pusherRealtimeSuccess: (state, action) => {
      if (action.payload) {
        state.data = action.payload.getMessage;
        state.unReadCount = action.payload.unReadCount;
      } else {
        state.data = [];
      }
    },
  },
});

//This is login actions.

export const { pusherRealtimeSuccess } = pusherRealtimeSlice.actions;
export default pusherRealtimeSlice.reducer;
