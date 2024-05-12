// This file will store the login credentials.
import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "loginAuth",
  initialState: {
    data: {},
    token: null,
    permissions: {}
  },
  //This is login reducers.
  reducers: {
    loginSuccess: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.token = action.payload.token;
        state.permissions = action.payload.permissions;
      } else {
        state.data = {};
        state.token = null;
      }
    },
  },
});

//This is login actions.

export const { loginSuccess } = loginSlice.actions;
export default loginSlice.reducer;
