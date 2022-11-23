import clsx from "clsx";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import { FC, useRef } from "react";

import { useGamesLoad } from "../../hooks/useGamesLoad";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import s from "../../styles/components/common/ReleaseList.module.scss";
import GameItem from "../ui/GameItem.component";
import Loader from "../ui/Loader.component";

const ReleaseList: FC = () => {
	const { games, isLoading } = useTypedSelector((state) => state.games);

	const lastElement = useRef<HTMLDivElement>(null);

	useGamesLoad(lastElement);

	return (
		<section className={clsx(s.releaseList)}>
			<div className={s.releaseList__shadow}></div>
			<OverlayScrollbarsComponent
				defer
				options={{
					overflow: {
						y: "scroll",
						x: "hidden",
					},
					scrollbars: {
						visibility: "auto",
						autoHide: "never",
						autoHideDelay: 1300,
						dragScroll: true,
						clickScroll: false,
					},
					paddingAbsolute: false,
				}}
				className={s.wrapper}
			>
				<ul className={clsx(s.releaseList__list)}>
					{games?.map((game) => (
						<li key={game.id} className={clsx(s.releaseList__item)}>
							<GameItem key={game.id} gameId={game.id} />
						</li>
					))}
					{isLoading && <Loader className={s.releaseList__loader} />}
				</ul>
				<div ref={lastElement} style={{ height: "1px" }}></div>
			</OverlayScrollbarsComponent>
			<div className={s.releaseList__shadow}></div>
		</section>
	);
};

export default ReleaseList;
