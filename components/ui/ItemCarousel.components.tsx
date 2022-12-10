import React, { FC, memo, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type ItemCarouselType = {
	id: number;
	title: string;
	url: string;
	index: number;
	slideAction: number;
	onClickSlider: (event: MouseEvent) => void;
	length: number;
};

import s from "../../styles/components/common/Carousel.module.scss";

export const ItemCarousel: FC<ItemCarouselType> = memo(
	({ id, title, url, slideAction, onClickSlider, index, length }) => {
		if (index == slideAction) {
			return (
				<div className={clsx(s.slide, s.slide__active, s.slide_hover)}>
					<Image
						onClick={(event) => onClickSlider(event)}
						width={1152}
						height={648}
						src={url || "/assets/image/noImage.jpg"}
						alt={title}
						loading="lazy"
						placeholder="empty"
					/>
					<Link href={`/games/${id}`} title={title} target="_blank">
						{title}
					</Link>
				</div>
			);
		}

		return (
			<div
				className={clsx(
					s.slide,
					s.slide__hidden,
					index == slideAction && s.slide__active,
					index - 1 == slideAction && s.slide__next,
					slideAction + 1 == length && index == 0 && s.slide__next,
					index + 1 == slideAction && s.slide__prev,
					slideAction == 0 && index + 1 == length && s.slide__prev,
				)}
				onClick={(event) => onClickSlider(event)}
			>
				<Image
					width={1152}
					height={648}
					src={url || "/assets/image/noImage.jpg"}
					alt={title}
					loading="lazy"
					placeholder="empty"
				/>
			</div>
		);
	},
);
