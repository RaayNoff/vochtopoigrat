import clsx from "clsx";
import { FC, memo } from "react";

import s from "../../styles/components/ui/Metascore.module.scss";

interface IMetascoreProps {
	score: number;
	className?: string;
}

const Metascore: FC<IMetascoreProps> = memo(({ score, className }) => {
	return (
		<div className={clsx(className, s.metascore)}>
			<span className={s.metascore__value}>{score || "?"}</span>
			<span className={s.metascore__text}>Metascore</span>
		</div>
	);
});

export default Metascore;
