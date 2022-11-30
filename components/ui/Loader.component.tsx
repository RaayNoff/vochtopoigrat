import clsx from "clsx";
import { FC } from "react";

import s from "../../styles/components/ui/Loader.module.scss";

interface ILoaderProps {
	className?: string;
}

const Loader: FC<ILoaderProps> = ({ className }) => {
	return (
		<div className={clsx(s.loader, className)}>
			<div className={s.loader__dot}></div>
			<div className={s.loader__dot}></div>
			<div className={s.loader__dot}></div>
		</div>
	);
};

export default Loader;
