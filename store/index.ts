import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./reducers";

export const createReduxStore = (initialState = {}) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
	});
};

export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore["dispatch"];
