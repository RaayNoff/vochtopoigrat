import { FC } from "react";

import { useGameById } from "../../hooks/useGameById";

import GameItem from "./GameItem.component";

interface IGameItemWithIdProps {
	gameId: number;
}

const GameItemWithId: FC<IGameItemWithIdProps> = ({ gameId }) => {
	const { name, background_image, parent_platforms } = useGameById(gameId);

	return (
		<GameItem
			id={gameId}
			name={name}
			picture={background_image}
			platforms={parent_platforms}
		/>
	);
};

export default GameItemWithId;
