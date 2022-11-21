import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./reducers";

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
