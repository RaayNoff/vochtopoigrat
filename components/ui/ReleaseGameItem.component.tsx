import { FC, memo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import Link from "next/dist/client/link";

import { Game } from "../../types/api";
import s from "../../styles/components/ui/ReleaseGameItem.module.scss";
import DateService from "../../services/Date.service";

import { Routes } from "../../models/enums/Routes";

import PlatformIcon from "./PlatformIcon";
import ImageLoader from "./ImageLoader.component";

interface IReleaseGameItemProps {
	game: Game;
}

const ReleaseGameItem: FC<IReleaseGameItemProps> = memo(
	({ game: { name, background_image, parent_platforms, released, id } }) => {
		const [isLoaded, setIsLoaded] = useState(false);

		const onImageLoaded = () => {
			setIsLoaded(true);
		};

		return (
			<article className={s.game}>
				<header className={s.game__img}>
					<Image
						alt={name}
						src={background_image || "/assets/images/noImage.jpg"}
						width={1920}
						height={1080}
						placeholder="empty"
						loading="lazy"
						onLoadingComplete={onImageLoaded}
					/>
					{!isLoaded && <ImageLoader className={s.game__loader} />}
				</header>
				<main className={clsx(s.game__data, s.data)}>
					<ul className={clsx(s.data__platforms, s.platforms)}>
						{parent_platforms.map((pl) => (
							<li className={s.platforms__item} key={pl.platform.id}>
								<PlatformIcon platform={pl.platform} />
							</li>
						))}
					</ul>
					<Link href={Routes.GAMES + "/" + id} className={s.data__name}>
						{name}
					</Link>
				</main>
				<footer className={clsx(s.game__date, s.date)}>
					<span className={s.date__text}>Release date:</span>
					<span className={s.date__value}>
						{DateService.getNormalFormated(released, "MMM D, YYYY")}
					</span>
				</footer>
			</article>
		);
	},
);

export default ReleaseGameItem;
