import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Game } from "../../types/game";

export const fetchRandomGame = createAsyncThunk(
	"random/fetchGame",
	async (_, thunkAPI) => {
		try {
			const randomNumber = await axios.get<number>(
				"https://www.random.org/integers/?num=1&min=1&max=80000&col=1&base=10&format=plain&rnd=new",
			);

			const response = await axios.get<Game>(
				`${process.env.NEXT_PUBLIC_API_URL}/${randomNumber.data}`,
				{
					params: {
						key: `${process.env.NEXT_PUBLIC_API_KEY}`,
					},
				},
			);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				"Fortune is trying to stop us. Keep pressing the button!",
			);
		}
	},
);
