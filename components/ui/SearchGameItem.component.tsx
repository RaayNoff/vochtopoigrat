import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

import { useSearchedGameById } from "../../hooks/useSearchedGameById";
import { Routes } from "../../models/enums/Routes";
import s from "../../styles/components/ui/SearchGameItem.module.scss";

import ImageLoader from "./ImageLoader.component";

interface ISearchGameItemProps {
	gameId: number;
}

const SearchGameItem: FC<ISearchGameItemProps> = ({ gameId }) => {
	const game = useSearchedGameById(gameId);
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const onGameLoaded = () => {
		setIsImageLoaded(true);
	};

	if (!game) return null;

	return (
		<Link href={`${Routes.GAMES}/${gameId}`} className={clsx(s.gameLink)}>
			<div className={clsx(s.gameLink__container)}>
				<div className={clsx(s.gameLink__imageContainer, s.imageContainer)}>
					<Image
						className={clsx(
							s.imageContainer__img,
							!isImageLoaded && s.imageContainer__hidden,
						)}
						src={game.background_image || "/assets/images/noImage.jpg"}
						alt={game.name}
						width={500}
						height={500}
						loading="lazy"
						placeholder="empty"
						onLoadingComplete={onGameLoaded}
					/>
					{!isImageLoaded && game.background_image && (
						<ImageLoader className={s.imageLoader} />
					)}
				</div>
				<p className={clsx(s.gameLink__name)}>{game.name}</p>
			</div>
		</Link>
	);
};

export default SearchGameItem;
