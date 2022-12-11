import { FC, memo, useState } from "react";
import Image from "next/image";

import clsx from "clsx";

import s from "../../styles/components/ui/Screenshoot.module.scss";

import ImageLoader from "./ImageLoader.component";

type ScreenshootProps = {
	className?: string;
	src: string;
	width: number;
	height: number;
	alt: string;
	dataIndex: number;
};

const Screenshoot: FC<ScreenshootProps> = memo(
	({ className, alt, height, src, width, dataIndex }) => {
		const [isImageLoaded, setIsImageLoaded] = useState(false);

		const onImageLoaded = () => {
			setIsImageLoaded(true);
		};

		return (
			<div className={clsx(className, s.screenshoot)}>
				<Image
					src={src}
					width={width}
					height={height}
					loading="lazy"
					placeholder="empty"
					data-index={dataIndex}
					alt={alt}
					onLoadingComplete={onImageLoaded}
					className={clsx(
						!isImageLoaded && s.screenshoot__hidden,
						isImageLoaded && s.screenshoot__loaded,
					)}
				/>
				{!isImageLoaded && src && <ImageLoader className={s.screenshoot__loader} />}
			</div>
		);
	},
);

export default Screenshoot;
