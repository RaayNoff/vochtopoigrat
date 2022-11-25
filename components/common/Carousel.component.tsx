import Image from "next/image";
import clsx from "clsx";

import { FC, useEffect, useRef, useState } from "react";

import testImage from "../../assets/images/test.jpg";
import s from "../../styles/components/common/Carousel.module.scss";

type CarouselPropsType = {
	id: number;
	img: string;
	title: string;
};

const Carousel: FC<{ sliders: CarouselPropsType[] }> = ({ sliders }) => {
	const [slideAction, setSlideAction] = useState<number>(0);
	// eslint-disable-next-line prefer-const
	let nextImageRef = useRef<HTMLDivElement | null>(null);
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
		event.stopPropagation();
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
		// setSrcBg(sliders[0].img);
		const autoplay = setInterval(() => {
			nextImageRef.current?.click();
		}, 5000);
		return () => {
			clearInterval(autoplay);
		};
	}, []);

	return (
		<section
			className={s.carousel}
			style={{
				"--url": `url(${srcBg})`,
			}}
		>
			<div className={clsx(s.carousel__blur)}></div>
			{sliders?.map((img, index) => {
				return (
					<div
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
					>
						<Image
							width={1000}
							height={1000}
							priority
							src={img.img}
							alt={img.title}
						/>
					</div>
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
				{sliders?.map((_, index) => {
					return (
						<div
							key={index}
							className={clsx(
								s.pagination__item,
								index == slideAction && s.pagination__action,
							)}
							onLoadStart={(event) => {
								console.log(event.currentTarget.offsetTop);
								console.log(event.currentTarget.offsetLeft);
							}}
						></div>
					);
				})}
			</div>
		</section>
	);
};

export default Carousel;
