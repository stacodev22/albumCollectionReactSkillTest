import { combineReducers } from "redux";
import { albumReducer } from "./Redux/AblumToolKit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { configureStore } from "@reduxjs/toolkit";

// Combine the reducers
const rootReducer = combineReducers({
  albumReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // % Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REGISTER"],
      },
    }),
});

// % Create the persistor
export const persistor = persistStore(store);
