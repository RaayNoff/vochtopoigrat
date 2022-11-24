import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISearchState } from "../../models/interfaces/ISearchState";
import { ApiSearchTypes } from "../../types/api";
import { fetchSearch } from "../action-creators/Search.actions";

const initialState: ISearchState = {
	isSearchActive: false,
	searchQuery: "",
	searchResult: [],
	isLoading: false,
	error: null,
};

export const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		setActive: (state, action: PayloadAction<boolean>) => {
			state.isSearchActive = action.payload;
		},
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchSearch.pending.type, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			fetchSearch.fulfilled.type,
			(state, action: PayloadAction<ApiSearchTypes>) => {
				state.isLoading = false;
				state.searchResult = action.payload.results;
			},
		);
		builder.addCase(
			fetchSearch.rejected.type,
			(state, action: PayloadAction<string>) => {
				state.isLoading = false;
				state.error = action.payload;
			},
		);
	},
});
