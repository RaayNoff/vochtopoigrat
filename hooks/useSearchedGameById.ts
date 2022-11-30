import { useTypedSelector } from "./useTypedSelector";

export const useSearchedGameById = (id: number) => {
	const { searchResult } = useTypedSelector((state) => state.search);

	return searchResult.filter((game) => game.id === id)[0];
};
