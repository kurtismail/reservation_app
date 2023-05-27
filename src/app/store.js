import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/usersSlice";
import apartmentsReducer from "../features/apartmentsSlice";
import visitReducer from "../features/visitSlice";
import storage from "redux-persist/lib/storage/"; // defaults to localStorage for web

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUsersReducer = persistReducer(persistConfig, usersReducer);
const persistedApartmentsReducer = persistReducer(
  persistConfig,
  apartmentsReducer
);
const persistedVisitReducer = persistReducer(persistConfig, visitReducer);

export const store = configureStore({
  reducer: {
    users: persistedUsersReducer,
    apartments: persistedApartmentsReducer,
    visit: persistedVisitReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
