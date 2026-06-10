import { createSlice } from "@reduxjs/toolkit";
import { Camp } from "../../types/Camp";

interface CampState {
	items: Camp[];
	page: number;
	totalCount: number;
}

const initialState: CampState = {
	items: [],
	page: 1,
	totalCount: 0,
};

const campSlice = createSlice({
	name: "camp",
	initialState,
	reducers: {
		setCamps: (state, action) => {
			state.items = action.payload.items;
			state.page = action.payload.page;
			state.totalCount = action.payload.totalCount;
		},
		appendCamps: (state, action) => {
			state.items.push(...action.payload.items);
			state.page = action.payload.page;
			state.totalCount = action.payload.totalCount;
		},
	},
});

export const { setCamps } = campSlice.actions;

export default campSlice.reducer;
