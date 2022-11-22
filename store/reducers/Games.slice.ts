import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IGamesState } from "../../models/interfaces/IGamesState";
import { Game } from "../../types/api";

import { fetchGames } from "../action-creators/Games.actions";

const initialState: IGamesState = {
	isLoading: false,
	error: null,
	games: [],
};

export const gamesSlice = createSlice({
	name: "games",
	initialState,
	reducers: {
		setGames: (state, action: PayloadAction<Game[]>) => {
			state.games = action.payload;
		},
	},
	extraReducers: {
		[fetchGames.fulfilled.type]: (state, action: PayloadAction<Game[]>) => {
			state.isLoading = false;
			state.games = action.payload;
		},
		[fetchGames.pending.type]: (state) => {
			state.isLoading = true;
		},
		[fetchGames.rejected.type]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});
