import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, loginSuccess, logoutSuccess, fetchFail } =
  usersSlice.actions;

export default usersSlice.reducer;
