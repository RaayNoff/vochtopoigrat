import { selectGames } from "../store/selectors";
import { GenresSlug, StoreSlug, TagSlug } from "../types/api";

import { useActions } from "./useActions";
import { useFiltersResets } from "./useFiltersResets";
import { useTypedSelector } from "./useTypedSelector";

export const useFiltersHandler = () => {
	const { resetGames } = useFiltersResets();
	const { applyedGenresList, applyedTagsList, applyedStoresList } =
		useTypedSelector(selectGames);
	const {
		removeGenreFilter,
		addGenreFilter,
		removeStoreFilter,
		addStoreFilter,
		removeTagFilter,
		addTagFilter,
	} = useActions();

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		const target = e.target as HTMLInputElement;
		const attrb = target.getAttribute("name") as GenresSlug | TagSlug | StoreSlug;

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
		if (attrb?.match(/store-/gi)) {
			const store = attrb.replace("store-", "") as StoreSlug;

			applyedStoresList.includes(store)
				? removeStoreFilter(store)
				: addStoreFilter(store);

			resetGames();
		}
	};

	return { handleClick };
};
