import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import favoriteReducer from "./slices/favoriteSlice";
import joinRequestReducer from "./slices/joinRequestSlice";
import profileReducer from "./slices/profileSlice";
import campReducer from "./slices/campSlice";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorite: favoriteReducer,
    joinRequest: joinRequestReducer,
    profile: profileReducer,
    camp: campReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;