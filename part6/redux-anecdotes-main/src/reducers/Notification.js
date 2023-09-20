import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: "",
};

const notificationreducer = createSlice({
  name: "Notification",
  initialState,
  reducers: {
    OnNotification: (state, action) => {
      state.isLoading = true;
      state.data = action.payload;
      return state;
    },
    OffNotification: (state, action) => {
      state.data = "";
      state.isLoading = false;
    },
  },
});
export const { OnNotification, OffNotification } = notificationreducer.actions;
export default notificationreducer.reducer;
