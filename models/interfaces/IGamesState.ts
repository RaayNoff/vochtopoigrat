import { Game } from "../../types/api";
import { GenresSlug } from "../../types/filters";

export interface IGamesState {
	isLoading: boolean;
	error: string | null;
	games: Game[];
	next: string;
	currentPage: number;
	applyedGenresList: GenresSlug[];
}
