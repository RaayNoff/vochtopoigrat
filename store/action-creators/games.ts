import { AppDispatch } from "..";
import { Result } from "../../models/interfaces/IGameList";
import { gamesSlice } from "../reducers/gamesSlice";

export const setGames = (games: Result[]) => (dispatch: AppDispatch) => {
	try {
		dispatch(gamesSlice.actions.setGames(games));
	} catch (error) {
		console.log(error);
	}
};
