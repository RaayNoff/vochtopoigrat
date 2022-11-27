import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { ApiGamesTypes, Game } from "../../types/api";
import { AppDispatch } from "..";
import { gamesSlice } from "../reducers/Games.slice";
import { GenresSlug } from "../../types/filters";

interface IFetchNextGamesPageArgs {
	page: number;
	genres?: string;
}

export const fetchNextGamesPage = createAsyncThunk(
	"games/fetchNextPage",
	async ({ genres = "", page }: IFetchNextGamesPageArgs, thunkAPI) => {
		try {
			const params = {
				key: `${process.env.NEXT_PUBLIC_API_KEY}`,
				page,
				page_size: 5,
			};

			if (genres) params.genres = genres;

			const response = await axios.get<ApiGamesTypes>(
				`${process.env.NEXT_PUBLIC_API_URL}`,
				{
					params: params,
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

export const addGenreFilter =
	(genre: GenresSlug) => (dispatch: AppDispatch) => {
		dispatch(gamesSlice.actions.addGenre(genre));
	};

export const removeGenreFilter =
	(genre: GenresSlug) => (dispatch: AppDispatch) => {
		dispatch(gamesSlice.actions.removeGenre(genre));
	};

export const setNextPage = (value: string) => (dispatch: AppDispatch) => {
	dispatch(gamesSlice.actions.setNextPage(value));
};

export const clearAllFilters = () => (dispatch: AppDispatch) => {
	dispatch(gamesSlice.actions.clearFilters());
};
