import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { ApiGamesTypes, Game } from "../../types/api";
import { AppDispatch } from "..";
import { gamesSlice } from "../reducers/Games.slice";

export const fetchGames = createAsyncThunk(
	"games/fetchAll",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get<ApiGamesTypes>(
				`${process.env.NEXT_PUBLIC_API_URL}?key=${process.env.NEXT_PUBLIC_API_KEY}`,
			);
			return response.data.results;
		} catch (error) {
			return thunkAPI.rejectWithValue("Не удалось загрузить страницу");
		}
	},
);

export const setGames = (games: Game[]) => (dispatch: AppDispatch) => {
	dispatch(gamesSlice.actions.setGames(games));
};
