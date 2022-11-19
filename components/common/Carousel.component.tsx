import Image from "next/image";
import clsx from "clsx";
import { FC } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import testImage from "../../assets/images/test.jpg";
import card1 from "../../assets/images/card1.png";
import card2 from "../../assets/images/card2.png";
import card3 from "../../assets/images/card3.png";

import s from "../../styles/components/common/Carousel.module.scss";

const Carousel: FC = () => {
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

	return (
		<section className={s.carousel}>
			<div className="container">
				<div className={s.carousel__container}></div>
			</div>

			<Image
				src={testImage}
				alt={"Game background"}
				className={s.carousel__bg}
			></Image>
		</section>
	);
};

export default Carousel;
