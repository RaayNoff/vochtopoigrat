import { combineReducers } from "redux";

import { gamesSlice } from "./Games.slice";
import { searchSlice } from "./Search.slice";

export const rootReducer = combineReducers({
	games: gamesSlice.reducer,
	search: searchSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
