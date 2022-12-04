import { FC, memo } from "react";
import Image from "next/image";

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
		return (
			<div className={className}>
				<Image
					src={src}
					width={width}
					height={height}
					loading="lazy"
					placeholder="empty"
					data-index={dataIndex}
					alt={alt}
				/>
			</div>
		);
	},
);

export default Screenshoot;
