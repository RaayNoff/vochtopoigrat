import { useEffect, useState } from "react";

import { GenresSlug, TagSlug } from "../types/api";

import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export const useFitlers = () => {
	const { next, currentPage, applyedGenresList, applyedTagsList } =
		useTypedSelector((state) => state.games);

	const [isRestricted, setIsRestricted] = useState(false);

	useEffect(() => {
		next ? setIsRestricted(false) : setIsRestricted(true);
	}, [next]);

	const {
		setNextPage,
		setCurrentPage,
		setGames,
		clearAllFilters,
		fetchNextGamesPage,
		addGenreFilter,
		removeGenreFilter,
		removeTagFilter,
		addTagFilter,
	} = useActions();

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

	useEffect(() => {
		if (!next)
			fetchNextGamesPage({
				page: currentPage,
				genres: applyedGenresList.join(","),
				tags: applyedTagsList.join(","),
			});
	}, [next, applyedGenresList, applyedTagsList]);

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		const target = e.target as HTMLInputElement;
		const attrb = target.getAttribute("name") as GenresSlug | TagSlug;

		if (attrb?.match(/genre-/gi)) {
			const genre = attrb.replace("genre-", "") as GenresSlug;

			applyedGenresList.includes(genre)
				? removeGenreFilter(genre)
				: addGenreFilter(genre);

			resetGames();
		}
		if (attrb?.match(/tag-/gi)) {
			const tag = attrb.replace("tag-", "") as TagSlug;

			applyedTagsList.includes(tag) ? removeTagFilter(tag) : addTagFilter(tag);

			resetGames();
		}
	};

	return { resetFilters, handleClick, isRestricted };
};
