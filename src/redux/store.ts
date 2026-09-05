import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { logout } from "./slices/authSlice";
import campReducer from "./slices/campSlice";
import favoriteReducer from "./slices/favoriteSlice";
import joinRequestReducer from "./slices/joinRequestSlice";
import notificationReducer from "./slices/notificationSlice";
import profileReducer from "./slices/profileSlice";

const appReducer = combineReducers({
	auth: authReducer,
	favorite: favoriteReducer,
	joinRequest: joinRequestReducer,
	profile: profileReducer,
	camp: campReducer,
	notification: notificationReducer,
});

const rootReducer: typeof appReducer = (state, action) => {
	if (logout.match(action)) {
		return appReducer(undefined, action);
	}

	return appReducer(state, action);
};

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
