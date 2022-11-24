import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { AppDispatch } from "..";
import { searchSlice } from "../reducers/Search.slice";
import { ApiSearchTypes } from "../../types/api";

export const setSearchBarActive =
	(condition: boolean) => (dispatch: AppDispatch) => {
		dispatch(searchSlice.actions.setActive(condition));
	};

export const setSearchQuery = (query: string) => (dispatch: AppDispatch) => {
	dispatch(searchSlice.actions.setSearchQuery(query));
};

export const fetchSearch = createAsyncThunk(
	"search/fetchSearch",
	async (search: string, thunkAPI) => {
		try {
			const response = await axios.get<ApiSearchTypes>(
				`${process.env.NEXT_PUBLIC_API_URL}`,
				{
					params: {
						key: `${process.env.NEXT_PUBLIC_API_KEY}`,
						page_size: 5,
						search,
					},
				},
			);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue("Не удалось найти");
		}
	},
);
