import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { useSearchedGameById } from "../../hooks/useSearchedGameById";
import { Routes } from "../../models/enums/Routes";
import s from "../../styles/components/ui/SearchGameItem.module.scss";

interface ISearchGameItemProps {
	gameId: number;
}

const SearchGameItem: FC<ISearchGameItemProps> = ({ gameId }) => {
	const game = useSearchedGameById(gameId);

	if (!game) return null;

	return (
		<Link href={`${Routes.GAMES}/${gameId}`} className={clsx(s.gameLink)}>
			<div className={clsx(s.gameLink__container)}>
				<div className={clsx(s.gameLink__imageContainer, s.imageContainer)}>
					<Image
						className={clsx(s.imageContainer__img)}
						src={game.background_image || "/assets/images/noImage.jpg"}
						alt={game.name}
						width={500}
						height={500}
						loading="lazy"
						placeholder="empty"
					/>
				</div>
				<p className={clsx(s.gameLink__name)}>{game.name}</p>
			</div>
		</Link>
	);
};

export default SearchGameItem;
