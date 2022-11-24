import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { ApiGamesTypes, Game } from "../../types/api";
import { AppDispatch } from "..";
import { gamesSlice } from "../reducers/Games.slice";

export const fetchNextGamesPage = createAsyncThunk(
	"games/fetchNextPage",
	async (page: number, thunkAPI) => {
		try {
			const response = await axios.get<ApiGamesTypes>(
				`${process.env.NEXT_PUBLIC_API_URL}`,
				{
					params: {
						key: `${process.env.NEXT_PUBLIC_API_KEY}`,
						page,
						page_size: 5,
					},
				},
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue("Не удалось загрузить следующую страницу");
		}
	},
);

export const setCurrentPage = (page: number) => (dispatch: AppDispatch) => {
	dispatch(gamesSlice.actions.setCurrentPage(page));
};

export const setGames = (games: Game[]) => (dispatch: AppDispatch) => {
	dispatch(gamesSlice.actions.setGames(games));
};
