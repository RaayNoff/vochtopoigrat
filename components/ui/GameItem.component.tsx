import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { useGameById } from "../../hooks/useGameById";
import { Routes } from "../../models/enums/Routes";

import s from "../../styles/components/ui/GameItem.module.scss";

import PlatformIcon from "./PlatformIcon";

interface IGameItemProps {
	gameId: number;
}

const GameItem: FC<IGameItemProps> = ({ gameId }) => {
	const {
		name,
		id,
		background_image: picture,
		parent_platforms: plats,
	} = useGameById(gameId);

	return (
		<Link href={`${Routes.GAMES}/${id}`}>
			<article className={clsx(s.game)}>
				<section className={clsx(s.game__description)}>
					<header className={clsx(s.game__title)}>{name}</header>
					<ul className={clsx(s.game__platforms, s.platforms)}>
						{plats?.map((item) => (
							<li key={item.platform.id} className={clsx(s.platforms__item)}>
								<PlatformIcon key={item.platform.id} platform={item.platform} />
							</li>
						))}
					</ul>
				</section>
				<section className={clsx(s.game__image, s.image)}>
					{picture ? (
						<Image
							src={picture}
							alt={name}
							className={clsx(s.image__pic)}
							width={500}
							height={500}
							loading="lazy"
							placeholder="empty"
						/>
					) : (
						<p className={clsx(s.image__noImgText)}>NO IMAGE</p>
					)}

					<div
						className={clsx(s.image__gradient, !picture && s.image__noImgGradient)}
					></div>
				</section>
			</article>
		</Link>
	);
};

export default GameItem;
