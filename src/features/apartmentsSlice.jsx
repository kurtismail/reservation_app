import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = [
  {
    id: 0,
    title: "Gow Home",
    price: "7000",
    createdAt: moment().format("LLL"),
    owner: "Sezgin A.",
    img: "https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=100",
  },
  {
    id: 1,
    title: "Sun Home",
    price: "1000",
    createdAt: moment().format("LLL"),
    owner: "Frank A.",
    img: "https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=100",
  },
  {
    id: 2,
    title: "Moon Home",
    price: "2000",
    createdAt: moment().format("LLL"),
    owner: "Elisha F.",
    img: "https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGFwYXJ0bWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    title: "Saturn Home",
    price: "3000",
    createdAt: moment().format("LLL"),
    owner: "Sia D.",
    img: "https://images.unsplash.com/photo-1580216643062-cf460548a66a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGFwYXJ0bWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=100",
  },
  {
    id: 4,
    title: "Felix Home",
    price: "8000",
    createdAt: moment().format("LLL"),
    owner: "Anthony M.",
    img: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGFwYXJ0bWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=100",
  },
  {
    id: 5,
    title: "Flower Home",
    price: "4000",
    createdAt: moment().format("LLL"),
    owner: "Suzan A.",
  },
  {
    id: 6,
    title: "Rexx Home",
    price: "9000",
    createdAt: moment().format("LLL"),
    owner: "Sezgin A.",
  },
];

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState: {
    apartments: initialState,
    loading: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    addApartments: (state, { payload }) => {
      state.loading = false;
      state.apartments = [...state.apartments, payload];
    },
    deleteApartments: (state, { payload }) => {
      state.loading = false;
      state.apartments = state?.apartments.filter((ap) => ap.id !== payload);
    },
    editApartments: (state, { payload }) => {
      state.loading = false;
      state.apartments = payload;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});
export const {
  deleteApartments,
  fetchFail,
  fetchStart,
  addApartments,
  editApartments,
} = apartmentsSlice.actions;

export default apartmentsSlice.reducer;
