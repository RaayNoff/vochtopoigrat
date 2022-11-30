import { Game } from "../../types/api";

export interface ISearchState {
	searchResult: Game[];
	isSearchActive: boolean;
	searchQuery: string;
	isLoading: boolean;
	error: string | null;
}
