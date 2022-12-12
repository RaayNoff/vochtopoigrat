import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISearchPageState } from "../../models/interfaces/ISearchPageState";
import { ApiSearchTypes } from "../../types/api";
import {
	fetchSearchPageResults,
	fetchSearchPageSomePage,
} from "../action-creators/SearchPage.actions";

const initialState: ISearchPageState = {
	error: null,
	isLoading: false,
	results: [],
	searchQuery: "",
	currentPage: 1,
	next: null,
};

export const searchPageSlice = createSlice({
	name: "searchPage",
	initialState,
	reducers: {
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchSearchPageResults.pending.type, (state) => {
			state.error = null;
			state.isLoading = true;
			state.results = [];
		});
		builder.addCase(
			fetchSearchPageResults.fulfilled.type,
			(state, action: PayloadAction<ApiSearchTypes>) => {
				state.error = null;
				state.isLoading = false;
				state.results = action.payload.results;
				state.next = action.payload.next;
			},
		);
		builder.addCase(
			fetchSearchPageResults.rejected.type,
			(state, action: PayloadAction<string>) => {
				state.error = action.payload;
				state.isLoading = false;
				state.results = [];
			},
		);
		builder.addCase(fetchSearchPageSomePage.pending.type, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			fetchSearchPageSomePage.fulfilled.type,
			(state, action: PayloadAction<ApiSearchTypes>) => {
				state.error = null;
				state.isLoading = false;
				state.results = state.results.concat(action.payload.results);
				state.next = action.payload.next;
			},
		);
		builder.addCase(
			fetchSearchPageSomePage.rejected.type,
			(state, action: PayloadAction<string>) => {
				(state.isLoading = false), (state.error = action.payload);
			},
		);
	},
});
