import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JoinRequestState {
	pendingCampIds: string[];
}

const initialState: JoinRequestState = {
	pendingCampIds: [],
};

const joinRequestSlice = createSlice({
	name: "joinRequest",
	initialState,
	reducers: {
		setPendingRequests: (
			state,
			action: PayloadAction<string[]>
		) => {
			state.pendingCampIds = action.payload;
		},

		addPendingRequest: (
			state,
			action: PayloadAction<string>
		) => {
			if (
				!state.pendingCampIds.includes(
					action.payload
				)
			) {
				state.pendingCampIds.push(
					action.payload
				);
			}
		},

		removePendingRequest: (
			state,
			action: PayloadAction<string>
		) => {
			state.pendingCampIds =
				state.pendingCampIds.filter(
					(id) => id !== action.payload
				);
		},
	},
});

export const {
	setPendingRequests,
	addPendingRequest,
	removePendingRequest,
} = joinRequestSlice.actions;

export default joinRequestSlice.reducer;