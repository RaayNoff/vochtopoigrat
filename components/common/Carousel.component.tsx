import Image from "next/image";
import clsx from "clsx";

import { FC, useEffect, useRef, useState } from "react";

import s from "../../styles/components/common/Carousel.module.scss";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface ICarouselProps {
	className?: string;
}

const Carousel: FC<ICarouselProps> = ({ className }) => {
	const { sliders } = useTypedSelector((state) => state.sliders);
	const [slideAction, setSlideAction] = useState<number>(0);
	const nextImageRef = useRef<HTMLDivElement>(null);
	const [srcBg, setSrcBg] = useState<string>("");

	const nextImage = () => {
		if (slideAction + 1 == sliders.length) {
			setSlideAction(0);
		} else {
			setSlideAction((state) => state + 1);
		}
	};

	const prevImage = () => {
		if (slideAction == 0) {
			setSlideAction(sliders.length - 1);
		} else {
			setSlideAction((state) => state - 1);
		}
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

	useEffect(() => {
		if (sliders && sliders[slideAction]) {
			setSrcBg(sliders[slideAction].img);
		} else {
			setSrcBg("");
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
		<section
			className={clsx(s.carousel, className)}
			style={{
				"--url": `url(${srcBg})`,
			}}
		>
			<div className={clsx(s.carousel__blur)}></div>
			{sliders?.map((img, index) => {
				return (
					<Image
						key={img.id}
						className={clsx(
							s.slide,
							s.slide__hidden,
							index == slideAction && s.slide__active,
							index - 1 == slideAction && s.slide__next,
							slideAction + 1 == sliders.length && index == 0 && s.slide__next,
							index + 1 == slideAction && s.slide__prev,
							slideAction == 0 && index + 1 == sliders.length && s.slide__prev,
						)}
						onClick={(event) => {
							onClickSlider(event);
						}}
						width={1000}
						height={1000}
						priority
						src={img.img}
						alt={img.title}
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
			<div className={clsx(s.pagination)}>
				{sliders?.map((_, i) => (
					<div
						key={i}
						className={clsx(
							s.pagination__item,
							i == slideAction && s.pagination__action,
						)}
					></div>
				))}
			</div>
		</section>
	);
};

export default Carousel;
