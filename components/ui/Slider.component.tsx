import Image from "next/image";
import { FC, memo } from "react";
import clsx from "clsx";

import s from "../../styles/components/common/Carousel.module.scss";
import { ISlider } from "../../models/interfaces/ISlidersState";

interface ISliderProps {
	isActive: boolean;
	isNext: boolean;
	isNextFromStart: boolean;
	isPrev: boolean;
	isPrevFromEnd: boolean;
	slider: ISlider;
}

const Slider: FC<ISliderProps> = memo(
	({ isActive, isNext, isNextFromStart, isPrev, isPrevFromEnd, slider }) => {
		return (
			<div
				className={clsx(
					s.slide,
					s.slide__hidden,
					isActive && s.slide__active,
					isNext && s.slide__next,
					isNextFromStart && s.slide__next,
					isPrev && s.slide__prev,
					isPrevFromEnd && s.slide__prev,
				)}
			>
				<Image
					data-index={slider.id}
					width={1152}
					height={648}
					src={slider.img}
					alt={slider.title}
					loading="lazy"
					placeholder="empty"
				/>
			</div>
		);
	},
);

export default Slider;
