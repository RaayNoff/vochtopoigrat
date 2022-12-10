import { Game } from "../../types/api";

export interface IReleasesState {
	currentReleases: Game[];
	isLoading: boolean;
	error: null | string;
	currentDates: string;
	currentTitle: string;
	next: string | null;
	page: number;
}
