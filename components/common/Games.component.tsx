import clsx from "clsx";
import { FC } from "react";

import s from "../../styles/components/common/Games.module.scss";

import Filters from "./Filters.component";
import ReleaseList from "./ReleaseList.component";

interface IGamesProps {
	className?: string;
}

const Games: FC<IGamesProps> = ({ className }) => {
	return (
		<section className={clsx(s.games, className)}>
			<div className="container">
				<div className={s.games__container}>
					<Filters />
					<ReleaseList />
				</div>
			</div>
		</section>
	);
};

export default Games;
