import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { AppDispatch } from "..";
import { ApiReleasesTypes, Game } from "../../types/api";
import { releasesSlice } from "../reducers/Releases.slice";

export const setReleases = (games: Game[]) => (dispatch: AppDispatch) => {
	dispatch(releasesSlice.actions.setGames(games));
};

export const fetchReleases = createAsyncThunk(
	"releases/fetchReleases",
	async (dates: string, thunkAPI) => {
		try {
			const response = await axios.get<ApiReleasesTypes>(
				`${process.env.NEXT_PUBLIC_API_URL}`,
				{
					params: {
						key: `${process.env.NEXT_PUBLIC_API_KEY}`,
						page_size: 10,
						dates,
					},
				},
			);

			const data = response.data;

			return data;
		} catch (error) {
			thunkAPI.rejectWithValue("Cannot fetch releases");
		}
	},
);
export const fetchNextReleases = createAsyncThunk(
	"releases/fetchNextReleases",
	async ({ dates, page }: { dates: string; page?: number }, thunkAPI) => {
		const extraOptions: { [key: string | number]: string | number } = {};

		if (page) extraOptions.page = page;

		try {
			const response = await axios.get<ApiReleasesTypes>(
				`${process.env.NEXT_PUBLIC_API_URL}`,
				{
					params: {
						key: `${process.env.NEXT_PUBLIC_API_KEY}`,
						page_size: 10,
						dates,
						...extraOptions,
					},
				},
			);

			const data = response.data;

			return data;
		} catch (error) {
			thunkAPI.rejectWithValue("Cannot fetch next releases");
		}
	},
);

export const setCurrentDates = (dates: string) => (dispatch: AppDispatch) => {
	dispatch(releasesSlice.actions.setCurrentDates(dates));
};

export const setCurrentTitle = (title: string) => (dispatch: AppDispatch) => {
	dispatch(releasesSlice.actions.setCurrentTitle(title));
};

export const setNextPage =
	(value: string | null) => (dispatch: AppDispatch) => {
		dispatch(releasesSlice.actions.setNextPage(value));
	};

export const setReleasesPage = (page: number) => (dispatch: AppDispatch) => {
	dispatch(releasesSlice.actions.setPage(page));
};
