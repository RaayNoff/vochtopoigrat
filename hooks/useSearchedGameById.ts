import { selectSearch } from "../store/selectors";

import { useTypedSelector } from "./useTypedSelector";

export const useSearchedGameById = (id: number) => {
	const { searchResult } = useTypedSelector(selectSearch);

	return searchResult.filter((game) => game.id === id)[0];
};
