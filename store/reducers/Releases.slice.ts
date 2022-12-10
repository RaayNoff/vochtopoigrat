import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IReleasesState } from "../../models/interfaces/IReleasesState";
import { ApiReleasesTypes, Game } from "../../types/api";
import {
	fetchNextReleases,
	fetchReleases,
} from "../action-creators/Releases.actions";

const initialState: IReleasesState = {
	currentReleases: [],
	error: null,
	isLoading: false,
	currentDates: "",
	currentTitle: "",
	next: "available",
	page: 1,
};

export const releasesSlice = createSlice({
	name: "releases",
	initialState,
	reducers: {
		setGames: (state, action: PayloadAction<Game[]>) => {
			state.currentReleases = action.payload;
		},
		setCurrentDates: (state, action: PayloadAction<string>) => {
			state.currentDates = action.payload;
		},
		setCurrentTitle: (state, action: PayloadAction<string>) => {
			state.currentTitle = action.payload;
		},
		setNextPage: (state, action: PayloadAction<string | null>) => {
			state.next = action.payload;
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
	},

	extraReducers(builder) {
		builder.addCase(
			fetchReleases.fulfilled.type,
			(state, action: PayloadAction<ApiReleasesTypes>) => {
				state.currentReleases = action.payload.results;
				state.isLoading = false;
				state.next = action.payload.next;
			},
		);
		builder.addCase(
			fetchReleases.rejected.type,
			(state, action: PayloadAction<string>) => {
				state.isLoading = false;
				state.error = action.payload;
			},
		);
		builder.addCase(fetchReleases.pending.type, (state) => {
			state.isLoading = true;
			state.error = null;
			state.currentReleases = [];
		});
		builder.addCase(
			fetchNextReleases.fulfilled.type,
			(state, action: PayloadAction<ApiReleasesTypes>) => {
				state.currentReleases.push(...action.payload.results);
				state.isLoading = false;
				state.next = action.payload.next;
			},
		);
		builder.addCase(
			fetchNextReleases.rejected.type,
			(state, action: PayloadAction<string>) => {
				state.isLoading = false;
				state.error = action.payload;
			},
		);
		builder.addCase(fetchNextReleases.pending.type, (state) => {
			state.isLoading = true;
			state.error = null;
		});
	},
});
