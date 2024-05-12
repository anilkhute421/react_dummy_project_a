import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profileDetails",
  initialState: {
    restaurantDetails: {},
  },
  reducers: {
    profileUpdated: (state, data) => {
      if (data.payload) {
        state.restaurantDetails = data.payload;
      } else {
        state.restaurantDetails = {};
      }
    },
  },
});

export const { profileUpdated } = profileSlice.actions;
export default profileSlice.reducer;
