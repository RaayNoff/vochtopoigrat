import clsx from "clsx";

import { FC } from "react";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import s from "../../styles/components/common/ReleaseList.module.scss";
import GameItem from "../ui/GameItem.component";

const ReleaseList: FC = () => {
	const { games, isLoading, error } = useTypedSelector((state) => state.games);

	if (isLoading) {
		return <p>Идет загрузка...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<section className={clsx(s.releaseList)}>
			<div className={clsx(s.releaseList__shadowUp)}></div>

			<ul className={clsx(s.releaseList__list)}>
				{games.map((game) => (
					<li key={game.id} className={clsx(s.releaseList__item)}>
						<GameItem key={game.id} gameId={game.id} />
					</li>
				))}
			</ul>

			<div className={clsx(s.releaseList__shadowDown)}></div>
		</section>
	);
};

export default ReleaseList;
