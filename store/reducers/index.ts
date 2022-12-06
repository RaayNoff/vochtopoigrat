import { combineReducers } from "redux";

import { gamesSlice } from "./Games.slice";
import { randomSlice } from "./Random.slice";
import { searchSlice } from "./Search.slice";
import { slidersSlice } from "./Sliders.slice";

export const rootReducer = combineReducers({
	games: gamesSlice.reducer,
	search: searchSlice.reducer,
	sliders: slidersSlice.reducer,
	random: randomSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
