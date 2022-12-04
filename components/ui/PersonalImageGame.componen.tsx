import { FC, memo } from "react";
import Image from "next/image";

interface IPersonalImageGameProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	blurData: string;
	className?: string;
}

const PersonalImageGame: FC<IPersonalImageGameProps> = memo(
	({ alt, blurData, src, className }) => {
		return (
			<div className={className}>
				<Image
					src={src || ""}
					alt={alt}
					loading="lazy"
					placeholder="blur"
					blurDataURL={blurData}
					width={1920}
					height={1080}
				/>
			</div>
		);
	},
);

export default PersonalImageGame;
