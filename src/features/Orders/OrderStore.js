import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "OrderSection",
  initialState: {
    addOrder: {},
    activeSelectedSection: 1,
  },
  reducers: {
    orderSection: (state, action) => {
      if (action.payload?.values) {
        state.addOrder = action.payload.values;
      }
      if (action.payload?.tabValue) {
        state.activeSelectedSection = action.payload.tabValue;
      }
    },
  },
});

export const { orderSection } = orderSlice.actions;
export default orderSlice.reducer;
