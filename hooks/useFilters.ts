import { useEffect, useState } from "react";

import { useActions } from "./useActions";
import { useFiltersHandler } from "./useFiltersHandler";
import { useFiltersResets } from "./useFiltersResets";
import { useTypedSelector } from "./useTypedSelector";

export const useFitlers = () => {
	const {
		next,
		currentPage,
		applyedGenresList,
		applyedTagsList,
		applyedStoresList,
	} = useTypedSelector((state) => state.games);

	const { fetchNextGamesPage } = useActions();

	const { resetFilters } = useFiltersResets();
	const { handleClick } = useFiltersHandler();

	const [isRestricted, setIsRestricted] = useState(false);

	useEffect(() => {
		next ? setIsRestricted(false) : setIsRestricted(true);
	}, [next]);

	useEffect(() => {
		if (!next)
			fetchNextGamesPage({
				page: currentPage,
				genres: applyedGenresList.join(","),
				tags: applyedTagsList.join(","),
				stores: applyedStoresList.join(","),
			});
	}, [next, applyedGenresList, applyedTagsList, applyedStoresList]);

	return { resetFilters, handleClick, isRestricted };
};
