import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IGamesState } from "../../models/interfaces/IGamesState";
import { Game } from "../../types/api";

import { fetchNextGamesPage } from "../action-creators/Games.actions";

const initialState: IGamesState = {
	isLoading: false,
	error: null,
	games: [],
	currentPage: 1,
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
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchNextGamesPage.fulfilled.type,
			(state, action: PayloadAction<Game[]>) => {
				state.isLoading = false;
				state.games = state.games.concat(action.payload);
			},
		),
			builder.addCase(fetchNextGamesPage.pending.type, (state) => {
				state.isLoading = true;
			}),
			builder.addCase(
				fetchNextGamesPage.rejected.type,
				(state, action: PayloadAction<string>) => {
					state.isLoading = false;
					state.error = action.payload;
				},
			);
	},
});
