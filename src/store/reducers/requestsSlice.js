import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  reqs: [],
  loading: false,
  error: null,
};




const requestsSlice = createSlice({
  name: "req",
  initialState,
  reducers: {},
  extraReducers: (builder) => { },
});
export const { } = requestsSlice.actions;
export default requestsSlice.reducer;
