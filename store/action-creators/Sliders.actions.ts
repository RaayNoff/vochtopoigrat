import { AppDispatch } from "..";
import { ISlider } from "../../models/interfaces/ISlidersState";
import { slidersSlice } from "../reducers/Sliders.slice";

export const setSliders = (sliders: ISlider[]) => (dispatch: AppDispatch) => {
	dispatch(slidersSlice.actions.setSliders(sliders));
};
