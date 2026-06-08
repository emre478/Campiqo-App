import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../../types/UserProfile";

interface ProfileState {
	data: UserProfile | null;
	loading: boolean;
	error: string | null;
}

const initialState: ProfileState = {
	data: null,
	loading: false,
	error: null,
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setProfile: (
			state,
			action: PayloadAction<UserProfile>
		) => {
			state.data = action.payload;
		},

		clearProfile: (state) => {
			state.data = null;
		},
	},
});

export const { setProfile, clearProfile } =
	profileSlice.actions;

export default profileSlice.reducer;