import { FC } from "react";
import Swiper, { Navigation } from "swiper";
import Image from "next/image";

import { Swiper as Swipe, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/navigation";

import { Screenshoot } from "../../types/game";

import s from "../../styles/components/ui/ScreenshootsSwiper.module.scss";

import Modal from "./Modal.component";

interface IScreenshootsSwiperProps {
	activeState: boolean;
	screenshoots: Screenshoot[];
	gameName: string;
	setSwiper: React.Dispatch<React.SetStateAction<Swiper | undefined>>;
	swiperHandler: () => void;
}

const ScreenshootsSwiper: FC<IScreenshootsSwiperProps> = ({
	activeState,
	screenshoots,
	gameName,
	setSwiper,
	swiperHandler,
}) => {
	return (
		<Modal callback={swiperHandler} state={activeState}>
			<Swipe
				className={s.swiper}
				pagination={{
					type: "progressbar",
				}}
				navigation={true}
				modules={[Navigation]}
				onSwiper={(swiper) => setSwiper(swiper)}
				containerModifierClass={"customSwiper"}
				centeredSlides={true}
			>
				{screenshoots?.map((sshot) => (
					<SwiperSlide key={sshot.id}>
						<Image
							src={sshot.image}
							alt={gameName}
							loading="lazy"
							width={1920}
							height={1080}
							placeholder="empty"
						/>
					</SwiperSlide>
				))}
			</Swipe>
		</Modal>
	);
};

export default ScreenshootsSwiper;
