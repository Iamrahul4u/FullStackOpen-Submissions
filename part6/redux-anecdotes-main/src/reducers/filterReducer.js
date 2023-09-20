import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
};

const filterReducer = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setFilter } = filterReducer.actions;
export default filterReducer.reducer;
