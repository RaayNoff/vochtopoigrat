import { Game, GenresSlug, TagSlug } from "../../types/api";

export interface IGamesState {
	isLoading: boolean;
	error: string | null;
	games: Game[];
	next: string;
	currentPage: number;
	applyedGenresList: GenresSlug[];
	applyedTagsList: TagSlug[];
}
