import Image from "next/image";

import { FC } from "react";

import testImage from "../../assets/images/test.jpg";
import s from "../../styles/components/common/Carousel.module.scss";

const Carousel: FC = () => {
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
