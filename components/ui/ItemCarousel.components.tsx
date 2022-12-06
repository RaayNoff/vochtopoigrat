
import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type ItemCarouselType = {
	id: number,
	title: string,
	url: string,
	index: number,
	slideAction: number,
	onClickSlider: (event: React.MouseEvent) => void,
	length: number,
}

import s from "../../styles/components/common/Carousel.module.scss";

export const ItemCarousel: FC<ItemCarouselType> 
	= ({ id, title, url, slideAction, onClickSlider, index, length }) => {

	const [isHover, setIsHover] = useState(false);

	if (isHover && index == slideAction) {
		return (
		<div 
			className={clsx( s.slide, s.slide__active, s.slide_hover)}
			onMouseOut={() => setIsHover(false)}
			onMouseOver={() => setIsHover(true)}
			>
			<Image
				onClick={onClickSlider}
				width={1152}
				height={648}
				src={url}
				alt={title}
				loading="lazy"
				placeholder="empty"
			/>
			<Link 
				href={`/games/${id}`} 
				onMouseOver={() => setIsHover(true)}
				onMouseOut={() => setIsHover(false)}
			>
					OPEN PAGE
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
		onClick={onClickSlider}
		onMouseOver={() => setIsHover(true)}
	>
		<Image
			width={1152}
			height={648}
			src={url}
			alt={title}
			loading="lazy"
			placeholder="empty"
		/>
	</div>
	);
};
