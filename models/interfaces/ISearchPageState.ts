import { Game } from "../../types/api";

export interface ISearchPageState {
	isLoading: boolean;
	error: string | null;
	results: Game[];
	searchQuery: string;
	currentPage: number;
	next: string | null;
}
