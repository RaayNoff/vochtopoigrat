import { RootState } from "./reducers";

export const selectSliders = (state: RootState) => state.sliders;

export const selectGames = (state: RootState) => state.games;

export const selectSearch = (state: RootState) => state.search;
