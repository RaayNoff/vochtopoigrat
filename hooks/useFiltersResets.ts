import { useCallback } from "react";

import { useActions } from "./useActions";

export const useFiltersResets = () => {
	const { setGamesNextPage, setCurrentPage, setGames, clearAllFilters } =
		useActions();

	const resetGames = () => {
		setGamesNextPage("");
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

	return { resetGames, resetFilters };
};
