import clsx from "clsx";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import { useRef } from "react";

import { useGamesLoad } from "../../hooks/useGamesLoad";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { selectGames } from "../../store/selectors";

import s from "../../styles/components/common/ReleaseList.module.scss";
import GameItemWithId from "../ui/GameItemWithId.component";
import Loader from "../ui/Loader.component";

const ReleaseList = () => {
	const { games, isLoading, next } = useTypedSelector(selectGames);

	const lastElement = useRef<HTMLDivElement>(null);

	useGamesLoad(lastElement);

	return (
		<section className={clsx(s.releaseList)}>
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
							<GameItemWithId gameId={game.id} />
						</li>
					))}
					{isLoading && (
						<Loader
							className={clsx(
								s.releaseList__loader,
								isLoading && !games.length && s.releaseList__loader_opened,
							)}
						/>
					)}
					{next && <div ref={lastElement} style={{ height: "1px" }}></div>}
					{!games?.length && !isLoading && (
						<p className={s.releaseList__noGames}>No games found</p>
					)}
				</ul>
			</OverlayScrollbarsComponent>
		</section>
	);
};

export default ReleaseList;
