import { FC, useEffect } from "react";
import clsx from "clsx";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import s from "../../styles/components/common/Filters.module.scss";
import { GenresSlug } from "../../types/filters";
import Button from "../ui/Button.component";
import Checkbox from "../ui/Checkbox.component";

import FiltersStatic from "../../models/static/FiltersStatic";

import Accordion from "./Accordion.component";

const Filters: FC = () => {
	const {
		addGenreFilter,
		removeGenreFilter,
		fetchNextGamesPage,
		setCurrentPage,
		setGames,
		setNextPage,
		clearAllFilters,
	} = useActions();
	const { applyedGenresList, currentPage, next } = useTypedSelector(
		(state) => state.games,
	);

	const resetGames = () => {
		setNextPage("");
		setCurrentPage(1);
		setGames([]);
	};

	const resetFilters = () => {
		resetGames();
		clearAllFilters();

		document
			.querySelectorAll<HTMLInputElement>(".filterCheckbox")
			.forEach((c) => {
				if (c.checked) c.click();
			});
	};

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		const target = e.target as HTMLInputElement;
		const genre = target.getAttribute("name") as GenresSlug;

		if (genre) {
			applyedGenresList.includes(genre)
				? removeGenreFilter(genre)
				: addGenreFilter(genre);

			resetGames();
		}
	};

	useEffect(() => {
		if (!next)
			fetchNextGamesPage({
				page: currentPage,
				genres: applyedGenresList.join(","),
			});
	}, [next, applyedGenresList]);

	return (
		<aside className={clsx(s.filters)} onClick={(e) => handleClick(e)}>
			<Accordion title="Genres">
				{FiltersStatic.genres.map((g) => (
					<Checkbox
						name={g.slug}
						className={s.filters__genre}
						key={g.id}
						title={g.name}
					/>
				))}
			</Accordion>
			<Button callback={() => resetFilters()} className={s.filters__reset}>
				Reset
			</Button>
		</aside>
	);
};

export default Filters;
