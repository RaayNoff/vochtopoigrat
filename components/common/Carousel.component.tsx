import Image from "next/image";
import clsx from "clsx";

import { FC, useEffect, useRef, useState } from "react";


import testImage from "../../assets/images/test.jpg";
import card1 from "../../assets/images/card1.png";
import card2 from "../../assets/images/card2.png";
import card3 from "../../assets/images/card3.png";

import s from "../../styles/components/common/Carousel.module.scss";

const Carousel: FC = () => {
	const [ slideAction, setSlideAction ] = useState<number>(0);
	const nextImageRef = useRef<HTMLDivElement>();
	const sliders = [
		{
			id: 1,
			img: card1,
		},
		{
			id: 2,
			img: card2,
		},
		{
			id: 3,
			img: card3,
		},
		{
			id: 4,
			img: card1,
		},
		{
			id: 5,
			img: card2,
		},
		{
			id: 6,
			img: card3,
		},
	];
	const [ srcBg, setSrcBg ] = useState(sliders[slideAction].img.src);

	const nextImage = () => {
		if (slideAction + 1 == sliders.length) {
			setSlideAction(0);
		} else {
			setSlideAction( state => state + 1 );
		}
	};

	const prevImage = () => {
		if (slideAction == 0) {
			setSlideAction(sliders.length - 1);
		} else {
			setSlideAction( state => state - 1 );
		}
	};

	const onClickSlider = (event:  React.MouseEvent<HTMLDivElement>) => {
		const isNext = event.currentTarget.classList.contains(s.slide__next);
		const isPrev = event.currentTarget.classList.contains(s.slide__prev);

		if (isNext) { nextImage(); }
		if (isPrev) { prevImage(); }
	};

	useEffect(() => {
		const autoplay = setInterval(() => {
			nextImageRef.current?.click();
		}, 5000);
		return () => { clearInterval(autoplay); };
	}, []);

	return (
		<section
			className={s.carousel}
			style={{
				"--url": `url(${srcBg})`,
			}}
		>
			<div className={clsx(s.carousel__blur)}></div>
			{sliders.map( ( img, index ) => {
				return (
					<div 
						key={img.id}
						className={clsx(
							s.slide,
							s.slide__hidden,
							( index == slideAction ) && s.slide__active,
							( index - 1 == slideAction )&& s.slide__next,
							( slideAction + 1 == sliders.length && index == 0 ) && s.slide__next,
							( index + 1 == slideAction ) && s.slide__prev,
							( slideAction == 0 && index + 1 == sliders.length ) && s.slide__prev,
						)}
						onClick={ event => {onClickSlider(event);} }
					>
						{/* // eslint-disable-next-line @next/next/no-img-element */}
						<img src={img.img.src} alt="img" />
					</div>
				);
			} )}
			<div
				ref={nextImageRef}
				className={clsx(s.slide__next, s.slide__hidden)}
				onClick={ event => {onClickSlider(event);} }
			></div>
			<div className={clsx(s.pagination)}>
				{sliders.map( (_, index) => {
					return (
						<div 
							key={index}
							className={clsx(
								s.pagination__item,
								(index == slideAction) && s.pagination__action,
							)}
							onLoadStart={ event => {
								console.log(event.currentTarget.offsetTop);
								console.log(event.currentTarget.offsetLeft);
							} }
							></div>
					);
				} )}
			</div>
		</section>
	);
};

export default Carousel;
