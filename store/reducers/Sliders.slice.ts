import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISlider, ISlidersState } from "../../models/interfaces/ISlidersState";

const initialState: ISlidersState = {
	sliders: [],
};

export const slidersSlice = createSlice({
	name: "sliders",
	initialState,
	reducers: {
		setSliders: (state, action: PayloadAction<ISlider[]>) => {
			state.sliders = action.payload;
		},
	},
});
