import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	ApiGamesTypes,
	Game,
	GenresSlug,
	StoreSlug,
	TagSlug,
} from "../../types/api";
import { AppDispatch } from "..";
import { gamesSlice } from "../reducers/Games.slice";

interface IFetchNextGamesPageArgs {
	page: number;
	genres?: string;
	tags?: string;
	stores?: string;
}

export const fetchNextGamesPage = createAsyncThunk(
	"games/fetchNextPage",
	async (
		{ genres = "", page, tags = "", stores = "" }: IFetchNextGamesPageArgs,
		thunkAPI,
	) => {
		try {
			const params: {
				[key: string | number]: string | number;
			} = {
				key: `${process.env.NEXT_PUBLIC_API_KEY}`,
				page,
				page_size: 5,
			};

			if (genres) params.genres = genres;
			if (tags) params.tags = tags;
			if (stores) params.stores = stores;

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

export const addTagFilter = (tag: TagSlug) => (dispatch: AppDispatch) => {
	dispatch(gamesSlice.actions.addTag(tag));
};

export const removeTagFilter = (tag: TagSlug) => (dispatch: AppDispatch) => {
	dispatch(gamesSlice.actions.removeTag(tag));
};
export const addStoreFilter = (store: StoreSlug) => (dispatch: AppDispatch) => {
	dispatch(gamesSlice.actions.addStore(store));
};

export const removeStoreFilter =
	(store: StoreSlug) => (dispatch: AppDispatch) => {
		dispatch(gamesSlice.actions.removeStore(store));
	};

export const setGamesNextPage = (value: string) => (dispatch: AppDispatch) => {
	dispatch(gamesSlice.actions.setNextPage(value));
};

export const clearAllFilters = () => (dispatch: AppDispatch) => {
	dispatch(gamesSlice.actions.clearFilters());
};
