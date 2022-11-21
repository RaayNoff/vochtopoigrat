import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Result } from "../../models/interfaces/IGameList";

const initialState = {
	games: [] as Result[],
};

export const gamesSlice = createSlice({
	name: "gamesSlice",
	initialState,
	reducers: {
		setGames: (state, action: PayloadAction<Result[]>) => {
			state.games = action.payload;
		},
	},
});
