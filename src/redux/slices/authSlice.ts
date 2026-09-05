import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthenticatedUserResponse } from "../../generated/api/models";

interface AuthState {
	user: AuthenticatedUserResponse | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSuccess: (
			state,
			action: PayloadAction<AuthenticatedUserResponse>
		) => {
			state.user = action.payload;
			state.isAuthenticated = true;
		},

		logout: (state) => {
			state.user = null;
			state.isAuthenticated = false;
		},
	},
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
