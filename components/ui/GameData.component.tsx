import { FC, memo } from "react";
import clsx from "clsx";
import Link from "next/link";

import { Genre, ParentPlatforms } from "../../types/api";
import { Developer, Publisher, Store, StoreDetailed } from "../../types/game";

import s from "../../styles/components/ui/GameData.module.scss";

import GameDescription from "./GameDescription.component";

interface IGameDataProps {
	name: string;
	description: string;
	released: string;
	genres: Genre[];
	platfroms: ParentPlatforms[];
	developers: Developer[];
	publishers: Publisher[];
	stores: Store[];
	storesUrls: StoreDetailed[];
	className: string;
}

const GameData: FC<IGameDataProps> = memo(
	({
		description,
		developers,
		genres,
		name,
		platfroms,
		publishers,
		released,
		stores,
		className,
		storesUrls,
	}) => {
		const getStoreUrl = (storeId: number) => {
			const requiredStore = storesUrls.filter(
				(data) => data.store_id === storeId,
			)[0];

			return requiredStore.url || "#";
		};

		const makeParagraphValue = (value: string, condition: boolean) => {
			if (condition) return value;

			return `${value}, `;
		};

		return (
			<section className={clsx(s.data, className)}>
				<h1 className={s.data__title}>{name}</h1>

				<GameDescription content={description} />

				<p className={clsx(s.data__paragraph, s.paragraph)}>
					Release: <span className={s.paragraph__value}>{released}</span>
				</p>
				<p className={clsx(s.data__paragraph, s.paragraph)}>
					Genres:{" "}
					<span className={s.paragraph__value}>
						{genres.map((g, i) =>
							makeParagraphValue(g.name, genres.length - 1 === i),
						)}
					</span>
				</p>
				<p className={clsx(s.data__paragraph, s.paragraph)}>
					Platforms:{" "}
					<span className={s.paragraph__value}>
						{platfroms.map((p, i) =>
							makeParagraphValue(p.platform.name, platfroms.length - 1 === i),
						)}
					</span>
				</p>
				<p className={clsx(s.data__paragraph, s.paragraph)}>
					Developers:{" "}
					<span className={s.paragraph__value}>
						{developers.map((d, i) =>
							makeParagraphValue(d.name, developers.length - 1 === i),
						)}
					</span>
				</p>
				<p className={clsx(s.data__paragraph, s.paragraph)}>
					Publishers:{" "}
					<span className={s.paragraph__value}>
						{publishers.map((p, i) =>
							makeParagraphValue(p.name, publishers.length - 1 === i),
						)}
					</span>
				</p>
				<p className={clsx(s.data__paragraph, s.paragraph)}>
					Stores:{" "}
					<span className={s.paragraph__value}>
						{stores.map((st, i) => (
							<Link
								key={st.id}
								href={getStoreUrl(st.store.id)}
								target="_blank"
								className={s.paragraph__link}
							>
								{makeParagraphValue(st.store.name, stores.length - 1 === i)}
							</Link>
						))}
					</span>
				</p>
			</section>
		);
	},
);

export default GameData;
