import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import favoriteReducer from "./slices/favoriteSlice";
import joinRequestReducer from "./slices/joinRequestSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorite: favoriteReducer,
    joinRequest: joinRequestReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;