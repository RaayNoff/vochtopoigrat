import { Game } from "../../types/api";

export interface IGamesState {
	isLoading: boolean;
	error: string | null;
	games: Game[];
	next: null | string;
	currentPage: number;
}
