import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Game } from "../../types/game";
import { fetchRandomGame } from "../action-creators/Random.actions";

interface IRandomState {
	isLoading: boolean;
	error: null | string;
	game: Game | null;
}

const initialState: IRandomState = {
	error: null,
	game: null,
	isLoading: false,
};

export const randomSlice = createSlice({
	name: "random",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchRandomGame.pending.type, (state) => {
			state.error = null;
			state.isLoading = true;
			state.game = null;
		});
		builder.addCase(
			fetchRandomGame.fulfilled.type,
			(state, action: PayloadAction<Game>) => {
				state.game = action.payload;
				state.isLoading = false;
			},
		);
		builder.addCase(
			fetchRandomGame.rejected.type,
			(state, action: PayloadAction<string>) => {
				state.error = action.payload;
				state.isLoading = false;
			},
		);
	},
});
