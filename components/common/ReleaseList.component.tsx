import clsx from "clsx";
import Link from "next/link";

import { FC } from "react";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import s from "../../styles/components/common/ReleaseList.module.scss";

const ReleaseList: FC = () => {
	const { games: data } = useTypedSelector((state) => state.games);

	return (
		<section className={clsx(s.latest_games)}>
			<ul className={s.latest_games__list}>
				{data?.map((game) => (
					<li
						className={s.latest_games__item}
						key={game.id}
						style={{
							backgroundImage: `linear-gradient(90deg, #2B2E35 30%, rgba(0, 0, 0, 0) 94.46%), url(${game.background_image})`,
						}}
					>
						<Link href="#" className={s.latest_games__link}>
							{game.name}
							<ul className={s.latest_games__tags_list}>
								{game?.tags.map((tag) => (
									<li className={s.latest_games__tags_item} key={tag.id}>
										{tag.name}
									</li>
								))}
							</ul>
							<ul className={s.latest_games__platform_list}>
								{game?.parent_platforms.map((platform) => (
									<li
										className={s.latest_games__platform_item}
										key={platform.platform.id}
									>
										{platform.platform.name}
									</li>
								))}
							</ul>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default ReleaseList;
