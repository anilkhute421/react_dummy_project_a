// This file will store the login credentials.
import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "languageDirection",
  initialState: {
    language: "en",
    direction: "ltr",
  },
 

  reducers: {
    dashboardDirection: (state, action) => {
      if (action.payload) {
        state.language = action.payload.language;
        state.direction = action.payload.direction;
      } else {
        state.language = "en";
        state.direction = "ltr";
      }
    }
  },
});

//This is login actions.

export const { dashboardDirection } = dashboardSlice.actions;
export default dashboardSlice.reducer;
