import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IGamesState } from "../../models/interfaces/IGamesState";
import { ApiGamesTypes, Game, GenresSlug, TagSlug } from "../../types/api";

import { fetchNextGamesPage } from "../action-creators/Games.actions";

const initialState: IGamesState = {
	isLoading: false,
	error: null,
	games: [],
	currentPage: 1,
	next: "available",
	applyedGenresList: [],
	applyedTagsList: [],
};

export const gamesSlice = createSlice({
	name: "games",
	initialState,
	reducers: {
		setGames: (state, action: PayloadAction<Game[]>) => {
			state.games = action.payload;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		addGenre: (state, action: PayloadAction<GenresSlug>) => {
			state.applyedGenresList.push(action.payload);
		},
		removeGenre: (state, action: PayloadAction<GenresSlug>) => {
			state.applyedGenresList = state.applyedGenresList.filter(
				(g) => g !== action.payload,
			);
		},
		addTag: (state, action: PayloadAction<TagSlug>) => {
			state.applyedTagsList.push(action.payload);
		},
		removeTag: (state, action: PayloadAction<TagSlug>) => {
			state.applyedTagsList = state.applyedTagsList.filter((t) => {
				t !== action.payload;
			});
		},
		setNextPage: (state, action: PayloadAction<string>) => {
			state.next = action.payload;
		},
		clearFilters: (state) => {
			state.applyedGenresList = [];
			state.applyedTagsList = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchNextGamesPage.fulfilled.type,
			(state, action: PayloadAction<ApiGamesTypes>) => {
				state.isLoading = false;
				state.next = action.payload.next;
				state.games = state.games.concat(action.payload.results);
			},
		);
		builder.addCase(fetchNextGamesPage.pending.type, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			fetchNextGamesPage.rejected.type,
			(state, action: PayloadAction<string>) => {
				state.isLoading = false;
				state.error = action.payload;
			},
		);
	},
});
