import { combineReducers } from "redux";

import { gamesSlice } from "./gamesSlice";

export const rootReducer = combineReducers({
	games: gamesSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
