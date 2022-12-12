import { RootState } from "./reducers";

export const selectSliders = (state: RootState) => state.sliders;

export const selectGames = (state: RootState) => state.games;

export const selectSearch = (state: RootState) => state.search;

export const selectRandom = (state: RootState) => state.random;

export const selectReleases = (state: RootState) => state.releases;

export const selectSearchPage = (state: RootState) => state.searchPage;
