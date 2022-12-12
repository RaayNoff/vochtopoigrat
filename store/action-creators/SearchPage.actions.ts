import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { AppDispatch } from "..";
import { ApiSearchTypes } from "../../types/api";
import { searchPageSlice } from "../reducers/SearchPage.slice";

export const setSearchPageQuery =
	(query: string) => (dispatch: AppDispatch) => {
		dispatch(searchPageSlice.actions.setSearchQuery(query));
	};

export const setSearchPageCurrentPage =
	(pageNumber: number) => (dispatch: AppDispatch) => {
		dispatch(searchPageSlice.actions.setCurrentPage(pageNumber));
	};

export const fetchSearchPageResults = createAsyncThunk(
	"searchPage/fetchSearch",
	async (search: string, thunkAPI) => {
		try {
			const response = await axios.get<ApiSearchTypes>(
				`${process.env.NEXT_PUBLIC_API_URL}`,
				{
					params: {
						key: `${process.env.NEXT_PUBLIC_API_KEY}`,
						page_size: 6,
						search,
					},
				},
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue("Failed to search results");
		}
	},
);

export const fetchSearchPageSomePage = createAsyncThunk(
	"searchPage/fetchNextPage",
	async (
		{ pageNumber, searchQuery }: { pageNumber: number; searchQuery: string },
		thunkAPI,
	) => {
		try {
			const response = await axios.get<ApiSearchTypes>(
				`${process.env.NEXT_PUBLIC_API_URL}`,
				{
					params: {
						key: `${process.env.NEXT_PUBLIC_API_KEY}`,
						page_size: 6,
						search: searchQuery,
						page: pageNumber,
					},
				},
			);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue("Failed to load next page");
		}
	},
);
