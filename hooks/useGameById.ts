import { useEffect, useState } from "react";

import { Game } from "../models/interfaces/IGameList";

import { useTypedSelector } from "./useTypedSelector";

export const useGameById = (gameId: number) => {
	const { games } = useTypedSelector((state) => state.games);
	const [requiredGame, setRequiredGame] = useState<Game>({} as Game);

	useEffect(() => {
		const [match] = games.filter((game) => game.id === gameId);
		setRequiredGame(match);
	}, [games]);

	return requiredGame;
};
