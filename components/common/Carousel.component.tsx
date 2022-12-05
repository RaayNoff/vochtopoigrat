import Image from "next/image";
import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";

import s from "../../styles/components/common/Carousel.module.scss";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectSliders } from "../../store/selectors";

interface ICarouselProps {
	className?: string;
}

const Carousel: FC<ICarouselProps> = ({ className }) => {
	const { sliders } = useTypedSelector(selectSliders);
	const [slideAction, setSlideAction] = useState<number>(0);
	const nextImageRef = useRef<HTMLDivElement>(null);
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

	const onClickSlider = (event: React.MouseEvent<HTMLDivElement>) => {
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
		}	
	}, [slideAction, sliders]);

	useEffect(() => {
		const autoplay = setTimeout(() => {
			nextImage();
		}, 4500);
		return () => {
			clearTimeout(autoplay);
		};
	}, [slideAction]);

	return (
		<section className={clsx(s.carousel, className)}>
			<div className={clsx(s.carousel__blur)}> </div>
			<Image
				width={1152}
				height={648}
				className={clsx(s.carousel__bg)}
				src={srcBg}
				alt=""
				loading="lazy"
				placeholder="empty"
			/>
			{sliders?.map((img, index) => {
				const isActive = index == slideAction;
				const isNext = index - 1 == slideAction;
				const isNextFromStart = slideAction + 1 == sliders.length && index == 0;
				const isPrev = index + 1 == slideAction;
				const isPrevFromEnd = slideAction == 0 && index + 1 == sliders.length;

				return (
					<Image
						key={img.id}
						className={clsx(
							s.slide,
							s.slide__hidden,
							isActive && s.slide__active,
							isNext && s.slide__next,
							isNextFromStart && s.slide__next,
							isPrev && s.slide__prev,
							isPrevFromEnd && s.slide__prev,
						)}
						onClick={(event) => {
							onClickSlider(event);
						}}
						width={1152}
						height={648}
						src={img.img}
						alt={img.title}
						loading="lazy"
						placeholder="empty"
					/>
				);
			})}
			<div
				ref={nextImageRef}
				className={clsx(s.slide__next, s.slide__hidden)}
				onClick={(event) => {
					onClickSlider(event);
				}}
			></div>
			<div 
				className={clsx(s.pagination)}
				onClick={event => paginationClick(event)}
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
