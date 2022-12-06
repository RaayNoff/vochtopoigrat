import Image from "next/image";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";

import s from "../../styles/components/common/Carousel.module.scss";

import noImage from "../../assets/images/noImage.jpg";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectSliders } from "../../store/selectors";
import { useAutoPlay } from "../../hooks/useAutoPlay";

import { ItemCarousel } from "../ui/ItemCarousel.components";

interface ICarouselProps {
	className?: string;
}

const Carousel: FC<ICarouselProps> = ({ className }) => {
	const { sliders } = useTypedSelector(selectSliders);
	const [slideAction, setSlideAction] = useState<number>(0);
	const [srcBg, setSrcBg] = useState<string>("");

	const nextImage = () => {
		if (!(slideAction + 1 == sliders.length)) {
			setSlideAction((state) => state + 1);
			return;
		}

		setSlideAction(0);
	};

	const prevImage = () => {
		if (!(slideAction == 0)) {
			setSlideAction((state) => state - 1);
			return;
		}
		setSlideAction(sliders.length - 1);
	};

	const { callbackRef: setActiveSlideRef } = useAutoPlay(nextImage, slideAction);

	const onClickSlider = (event: React.MouseEvent) => {
		const isNext = event.currentTarget.classList.contains(s.slide__next);
		const isPrev = event.currentTarget.classList.contains(s.slide__prev);
		if (isNext) {
			nextImage();
		}
		if (isPrev) {
			prevImage();
		}
		setSrcBg(sliders[slideAction].img);
	};

	const paginationClick = (event: React.MouseEvent) => {
		const target = event.target as HTMLDivElement;
		if (target.dataset.index) {
			setSlideAction(Number(target.dataset.index));
		}
	};

	useEffect(() => {
		if (sliders && sliders[slideAction]) {
			setSrcBg(sliders[slideAction].img);

			const activeSlide = document.querySelector(`.${s.slide__active}`);

			if (activeSlide) setActiveSlideRef(activeSlide as HTMLElement);
		}
	}, [slideAction, sliders]);

	return (
		<section
			className={clsx(s.carousel, className)}
			onClick={(e) => onClickSlider(e)}
		>
			<div className={clsx(s.carousel__blur)}> </div>
			<Image
				src={srcBg || noImage}
				width={1152}
				height={648}
				className={clsx(s.carousel__bg)}
				alt=""
				loading="lazy"
				placeholder="empty"
			/>

			{sliders?.map((img, index) => {
				return (
					<ItemCarousel 
						key={img.id}
						id={img.id}
						title={img.title}
						url={img.img}
						index={index}
						slideAction={slideAction}
						onClickSlider={(event) => onClickSlider(event as React.MouseEvent)}
						length={sliders.length}
					/>
				);
			})}
			<div
				className={clsx(s.pagination)}
				onClick={(event) => paginationClick(event)}
			>
				{sliders?.map((_, i) => (
					<div
						key={i}
						className={clsx(
							s.pagination__item,
							i == slideAction && s.pagination__action,
						)}
						data-index={i}
					></div>
				))}
			</div>
		</section>
	);
};

export default Carousel;