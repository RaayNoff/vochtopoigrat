import { Game } from "./IGameList";

export interface IGamesState {
	isLoading: boolean;
	error: string | null;
	games: Game[];
}
