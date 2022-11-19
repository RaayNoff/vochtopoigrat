import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useState, useEffect } from "react";

import styles from "../../styles/components/common/ReleaseList.module.scss";

interface gameListItem {
	added: number;
	added_by_status: {
		yet: number;
		owned: number;
		beaten: number;
		toplay: number;
		dropped: number;
		playing: number;
	};
	background_image: string;
	clip: null;
	dominant_color: string;
	esrb_rating: { id: number; name: string; slug: string };
	genres: {
		games_count: number;
		id: number;
		image_background: string;
		name: string;
		slug: string;
	}[];
	id: number;
	metacritic: number;
	name: string;
	parent_platforms: {
		platform: { id: number; name: string; slug: string };
	}[];
	platforms: {
		platform: {
			games_count: number;
			id: number;
			image: null;
			image_background: string;
			name: string;
			slug: string;
			year_end: null;
			year_start: null;
		};
		released_at: string;
		requirements_en: { minimum: string; recommended: string };
		requirements_ru: null;
	}[];
	playtime: number;
	rating: number;
	rating_top: number;
	ratings: { count: number; id: number; percent: number; title: string }[];
	ratings_count: number;
	released: string;
	reviews_count: number;
	reviews_text_count: number;
	saturated_color: string;
	short_screenshots: { id: number; image: string }[];
	slug: string;
	stores: {
		id: number;
		store: {
			domain: string;
			games_count: number;
			id: number;
			image_background: string;
			name: string;
			slug: string;
		};
	}[];
	suggestions_count: number;
	tags: {
		games_count: number;
		id: number;
		image_background: string;
		language: string;
		name: string;
		slug: string;
	}[];
	tba: boolean;
	updated: string;
	user_game: null;
}

const ReleaseList: React.FC = () => {
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const [ data, setData ] = useState<gameListItem[]>();

	const gamesUrl = "https://api.rawg.io/api/games";
	const apiKey = "?key=5942455621404e6dae027f9513f71abb";
	const gamesToShow = "&page_size=5";

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(gamesUrl + apiKey + gamesToShow)
			.then((res) => res.data.results)
			.then((res) => {
				setData(res);
				setIsLoading(false);
			})
			.catch((error) => console.log(error));
	}, []);

	return !isLoading ? (
		<section className={clsx(styles.latest_games)}>
			<ul className={styles.latest_games__list}>
				{data?.map((game) => (
					<li
						className={styles.latest_games__item}
						key={game.id}
						style={{ backgroundImage: `linear-gradient(90deg, #2B2E35 30%, rgba(0, 0, 0, 0) 94.46%), url(${game.background_image})` }}
					>
						<Link href="#" className={styles.latest_games__link}>
							{game.name}
							<ul className={styles.latest_games__tags_list}>
								{game?.tags.map((tag) => (
									<li className={styles.latest_games__tags_item} key={tag.id}>
										{tag.name}
									</li>
								))}
							</ul>
							<ul className={styles.latest_games__platform_list}>
								{game?.parent_platforms.map((platform) => (
									<li
										className={styles.latest_games__platform_item}
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
	) : (
		<p>Loading...</p>
	);
};

export default ReleaseList;
