import Image from "next/image";
import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import s from "../../styles/components/common/Carousel.module.scss";

import noImage from "../../assets/images/noImage.jpg";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectSliders } from "../../store/selectors";
import { Routes } from "../../models/enums/Routes";
import { useHover } from "../../hooks/useHover";
import Slider from "../ui/Slider.component";
import { useAutoPlay } from "../../hooks/useAutoPlay";

interface ICarouselProps {
	className?: string;
}

const Carousel: FC<ICarouselProps> = ({ className }) => {
	const { sliders } = useTypedSelector(selectSliders);
	const [slideAction, setSlideAction] = useState<number>(0);
	const [srcBg, setSrcBg] = useState<string>("");
	const router = useRouter();

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
		const target = event.target as HTMLDivElement;
		const parent = target.parentElement as HTMLDivElement;

		if (!target.dataset.index) return;

		const isActive = parent.classList.contains(s.slide__active);
		const isNext = parent.classList.contains(s.slide__next);
		const isPrev = parent.classList.contains(s.slide__prev);

		if (isActive) {
			router.push(`${Routes.GAMES}/${target.dataset.index}`);
		}
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
			<Image
				src={srcBg || noImage}
				width={1152}
				height={648}
				className={clsx(s.carousel__bg)}
				alt=""
				loading="lazy"
				placeholder="empty"
			/>
			{sliders?.map((slider, index) => {
				const isActive = index == slideAction;
				const isNext = index - 1 == slideAction;
				const isNextFromStart = slideAction + 1 == sliders.length && index == 0;
				const isPrev = index + 1 == slideAction;
				const isPrevFromEnd = slideAction == 0 && index + 1 == sliders.length;

				return (
					<Slider
						key={slider.id}
						isActive={isActive}
						isNext={isNext}
						isNextFromStart={isNextFromStart}
						isPrev={isPrev}
						isPrevFromEnd={isPrevFromEnd}
						slider={slider}
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
