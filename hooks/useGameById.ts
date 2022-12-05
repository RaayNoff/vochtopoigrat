import { useEffect, useState } from "react";

import { selectGames } from "../store/selectors";

import { Game } from "../types/api";

import { useTypedSelector } from "./useTypedSelector";

export const useGameById = (gameId: number) => {
	const { games } = useTypedSelector(selectGames);
	const [requiredGame, setRequiredGame] = useState<Game>({} as Game);

	useEffect(() => {
		const [match] = games.filter((game) => game.id === gameId);
		setRequiredGame(match);
	}, [games]);

	return requiredGame;
};
