import clsx from "clsx";
import { FC } from "react";

import s from "../../styles/components/ui/ImageLoader.module.scss";

interface IImageLoaderProps {
	className?: string;
}

const ImageLoader: FC<IImageLoaderProps> = ({ className }) => {
	return (
		<svg className={clsx(s.loader, className)} viewBox="25 25 50 50">
			<circle className={s.loader__circle} cx="50" cy="50" r="20"></circle>
		</svg>
	);
};

export default ImageLoader;
