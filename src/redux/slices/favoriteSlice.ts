import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
	items: any[];
	loading: boolean;
	error: string | null;
}

const initialState: FavoriteState = {
	items: [],
	loading: false,
	error: null,
};

const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		setFavorites: (state, action: PayloadAction<any[]>) => {
			state.items = action.payload;
		},

		addFavorite: (state, action: PayloadAction<any>) => {
			const exists = state.items.some(
				(x) => x.id === action.payload.id
			);

			if (!exists) {
				state.items.push(action.payload);
			}
		},

		removeFavorite: (
			state,
			action: PayloadAction<string>
		) => {
			state.items = state.items.filter(
				(x) => x.id !== action.payload
			);
		},
	},
});

export const {
	setFavorites,
	addFavorite,
	removeFavorite,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;