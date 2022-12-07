import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

import { Routes } from "../../models/enums/Routes";

import s from "../../styles/components/ui/GameItem.module.scss";
import { ParentPlatforms } from "../../types/api";

import ImageLoader from "./ImageLoader.component";

import PlatformIcon from "./PlatformIcon";

export interface IGameItemProps {
	name: string;
	id: number;
	picture: string;
	className?: string;
	platforms: ParentPlatforms[];
}

const GameItem: FC<IGameItemProps> = ({
	name,
	id,
	picture,
	platforms,
	className,
}) => {
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const onImageLoaded = () => {
		setIsImageLoaded(true);
	};

	return (
		<Link href={`${Routes.GAMES}/${id}`} className={clsx(className)}>
			<article className={clsx(s.game)}>
				<section className={clsx(s.game__description)}>
					<header className={clsx(s.game__title)}>{name}</header>
					<ul className={clsx(s.game__platforms, s.platforms)}>
						{platforms?.map((item) => (
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
							className={clsx(s.image__pic, !isImageLoaded && s.image__hidden)}
							width={500}
							height={500}
							loading="lazy"
							placeholder="empty"
							onLoadingComplete={onImageLoaded}
						/>
					) : (
						<p className={clsx(s.image__noImgText)}>NO IMAGE</p>
					)}

					{!isImageLoaded && picture && <ImageLoader className={s.imageLoader} />}

					<div
						className={clsx(s.image__gradient, !picture && s.image__noImgGradient)}
					></div>
				</section>
			</article>
		</Link>
	);
};

export default GameItem;
