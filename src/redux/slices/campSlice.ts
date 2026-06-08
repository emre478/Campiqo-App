import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Camp } from "../../types/Camp";

interface CampState {
	items: Camp[];
}

const initialState: CampState = {
	items: [],
};

const campSlice = createSlice({
	name: "camp",
	initialState,
	reducers: {
		setCamps: (state, action: PayloadAction<Camp[]>) => {
			state.items = action.payload;
		},
	},
});

export const { setCamps } = campSlice.actions;

export default campSlice.reducer;
