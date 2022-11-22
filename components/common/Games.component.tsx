import { FC } from "react";

import s from "../../styles/components/common/Games.module.scss";

import ReleaseList from "./ReleaseList.component";

const Games: FC = () => {
	return (
		<section className={s.games}>
			<div className="container">
				<div className={s.games__container}>
					<ReleaseList />
				</div>
			</div>
		</section>
	);
};

export default Games;
