import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = [
  {
    id: 0,
    visitedDate: moment().format("YYYY-MM-DD"),
    note: "Trip Home",
    createdAt: moment().format("LLL"),
    apartment: "Gow Home",
    visitedPerson: "Frank A.",
  },
  {
    id: 1,
    visitedDate: "2023-04-30",
    note: "Trip Home",
    createdAt: moment().format("LLL"),
    apartment: "Sun Home",
    visitedPerson: "Elisha F",
  },
  {
    id: 2,
    visitedDate: "2023-11-12",
    note: "Trip Home",
    createdAt: moment().format("LLL"),
    apartment: "Moon Home",
    visitedPerson: "Sia D.",
  },
  {
    id: 3,
    visitedDate: "2023-05-12",
    note: "Trip Home",
    createdAt: moment().format("LLL"),
    apartment: "Saturn Home",
    visitedPerson: "Sezgin A.",
  },
  {
    id: 4,
    visitedDate: "2023-05-12",
    note: "Trip Home",
    createdAt: moment().format("LLL"),
    apartment: "Flower Home",
    visitedPerson: "Sezgin A.",
  },
];

const visitSlice = createSlice({
  name: "visit",
  initialState: {
    visit: initialState,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    addVisit: (state, { payload }) => {
      state.loading = false;
      state.visit = [...state.visit, payload];
    },
    deleteVisit: (state, { payload }) => {
      state.loading = false;
      state.visit = state?.visit?.filter((v) => v.id !== payload);
    },
    editVisit: (state, { payload }) => {
      state.loading = false;
      state.visit = payload;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, addVisit, deleteVisit, editVisit, fetchFail } =
  visitSlice.actions;

export default visitSlice.reducer;
